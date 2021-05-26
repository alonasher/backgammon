let numbers=[]
function rollDice() {
    numbers=[]
    const dice = [...document.querySelectorAll(".die-list")];
    dice.forEach(die => {
      toggleClasses(die);
      die.dataset.roll = getRandomNumber(1, 6);
      numbers.push(die.dataset.roll)
    });
    
  }
  function RollOtherUsesrDice() {
    const dice = [...document.querySelectorAll(".die-list")];
    for (let index = 0; index < dice.length; index++) {
      toggleClasses(dice[index])
      dice[index].dataset.roll=this.numbers[index]
    }
  }
  function returnNumbers() {
      return numbers
  }
  function toggleClasses(die) {
    die.classList.toggle("odd-roll");
    die.classList.toggle("even-roll");
  }
  
  function getRandomNumber(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  function GetNumbersFromClient(numbers) {
    this.numbers=numbers;
    RollOtherUsesrDice()
  }

