Для запуску плагіна потрібно загрузити спрайт з глічами, підключити скрипт та викликати його для body з параметрами.
## Приклад виклику плагіна
$('body').decoded({
	sprite: '/wp-content/themes/decoded/assets/glitch.jpg',
	orientation: 'horizontal'
});

## showTime
Максимальний час показу глітча, вказується в мілісекундах

## sprite
Шлях до спрайту

## spriteSize
Об'єкт який вказує на розміри спрайту. За замовчуванням {width: 700, height: 700}

## glitchMaxSize
Максимальна висота гліча

## orientation
Положення гліча - три можливих параметра 'both', 'vertical', 'horizontal'. За замовчуванням 'both'.

