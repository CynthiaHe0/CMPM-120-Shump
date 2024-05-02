class Level_1 extends Phaser.Scene {
    constructor(){
        super("level_1");
        this.my = {sprite: {}};
        this.playerSpeed = 5;
        this.playerBulletSpeed = 5;
    }
    preload(){
        //Preload the images
        this.load.setPath("./assets");
        this.load.image("cloud_enemy", "cloud.png");
        this.load.image("lighting", "lighting_blue.png");
        this.load.image("player", "sun1.png");
        this.load.image("crystal_enemy", "Ice_crystal.png");
        this.load.image("fireball", "flame.png");
    }
    create(){
        let my = this.my;

        this.left1 = this.input.keyboard.addKey("A");
        this.right1 = this.input.keyboard.addKey("D");
        this.left2 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        this.right2 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        this.space = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        my.sprite.player = new Player(this, game.config.width/2, game.config.height - 40, "player", null,
        [this.left1, this.left2], [this.right1, this.right2], this.playerSpeed);
        my.sprite.player.setScale(0.5);
        
        my.sprite.playerBullets = new Player_bullet_group(this, {
            active: true,
            defaultKey: "fireball",
            maxSize: 10,
            runChildUpdate: true
            }
        );

        
        my.sprite.playerBullets.createMultiple({
            classType: Player_bullet,
            active: false,
            key: my.sprite.playerBullets.defaultKey,
            repeat: my.sprite.playerBullets.maxSize-1
        });
        my.sprite.playerBullets.propertyValueSet("speed", this.playerBulletSpeed);
        my.sprite.playerBullets.add_trigger_key(this.space);
        console.log(my.sprite.playerBullets);
    }
    update(){
        let my = this.my;
        my.sprite.playerBullets.update(my.sprite.player.x, my.sprite.player.y);
        my.sprite.player.update();
    }
}