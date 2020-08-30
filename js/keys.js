    document.addEventListener('keydown', event => {
        event.preventDefault();
        keys[event.keyCode] = true
    })
    document.addEventListener('keyup', event => {
        event.preventDefault();
        keys[event.keyCode] = false
        character.animateX = 0;
    })