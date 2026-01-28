import './styles.css';
import { format } from 'date-fns';

// Display current time (AM/PM)
(function displayTime() {
  const currentTime = document.querySelector('#currentTime');

  const updateTime = () => {
    currentTime.textContent = format(new Date(), 'p');
  }

  const scheduleNextTick = () => {
    const now = new Date();

    const delay = (60 - now.getSeconds()) * 1000 - now.getMilliseconds();

    setTimeout(() => {
      updateTime();
      scheduleNextTick()
    }, delay)
  }

  updateTime();
  scheduleNextTick();
})();
