const startBtn = document.querySelector(".start");
const franjaMensaje = document.querySelector(".franja-btn");

/* Etiquetas del player */
const player = document.querySelector(".jugador.tu .bola");
const atkBtn = document.querySelector(".atk-btn");
const defBtn = document.querySelector(".def-btn");
const switchBtn = document.querySelector(".switch-btn");
const atkTu = document.querySelector(".atk.tu");
const defTu = document.querySelector(".def.tu");
const playerShield1 = document.querySelector(".escudo-barra.tu .imagen.uno");
const playerShield2 = document.querySelector(".escudo-barra.tu .imagen.dos");
const playerShield3 = document.querySelector(".escudo-barra.tu .imagen.tres");
const playerLife1 = document.querySelector(".corazon-barra.tu .imagen.uno");
const playerLife2 = document.querySelector(".corazon-barra.tu .imagen.dos");
const playerLife3 = document.querySelector(".corazon-barra.tu .imagen.tres");

/* Etiquetas del oponente */
const enemy = document.querySelector(".jugador.enemigo .bola");
const nameEnemy = document.querySelector(".nombre-enemigo");
const atkEnemy = document.querySelector(".atk.enemigo");
const defEnemy = document.querySelector(".def.enemigo");
const enemyShield1 = document.querySelector(".escudo-barra.enemigo .imagen.uno");
const enemyShield2 = document.querySelector(".escudo-barra.enemigo .imagen.dos");
const enemyShield3 = document.querySelector(".escudo-barra.enemigo .imagen.tres");
const enemyLife1 = document.querySelector(".corazon-barra.enemigo .imagen.uno");
const enemyLife2 = document.querySelector(".corazon-barra.enemigo .imagen.dos");
const enemyLife3 = document.querySelector(".corazon-barra.enemigo .imagen.tres");


const enemies = [
    {
        name: "Agatsu",
        level: 35,
        specialDef: 0,
        specialAtk: 0
    },
    {
        name: "Fujito",
        level: 36,
        specialDef: 2,
        specialAtk: 0
    },
    {
        name: "Bargum",
        level: 37,
        specialDef: 5,
        specialAtk: 0
    },
    {
        name: "Hipólito",
        level: 37,
        specialDef: 10,
        specialAtk: 0
    },
    {
        name: "Nando",
        level: 48,
        specialDef: 8,
        specialAtk: 0
    },
    {
        name: "Bulgakov",
        level: 50,
        specialDef: 16,
        specialAtk: 0
    },
    {
        name: "Gareka",
        level: 50,
        specialDef: 9,
        specialAtk: 0
    },
    {
        name: "Bástiam",
        level: 51,
        specialDef: 17,
        specialAtk: 3
    },
    {
        name: "Iroito",
        level: 52,
        specialDef: 8,
        specialAtk: 0
    },
    {
        name: "Openendo",
        level: 52,
        specialDef: 17,
        specialAtk: 5
    },
    {
        name: "Verde",
        level: 53,
        specialDef: 17,
        specialAtk: 0
    },
    {
        name: "Gordan",
        level: 54,
        specialDef: 17,
        rage: 4
    },
    {
        name: "Castaneda",
        level: 56,
        specialDef: 4
    },
    {
        name: "Gordon",
        level: 57
    },
    {
        name: "Manolete",
        level: 58,
        specialDef: 17,
        rage: 7
    },
    {
        name: "Dostoievski",
        level: 60,
        specialDef: 18,
        rage: 10
    },
    {
        name: "Broch",
        level: 61
    }
];
let enemiesCount = 0;
let gameStart = false;

/* Variables del player */
let level = 45;
let atkPower = {value: 0, state: false};
let defPower = {value: 0, state: false};
let yourSpecialDef = 5;
let yourSpecialAtk = 0;
let yourLifeCount = 3;
let yourShieldCount = 3;

/* Variables del enemigo */
let atkEPower = {value: 0, state: false};
let defEPower = {value: 0, state: false};
let eDecision = 0;
let enemyLifeCount = 3;
let enemyShieldCount = 3;

