//This player sprite implementation was copied from Professor Whitehead's player sprite
class Player extends Phaser.GameObjects.Sprite{
    //I changed leftKey and rightKey so they need to be an array of listeners for the keys
    constructor(scene, x, y, texture, frame, leftKey, rightKey, playerSpeed){
        //x and y are the boundaries of the game screen
        super(scene, x, y, texture, frame);
        //Still not sure what super does but I assume it has to do with inheritance?
        this.left1 = leftKey[0];
        this.left2 = leftKey[1];
        this.right1 = rightKey[0];
        this.right2 = rightKey[1];
        this.playerSpeed = playerSpeed;

        scene.add.existing(this);

        return this;
    }
    update(){
        // Moving left
        if (this.left1.isDown || this.left2.isDown) {
            // Check to make sure the sprite can actually move left
            if (this.x > (this.displayWidth/2)) {
                this.x -= this.playerSpeed;
            }
        }

        // Moving right
        if (this.right1.isDown || this.right2.isDown) {
            // Check to make sure the sprite can actually move right
            if (this.x < (game.config.width - (this.displayWidth/2))) {
                this.x += this.playerSpeed;
            }
        }
    }
}