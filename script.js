const runawayBtn = document.getElementById('runaway-btn');
const container = document.querySelector('.container');

const secretHint = document.getElementById('secret-hint');
const hintModal = document.getElementById('hint-modal');
const secretLock = document.getElementById('secret-lock');
const pinModal = document.getElementById('pin-modal');
const digitModal = document.getElementById('digit-modal');
const successModal = document.getElementById('success-modal');

const closeButtons = document.querySelectorAll('.close-button');

function moveButton() {
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;
    const btnWidth = runawayBtn.offsetWidth;
    const btnHeight = runawayBtn.offsetHeight;

    const randomX = Math.floor(Math.random() * (screenWidth - btnWidth));
    const randomY = Math.floor(Math.random() * (screenHeight - btnHeight));

    runawayBtn.style.left = randomX + 'px';
    runawayBtn.style.top = randomY + 'px';
}

function activateRunawayMode() {
    const containerHeight = container.offsetHeight;
    container.style.height = containerHeight + 'px';

    const rect = runawayBtn.getBoundingClientRect();
    
    runawayBtn.style.top = rect.top + 'px';
    runawayBtn.style.left = rect.left + 'px';

    runawayBtn.classList.add('runaway');

    requestAnimationFrame(() => {
        moveButton();
    });

    runawayBtn.addEventListener('mouseover', moveButton);
}

runawayBtn.addEventListener('mouseover', activateRunawayMode, { once: true });


runawayBtn.addEventListener('click', () => {
    digitModal.classList.add('active');
});

secretHint.addEventListener('click', () => {
    hintModal.classList.add('active');
});

secretLock.addEventListener('click', () => {
    pinModal.classList.add('active');
});

function hideModals() {
    [hintModal, pinModal, digitModal, successModal].forEach(modal => {
        modal.classList.remove('active');
    });
}

closeButtons.forEach(button => {
    button.addEventListener('click', hideModals);
});

const pinInput = document.getElementById('pin-input');
const submitPinBtn = document.getElementById('submit-pin');
const CORRECT_PIN = '0937';

submitPinBtn.addEventListener('click', () => {
    if (pinInput.value === CORRECT_PIN) {
        hideModals();
        successModal.classList.add('active');
    } else {
        alert('ДОСТУП ЗАПРЕЩЕН. ПРОВЕРЬТЕ КЛЮЧ.');
        pinInput.value = '';
    }
});