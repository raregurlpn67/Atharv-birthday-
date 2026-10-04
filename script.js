const birthdayAudio = document.getElementById('birthdayAudio');

function playMusic() {
  if (birthdayAudio) {
    birthdayAudio.play().catch(error => {
      console.log("Audio play failed:", error);
    });
  }
}
function triggerConfetti() {
  const container = document.getElementById('fx-container');
  const colors = ['#ef4444', '#f472b6', '#fbbf24', '#34d399', '#60a5fa'];
  for (let i = 0; i < 70; i++) {
    const confetti = document.createElement('div');
    confetti.classList.add('confetti');
    confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    confetti.style.left = Math.random() * 100 + 'vw';
    confetti.style.top = Math.random() * 20 + 'px';
    if (Math.random() > 0.5) confetti.style.borderRadius = '50%';
    container.appendChild(confetti);
    
    setTimeout(() => {
      confetti.style.transform = `translateY(95vh) rotate(${Math.random() * 360}deg)`;
      confetti.style.opacity = '0';
    }, 50);
    
    setTimeout(() => confetti.remove(), 2600);
  }
}

/* 1. Envelope Open */
document.getElementById('envelopeBtn').addEventListener('click', function() {
  triggerConfetti();
  playMusic();
  setTimeout(() => {
    document.getElementById('screen1').classList.remove('active');
    document.getElementById('screen2').classList.add('active');
  }, 400);
});

/* 2. Next to Photo Collage */
document.getElementById('nextToCollage').addEventListener('click', function() {
  document.getElementById('screen2').classList.remove('active');
  document.getElementById('screenCollage').classList.add('active');
});

/* 2.5 Next to Proposal Question */
document.getElementById('nextToQuestion').addEventListener('click', function() {
  document.getElementById('screenCollage').classList.remove('active');
  document.getElementById('screen3').classList.add('active');
});

/* 3. YES BUTTON DODGE LOGIC (Runs away 5 times) */
let yesMoveCount = 0;
const yesBtn = document.getElementById('yesBtn');

function dodgeYesButton() {
  if (yesMoveCount < 5) {
    yesMoveCount++;
    const randomX = (Math.random() - 0.5) * 160; 
    const randomY = (Math.random() - 0.5) * 120; 
    yesBtn.style.transition = 'transform 0.2s ease';
    yesBtn.style.transform = `translate(${randomX}px, ${randomY}px)`;
  }
}

yesBtn.addEventListener('mouseenter', dodgeYesButton);
yesBtn.addEventListener('touchstart', function(e) {
  if (yesMoveCount < 5) {
    e.preventDefault();
    dodgeYesButton();
  }
});

/* Clicking YES (after running away 5 times) */
yesBtn.addEventListener('click', function() {
  if (yesMoveCount >= 5) {
    triggerConfetti();
    document.getElementById('screen3').classList.remove('active');
    document.getElementById('screen4').classList.add('active');
  } else {
    dodgeYesButton();
  }
});

/* NO BUTTON ACTION (Instantly shows "How Dare You" angry duck) */
document.getElementById('noBtn').addEventListener('click', function() {
  document.getElementById('screen3').classList.remove('active');
  document.getElementById('screenNo').classList.add('active');
});

/* "Try Again" Button Reset */
document.getElementById('tryAgainBtn').addEventListener('click', function() {
  yesMoveCount = 0;
  yesBtn.style.transform = 'translate(0px, 0px)';
  document.getElementById('screenNo').classList.remove('active');
  document.getElementById('screen3').classList.add('active');
});

/* 5. Blow Flame / Show Final Letter */
document.getElementById('flame').addEventListener('click', function() {
  document.getElementById('flame').style.display = 'none';
  triggerConfetti();
  setTimeout(() => {
    document.getElementById('screen4').classList.remove('active');
    document.getElementById('screen5').classList.add('active');
  }, 600);
});
