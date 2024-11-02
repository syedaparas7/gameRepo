let xp = 0;
let health = 100;
let gold = 50;
let currentWeapon = 0;
let fighting;
let monsterHealth;
let inventory = ["stick"];

const button1 = document.querySelector("#button1");
const button2 = document.querySelector("#button2");
const button3 = document.querySelector("#button3");
const text = document.querySelector("#text");
const xpText = document.querySelector("#xpText");
const healthText = document.querySelector("#healthText");
const goldText = document.querySelector("#goldText");
const monsterStats = document.querySelector("#monsterStats");
const monsterNameText = document.querySelector("#monsterName");
const monsterHealthText = document.querySelector("#monsterHealth");
const Weapons = [
  {
    name: "stick",
    power: 5,
  },
  {
    name: "dagger",
    power: 30,
  },
  {
    name: "claw hammer",
    power: 50,
  },
  {
    name: "sword",
    power: 100,
  },
];
const monsters = [
  {
    name: "slime",
    level: 2,
    health: 15,
  },
  {
    name: "fanged beast",
    level: 8,
    health: 60,
  },
  {
    name: "dragon",
    level: 20,
    health: 300,
  },
]
///resolv
const locations = [
  {
    name: "town square",
    "button text": ["Go to store", "Go to cave", "fight dragon"],
    "button functions": [goStore, goCave, fightDragon],
    text: 'you enter the town square . you a sign that says "store".',
  },
  {
    name: "store",
    "button text": ["Buy 10 health(10 gold)", "Buy Weapon (30 gold)","Go to town square"],
    "button functions": [buyHealth, buyWeapon, goTown],
    text: "you enter the store.",
  },
  {
    name: "cave",
    "button text": ["Fight slime", "Fight fanged beast", "Go to town square"],
    "button functions": [FightSlime, fightBeast, goTown],
    text: "You enter the cave . You see monster.",
  },
  {
    name: "fight",
    "button text": ["Attack", "Dodge", "Run"],
    "button functions": [attack, dodge, goTown],
    text: "You are fighting a monster.",
  },
  {
    name: "kill monster",
    "button text": ["Go to town square","Go to town square","Go to town square"],
    "button functions": [goTown, goTown, easterEgg],
    text: 'The monster screams "Arg!"as it dies.You experience point and find gold.',
  },
  {
    name: "lose",
    "button text": ["REPLAY?", "REPLAY?", "REPLAY?"],
    "button functions": [restart, restart, restart],
    text: "You die. ",
  },
  {
    name: "win",
    "button text": ["REPLAY?", "REPLAY?", "REPLAY?"],
    "button functions": [restart, restart, restart],
    text: "You defeat the dragon ! YOU WIN THR GAME .. . ",
  },
  {
    name: "easter egg",
    "button text": ["2", "8", "Go to town square"],
    "button functions": [pickTwo, pickEight, goTown],
    text: "You find secret game.Pick a number above.ten numbers will be randomly picked between 0 and 10 if the number you choose matches one of the random the number, you Win!.",
  },
];

//initialize buttons
button1.onclick = goStore;
button2.onclick = goCave;
button3.onclick = fightDragon;


function update(location) {
    
  monsterStats.style.display = "none";
  button1.innerText = location["button text"][0];
  button2.innerText = location["button text"][1];
  button3.innerText = location["button text"][2];
  button1.onclick = location["button functions"][0];
  button2.onclick = location["button functions"][1];
  button3.onclick = location["button functions"][2];
  text.innerText = location.text;
}

function goTown() {
  update(locations[0]);
}

function goStore() {
  update(locations[1]);
}

function goCave() {
  update(locations[2]);
}

