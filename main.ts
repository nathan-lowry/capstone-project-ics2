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
// "knight", "bonfire", "crown", "delivery", "joker"
// classes

class CardSprite extends sprites.ExtendableSprite {
    name: string
    cost: number
    constructor(image: Image, kind: number, name: string, cost: number) {
        super(image, kind)
        if (name == "knight") {
            this.setImage(assets.image`knightImage`)
        }
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

function initializeHand() {
    let card = new CardSprite(assets.image`knight`, SpriteKind.Card, "knight", 35)
    playerHand.push(card)
}

function displayHand(hand: CardSprite[]) {
    let xPosition = 2
    for (let i = 0; i < hand.length; i++) {
        tiles.placeOnTile(hand[i], tiles.getTileLocation(xPosition, 6))
    }
}

function loadLevel(levelNumber: number): void {
    inBattle = true
    sprites.destroyAllSpritesOfKind(SpriteKind.Player)
    sprites.destroyAllSpritesOfKind(SpriteKind.Signpost)
    sprites.destroyAllSpritesOfKind(SpriteKind.Shop)
    if (levelNumber == 1) {
        tiles.setCurrentTilemap(tilemap`firstLevel`)
        scene.setBackgroundColor(13)
    }
    displayHand(playerHand)
}
// event handlers
sprites.onOverlap(SpriteKind.Player, SpriteKind.Signpost, function(sprite: Sprite, otherSprite: Sprite) {
    if (controller.A.isPressed()) {
        if (inHub) {
            inHub = false
            initializeHand()
            loadLevel(currentLevel)

        }
    }
    otherSprite.sayText("Press A to continue", 300)
})
// main
loadHub()