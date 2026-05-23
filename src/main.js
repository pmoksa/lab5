import './style.css'; 
import dayjs from 'dayjs'; 

const submitBtn = document.getElementById('submitBtn');
const birthDateInput = document.getElementById('birthDate');
const resultDialog = document.getElementById('resultDialog');
const closeBtn = document.getElementById('closeBtn');
const dialogContent = document.getElementById('dialogContent');

submitBtn.addEventListener('click', () => {
    const birthDateValue = birthDateInput.value;
    if (!birthDateValue) return;

    const today = dayjs();
    const birthDate = dayjs(birthDateValue);

    const daysLived = today.diff(birthDate, 'days'); 

    let nextBirthday = birthDate.year(today.year());
    if (nextBirthday.isBefore(today, 'day')) {
        nextBirthday = nextBirthday.add(1, 'year');
    }

    const isBirthdayToday = today.format('MM-DD') === birthDate.format('MM-DD');

    if (isBirthdayToday) {
        alert('wszystkiego najlepszego!'); // [cite: 42]
        dialogContent.innerHTML = `Od Twoich narodzin minęło: ${daysLived} dni.`; 
    } else {
        const weeksToBirthday = nextBirthday.diff(today, 'weeks'); 
        let additionalInfo = `Do Twoich najbliższych urodzin pozostało ${weeksToBirthday} tygodni.`; // [cite: 51]
        
        if (weeksToBirthday === 0) {
            additionalInfo = 'masz urodziny w tym tygodniu!'; // [cite: 52]
        }

        dialogContent.innerHTML = `Od Twoich narodzin minęło: ${daysLived} dni.<br><br>${additionalInfo}`;
    }

    resultDialog.showModal(); 
});

closeBtn.addEventListener('click', () => {
    resultDialog.close(); 
});