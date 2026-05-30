// js/game.js

import {
    player,
    updatePlayer,
    drawPlayer,
    flipGravity
} from './player.js';

import {
    spikes,
    createSpike,
    updateSpikes,
    drawSpikes
} from './spikes.js';

import {
    particles,
    addParticles,
    updateParticles,
    drawParticles
} from './particles.js';

import {
    music,
    playMusic,
    stopMusic,
    playDie
} from './audio.js';

import {
    hide,
    show
} from './ui.js';

import {
    saveCoins,
    loadCoins,
    saveLeaderboard,
    loadLeaderboard
} from './storage.js';

const canvas =
document.getElementById("game");

const ctx =
canvas.getContext("2d");

function resize(){

    canvas.width = innerWidth;
    canvas.height = innerHeight;
}

resize();

window.addEventListener(
"resize",
resize
);

const state = {

    running:false,
    paused:false,

    score:0,
    coins:0,

    speed:7
};

let totalCoins =
loadCoins();

let playerName =
localStorage.getItem(
'flipPlayerName'
) || 'Player';

let spikeLoop;

function drawBackground(){

    const gradient =
    ctx.createLinearGradient(
        0,
        0,
        0,
        canvas.height
    );

    gradient.addColorStop(
        0,
        "#091022"
    );

    gradient.addColorStop(
        1,
        "#050816"
    );

    ctx.fillStyle =
    gradient;

    ctx.fillRect(
        0,
        0,
        canvas.width,
        canvas.height
    );
}

function drawWalls(){

    ctx.fillStyle =
    "#1d2748";

    ctx.fillRect(
        0,
        0,
        canvas.width,
        34
    );

    ctx.fillRect(
        0,
        canvas.height - 34,
        canvas.width,
        34
    );
}

function updateHUD(){

    document.getElementById(
    "distance"
    ).innerText =
    "Distance: " +
    state.score;

    document.getElementById(
    "coins"
    ).innerText =
    "Coins: " +
    (totalCoins + state.coins);
}

function startGame(){

    hide("startScreen");

    document.getElementById(
    "pauseBtn"
    ).style.display =
    "block";

    state.running = true;

    playMusic();

    clearInterval(spikeLoop);

    spikeLoop =
    setInterval(()=>{

        if(
        state.running &&
        !state.paused
        ){

            createSpike(canvas);
        }

    },1200);
}

function endGame(){

    state.running = false;

    clearInterval(
    spikeLoop
    );

    stopMusic();

    playDie();

    totalCoins += state.coins;

    saveCoins(totalCoins);

    saveLeaderboard(
        playerName,
        state.score
    );

    addParticles(
        player.x,
        player.y,
        "#ff5c7a",
        30
    );

    show("gameOver");

    document.getElementById(
    "pauseBtn"
    ).style.display =
    "none";

    document.getElementById(
    "finalDistance"
    ).innerText =
    "Distance: " +
    state.score;

    document.getElementById(
    "finalCoins"
    ).innerText =
    "Coins: " +
    state.coins;
}

function restartGame(){

    state.running = true;
    state.paused = false;

    state.score = 0;
    state.coins = 0;

    state.speed = 7;

    spikes.length = 0;
    particles.length = 0;

    player.y = 250;
    player.velY = 0;

    updateHUD();

    hide("gameOver");

    document.getElementById(
    "pauseBtn"
    ).style.display =
    "block";

    playMusic();

    clearInterval(spikeLoop);

    spikeLoop =
    setInterval(()=>{

        if(
        state.running &&
        !state.paused
        ){

            createSpike(canvas);
        }

    },1200);
}

function update(){

    if(
    !state.running ||
    state.paused
    ) return;

    updatePlayer(canvas);

    updateSpikes(
        canvas,
        endGame,
        state
    );

    updateParticles();

    updateHUD();
}

function render(){

    drawBackground();
    drawWalls();

    drawSpikes(
        ctx,
        canvas
    );

    drawParticles(ctx);

    drawPlayer(ctx);
}

function loop(){

    update();
    render();

    requestAnimationFrame(
    loop
    );
}

loop();

document.getElementById(
"playBtn"
).onclick =
startGame;

document.getElementById(
"restartBtn"
).onclick =
restartGame;

document.getElementById(
"pauseBtn"
).onclick = ()=>{

    state.paused = true;

    show("pauseMenu");
};

document.getElementById(
"resumeBtn"
).onclick = ()=>{

    state.paused = false;

    hide("pauseMenu");
};

document.getElementById(
'homeBtn'
).onclick = ()=>{

    location.reload();
};

document.getElementById(
'pauseHomeBtn'
).onclick = ()=>{

    location.reload();
};

document.getElementById(
'leaderboardBtn'
).onclick = ()=>{

    const board =
    loadLeaderboard();

    const list =
    document.getElementById(
    'leaderboardList'
    );

    list.innerHTML = '';

    if(board.length === 0){

        list.innerHTML =
        '<div class="leaderboardItem">No Scores Yet</div>';

    }else{

        board.forEach((item,index)=>{

            list.innerHTML +=
            `
            <div class="leaderboardItem">

                <div>
                    #${index + 1}
                    ${item.name}
                </div>

                <div>
                    ${item.score}
                </div>

            </div>
            `;
        });
    }

    show('leaderboardScreen');
};

document.getElementById(
'closeLeaderboardBtn'
).onclick = ()=>{

    hide('leaderboardScreen');
};

document.getElementById(
"settingsBtn"
).onclick = ()=>{

    show("settingsScreen");
};

document.getElementById(
"closeSettingsBtn"
).onclick = ()=>{

    hide("settingsScreen");
};

document.getElementById(
'configBtn'
).onclick = ()=>{

    show('configScreen');
};

document.getElementById(
'closeConfigBtn'
).onclick = ()=>{

    hide('configScreen');
};

document.getElementById(
'saveCubeBtn'
).onclick = ()=>{

    const color =
    document.getElementById(
    'cubeColor'
    ).value;

    player.color = color;

    localStorage.setItem(
        'flipCubeColor',
        color
    );

    hide('configScreen');
};

document.getElementById(
'comingSoonBtn'
).onclick = ()=>{

    alert(
    'Custom Images Coming Soon'
    );
};

window.addEventListener(
"keydown",
e=>{

    if(
    e.code === "Space"
    ){

        e.preventDefault();

        if(
        state.running &&
        !state.paused
        ){

            flipGravity();
        }
    }
});

window.addEventListener(
"pointerdown",
e=>{

    const tag =
    e.target.tagName;

    if(

    tag === "BUTTON"

    ||

    tag === "INPUT"

    ) return;

    if(
    state.running &&
    !state.paused
    ){

        flipGravity();
    }
});

let musicEnabled = true;

document.getElementById(
"musicToggle"
).onclick = ()=>{

    musicEnabled =
    !musicEnabled;

    document.getElementById(
    "musicToggle"
    ).innerText =
    "Music: " +
    (
    musicEnabled
    ?
    "ON"
    :
    "OFF"
    );

    if(musicEnabled){

        music.play();

    }else{

        music.pause();
    }
};

const ageSlider =
document.getElementById(
"ageSlider"
);

const ageText =
document.getElementById(
"ageText"
);

ageSlider.oninput = ()=>{

    if(ageSlider.value == 21){

        ageText.innerText =
        "21+";

    }else{

        ageText.innerText =
        ageSlider.value;
    }
};

document.getElementById(
'nameInput'
).addEventListener(
'input',
e=>{

    playerName =
    e.target.value || 'Player';

    localStorage.setItem(
        'flipPlayerName',
        playerName
    );
});