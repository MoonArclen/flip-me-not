// js/spikes.js

import { player } from './player.js';

export let spikes = [];

export function createSpike(canvas){

    spikes.push({

        x:canvas.width + 100,

        width:player.size,
        height:player.size,

        top:Math.random() > .5,

        scored:false
    });
}

export function updateSpikes(
canvas,
endGame,
state
){

    spikes.forEach(spike=>{

        spike.x -= state.speed;

        const y =
        spike.top
        ?
        34
        :
        canvas.height -
        34 -
        spike.height;

        if(

        player.x <
        spike.x +
        spike.width

        &&

        player.x +
        player.size >
        spike.x

        &&

        player.y <
        y +
        spike.height

        &&

        player.y +
        player.size >
        y

        ){

            endGame();
        }

        if(

        !spike.scored

        &&

        spike.x +
        spike.width <
        player.x

        ){

            spike.scored =
            true;

            state.score++;
            state.coins++;

            state.speed =
            7 + state.score * .03;
        }
    });

    spikes =
    spikes.filter(
    spike =>
    spike.x > -100
    );
}

export function drawSpikes(
ctx,
canvas
){

    spikes.forEach(spike=>{

        const y =
        spike.top
        ?
        34
        :
        canvas.height -
        34 -
        spike.height;

        ctx.fillStyle =
        "#f0f4ff";

        ctx.beginPath();

        if(spike.top){

            ctx.moveTo(
                spike.x,
                y
            );

            ctx.lineTo(
                spike.x +
                spike.width/2,
                y +
                spike.height
            );

            ctx.lineTo(
                spike.x +
                spike.width,
                y
            );

        }else{

            ctx.moveTo(
                spike.x,
                y +
                spike.height
            );

            ctx.lineTo(
                spike.x +
                spike.width/2,
                y
            );

            ctx.lineTo(
                spike.x +
                spike.width,
                y +
                spike.height
            );
        }

        ctx.closePath();
        ctx.fill();
    });
}