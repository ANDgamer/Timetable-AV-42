// Виклик функції при прокручуванні сторінки
const days = document.querySelectorAll('.day');

function trackScroll(event) {
  var scrolledPixels = event.target.scrollTop;
  const currentDate = event.target.querySelector('.date');
  if (scrolledPixels >= 8) {
    if(!currentDate.classList.contains('scrolled')){
      currentDate.classList.add('scrolled');
    }
  }
  else {
    if (currentDate.classList.contains('scrolled')) {
      currentDate.classList.remove('scrolled');
    }
  }
  var topPosition = container.scrollTop;
}

days.forEach(element => {
  element.addEventListener('scroll', trackScroll);
});

// Отримати назву місяця
const monthNames = ["січня", "лютого", "березня", "квітня", "травня", "червня", "липня", "серпня", "вересня", "жовтня", "листопада", "грудня"];

const currentDateValue = new Date();
// const currentDateValue = new Date(2024, 4, 11);

// Заміна чисельника або знаменника
const body = document.body;
function getCurrentWeekNumber() {
  var baseDate = new Date(2024, 1, 10);
  var diffMilliseconds = currentDateValue - baseDate;
  //console.log(`${currentDate} - ${baseDate} = ${diffMilliseconds}`);
  var oneWeekMilliseconds = 7 * 24 * 60 * 60 * 1000;
  var weekNumber = Math.floor(diffMilliseconds / oneWeekMilliseconds) + 1;
  return weekNumber;
}

function isEven(weekNumber) {
  return weekNumber % 2 === 0;
}

if (isEven(getCurrentWeekNumber())) {
  body.classList.remove('num');
  body.classList.add('den');
} else {
  body.classList.remove('den');
  body.classList.add('num');
}

const dates = document.querySelectorAll('.date');
// Отримати номер дня тижня (неділя - 0, понеділок - 1, ..., субота - 6)
const dayOfWeek = currentDateValue.getDay();
// Отримати номер поточного дня в місяці
const dayOfMonth = currentDateValue.getDate();
// Розрахувати номер понеділка цього тижня
const monday = dayOfMonth - dayOfWeek + 1;

// Заповнити масив числами місяця
for (let i = 0; i < dates.length; i++) {
  const date = new Date(currentDateValue.getFullYear(), currentDateValue.getMonth(), monday + i);
  dates[i].innerHTML = date.getDate() + " " + monthNames[date.getMonth()];
}

//Встановлення поточного дня тижня
function getCurrentDayOfWeek() {
  if (dayOfWeek === 0) {
    return dayOfWeek;
  }
  else if (dayOfWeek === 6) {
    return 4;
  }
  else {
    return dayOfWeek - 1;
  }
}

// Swiper js
const arr = ["ПН", "ВТ", "СР", "ЧТ", "ПТ"]; 

var swiper = new Swiper(".mySwiper", {
  spaceBetween: 15,
  pagination: {
    el: ".swiper-pagination",
    bulletClass: "dayBtn",
    bulletActiveClass: "active",
    clickable: true,
    renderBullet: function (index, className) { 
      return '<div class="' + className + '">' + arr[index] + "</div>"; 
    }, 
  },
  initialSlide: getCurrentDayOfWeek(),
  breakpoints: {
    1440: {
      slidesPerView: 5,
      // pagination: {
      //   enabled: false,
      // }
    }
  }
});

// підсвічування поточного дня
dates[dayOfWeek - 1].classList.add('current')

function setCurrentdayOfWeek() {
  swiper.activeIndex = getCurrentDayOfWeek();
  setTimeout(function() {
    const content = document.getElementById('content');
    const dayBtns = document.querySelectorAll('.dayBtn');
    if (window.innerWidth < 1440) {
      dayBtns[dayOfWeek - 1].classList.add('current');
    }
  }, 10); // Затримка в мілісекундах
}
setCurrentdayOfWeek();

window.addEventListener('resize', setCurrentdayOfWeek);
//----------------------------------------------------------------------
// Вікно контакту з розробниками
function changeContactPageStatus(setStatus) {
  let contactPage = document.getElementById('contactPage');
  if (setStatus == 1) {
    contactPage.style.visibility='visible';
  }
  else if (setStatus == 0) {
    contactPage.style.visibility='hidden';
  }
}

function copy(copyValue) {
  navigator.clipboard.writeText(copyValue);

  // Alert the copied text
  // alert("Copied the text");
}