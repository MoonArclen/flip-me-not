import { flipGravity } from './player.js';

export function setupInput(){

    window.addEventListener(
    'keydown',
    e=>{

        if(e.code === 'Space'){

            e.preventDefault();
            flipGravity();
        }
    });

    window.addEventListener(
    'pointerdown',
    e=>{

        const tag = e.target.tagName;

        if(
        tag === 'BUTTON' ||
        tag === 'INPUT'
        ) return;

        flipGravity();
    });
}
