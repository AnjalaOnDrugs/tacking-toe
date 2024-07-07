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
  let cells = document.querySelectorAll("td");
  cells.forEach((cell, index) => {
    cell.addEventListener("click", (e) => {
      if (cell.classList.length === 0) {
        if (turnCount & 1) {
          cells[index].classList.add("circle");
          placeIndex(0, index);
        } else {
          cells[index].classList.add("cross");
          placeIndex(1, index);
        }
      }
      turnCount++;
    });
  });
  function placeIndex(index, value) {
    console.log(value);
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
      message.innerHTML = "X is the winner!";
      popup.showModal();
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
      message.innerHTML = "0 is the winner!";
      popup.showModal();
    } else if (
      horiz1.length == 3 &&
      horiz2.length == 3 &&
      horiz3.length == 3 &&
      vert1.length == 3 &&
      vert2.length == 3 &&
      vert3.length == 3
    ) {
      message.innerHTML = "Draw!";
      popup.showModal();
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


  }

  closeButton.addEventListener("click", () => {
    popup.close();
  });

  newGameButton.addEventListener("click", () => {
    popup.close();
    newGame();
  });
};
