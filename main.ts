function initcosmos (rad: number) {
    cosmos = []
    for (let index = 0; index < rad * rad; index++) {
        if (31 > randint(0, 100)) {
            cosmos.push(randint(3, 10))
        } else {
            cosmos.push(0)
        }
    }
}
// display 5x5 region in cosmos, starting at xx,yy
function showWindow (xx: number, yy: number) {
    for (let index2 = 0; index2 <= 4; index2++) {
        for (let index22 = 0; index22 <= 4; index22++) {
            led.plotBrightness(index22, index2, 15 * getval(index22 + xx, index2 + yy))
        }
    }
}
function init () {
    radius = 20
    initcosmos(radius)
    cx = radius / 2
    cy = radius / 2
    x = 2
    y = 2
    dx = [
    0,
    0,
    1,
    0,
    -1
    ]
    dy = [
    0,
    -1,
    0,
    1,
    0
    ]
}
function findDir () {
    dir2 = 0
    if (input.acceleration(Dimension.X) < -300) {
        dir2 = 4
    } else {
        if (input.acceleration(Dimension.Y) > 300) {
            dir2 = 3
        }
        if (input.acceleration(Dimension.Y) < -500) {
            dir2 = 1
        }
    }
    if (input.acceleration(Dimension.X) > 300) {
        dir2 = 2
    }
    return dir2
}
// get  x,y value from cosmos
// fixed to wrap on edges.
function getval (xx2: number, yy2: number) {
    spot = xx2 + yy2 * radius
    if (spot < 0) {
        spot = spot + radius * radius
    }
    if (spot > radius * radius) {
        spot = spot - radius * radius
    }
    return cosmos[spot]
}
let move = 0
let spot = 0
let dir2 = 0
let dy: number[] = []
let dx: number[] = []
let y = 0
let x = 0
let cy = 0
let cx = 0
let radius = 0
let cosmos: number[] = []
init()
basic.forever(function () {
    showWindow(cx, cy)
    led.plotBrightness(x, y, 255)
})
basic.forever(function () {
    led.unplot(x, y)
    move = findDir()
    x += dx[move]
    y += dy[move]
    if (x < 0) {
        x = 0
        cx = cx - 1
    }
    if (y < 0) {
        y = 0
        cy = cy - 1
    }
    if (x > 4) {
        x = 4
        cx = cx + 1
    }
    if (y > 4) {
        y = 4
        cy = cy + 1
    }
    if (cx < 0) {
        cx = cx + radius
    }
    if (cx > radius) {
        cx = cx - radius
    }
    if (cy < 0) {
        cy = cy + radius
    }
    if (cy > radius) {
        cy = cy - radius
    }
    basic.pause(100)
})
