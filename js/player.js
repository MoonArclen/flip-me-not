// js/player.js

export const player = {

    x:160,
    y:250,

    size:56,

    velY:0,
    rotation:0,

    color:
    localStorage.getItem(
        'flipCubeColor'
    ) || '#7488e8'
};

export let gravityDirection = 1;

const gravity = .85;

export function updatePlayer(canvas){

    player.velY +=
    gravity *
    gravityDirection;

    player.y +=
    player.velY;

    if(player.y < 34){

        player.y = 34;
        player.velY = 0;
    }

    if(
    player.y + player.size >
    canvas.height - 34
    ){

        player.y =
        canvas.height -
        34 -
        player.size;

        player.velY = 0;
    }
}

export function drawPlayer(ctx){

    ctx.save();

    ctx.translate(
        player.x +
        player.size/2,

        player.y +
        player.size/2
    );

    player.rotation +=
    player.velY * .03;

    ctx.rotate(
        player.rotation
    );

    ctx.shadowBlur = 20;

    ctx.shadowColor =
    player.color;

    ctx.fillStyle =
    player.color;

    ctx.beginPath();

    ctx.roundRect(
        -player.size/2,
        -player.size/2,
        player.size,
        player.size,
        14
    );

    ctx.fill();

    ctx.restore();
}

export function flipGravity(){

    gravityDirection *= -1;

    player.velY =
    gravityDirection * 9;
}