namespace SpriteKind {
    export const Canongun1 = SpriteKind.create()
    export const Bosspor = SpriteKind.create()
}
sprites.onOverlap(SpriteKind.Bosspor, SpriteKind.Player, function (sprite, otherSprite) {
    P_hp.value += -1
    sprites.destroy(projectile, effects.spray, 500)
})
statusbars.onStatusReached(StatusBarKind.Magic, statusbars.StatusComparison.EQ, statusbars.ComparisonType.Fixed, 0, function (status) {
    mp.moveWithButtons(mp.playerSelector(mp.PlayerNumber.One), 3, 2)
    mp.moveWithButtons(mp.playerSelector(mp.PlayerNumber.Two), 3, 2)
    mp.moveWithButtons(mp.playerSelector(mp.PlayerNumber.Three), 3, 2)
    mp.moveWithButtons(mp.playerSelector(mp.PlayerNumber.Four), 3, 2)
})
mp.onButtonEvent(mp.MultiplayerButton.B, ControllerButtonEvent.Pressed, function (player2) {
    statusbar2.value += -1
    P_hp.value += 1
})
mp.onButtonEvent(mp.MultiplayerButton.A, ControllerButtonEvent.Pressed, function (player2) {
    Pro1 = sprites.createProjectileFromSprite(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . 2 . . . . . . . . 
        . . . . . . . 2 2 . . . . . . . 
        . . . . . . . 2 2 . . . . . . . 
        . . . . . . . 2 2 . . . . . . . 
        . . . . . . . 2 2 . . . . . . . 
        . . . . . . . 2 2 . . . . . . . 
        . . . . . . . 2 2 . . . . . . . 
        . . . . . . . 2 2 . . . . . . . 
        . . . . . . . 2 2 2 . . . . . . 
        . . . . . . . 2 2 2 . . . . . . 
        . . . . . . . . . . . . . . . . 
        `, mp.getPlayerSprite(player2), 0, -100)
    Pro1.setKind(SpriteKind.Canongun1)
    statusbar2.value += -2
})
statusbars.onZero(StatusBarKind.EnemyHealth, function (status) {
    game.gameOver(true)
})
statusbars.onZero(StatusBarKind.Magic, function (status) {
	
})
statusbars.onZero(StatusBarKind.Health, function (status) {
    mp.getPlayerSprite(mp.playerSelector(mp.PlayerNumber.One)).setStayInScreen(true)
    mp.getPlayerSprite(mp.playerSelector(mp.PlayerNumber.Two)).setStayInScreen(true)
    mp.getPlayerSprite(mp.playerSelector(mp.PlayerNumber.Three)).setStayInScreen(true)
    mp.getPlayerSprite(mp.playerSelector(mp.PlayerNumber.Four)).setStayInScreen(true)
    game.gameOver(false)
})
sprites.onOverlap(SpriteKind.Canongun1, SpriteKind.Enemy, function (sprite, otherSprite) {
    statusbar.value += -1
    sprites.destroy(Pro1, effects.spray, 500)
    statusbar2.value += 10
})
mp.onButtonEvent(mp.MultiplayerButton.B, ControllerButtonEvent.Repeated, function (player2) {
    statusbar2.value += -1
    P_hp.value += 1
})
statusbars.onStatusReached(StatusBarKind.Magic, statusbars.StatusComparison.EQ, statusbars.ComparisonType.Fixed, 10, function (status) {
    mp.moveWithButtons(mp.playerSelector(mp.PlayerNumber.One), 100, 100)
    mp.moveWithButtons(mp.playerSelector(mp.PlayerNumber.Two), 100, 100)
    mp.moveWithButtons(mp.playerSelector(mp.PlayerNumber.Three), 100, 100)
    mp.moveWithButtons(mp.playerSelector(mp.PlayerNumber.Four), 100, 100)
})
mp.onButtonEvent(mp.MultiplayerButton.A, ControllerButtonEvent.Repeated, function (player2) {
    Pro1.follow(Boss)
    statusbar2.value += -5
    pause(500)
})
let Pro1: Sprite = null
let projectile: Sprite = null
let statusbar2: StatusBarSprite = null
let P_hp: StatusBarSprite = null
let statusbar: StatusBarSprite = null
let Boss: Sprite = null
Boss = sprites.create(img`
    . . . . . 3 3 3 3 3 3 . . . . . 
    . . . . . c . c . c 3 . . . . . 
    . . . . . 3 3 . c 9 3 . . . . . 
    . . . 9 9 9 9 3 c 3 3 . . . . . 
    . . . 9 8 8 9 9 9 9 9 . . . . . 
    . 6 6 9 8 8 8 9 8 8 9 . . . . . 
    . 6 . 9 8 8 8 8 8 8 9 6 6 9 . . 
    . 6 . 9 8 9 8 8 8 8 9 9 . 6 6 . 
    . 9 . 9 8 8 8 8 8 8 8 9 . 9 6 . 
    . 6 . 9 8 8 9 8 9 8 8 9 . . 6 . 
    . 6 . 9 9 9 9 8 8 8 9 9 . . 6 . 
    . . . . 8 8 9 9 9 9 9 . . . . . 
    . . . . 8 a . . . 8 8 . . . . . 
    . . . . 8 8 . . . a 8 . . . . . 
    . . . . a 8 . . . 8 a . . . . . 
    . . a 8 8 8 . . . 8 8 a . . . . 
    `, SpriteKind.Enemy)
Boss.setPosition(77, 10)
mp.setPlayerSprite(mp.playerSelector(mp.PlayerNumber.One), sprites.create(img`
    . . . . . . . . . . . . . . . . 
    . . . . 3 3 3 3 3 3 . . . . . . 
    . . . . 3 . . . . 3 . . . . . . 
    . . . . 3 . . . . 3 . . . . . . 
    . . . . . 3 3 3 3 3 . . . . . . 
    . . . . . . . 3 . . . . . . . . 
    . . 3 3 3 3 3 3 3 3 3 3 . . . . 
    . 3 3 . . . . 3 . . . . . . . . 
    . . . . . . . 3 . . . . . . . . 
    . . . . . . 3 3 3 . . . . . . . 
    . . . . . . 3 . 3 . . . . . . . 
    . . . . . 3 . . 3 . . . . . . . 
    . . . . . 3 . . 3 3 . . . . . . 
    . . . . . 3 . . . 3 3 . . . . . 
    . . . . . 3 . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    `, SpriteKind.Player))
mp.setPlayerSprite(mp.playerSelector(mp.PlayerNumber.Two), sprites.create(img`
    . . . . . . . . . . . . . . . . 
    . . . . . 2 2 2 2 2 . . . . . . 
    . . . . . 2 . . . . 2 . . . . . 
    . . . . . 2 . . . . 2 . . . . . 
    . . . . . 2 2 2 2 2 . . . . . . 
    . . . . . . . 2 2 . . . . . . . 
    . . . . . . . 2 . . . . . . . . 
    . . 2 2 2 2 2 2 2 2 2 2 2 2 . . 
    . . . . . . . 2 . . . . . . . . 
    . . . . . . . 2 2 . . . . . . . 
    . . . . . . . 2 2 2 . . . . . . 
    . . . . . . 2 . . 2 . . . . . . 
    . . . . . . 2 . . 2 2 . . . . . 
    . . . . . 2 . . . . 2 . . . . . 
    . . . . . 2 . . . . . 2 . . . . 
    . . . . . . . . . . . . . . . . 
    `, SpriteKind.Player))
mp.setPlayerSprite(mp.playerSelector(mp.PlayerNumber.Three), sprites.create(img`
    . . . . . 9 9 9 9 9 9 9 . . . . 
    . . . . . 9 . . . . . 9 . . . . 
    . . . . . 9 . . . . 9 . . . . . 
    . . . . . 9 9 9 9 9 . . . . . . 
    . . . . . . . . 9 . . . . . . . 
    . . . . 9 9 9 9 9 9 9 . . . . . 
    . . . 9 9 . . . 9 . . 9 9 . . . 
    . . . 9 . . . 9 . . . . . 9 . . 
    . . . 9 . . . 9 9 . . . . 9 . . 
    . . . 9 . . . 9 9 . . . . 9 . . 
    . . . . . . 9 . 9 9 . . . 9 . . 
    . . . . . . 9 . . 9 . . . . . . 
    . . . . . 9 9 . . 9 9 . . . . . 
    . . . . . 9 . . . . 9 . . . . . 
    . . . . . 9 . . . . 9 9 . . . . 
    . . . . 9 . . . . . . 9 . . . . 
    `, SpriteKind.Player))
mp.moveWithButtons(mp.playerSelector(mp.PlayerNumber.One), 100, 100)
mp.moveWithButtons(mp.playerSelector(mp.PlayerNumber.Two), 100, 100)
mp.moveWithButtons(mp.playerSelector(mp.PlayerNumber.Three), 100, 100)
mp.moveWithButtons(mp.playerSelector(mp.PlayerNumber.Four), 100, 100)
statusbar = statusbars.create(4, 100, StatusBarKind.EnemyHealth)
statusbar.setColor(6, 2)
statusbar.positionDirection(CollisionDirection.Right)
statusbar.setBarBorder(1, 13)
statusbar.value = 5000
P_hp = statusbars.create(4, 100, StatusBarKind.Health)
P_hp.setColor(7, 2)
P_hp.setBarBorder(1, 13)
P_hp.positionDirection(CollisionDirection.Left)
P_hp.setLabel("HP")
P_hp.value = 1000
statusbar2 = statusbars.create(140, 4, StatusBarKind.Magic)
statusbar2.positionDirection(CollisionDirection.Bottom)
statusbar.setColor(10, 6, 3)
statusbar2.value = 500
Boss.setStayInScreen(true)
mp.setPlayerIndicatorsVisible(true)
forever(function () {
	
})
game.onUpdateInterval(500, function () {
    Boss.setPosition(randint(10, 200), randint(-20, 10))
})
game.onUpdateInterval(500, function () {
	
})
game.onUpdateInterval(200, function () {
    projectile = sprites.createProjectileFromSprite(img`
        . . 6 6 6 6 . . 
        . 6 d 4 4 4 6 . 
        6 d 4 4 4 4 d 6 
        c 1 b 4 4 4 d c 
        . c b 1 1 4 c . 
        . . c c c c . . 
        `, Boss, 0, 100)
    projectile.setKind(SpriteKind.Bosspor)
})
game.onUpdateInterval(10000, function () {
    statusbar.value += 2
})
game.onUpdateInterval(10000, function () {
    statusbar2.value += 10
})
