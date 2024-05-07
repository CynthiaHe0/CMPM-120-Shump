class Player_bullet extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {        
        super(scene, x, y, texture, frame);
        this.visible = false;
        this.active = false;
        this.setScale(0.75);
        return this;
    }
    update() {
        if (this.active) {
            this.y -= this.speed;
            if (this.y < -(this.displayHeight/2)) {
                this.makeInactive();
            }
        }
    }
    makeActive() {
        this.visible = true;
        this.active = true; 
    }

    makeInactive() {
        this.visible = false;
        this.active = false;
        this.x = -100;
        this.y = -100;
    }
}