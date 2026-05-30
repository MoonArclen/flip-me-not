// js/particles.js

export let particles = [];

export function addParticles(
x,
y,
color,
count
){

    for(let i=0;i<count;i++){

        particles.push({

            x,
            y,

            vx:(Math.random()-.5)*8,
            vy:(Math.random()-.5)*8,

            size:Math.random()*5 + 2,

            life:50,

            color
        });
    }
}

export function updateParticles(){

    particles.forEach(p=>{

        p.x += p.vx;
        p.y += p.vy;

        p.life--;
    });

    particles =
    particles.filter(
    p=>p.life > 0
    );
}

export function drawParticles(ctx){

    particles.forEach(p=>{

        ctx.globalAlpha =
        p.life / 50;

        ctx.fillStyle =
        p.color;

        ctx.beginPath();

        ctx.arc(
            p.x,
            p.y,
            p.size,
            0,
            Math.PI * 2
        );

        ctx.fill();
    });

    ctx.globalAlpha = 1;
}