'use strict';

// Trò chơi dùng HTML + CSS + JS thuần. Không cần thư viện hoặc file âm thanh ngoài.
const $ = (id) => document.getElementById(id);
const ui = {
  arena: $('arena'), hero: $('hero'), dragon: $('dragon'), effects: $('effects'),
  heroHealth: $('heroHealth'), dragonHealth: $('dragonHealth'),
  heroHpText: $('heroHpText'), dragonHpText: $('dragonHpText'),
  energyFill: $('energyFill'), energyText: $('energyText'),
  attack: $('attackButton'), shield: $('shieldButton'), special: $('specialButton'),
  startOverlay: $('startOverlay'), endOverlay: $('endOverlay'),
  message: $('battleMessage'), redFlash: $('redFlash'), blueFlash: $('blueFlash'),
  sound: $('soundToggle')
};

let state = {};
let enemyLoop = null;
let audioContext = null;
let soundEnabled = true;
let sessionId = 0;

const random = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
const wait = (callback, delay) => {
  const id = sessionId;
  setTimeout(() => { if (id === sessionId) callback(); }, delay);
};

function resetState() {
  sessionId += 1;
  clearInterval(enemyLoop);
  enemyLoop = null;
  state = {
    active: false, heroHP: 100, dragonHP: 100, energy: 0,
    guarding: false, attackReadyAt: 0, shieldReadyAt: 0, busy: false
  };
  ui.hero.className = 'character hero';
  ui.dragon.className = 'character dragon';
  ui.arena.classList.remove('is-shaking');
  ui.effects.replaceChildren();
  ui.startOverlay.classList.remove('hidden');
  ui.endOverlay.classList.add('hidden');
  setMessage('Nhấn “Bắt đầu” để tham chiến!');
  updateHUD();
}

function startGame() {
  resetState();
  state.active = true;
  ui.startOverlay.classList.add('hidden');
  ui.endOverlay.classList.add('hidden');
  enableAudio();
  playSound('start');
  setMessage('Hỏa Long xuất hiện! Hãy tấn công bằng phím J.');
  updateHUD();
  enemyLoop = setInterval(dragonAttack, 2550);
  ui.arena.focus({ preventScroll: true });
}

function updateHUD() {
  ui.heroHealth.style.width = `${state.heroHP}%`;
  ui.dragonHealth.style.width = `${state.dragonHP}%`;
  ui.energyFill.style.width = `${state.energy}%`;
  ui.heroHpText.textContent = `${state.heroHP} / 100 HP`;
  ui.dragonHpText.textContent = `${state.dragonHP} / 100 HP`;
  ui.energyText.textContent = `${state.energy}%`;
  ui.attack.disabled = !state.active;
  ui.shield.disabled = !state.active;
  ui.special.disabled = !state.active || state.energy < 100;
}

function setMessage(text) { ui.message.textContent = text; }

function retrigger(element, className, duration) {
  element.classList.remove(className);
  void element.offsetWidth;
  element.classList.add(className);
  wait(() => element.classList.remove(className), duration);
}

function flash(kind) {
  retrigger(kind === 'red' ? ui.redFlash : ui.blueFlash, 'active', 600);
  retrigger(ui.arena, 'is-shaking', 400);
}

function createParticles(xPercent, yPercent, color = '#ffb05d', count = 18) {
  for (let i = 0; i < count; i += 1) {
    const node = document.createElement('i');
    node.className = 'fx-particle';
    const angle = Math.random() * Math.PI * 2;
    const length = random(30, 120);
    node.style.left = `${xPercent}%`;
    node.style.top = `${yPercent}%`;
    node.style.setProperty('--color', color);
    node.style.setProperty('--dx', `${Math.cos(angle) * length}px`);
    node.style.setProperty('--dy', `${Math.sin(angle) * length}px`);
    node.style.animationDuration = `${random(55, 100) / 100}s`;
    ui.effects.appendChild(node);
    node.addEventListener('animationend', () => node.remove(), { once: true });
  }
}

function createEffect(className, x, y, duration = 700) {
  const node = document.createElement('div');
  node.className = className;
  if (x !== null) node.style.left = `${x}%`;
  if (y !== null) node.style.top = `${y}%`;
  ui.effects.appendChild(node);
  wait(() => node.remove(), duration);
  return node;
}

function damageNumber(value, x, y, heroTarget = false) {
  const el = createEffect(`fx-damage${heroTarget ? ' hero-damage' : ''}`, x, y, 1050);
  el.textContent = `−${value}`;
}

