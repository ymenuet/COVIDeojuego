    document.addEventListener('keydown', event => {
        keys[event.keyCode] = true
        console.log(character.jumping)
    })
    document.addEventListener('keyup', event => {
        keys[event.keyCode] = false
    })