//This player sprite implementation was copied from Professor Whitehead's player sprite
class Player extends Phaser.GameObjects.Sprite{
    //leftKey and rightKey need to be listeners for the key press
    constructor(scene, x, y, texture, frame, leftKey, rightKey, playerSpeed){
        super(scene, x, y, texture, frame);
        //Still not sure what super does but I assume it has to do with inheritance?
        this.left = leftKey;
        this.right = rightKey;
        this.playerSpeed = playerSpeed;

        scene.add.existing(this);

        return this;
    }
    update(){
        // Moving left
        if (this.left.isDown) {
            // Check to make sure the sprite can actually move left
            if (this.x > (this.displayWidth/2)) {
                this.x -= this.playerSpeed;
            }
        }

        // Moving right
        if (this.right.isDown) {
            // Check to make sure the sprite can actually move right
            if (this.x < (game.config.width - (this.displayWidth/2))) {
                this.x += this.playerSpeed;
            }
        }
    }
}