function receiveDamage(who, amount) {
  if (!state.active) return;
  if (who === 'dragon') {
    state.dragonHP = Math.max(0, state.dragonHP - amount);
    retrigger(ui.dragon, 'is-wounded', 550);
    createParticles(70, 51, '#ffb254', 24);
    damageNumber(amount, 70, 39);
    playSound('hit');
  } else {
    let actual = amount;
    if (state.guarding) {
      actual = Math.max(1, Math.ceil(amount * 0.2));
      createParticles(29, 61, '#75e6ff', 22);
      setMessage(`🛡 Khiên đã đỡ đòn! Chỉ mất ${actual} HP.`);
      playSound('block');
    } else {
      retrigger(ui.hero, 'is-wounded', 600);
      createParticles(27, 55, '#ff596c', 17);
      flash('red');
      playSound('hurt');
    }
    state.heroHP = Math.max(0, state.heroHP - actual);
    damageNumber(actual, 27, 42, true);
  }
  updateHUD();
  if (state.dragonHP === 0) finishGame(true);
  else if (state.heroHP === 0) finishGame(false);
}

function heroAttack() {
  if (!state.active || state.busy || Date.now() < state.attackReadyAt) return;
  state.attackReadyAt = Date.now() + 650;
  state.busy = true;
  retrigger(ui.hero, 'is-attacking', 650);
  playSound('swing');
  setMessage('⚔ Anh hùng lao tới tấn công!');
  wait(() => {
    if (!state.active) return;
    createEffect('fx-slash', 58, 46, 450);
    const damage = random(10, 17);
    receiveDamage('dragon', damage);
    state.energy = Math.min(100, state.energy + 30);
    if (state.energy === 100) setMessage('⚡ Đã đủ năng lượng! Nhấn L để tung tuyệt chiêu.');
    updateHUD();
  }, 280);
  wait(() => { state.busy = false; }, 620);
}

function heroShield() {
  if (!state.active || Date.now() < state.shieldReadyAt) return;
  state.shieldReadyAt = Date.now() + 2450;
  state.guarding = true;
  retrigger(ui.hero, 'is-guarding', 1250);
  playSound('block');
  setMessage('🛡 Khiên bảo vệ trong 1,25 giây!');
  wait(() => { state.guarding = false; }, 1250);
}

function heroSpecial() {
  if (!state.active || state.busy || state.energy < 100) return;
  state.busy = true;
  state.energy = 0;
  updateHUD();
  setMessage('⚡ TUYỆT CHIÊU: BÃO KHIÊN NĂNG LƯỢNG!');
  retrigger(ui.hero, 'is-attacking', 680);
  playSound('special');
  flash('blue');
  createEffect('fx-beam', null, null, 850);
  wait(() => {
    if (!state.active) return;
    createParticles(70, 50, '#8aeaff', 48);
    receiveDamage('dragon', random(30, 40));
    setMessage('💥 Tuyệt chiêu gây sát thương cực mạnh!');
  }, 360);
  wait(() => { state.busy = false; }, 900);
}

function dragonAttack() {
  if (!state.active) return;
  const fire = Math.random() > 0.38;
  if (fire) {
    setMessage('🔥 Hỏa Long phun lửa! Hãy bấm K để đỡ!');
    retrigger(ui.dragon, 'is-breathing', 810);
    playSound('fire');
    wait(() => {
      if (!state.active) return;
      createParticles(31, 57, '#ff812f', 20);
      receiveDamage('hero', random(13, 20));
    }, 550);
  } else {
    setMessage('🐉 Hỏa Long tung móng vuốt!');
    retrigger(ui.dragon, 'is-clawing', 720);
    playSound('roar');
    wait(() => {
      if (!state.active) return;
      createEffect('fx-slash', 23, 48, 470);
      receiveDamage('hero', random(9, 15));
    }, 440);
  }
}

function finishGame(won) {
  if (!state.active) return;
  state.active = false;
  state.guarding = false;
  clearInterval(enemyLoop);
  enemyLoop = null;
  updateHUD();
  $('resultSymbol').textContent = won ? '🏆' : '💔';
  $('resultTitle').textContent = won ? 'CHIẾN THẮNG!' : 'THẤT BẠI!';
  $('resultText').textContent = won
    ? `Bạn đã đánh bại Hỏa Long và còn ${state.heroHP} HP. Thử chơi lại để thắng với nhiều máu hơn!`
    : 'Anh hùng đã gục ngã. Hãy sử dụng khiên đúng lúc và tích năng lượng để phản công!';
  setMessage(won ? '🏆 Bạn đã chiến thắng!' : '💔 Hỏa Long đã thắng!');
  playSound(won ? 'win' : 'lose');
  wait(() => ui.endOverlay.classList.remove('hidden'), 720);
}

