// constants

// globals
let playerSprite: Sprite = null
// classes

// functions
function loadHub() {
    tiles.setCurrentTilemap(tilemap`hub`)
    let playerHolder = tiles.getTilesByType(assets.tile`playerPH`)
    for (let i = 0; i < playerHolder.length; i++) {
        playerSprite = sprites.create(assets.image`player`, SpriteKind.Player)
        tiles.placeOnTile(playerSprite, playerHolder[i])
        tiles.setTileAt(playerHolder[i], assets.tile`greenGrassTile`)
        controller.moveSprite(playerSprite, 80, 80)
        scene.cameraFollowSprite(playerSprite)
    }
}
// event handlers

// main
loadHub()