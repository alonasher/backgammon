let numbers=[]
function rollDice() {
    numbers=[]
    const dice = [...document.querySelectorAll(".die-list")];
    dice.forEach(die => {
      toggleClasses(die);
      die.dataset.roll = getRandomNumber(1, 6);
      console.log(die.dataset.roll);
      numbers.push(die.dataset.roll)
    });
    
  }
  function RollOtherUsesrDice() {
    const dice = [...document.querySelectorAll(".die-list")];
    for (let index = 0; index < dice.length; index++) {
      // const element = array[index];
      toggleClasses(dice[index])
      dice[index].dataset.roll=numbers[index]
    }
  }
  function returnNumbers() {
      console.log(numbers);
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
  // console.log( document.getElementById("roll-button"))
  // document.getElementById("roll-button").addEventListener("click", rollDice());
  // document.getElementById("roll-button").addEventListener("click",returnNumbers);
  