player.innerHTML = `Lv. ${level}`;
enemy.innerHTML = `Lv. ${enemies[enemiesCount].level}`;
nameEnemy.innerHTML = `${enemies[enemiesCount].name}`;

atkTu.innerHTML = `ATK: ${atkPower.value} + ${yourSpecialAtk}pts`;
defTu.innerHTML = `DEF: ${defPower.value} + ${yourSpecialDef}pts`;
atkEnemy.innerHTML = `ATK: ${atkEPower.value}`;
defEnemy.innerHTML = `DEF: ${defEPower.value} + ${enemies[enemiesCount].specialDef}pts`;

const startNow = () => {
    gameStart = true;
    startBtn.style.display = "none";
    franjaMensaje.innerHTML = `<p class="mensaje">It's your turn. You can attack or defend.</p>`
};

const GameOver = () => {
    alert("You lose! Better luck next time! Your actual level is " + level + ".");
    location.reload();
}

const updateEverything = () => {
    /* Actualizando mis stats y etiquetas */
    level += Math.round(enemies[enemiesCount].level / 40);
    yourLifeCount = 3;
    yourShieldCount = 3;
    yourSpecialDef = Math.round(level / 5);
    player.innerHTML = `Lv. ${level}`;
    atkTu.innerHTML = `ATK: ${atkPower.value}`;
    defTu.innerHTML = `DEF: ${defPower.value} + ${yourSpecialDef}pts`;

    /* Actualizando las stats del oponente/enemigo y sus etiquetas */
    enemiesCount++;
    enemyLifeCount = 3;
    enemyShieldCount = 3;
    enemy.innerHTML = `Lv. ${enemies[enemiesCount].level}`;
    nameEnemy.innerHTML = `${enemies[enemiesCount].name}`;
    atkEnemy.innerHTML = `ATK: ${atkEPower.value}`;
    defEnemy.innerHTML = `DEF: ${defEPower.value} + ${enemies[enemiesCount].specialDef}pts`;

    franjaMensaje.innerHTML = `<p class="mensaje">The next opponent is ${enemies[enemiesCount].name}.</p>`;
    setTimeout(() => {
        franjaMensaje.innerHTML = `<p class="mensaje">Let's do it again!</p>`
        showBtn();
    }, 2000);
    return;
}

