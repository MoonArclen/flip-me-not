// js/ui.js

export function show(id){

    const element =
    document.getElementById(id);

    if(!element) return;

    element.classList.remove('hidden');

    element.style.display = 'flex';
}

export function hide(id){

    const element =
    document.getElementById(id);

    if(!element) return;

    element.classList.add('hidden');

    element.style.display = 'none';
}