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
        //this.path.points.push({x: this.x, y: this.y});
        //this.path.points.unshift({x: this.x, y: this.y});
        console.log(this.path);
        this.startFollow({
            delay: 0,
            duration: 6000,
            ease: "Sine.EaseInOut",
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