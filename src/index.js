import './styles.css';
import { format } from 'date-fns';

// Display current time (AM/PM)
(function displayTime() {
  const currentTime = document.querySelector('#currentTime');

  const updateTime = () => {
    currentTime.textContent = format(new Date(), 'p');
  }

  updateTime();

  setInterval(displayTime, 60000);
})();