const combatNow = () => {
    if (atkPower.state == true && atkEPower.state == true) { /* You ATK / opponent ATK */
        if (atkPower.value + yourSpecialAtk > atkEPower.value) {
            franjaMensaje.innerHTML = `<p class="mensaje">Your opponent lose Life!</p>`;
            enemyLoseLife(enemyLifeCount);
            enemyLifeCount--;
        } else if (atkPower.value + yourSpecialAtk < atkEPower.value) {
            franjaMensaje.innerHTML = `<p class="mensaje">You lose Life!</p>`;
            playerLoseLife(yourLifeCount);
            yourLifeCount--;
        } else if (atkPower.value + yourSpecialAtk == atkEPower.value) {
            franjaMensaje.innerHTML = `<p class="mensaje">It's a tie.</p>`;
        }
    
        atkPower.state = false;
        atkEPower.state = false;
        atkPower.value = 0; 
        atkEPower.value = 0;
        yourSpecialAtk = 0;

    } else if (atkPower.state == true && defEPower.state == true) { /* You ATK / opponent DEF */
        if (atkPower.value + yourSpecialAtk > defEPower.value + enemies[enemiesCount].specialDef) {
            franjaMensaje.innerHTML = `<p class="mensaje">Your opponent lose Shield.</p>`;
            enemyLoseShield(enemyShieldCount);
            enemyShieldCount--;
        } else if (atkPower.value + yourSpecialAtk < defEPower.value + enemies[enemiesCount].specialDef) {
            franjaMensaje.innerHTML = `<p class="mensaje">Your opponent win special DEF.</p>`;
            enemies[enemiesCount].specialDef += 2;
            defEnemy.innerHTML = `DEF: ${defEPower.value} + ${enemies[enemiesCount].specialDef}pts`;
        } else if (atkPower.value + yourSpecialAtk == defEPower.value + enemies[enemiesCount].specialDef) {
            franjaMensaje.innerHTML = `<p class="mensaje">It's a tie! Your opponent lose special DEF.</p>`;
            enemies[enemiesCount].specialDef == 0? 
                enemies[enemiesCount].specialDef = 0:
                enemies[enemiesCount].specialDef -= 1;
        }

        atkPower.state = false;
        defEPower.state = false;
        atkPower.value = 0;
        defEPower.value = 0;
        yourSpecialAtk = 0;

    } else if (defPower.state == true && atkEPower.state == true) { /* You DEF / opponent ATK */
        if (defPower.value + yourSpecialDef > atkEPower.value) {
            franjaMensaje.innerHTML = `<p class="mensaje">You win special DEF.</p>`;
            yourSpecialDef += 2;
            defTu.innerHTML = `DEF: ${defPower.value} + ${yourSpecialDef}pts`;
        } else if (defPower.value + yourSpecialDef < atkEPower.value) {
            franjaMensaje.innerHTML = `<p class="mensaje">You lose Shield!</p>`;
            playerLoseShield(yourShieldCount);
            yourShieldCount--;
        } else if (defPower.value + yourSpecialDef == atkEPower.value) {
            franjaMensaje.innerHTML = `<p class="mensaje">It's a tie! You lose special DEF.</p>`;
            yourSpecialDef == 0? yourSpecialDef = 0: yourSpecialDef--;
        } 
        
        defPower.state = false;
        atkEPower.state = false;
        defPower.value = 0;
        atkEPower.value = 0;

    } else if (defPower.state == true && defEPower.state == true) { /* You DEF / opponent DEF */
        franjaMensaje,innerHTML = `<p class='mensaje'>You and your opponent lose special DEF.</p>`; 
        yourSpecialDef == 0? yourSpecialDef = 0: yourSpecialDef--;
        enemies[enemiesCount].specialDef == 0? enemies[enemiesCount].specialDef = 0: enemies[enemiesCount].specialDef--;   

        defPower.state = false;
        defEPower.state = false;
        defPower.value = 0;
        defEPower.value = 0;
    }

    if (enemyLifeCount === 0) {
        franjaMensaje.innerHTML = `<p class="mensaje">Your opponent have no more life. You win!</p>`;
        hideBtn();
        setTimeout(() => {
            showShields();
            showLifes();
            updateEverything();
        }, 2200);
    } else if (yourLifeCount === 0) {
        franjaMensaje.innerHTML = `<p class="mensaje">You have no more Lifes!</p>`
        setTimeout(() => {
            GameOver();
        }, 1800);
    } else {
        setTimeout(() => {
            atkTu.innerHTML = `ATK: ${atkPower.value} + ${yourSpecialAtk}pts`;
            defTu.innerHTML = `DEF: ${defPower.value} + ${yourSpecialDef}pts`;
            atkEnemy.innerHTML = `ATK: ${atkEPower.value}`;
            defEnemy.innerHTML = `DEF: ${defEPower.value} + ${enemies[enemiesCount].specialDef}pts`;
            franjaMensaje.innerHTML = `<p class="mensaje">It's your turn.</p>`;
            showBtn();
        }, 1800);
    }
};

const opponentTurn = () => {
    eDecision = Math.round(Math.random() * 1);

    if (eDecision === 1 || enemyShieldCount <= 0) {
        opponentAtk();
        atkEPower.state = true;
        franjaMensaje.innerHTML = `<p class="mensaje">Your opponent attack with ${atkEPower.value}pts.</p>`;
        atkEnemy.innerHTML = `ATK: ${atkEPower.value}`;
    } else if (eDecision === 0 && enemyShieldCount > 0) {
        opponentDef();
        defEPower.state = true;
        franjaMensaje.innerHTML = `<p class="mensaje">Your opponent defend with ${defEPower.value}pts.</p>`;
        defEnemy.innerHTML = `DEF: ${defEPower.value} + ${enemies[enemiesCount].specialDef}pts`;
    }
    setTimeout(() => {
        combatNow();
    }, 2000);
};

