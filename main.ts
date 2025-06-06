// not done
// there's a good chance that this ends up being too ambitious and I won't have enough time
namespace SpriteKind {
    export const Signpost = SpriteKind.create()
    export const Shop = SpriteKind.create()
}
// globals
let playerSprite: Sprite = null
let inHub = true
// classes

// functions
function loadHub(): void {
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

function loadLevel(levelNumber: number): void {
    
}
// event handlers
sprites.onOverlap(SpriteKind.Player, SpriteKind.Signpost, function(sprite: Sprite, otherSprite: Sprite) {
    if (controller.A.isPressed()) {
        if (inHub) {
            game.splash("yay it worked")
            inHub = false
        }
    }
    otherSprite.sayText("Press A to continue", 300)
})
// main
loadHub()