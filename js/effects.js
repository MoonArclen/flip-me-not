import { state } from './state.js';

export function applyShake(ctx){

    if(state.shake > 0){

        ctx.translate(
            (Math.random()-.5) * state.shake,
            (Math.random()-.5) * state.shake
        );

        state.shake *= .9;
    }
}