/* Funciones del enemigo. */
const opponentAtk = () => {
    atkEPower.value = Math.round(Math.random() * enemies[enemiesCount].level);
    return;
};

const opponentDef = () => {
    defEPower.value = Math.round(Math.random() * enemies[enemiesCount].level);
    return;
};

const enemyLoseShield = (num) => {
    switch (num) {
        case 3:
            enemyShield1.style.display = 'none';
            break;
        case 2:
            enemyShield2.style.display = 'none';
            break;
        case 1:
            enemyShield3.style.display = 'none';
            break;
    }
    return;
};

const enemyLoseLife = (num) => {
    switch (num) {
        case 3:
            enemyLife1.style.display = 'none';
            break;
        case 2:
            enemyLife2.style.display = 'none';
            break;
        case 1:
            enemyLife3.style.display = 'none';
            break;
    }
    return;
};


/* Funciones del player. */
const atkNow = () => {
    if (gameStart) {
        atkPower.value = Math.floor(Math.random() * level);
        yourTurn();
    }
};

const defNow = () => {
    if (gameStart == true && yourShieldCount <= 0) {
        franjaMensaje.innerHTML = `<p class="mensaje">You don't have Shield. You can't defend.</p>`
    } else if (gameStart) {
        defPower.value = Math.floor(Math.random() * level);
        yourTurn();
    }
    return;
};

const switchDefAtk = () => {
    yourSpecialAtk = yourSpecialDef;
    yourSpecialDef = 0;
    switchBtn.style.display = "none";
    franjaMensaje.innerHTML = `<p class="mensaje">You switch your SDEF x SATK.</p>`;
    atkTu.innerHTML = `ATK: ${atkPower.value} + ${yourSpecialAtk}pts`;    
    defTu.innerHTML = `DEF: ${defPower.value} + ${yourSpecialDef}pts`;
};

const playerLoseLife = (num) => {
    switch (num) {
        case 3:
            playerLife1.style.display = 'none';
            break;
        case 2:
            playerLife2.style.display = 'none';
            break;
        case 1:
            playerLife3.style.display = 'none';
            break;
    }
    return;
};

const playerLoseShield = (num) => {
    switch (num) {
        case 3:
            playerShield1.style.display = 'none';
            break;
        case 2:
            playerShield2.style.display = 'none';
            break;
        case 1:
            playerShield3.style.display = 'none';
            break;
    }
    return;
};

const hideBtn = () => {
    defBtn.style.display = "none";
    atkBtn.style.display = "none";
    switchBtn.style.display = "none";
};

const showBtn = () => {
    defBtn.style.display = "inline";
    atkBtn.style.display = "inline";
    if (yourSpecialDef >= 10) {
        switchBtn.style.display = "inline";
    }
};


/* Funciones comunes a ambos (player y enemigo). */
const showShields = () => {
    playerShield1.style.display = 'inline';
    playerShield2.style.display = 'inline';
    playerShield3.style.display = 'inline';
    enemyShield1.style.display = 'inline';
    enemyShield2.style.display = 'inline';
    enemyShield3.style.display = 'inline';
};

const showLifes = () => {
    playerLife1.style.display = 'inline';
    playerLife2.style.display = 'inline';
    playerLife3.style.display = 'inline';
    enemyLife1.style.display = 'inline';
    enemyLife2.style.display = 'inline';
    enemyLife3.style.display = 'inline';
};


const yourTurn = () => {
    if(gameStart === false) {
        return;
    }
    if (atkPower.value) {
        atkTu.innerHTML = `ATK: ${atkPower.value} + ${yourSpecialAtk}pts`;
        franjaMensaje.innerHTML = `<p class="mensaje">You will attack with ${atkPower.value}pts!</p>`;
        atkPower.state = true;
    } else if (defPower.value) {
        defTu.innerHTML = `DEF: ${defPower.value} + ${yourSpecialDef}pts`;
        franjaMensaje.innerHTML = `<p class="mensaje">You will defend with ${defPower.value}pts!</p>`;
        defPower.state = true;
    }
    hideBtn();
    setTimeout(() => {
        opponentTurn();
    }, 2000);
};