// Web Audio API: tổng hợp âm thanh trực tiếp, không cần MP3.
function enableAudio() {
  if (!soundEnabled) return;
  try {
    const Ctx = window.AudioContext || window.webkitAudioContext;
    if (!Ctx) return;
    if (!audioContext) audioContext = new Ctx();
    if (audioContext.state === 'suspended') audioContext.resume();
  } catch (err) { console.warn('Không khởi tạo được âm thanh:', err); }
}

function tone(fromHz, toHz, duration, type = 'sawtooth', volume = 0.08, delay = 0) {
  if (!soundEnabled || !audioContext) return;
  const now = audioContext.currentTime + delay;
  const osc = audioContext.createOscillator();
  const gain = audioContext.createGain();
  osc.type = type;
  osc.frequency.setValueAtTime(Math.max(20, fromHz), now);
  osc.frequency.exponentialRampToValueAtTime(Math.max(20, toHz), now + duration);
  gain.gain.setValueAtTime(0.0001, now);
  gain.gain.exponentialRampToValueAtTime(Math.max(0.0001, volume), now + 0.014);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);
  osc.connect(gain).connect(audioContext.destination);
  osc.start(now);
  osc.stop(now + duration + 0.03);
}

function noise(duration = .25, volume = .08, filterHz = 1200) {
  if (!soundEnabled || !audioContext) return;
  const length = Math.ceil(audioContext.sampleRate * duration);
  const buffer = audioContext.createBuffer(1, length, audioContext.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < length; i++) data[i] = Math.random() * 2 - 1;
  const source = audioContext.createBufferSource();
  const filter = audioContext.createBiquadFilter();
  const gain = audioContext.createGain();
  source.buffer = buffer;
  filter.type = 'lowpass'; filter.frequency.value = filterHz;
  const now = audioContext.currentTime;
  gain.gain.setValueAtTime(volume, now);
  gain.gain.exponentialRampToValueAtTime(.0001, now + duration);
  source.connect(filter).connect(gain).connect(audioContext.destination);
  source.start(now); source.stop(now + duration);
}

function playSound(name) {
  if (!soundEnabled || !audioContext) return;
  switch (name) {
    case 'start': tone(350, 700, .28, 'triangle', .07); tone(520, 880, .3, 'triangle', .04, .12); break;
    case 'swing': noise(.18, .11, 1900); tone(680, 115, .19, 'sawtooth', .075); break;
    case 'hit': noise(.22, .14, 480); tone(155, 65, .24, 'square', .075); break;
    case 'block': tone(940, 470, .23, 'triangle', .08); tone(560, 1120, .23, 'sine', .04); break;
    case 'hurt': noise(.22, .14, 640); tone(310, 90, .34, 'sawtooth', .08); break;
    case 'roar': noise(.46, .11, 410); tone(110, 56, .46, 'sawtooth', .105); break;
    case 'fire': noise(.69, .14, 1400); tone(190, 58, .62, 'sawtooth', .06); break;
    case 'special':
      noise(.5, .11, 2700);
      tone(220, 780, .6, 'sawtooth', .09);
      tone(390, 1300, .5, 'sine', .06, .08);
      tone(600, 1600, .45, 'triangle', .065, .14);
      break;
    case 'win': [440, 554, 659, 880].forEach((hz, i) => tone(hz, hz, .28, 'triangle', .07, i * .12)); break;
    case 'lose': [340, 260, 200].forEach((hz, i) => tone(hz, hz * .85, .35, 'sawtooth', .055, i * .2)); break;
  }
}

$('startButton').addEventListener('click', startGame);
$('restartButton').addEventListener('click', startGame);
ui.attack.addEventListener('click', heroAttack);
ui.shield.addEventListener('click', heroShield);
ui.special.addEventListener('click', heroSpecial);
ui.sound.addEventListener('click', () => {
  soundEnabled = !soundEnabled;
  ui.sound.textContent = soundEnabled ? '🔊 Âm thanh: Bật' : '🔇 Âm thanh: Tắt';
  if (soundEnabled) { enableAudio(); playSound('block'); }
});
window.addEventListener('keydown', (event) => {
  if (event.repeat || event.altKey || event.ctrlKey || event.metaKey) return;
  switch (event.key.toLowerCase()) {
    case 'j': heroAttack(); break;
    case 'k': heroShield(); break;
    case 'l': heroSpecial(); break;
  }
});

resetState();
