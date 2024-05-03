class Level_1 extends Phaser.Scene {
    constructor(){
        super("level_1");
        this.my = {sprite: {}};
        this.playerSpeed = 5;
        this.playerBulletSpeed = 5;
        this.playerBulletCooldown = 5;

        this.enemyBulletSpeed = 10;
        this.crystal_y = 190;
    }
    preload(){
        //Preload the images
        this.load.setPath("./assets");
        this.load.image("cloud_enemy", "cloud.png");
        this.load.image("lighting", "lighting_blue.png");
        this.load.image("player", "sun1.png");
        this.load.image("crystal_enemy", "Ice_crystal.png");
        this.load.image("fireball", "flame.png");
        this.load.image("ice", "laserBlue10.png");
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
        my.sprite.playerBullets.add_trigger_n_cooldown(this.space, this.playerBulletCooldown);
        my.sprite.playerBullets.setXY(-100, -100);
        
        //THIS ONE LINE OF CODE MAKES THE ENTIRE CUSTOM GROUP WORK
        //AND ALLOWS FOR CHILD UPDATES!!!!!
        this.add.existing(my.sprite.playerBullets);

        //================================================
        //  Start of enemy setup
        my.sprite.crystal_enemies = this.add.group({
            active: true,
            defaultKey: "crystal_enemy",
            maxSize: 5,
            runChildUpdate: true
            }
        );
        my.sprite.crystal_enemies.createMultiple({
            classType: Crystal_enemy,
            active: false,
            key: my.sprite.crystal_enemies.defaultKey,
            repeat: my.sprite.crystal_enemies.maxSize-1,
            setXY: {
                x : 70,
                y : this.crystal_y,
                stepX: 160
            },
            setScale: {x: 0.5, y: 0.5}
        });
        let crystal_path = new Phaser.Curves.Spline([
            820, this.crystal_y,
            970, 313,
            808, 539,
            614, 410,
            509, 580,
            304, 414,
            160, 558,
            25,  306,
            150, this.crystal_y,

        ]);
        my.sprite.crystal_enemies.propertyValueSet("path", crystal_path);
        
        /*my.sprite.crystal_bullets = this.add.group({
            active: true,
            defaultKey: "ice",
            maxSize: 20,
            runChildUpdate: true
            }
        );
        my.sprite.crystal_bullets.propertyValueSet("speed", this.enemyBulletSpeed);
        */
    }
    update(){
        let my = this.my;
        my.sprite.playerBullets.spawn(my.sprite.player.x, my.sprite.player.y);
        my.sprite.player.update();
    }
}