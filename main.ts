// not done
// there's a good chance that this ends up being too ambitious and I won't have enough time
namespace SpriteKind {
    export const Signpost = SpriteKind.create()
    export const Shop = SpriteKind.create()
    export const Card = SpriteKind.create()
}
// globals
let playerSprite: Sprite = null
let inHub = true
let inBattle = false
let currentLevel = 1
let playerHand: CardSprite[] = []
let playerDeck: CardSprite[] = []
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
    
}

function initializeDeck() {
    let card1 = new CardSprite(assets.image`knight`, SpriteKind.Card, "knight", 35)
    playerDeck.push(card1)
    let card2 = new CardSprite(assets.image`bonfire`, SpriteKind.Card, "bonfire", 45)
    playerDeck.push(card2)
    let card3 = new CardSprite(assets.image`crown`, SpriteKind.Card, "crown", 25)
    playerDeck.push(card3)
    let card4 = new CardSprite(assets.image`delivery`, SpriteKind.Card, "delivery", 10)
    playerDeck.push(card4)
    let card5 = new CardSprite(assets.image`joker`, SpriteKind.Card, "joker", 20)
    playerDeck.push(card5)
}

function drawHand(number_of_cards: number) {

}

function displayHand(hand: CardSprite[]) {
    let xPosition = 1
    for (let i = 0; i < hand.length; i++) {
        tiles.placeOnTile(hand[i], tiles.getTileLocation(xPosition, 6))
        xPosition += 2
    }
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
// main
loadHub()