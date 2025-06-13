// not done
// there's a good chance that this ends up being too ambitious and I won't have enough time
namespace SpriteKind {
    export const Signpost = SpriteKind.create()
    export const Shop = SpriteKind.create()
    export const Card = SpriteKind.create()
    export const Cursor = SpriteKind.create()
    export const Influence = SpriteKind.create()
}
// globals
let playerSprite: Sprite = null
let inHub = true
let inBattle = false
let currentLevel = 1
let playerHand: CardSprite[] = []
let playerDeck: CardSprite[] = []
let goalInfluence = 100
let currentInfluence = 0
let cursorArrayPosition = 0
let cursorPosition = 1
let cursor: Sprite = null
let firstInfluenceSprite: Sprite = null
let secondInfluenceSprite: Sprite = null
// "knight", "bonfire", "crown", "delivery", "joker"
// classes

class CardSprite extends sprites.ExtendableSprite {
    name: string
    cost: number
    constructor(image: Image, kind: number, name: string, cost: number) {
        super(image, kind)
        
    }
}

// functions
function loadHub(): void {
    inBattle = false
    inHub = true
    tiles.setCurrentTilemap(tilemap`hub`)
    let playerHolder = tiles.getTilesByType(assets.tile`playerPH`)
    for (let i = 0; i < playerHolder.length; i++) {
        playerSprite = sprites.create(assets.image`player`, SpriteKind.Player)
        tiles.placeOnTile(playerSprite, playerHolder[i])
        tiles.setTileAt(playerHolder[i], assets.tile`greenGrassTile`)
        controller.moveSprite(playerSprite, 80, 80)
        scene.cameraFollowSprite(playerSprite)
    }
    let signpostSprite = sprites.create(assets.image`signpost`, SpriteKind.Signpost)
    tiles.placeOnTile(signpostSprite, tiles.getTileLocation(7, 4))
    let shopSprite = sprites.create(assets.image`shop`, SpriteKind.Shop)
    tiles.placeOnTile(shopSprite, tiles.getTileLocation(1, 2))
}

function shuffleDeck() {
    for (let i = playerDeck.length - 1; i >= 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [playerDeck[i], playerDeck[j]] = [playerDeck[j], playerDeck[i]]
    }
}

function initializeDeck() {
    let card1 = new CardSprite(assets.image`knight`, SpriteKind.Card, "knight", 35)
    card1.x = 1000; card1.y = 1000
    playerDeck.push(card1)
    let card2 = new CardSprite(assets.image`bonfire`, SpriteKind.Card, "bonfire", 40)
    playerDeck.push(card2)
    card2.x = 1000; card2.y = 1000
    let card3 = new CardSprite(assets.image`crown`, SpriteKind.Card, "crown", 25)
    playerDeck.push(card3)
    card3.x = 1000; card3.y = 1000
    let card4 = new CardSprite(assets.image`delivery`, SpriteKind.Card, "delivery", 10)
    playerDeck.push(card4)
    card4.x = 1000; card4.y = 1000
    let card5 = new CardSprite(assets.image`joker`, SpriteKind.Card, "joker", 20)
    playerDeck.push(card5)
    card5.x = 1000; card5.y = 1000
    shuffleDeck()
}

function drawHand(number_of_cards: number) {
    for (let i = 0; i < number_of_cards; i++) {
        playerHand.push(playerDeck[i])
        playerDeck.splice(i, 1)
        console.log(playerHand.length)
        console.log(playerDeck.length)
    }
}

function displayHand(hand: CardSprite[]) {
    let xPosition = 1
    for (let i = 0; i < hand.length; i++) {
        tiles.placeOnTile(hand[i], tiles.getTileLocation(xPosition, 6))
        xPosition += 2
    }
}

function displayInfluence(goal: number, current: number) {
    sprites.destroyAllSpritesOfKind(SpriteKind.Influence)
    firstInfluenceSprite = sprites.create(assets.image`influence`, SpriteKind.Influence)
    tiles.placeOnTile(firstInfluenceSprite, tiles.getTileLocation(2, 1))
    firstInfluenceSprite.sayText("Goal: " + goal)
    firstInfluenceSprite = sprites.create(assets.image`influence`, SpriteKind.Influence)
    tiles.placeOnTile(firstInfluenceSprite, tiles.getTileLocation(7, 1))
    firstInfluenceSprite.sayText("Current: " + current)

}

function loadLevel(levelNumber: number): void {
    inBattle = true
    sprites.destroyAllSpritesOfKind(SpriteKind.Player)
    sprites.destroyAllSpritesOfKind(SpriteKind.Signpost)
    sprites.destroyAllSpritesOfKind(SpriteKind.Shop)
    if (levelNumber == 1) {
        tiles.setCurrentTilemap(tilemap`firstLevel`)
        scene.centerCameraAt(4, 3)
        scene.setBackgroundColor(13)
    }
    drawHand(3)
    displayHand(playerHand)
    // make cursor
    cursor = sprites.create(assets.image`cursor`, SpriteKind.Cursor)
    tiles.placeOnTile(cursor, tiles.getTileLocation(1, 6))
    displayInfluence(goalInfluence, currentInfluence)
}

function sayEffect(pickedCard: CardSprite) {
    if (pickedCard.name = "knight") {
        pickedCard.sayText("")
    }
}
// event handlers
sprites.onOverlap(SpriteKind.Player, SpriteKind.Signpost, function(sprite: Sprite, otherSprite: Sprite) {
    if (controller.A.isPressed()) {
        if (inHub) {
            inHub = false
            initializeDeck()
            loadLevel(currentLevel)

        }
    }
    otherSprite.sayText("Press A to continue", 300)
})

controller.right.onEvent(ControllerButtonEvent.Pressed, function() {
    if (inBattle) {
        cursorPosition += 2
        cursorArrayPosition += 1
        tiles.placeOnTile(cursor, tiles.getTileLocation(cursorPosition, 6))
    }

})

controller.left.onEvent(ControllerButtonEvent.Pressed, function () {
    if (inBattle) {
        cursorPosition += -2
        cursorArrayPosition += -1
        tiles.placeOnTile(cursor, tiles.getTileLocation(cursorPosition, 6))
    }

})

sprites.onOverlap(SpriteKind.Cursor, SpriteKind.Card, function(sprite: Sprite, otherSprite: Sprite) {
    if (controller.A.isPressed()) {

    }
    
})
// main
loadHub()