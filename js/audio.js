export const music = new Audio(
'assets/music/Sunset-Travel.mp3'
);

music.loop = true;
music.volume = .4;

export const dieSound = new Audio(
'assets/sounds/Death.mp3'
);

dieSound.volume = .8;

export function playMusic(){

    music.play().catch(()=>{});
}

export function stopMusic(){

    music.pause();
    music.currentTime = 0;
}

export function playDie(){

    dieSound.currentTime = 0;

    dieSound.play().catch(()=>{});
}
