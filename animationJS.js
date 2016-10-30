// Рисует функция draw
// Продолжительность анимации duration
// Можно вызывать несколько функций animate(), и они вызовятся параллельно
function animate(draw, duration) {
    var start = performance.now();

    requestAnimationFrame(function animate(time) {
        // определить, сколько прошло времени с начала анимации
        var timePassed = time - start;

        // возможно небольшое превышение времени, в этом случае зафиксировать конец
        if (timePassed > duration) timePassed = duration;

        // нарисовать состояние анимации в момент timePassed
        draw(timePassed);

        // если время анимации не закончилось - запланировать ещё кадр
        if (timePassed < duration) {
            requestAnimationFrame(animate);
        }

    });
}

animate(function(timePassed) {
    train.style.left = timePassed / 5 + 'px';
}, 2000);






// загрузка прогресс бара
animate({
    duration: 1000,
    timing: function(timeFraction) {
        //Она получает на вход непрерывно возрастающее число timeFraction – от 0 до 1,
        // где 0 означает самое начало анимации, а 1 – её конец.
        return timeFraction; //linear
        return Math.pow(timeFraction, 2); //quad
        return 1 - Math.sin(Math.acos(timeFraction)); //circle
        return Math.pow(timeFraction, 2) * ((x + 1) * timeFraction - x); //back, new x prop
        // bounce
        for (var a = 0, b = 1, result; 1; a += b, b /= 2) {
            if (timeFraction >= (7 - 4 * a) / 11) {
                return -Math.pow((11 - 6 * a - 11 * timeFraction) / 4, 2) + Math.pow(b, 2)
            }
        }
        return Math.pow(2, 10 * (timeFraction - 1)) * Math.cos(20 * Math.PI * x / 3 * timeFraction); //elastic
        //easeOut
        function makeEaseOut(timing) {
            return function(timeFraction) {
                return 1 - timing(1 - timeFraction);
            }
        }
        var EaseOut = makeEaseOut(bounce);
        //easeInOut
        function makeEaseInOut(timing) {
            return function(timeFraction) {
                if (timeFraction < .5)
                    return timing(2 * timeFraction) / 2;
                else
                    return (2 - timing(2 * (1 - timeFraction))) / 2;
            }
        }
        bounceEaseInOut = makeEaseInOut(bounce);

    },
    draw: function(progress) {
        elem.style.width = progress * 100 + '%';
    }
});

function animate(options) {

    var start = performance.now();

    requestAnimationFrame(function animate(time) {
        // timeFraction от 0 до 1
        var timeFraction = (time - start) / options.duration;
        if (timeFraction > 1) timeFraction = 1;

        // текущее состояние анимации
        var progress = options.timing(timeFraction)

        options.draw(progress);

        if (timeFraction < 1) {
            requestAnimationFrame(animate);
        }

    });
}

//step // typing text
function animateText(textArea) {
    var text = textArea.value;
    var to = text.length,
        from = 0;

    animate({
        duration: 5000,
        timing: bounce,
        draw: function(progress) {
            var result = (to - from) * progress + from;
            textArea.value = text.substr(0, Math.ceil(result))
        }
    });
}

function bounce(timeFraction) {
    for (var a = 0, b = 1, result; 1; a += b, b /= 2) {
        if (timeFraction >= (7 - 4 * a) / 11) {
            return -Math.pow((11 - 6 * a - 11 * timeFraction) / 4, 2) + Math.pow(b, 2)
        }
    }
}