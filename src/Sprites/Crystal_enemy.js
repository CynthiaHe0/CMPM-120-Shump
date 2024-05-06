class Crystal_enemy extends Phaser.GameObjects.PathFollower {
    constructor(scene, path, x, y, texture, frame) {        
        super(scene, path, x, y, texture, frame);
        this.visible = false;
        this.active = false;
        console.log("Crystal enemy created");
        return this;   
    }
    makeActive() {
        this.visible = true;
        this.active = true;
        //this.path
        this.startFollow({
            delay: 0,
            duration: 2000,
            ease: 'Sine.easeInOut',
            repeat: -1,
            yoyo: false
        });
        
    }

    makeInactive() {
        this.visible = false;
        this.active = false;
        this.stopFollow();
        this.x = -100;
        this.y = -100;
    }
}