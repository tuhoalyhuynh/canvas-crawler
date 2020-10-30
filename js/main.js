const movementDisplay = document.querySelector('#movement')
const game = document.querySelector('#game')

// sync canvas area with actual

const computedStyle = getComputedStyle(game)
const height = computedStyle.height;
const width = computedStyle.width;
game.width = parseInt(width)
game.height = parseInt(height)

// get context from game

const ctx = game.getContext('2d')

// set context of game

// ctx.fillStyle = 'white';
// ctx.strokeStyle = 'red';
// ctx.lineWideth = 5;

// // draw using context
// ctx.fillRect(10, 10, 100, 100);
// ctx.strokeRect(10, 10, 100, 100);

// function drawBox (x, y, size, color) {
//     ctx.fillStyle = color;
//     ctx.fillRect(x, y, size, size)
// }

// var ogre = {
//     x = 10,
//     y = 10,
//     color = "#BADA55",
//     width: 40,
//     height: 80,
//     alive: true,
//     render: function () {
//         ctx.fillStyle = this.color
//         ctx.fillRect(this.x, this.y, this.width, this.height)
//     }
// }

// var hero = {
//     x = 0,
//     y = 0,
//     color = "hotpink",
//     width: 20,
//     height: 20,
//     alive: true,
//     render: function () {
//         ctx.fillStyle = this.color
//         ctx.fillRect(this.x, this.y, this.width, this.height)
//     }
// }

class Crawler {
    constructor(x, y, color, width, height) {
        this.x = x
        this.y = y
        this.color = color
        this.width = width
        this.height = height
        this.alive = true
    }
    render () {
            ctx.fillStyle = this.color;
            ctx.fillRect(this.x, this.y, this.width, this.height)
        }
}

const ogre = new Crawler(10, 10, '#BADA55', 40, 80)
const hero = new Crawler(Math.floor(Math.random() * (game.width -20)), Math.floor(Math.random() * (game.height - 20)), 'hotpink', 20, 20)

document.querySelector('#btm-right').addEventListener('click', function() {
    ogre.render()
    hero.render()
})

document.addEventListener('keypress', function(evt) {
    movementDisplay.textContent = `X: ${hero.x}, Y: ${hero.y}`
    if (evt.key === 'w') {
        hero.y -= 5
    } else if (evt.key === 'a') {
        hero.x -= 5
    } else if (evt.key === 's') {
        hero.y += 5
    } else if (evt.key === 'd') {
        hero.x += 5
    }
})

movementDisplay.textContent = `X: ${hero.x}, Y: ${hero.y}`

function detectHit() {
    if (hero.x < ogre.x + ogre.width 
        && hero.x + hero.width > ogre.x 
        && hero.y < ogre.y + ogre.height 
        && hero.y + hero.height > ogre.y) {
        ogre.alive = false
    } 
}

function rePaint () {
    ctx.clearRect(0, 0, game.width, game.height)
    hero.render()
    detectHit()
    if (ogre.alive){
        ogre.render()
    }
}

setInterval(rePaint, 1000 / 144)