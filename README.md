#X-O

Тестовое задание для собеседования.

### Игра крестики-нолики:

 1) При запуске пользователь ждёт пока подсоединится второй игрок (для этого нужно можно открыть вторую вкладку)
 2) Один из игроков задаёт параметры поля и нажимает кнопку "Touch" (параметрый должны быть цифрами > 5)
 3) Игрок создавший поле играет за красных
 4) Нажимает на любую ячейку получившегося поля и ход передаётся второму игроку
 5) Игра продолжается до того момента пока у одного из игроков не будет ряда из 5 кнопок его стороны

## Использовал для создания

* Node.js: https://nodejs.org/en/
* Socket.io: http://socket.io/
* NPM: https://www.npmjs.com/
* Bower: http://bower.io/
* Express: http://expressjs.com/



## Установка:

Для загрузки компонентов требуется наличие: Git, NPM, Bower.

```
git clone https://github.com/DespairAndPain/X-O.git
cd X-O
npm install
bower install
```

## Запуск:

```
node index.js
```