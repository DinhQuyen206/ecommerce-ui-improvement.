$(function () {
    var container = $('#container');
    var bird = $('#bird');
    var pole = $('.pole');
    var topPole = $('#pole_1');
    var bottomPole = $('#pole_2');
    var score = $('#score');
    var levelLabel = $('#level');
    var bestLabel = $('#best_score');
    var playHint = $('#play_btn');
    var restartButton = $('#restart_btn');

    var levelIntervals = [40, 30, 25, 20];
    var storageKey = 'ueh-flying-cat-best-score';
    var initialPoleRight = parseFloat(topPole.css('right'));
    var initialPoleHeight = parseFloat(topPole.css('height'));
    var poleRight = initialPoleRight;
    var birdTop = bird.position().top;
    var birdHeight = bird.height();
    var speed = 6;

    var points = parseInt(score.text(), 10) || 0;
    var level = getLevel(points);
    var best = readBest();
    var verticalSpeed = 0;
    var holdingDown = false;
    var scoreUpdated = false;
    var gameOver = false;
    var timer = null;

    levelLabel.text(level);
    bestLabel.text(best);

    function getLevel(value) {
        if (value >= 40) return 4;
        if (value >= 20) return 3;
        if (value >= 5) return 2;
        return 1;
    }

    function readBest() {
        try {
            return parseInt(localStorage.getItem(storageKey), 10) || 0;
        } catch {
            return 0;
        }
    }

    function updateBest() {
        if (points <= best) return;

        best = points;
        bestLabel.text(best);

        try {
            localStorage.setItem(storageKey, String(best));
        } catch {
            // Kỷ lục vẫn được hiển thị trong lượt chơi hiện tại.
        }
    }

    function startLoop() {
        var interval = levelIntervals[level - 1];

        clearInterval(timer);
        container[0].style.setProperty('--game-tick', interval + 'ms');
        timer = setInterval(updateGame, interval);
    }

    function updateGame() {
        var frame = container[0].getBoundingClientRect();
        var birdBox = bird[0].getBoundingClientRect();
        var topBox = topPole[0].getBoundingClientRect();
        var bottomBox = bottomPole[0].getBoundingClientRect();

        if (
            birdTop <= 0 ||
            birdTop + birdHeight >= container.height() ||
            collision(birdBox, topBox) ||
            collision(birdBox, bottomBox)
        ) {
            stopGame(false);
            return;
        }

        if (!scoreUpdated && topBox.right <= birdBox.left) {
            scoreUpdated = true;
            points += 1;
            score.text(points);
            updateBest();

            if (points >= 50) {
                stopGame(true);
                return;
            }

            var nextLevel = getLevel(points);

            if (nextLevel !== level) {
                level = nextLevel;
                levelLabel.text(level);
                startLoop();
            }
        }

        if (topBox.right <= frame.left) {
            resetPoles();
        } else {
            poleRight += speed;
            pole.css('right', poleRight);
        }

        moveBird();
    }

    function moveBird() {
        // Vận tốc tiến dần về mức bay lên hoặc rơi xuống.
        var step = levelIntervals[level - 1] / 40;
        var targetSpeed = holdingDown ? -5 : 3.5;

        verticalSpeed += (targetSpeed - verticalSpeed) * 0.35 * step;
        birdTop += verticalSpeed * step;

        bird.css({
            top: birdTop,
            transform: 'rotate(' + (verticalSpeed * 3) + 'deg)'
        });
    }

    function resetPoles() {
        var heightOffset = Math.floor(Math.random() * 91) - 45;

        poleRight = initialPoleRight;
        scoreUpdated = false;

        pole.addClass('instant').css('right', poleRight);
        topPole.css('height', initialPoleHeight + heightOffset);
        bottomPole.css('height', initialPoleHeight - heightOffset);

        // Áp dụng vị trí mới trước khi bật lại hiệu ứng trượt.
        void topPole[0].offsetWidth;
        pole.removeClass('instant');
    }

    function collision(first, second) {
        return first.right > second.left &&
            first.left < second.right &&
            first.bottom > second.top &&
            first.top < second.bottom;
    }

    function stopGame(won) {
        clearInterval(timer);
        timer = null;
        holdingDown = false;
        gameOver = true;

        restartButton
            .text(won ? 'Chiến thắng! 50 điểm · Chơi lại' : 'Chơi lại')
            .slideDown();
    }

    function isArrowDown(event) {
        return event.key === 'ArrowDown' || event.which === 40;
    }

    $(document).on('keydown', function (event) {
        if (!isArrowDown(event) || gameOver) return;

        event.preventDefault();
        holdingDown = true;

        if (timer === null) {
            playHint.hide();
            startLoop();
        }
    });

    $(document).on('keyup', function (event) {
        if (isArrowDown(event)) holdingDown = false;
    });

    $(window).on('blur', function () {
        holdingDown = false;
    });

    restartButton.on('click', function () {
        location.reload();
    });
});