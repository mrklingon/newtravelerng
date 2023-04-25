def initcosmos(rad: number):
    global cosmos
    cosmos = []
    for index in range(rad * rad):
        if 31 > randint(0, 100):
            cosmos.append(randint(3, 10))
        else:
            cosmos.append(0)
# display 5x5 region in cosmos, starting at xx,yy
#
def showWindow(xx: number, yy: number):
    for index2 in range(5):
        for index22 in range(5):
            led.plot_brightness(index22, index2, 15 * getval(index22 + xx, index2 + yy))
def init():
    global radius, cx, cy, x, y, dx, dy
    radius = 20
    initcosmos(radius)
    cx = radius / 2
    cy = radius / 2
    x = 2
    y = 2
    dx = [0, 0, 1, 0, -1]
    dy = [0, -1, 0, 1, 0]
def findDir():
    global dir2
    dir2 = 0
    if input.acceleration(Dimension.X) < -300:
        dir2 = 4
    else:
        if input.acceleration(Dimension.Y) > 300:
            dir2 = 3
        if input.acceleration(Dimension.Y) < -500:
            dir2 = 1
    if input.acceleration(Dimension.X) > 300:
        dir2 = 2
    return dir2
# get  x,y value from cosmos
# fixed to wrap on edges.
def getval(xx2: number, yy2: number):
    global spot
    spot = xx2 + yy2 * radius
    if spot < 0:
        spot = spot + radius * radius
    if spot > radius * radius:
        spot = spot - radius * radius
    return cosmos[spot]
move = 0
spot = 0
dir2 = 0
dy: List[number] = []
dx: List[number] = []
y = 0
x = 0
cy = 0
cx = 0
radius = 0
cosmos: List[number] = []
init()

def on_forever():
    global move, x, y, cx, cy
    led.unplot(x, y)
    move = findDir()
    x += dx[move]
    y += dy[move]
    if x < 0:
        x = 0
        cx = cx - 1
    if y < 0:
        y = 0
        cy = cy - 1
    if x > 4:
        x = 4
        cx = cx + 1
    if y > 4:
        y = 4
        cy = cy + 1
    if cx < 0:
        cx = cx + radius
    if cx > radius:
        cx = cx - radius
    if cy < 0:
        cy = cy + radius
    if cy > radius:
        cy = cy - radius
    basic.pause(100)
basic.forever(on_forever)

def on_forever2():
    showWindow(cx, cy)
    led.plot_brightness(x, y, 255)
basic.forever(on_forever2)
