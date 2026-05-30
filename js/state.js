export const state = {

    running:false,
    paused:false,

    score:0,
    coins:0,

    speed:7,

    gravityDirection:1,

    spikes:[],
    particles:[],

    shake:0,

    highScore:
    parseInt(
        localStorage.getItem('flipHigh') || 0
    )
};
