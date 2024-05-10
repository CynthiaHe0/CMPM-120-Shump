class Lightning extends Phaser.GameObjects.Sprite{
    constructor(scene, x, y, texture, frame) {        
        super(scene, x, y, texture, frame);
        this.visible = false;
        this.active = false;
        this.setScale(0.5);
        return this;
    }
    update() {
        if (this.active) {
            //Play lightning animation
            this.makeInactive();
        }
    }
    makeActive(x, y) {
        this.x = x;
        this.y = y;
        this.visible = true;
        this.active = true;
    }

    makeInactive() {
        this.visible = false;
        this.active = false;
        this.x = -100;
        this.y = -100;
        console.log("ice bullet inactive now");
    }
}