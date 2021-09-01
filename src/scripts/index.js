import '../styles/index.less';

/*Содержание:
1.Анимация персонажа
  1.1 Получение элементов DOM для работы функции
  1.2 Функция для анимации персонажа на карте
2.Галерея в футере
  2.1 Получение элементов DOM для работы с галереей
  2.2 Функция показа следующего слайда
  2.3 Функция показа предыдущего слайда
3.Таблица с рейтингом игроков
  3.1 Экспорт объекта из файла data.js
  3.2 Получение элементов DOM для показа/закрытия модального окна
  3.3 Функция для заполнения таблицы данными из файла data.js и нахождения среди них друзей
4.Слушатели событий
  4.1 Кнопки вызова/кнопка закрытия модального окна с рейтингом
  4.2 Кнопки управления галереей в футере
  4.3 Кнопка для запуска анимации
*/

/*1.Анимация персонажа-->*/
//1.1 Получение элементов DOM для работы функции
let intervalId = null,
    gameBtn = document.querySelector('.gametrigger'),
    playableChar = document.querySelector('.player');
//

//1.2 Функция для анимации персонажа на карте
function movePlayer() {
  clearInterval(intervalId);
  playableChar.setAttribute('style', 'animation-play-state: running;');
  gameBtn.disabled = true;
  
  intervalId = setInterval(checkInterval, 4000);
  function checkInterval() {
    playableChar.setAttribute('style', 'animation-play-state: paused;');
    gameBtn.disabled = false;
  }
}
//
/*<--*/


/*2.Галерея в футере-->*/
//2.1 Получение элементов DOM для работы с галереей
let slides = document.querySelectorAll('.item'),
    slideCount = slides.length,
    nextBtn = document.querySelector('.gallery__control.next'),
    prevBtn = document.querySelector('.gallery__control.prev'),
    count = 0;
//

//2.2 Функция показа следующего слайда
function showNextUser(index) {

  slides[count].setAttribute('style', 'order: ' + (slideCount + count) + ';');

  if(count < slideCount - 1) {
    count++;
    } else {
      count = 0;
      for(let itr = 0; itr < slides.length; itr++) {
        slides[itr].setAttribute('style', 'order: ' + itr + ';');
      }
    }

  slides[count].setAttribute('style', 'order: -' + index + ';');
}
//

//2.3 Функция показа предыдущего слайда
function showPrevUser(index) {

  slides[count].removeAttribute('style');

  if(count > 0) {
    count--;
    } else {
      count = slideCount - 1;
      for(let cnt = 0; cnt < slides.length; cnt++) {
        slides[cnt].setAttribute('style', 'order: ' + (cnt + slideCount) + ';');
      }
    }

  slides[count].setAttribute('style', 'order: -' + index + ';');
}
//
/*<--*/

/*3.Таблица с рейтингом игроков-->*/
//3.1 Экспорт объекта из файла data.js
const data = require('./data.js');
//

//3.2 Получение элементов DOM для показа/закрытия модального окна
let ratingBtn = document.querySelector('.scorecard'),
    modalScore = document.querySelector('.scoretable'),
    modalCloseBtn = document.querySelector('.btn--close'),
    tbodyNode = document.getElementsByTagName('TBODY')[0];
//

//3.3 Функция для заполнения таблицы данными из файла data.js и нахождения среди них друзей
function populateTable(obj) {
  for (let key in obj) {
    for(let itr = 0; itr < obj[key].rating.length; itr++) {

      let trNode = document.createElement('TR'),
          imageSrc = obj[key].rating[itr].img,
          userId = obj[key].rating[itr].id;
      
      for(let ind in obj[key].rating[itr]) {

        let tdNode = document.createElement('TD');
        if(obj[key].rating[itr][ind] == imageSrc) {
          let imgNode = document.createElement('IMG');
          imageSrc = './images/assets/' + imageSrc.substring(2);
          imgNode.setAttribute('src', imageSrc);
          tdNode.appendChild(imgNode);
          tdNode.classList.add('userimage');
        } else {
          tdNode.appendChild(document.createTextNode(obj[key].rating[itr][ind]));
        }
        for(let cnt = 0; cnt < obj[key].friends.length; cnt++) {
          if (userId === obj[key].friends[cnt].id) {
            trNode.classList.add('friend');
          }
        }
        if(tdNode.classList.contains('userimage')) {
          trNode.insertBefore(tdNode, trNode.children[1]);
        } else {
          trNode.appendChild(tdNode);
        }
      }
      tbodyNode.appendChild(trNode);
    }
  }
}

populateTable(data);
//
/*<--*/

/*4.Слушатели событий-->*/
//4.1 Кнопки вызова/кнопка закрытия модального окна с рейтингом
//4.2 Кнопки управления галереей в футере
//4.3 Кнопка для запуска анимации
window.document.addEventListener('click', function(e){
  if(e.target == ratingBtn) {
    if (!modalScore.classList.contains('active')) {
      modalScore.classList.toggle('active');
    }
  } else if (e.target == modalCloseBtn) {
    if (modalScore.classList.contains('active')) {
      modalScore.classList.toggle('active');
    }
  } else if (e.target == nextBtn) {
    showNextUser(1);
  } else if (e.target == prevBtn) {
    showPrevUser(1);
  } else if (e.target == gameBtn) {
    movePlayer();
  }
});
/*<--*/