function buyHealth() {
  if (gold >= 0) {
    gold -= 10;
    health += 10;
    goldText.innerText = gold;
    healthText.innerText = health;
  } else {
    text.innerText = "You don't have enough gold health.";
  }

}
  function buyWeapon() {
  
    if (currentWeapon < Weapons.length - 1) {
      if (gold >= 30) {
        gold -= 30;
        currentWeapon++;
        goldText.innerText = gold;
        let newWeapon = Weapons[currentWeapon].name;
        text.innerText = "You have a" + newWeapon + " . ";
        inventory.push(newWeapon);
        text.innerText += "In your inventory you have: " + inventory;
      } else {
        text.innerText = "You don't have enough gold to buy  weapon.";
      }
    } else {
      text.innerText = "You already  have the most  powerful weapon!.";
      button2.innerText = "sell weapon for 15 gold points";
      button2.onclick = sellWeapon;
    }
  }


function sellWeapon() {
  if (inventory.length > 1) {
    gold += 15;
    goldText.innerText = gold;
    let currentWeapon = inventory.shift();
    text.innerText = "You sold a weapon for : " + currentWeapon + ".";
    text.innerText += "in your inventory you have:)" + inventory;
  } else {
    text.innerText = "You don't have any weapon to sell.";
  }
}

function FightSlime() {
  fighting = 0;
  goFight();
}

function fightBeast() {
  fighting = 1;
  goFight();
}
function fightDragon() {
  fighting = 2;
  goFight();
}
function goFight() {
  update(locations[3]);
  monsterHealth = monsters[fighting].health;
  monsterStats.style.display = "block";
  monsterNameText.innerText = monsters[fighting].name;
  monsterHealthText.innerText = monsterHealth;
}
function attack() {
  text.innerText = "The" + monsters[fighting].name + "attack";
  text.innerText += "you attack with your" + Weapons[currentWeapon].name + " .";

  if (isMonsterHit()) {
    health -= getMonsterAttackValue(monsters[fighting].level);
  } else {
    text.innerText += "you missed.";
  }
  monsterHealth -=
    Weapons[currentWeapon].power + Math.floor(Math.random() * xp) + 1;
  healthText.innerText = health;
  monsterHealthText.innerText = monsterHealth;
  if (health <= 0) {
    lose();
  } else if (monsterHealth <= 0) {
    fighting === 2 ? winGame() : defeatMonster();
  }
  if (Math.random() <= 0.1 && inventory.length !== 1) {
    text.innerText += "Your." + inventory.pop() + "breaks";
    currentWeapon--;
  }
}
function getMonsterAttackValue(level) {
  let hit = (level * 5 )- (Math.floor(Math.random() * xp));
  console.log(hit);
  return hit;
}
function isMonsterHit() {
  return Math.random() > 0.2 || health < 20;
}
function dodge() {
  text.innerText =
    "you dodge the attack from the " + monsters[fighting].name + ".";
}
function defeatMonster() {
  gold += Math.floor(monsters[fighting].level * 6.7);
  xp += monsters[fighting].level;
  goldText.innerText = gold;
  xpText.innerText = xp;
  update(locations[4]);
}
function lose() {
  update(locations[5]);
}
function winGame() {
  update(locations[6]);
}
function restart(){
  xp = 0;
  health = 100;
  gold = 50;
  currentWeapon = 0;
  inventory = ["stick"];
  goldText.innerText = health; 
  xpText.innerText = xp ;
  goTown();


}
function goTown() {

}

function easterEgg () {
  update(locations[7]);
}
function pickTwo(){
    pick(2)
}
function pickEight(){
    pick(8) 
}
function pick(guess){
   let numbers = [];
   while(numbers.length < 10){
    numbers.push(Math.floor(Math.random() * 11))
   }
   text.innerText = "you picked" + guess + "Here are the random numbers:\n"
   for (let i = 0; i < 10; i++) {
    text.innerText += numbers[i] +"\n"
   }
   if (numbers.indexOf(guess)!== -1){
    text.innerText += "Right! TYou win 20 gold!"
    gold += 20;
    goldText.innerText = gold;
   }else{
    text.innerText += "wrong! TYou win 10 health"
    health -= 10;
    healthText.innerText = health;
    if (health <= 0) {
       lose() ;
    }
   }
}