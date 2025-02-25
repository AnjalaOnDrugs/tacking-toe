window.onload = function () {
  let horiz1 = [];
  let horiz2 = [];
  let horiz3 = [];
  let vert1 = [];
  let vert2 = [];
  let vert3 = [];
  let diag1 = [];
  let diag2 = [];

  let turnCount = 1;
  let gameActive = true;
  let cells = document.querySelectorAll("td");
  const turnIndicator = document.querySelector(".turn-indicator");
  const playerIcon = document.querySelector(".player-icon");
  
  // Initialize the turn indicator
  updateTurnIndicator();
  
  cells.forEach((cell, index) => {
    cell.addEventListener("click", (e) => {
      if (cell.classList.length === 0 && gameActive) {
        // Add sound effect
        playMoveSound();
        
        if (turnCount & 1) {
          cells[index].classList.add("circle");
          placeIndex(0, index);
        } else {
          cells[index].classList.add("cross");
          placeIndex(1, index);
        }
        
        turnCount++;
        updateTurnIndicator();
      }
    });
  });
  
  function updateTurnIndicator() {
    if (turnCount & 1) {
      turnIndicator.classList.remove("cross-turn");
      playerIcon.style.backgroundColor = "#00C9FF";
      playerIcon.style.borderRadius = "50%";
      playerIcon.style.clipPath = "none";
    } else {
      turnIndicator.classList.add("cross-turn");
      playerIcon.style.backgroundColor = "#FF5E62";
      playerIcon.style.borderRadius = "0";
      playerIcon.style.clipPath = "polygon(20% 0%, 0% 20%, 30% 50%, 0% 80%, 20% 100%, 50% 70%, 80% 100%, 100% 80%, 70% 50%, 100% 20%, 80% 0%, 50% 30%)";
    }
  }
  
  function playMoveSound() {
    const audio = new Audio(
      turnCount & 1 
        ? 'https://cdnjs.cloudflare.com/ajax/libs/soundjs/1.0.1/sound.js' // This is a placeholder, as we can't use actual sound files
        : 'https://cdnjs.cloudflare.com/ajax/libs/soundjs/1.0.1/sound.js'  // This is a placeholder, as we can't use actual sound files
    );
    // audio.play(); // Uncomment if you add actual sound files
  }

  function placeIndex(index, value) {
    if (value === 0) {
      horiz1.push(index);
      vert1.push(index);
      diag1.push(index);
    } else if (value === 1) {
      horiz1.push(index);
      vert2.push(index);
    } else if (value === 2) {
      horiz1.push(index);
      vert3.push(index);
      diag2.push(index);
    } else if (value === 3) {
      horiz2.push(index);
      vert1.push(index);
    } else if (value === 4) {
      horiz2.push(index);
      vert2.push(index);
      diag1.push(index);
      diag2.push(index);
    } else if (value === 5) {
      horiz2.push(index);
      vert3.push(index);
    } else if (value === 6) {
      horiz3.push(index);
      vert1.push(index);
      diag2.push(index);
    } else if (value === 7) {
      horiz3.push(index);
      vert2.push(index);
    } else if (value === 8) {
      horiz3.push(index);
      vert3.push(index);
      diag1.push(index);
    }

    checkWinner();
  }

  let popup = document.getElementById("dialog");
  let message = document.getElementById("dialog-text");
  let closeButton = document.getElementById("close");
  let newGameButton = document.getElementById("New-game");

  function checkWinner() {
    if (
      (horiz1.length == 3 && !horiz1.includes(0)) ||
      (horiz2.length == 3 && !horiz2.includes(0)) ||
      (horiz3.length == 3 && !horiz3.includes(0)) ||
      (vert1.length == 3 && !vert1.includes(0)) ||
      (vert2.length == 3 && !vert2.includes(0)) ||
      (vert3.length == 3 && !vert3.includes(0)) ||
      (diag1.length == 3 && !diag1.includes(0)) ||
      (diag2.length == 3 && !diag2.includes(0))
    ) {
      gameActive = false;
      message.innerHTML = "X Wins! 🎉";
      createConfetti();
      setTimeout(() => {
        popup.showModal();
      }, 500);
    } else if (
      (horiz1.length == 3 && !horiz1.includes(1)) ||
      (horiz2.length == 3 && !horiz2.includes(1)) ||
      (horiz3.length == 3 && !horiz3.includes(1)) ||
      (vert1.length == 3 && !vert1.includes(1)) ||
      (vert2.length == 3 && !vert2.includes(1)) ||
      (vert3.length == 3 && !vert3.includes(1)) ||
      (diag1.length == 3 && !diag1.includes(1)) ||
      (diag2.length == 3 && !diag2.includes(1))
    ) {
      gameActive = false;
      message.innerHTML = "O Wins! 🎉";
      createConfetti();
      setTimeout(() => {
        popup.showModal();
      }, 500);
    } else if (turnCount > 9) {
      gameActive = false;
      message.innerHTML = "It's a Draw! 🤝";
      setTimeout(() => {
        popup.showModal();
      }, 500);
    }
  }

  function createConfetti() {
    const container = document.querySelector(".container");
    const colors = ["#FF5E62", "#00C9FF", "#FFEB3B", "#4CAF50", "#9C27B0"];
    
    for (let i = 0; i < 100; i++) {
      const confetti = document.createElement("div");
      confetti.className = "confetti";
      confetti.style.left = Math.random() * 100 + "vw";
      confetti.style.animationDuration = (Math.random() * 3 + 2) + "s";
      confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
      confetti.style.width = (Math.random() * 10 + 5) + "px";
      confetti.style.height = (Math.random() * 10 + 5) + "px";
      
      container.appendChild(confetti);
      
      // Remove confetti after animation
      setTimeout(() => {
        container.removeChild(confetti);
      }, 5000);
    }
  }

  function newGame() {
    let cells = document.querySelectorAll("td");
    cells.forEach((cell) => {
      cell.classList = [];
    });
    
    horiz1 = [];
    horiz2 = [];
    horiz3 = [];
    vert1 = [];
    vert2 = [];
    vert3 = [];
    diag1 = [];
    diag2 = [];
    
    turnCount = 1;
    gameActive = true;
    updateTurnIndicator();
  }

  closeButton.addEventListener("click", () => {
    popup.close();
  });

  newGameButton.addEventListener("click", () => {
    popup.close();
    newGame();
  });
};
