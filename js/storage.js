// js/storage.js

export function save(key,value){

    localStorage.setItem(
        key,
        JSON.stringify(value)
    );
}

export function load(key,defaultValue){

    return JSON.parse(
        localStorage.getItem(key)
    ) ?? defaultValue;
}

export function saveCoins(coins){

    localStorage.setItem(
        'flipCoins',
        coins
    );
}

export function loadCoins(){

    return parseInt(
        localStorage.getItem(
            'flipCoins'
        ) || 0
    );
}

export function saveLeaderboard(
name,
score
){

    const board =
    JSON.parse(
        localStorage.getItem(
            'flipLeaderboard'
        ) || '[]'
    );

    board.push({

        name,
        score
    });

    board.sort(
        (a,b)=>
        b.score - a.score
    );

    const trimmed =
    board.slice(0,10);

    localStorage.setItem(
        'flipLeaderboard',
        JSON.stringify(trimmed)
    );
}

export function loadLeaderboard(){

    return JSON.parse(
        localStorage.getItem(
            'flipLeaderboard'
        ) || '[]'
    );
}