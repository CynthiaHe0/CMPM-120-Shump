class Level_1 extends Phaser.Scene {
    constructor(){
        super("level_1");
        this.my = {sprite: {}};
        this.playerSpeed = 8;
        this.playerBulletSpeed = 10;
        this.playerBulletCooldown = 10;

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
            maxSize: 5,
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
        let crystal_path = new Phaser.Curves.Spline([
            750, this.crystal_y,
            650, my.sprite.player.y - 70,
            550, this.crystal_y,
            450, my.sprite.player.y - 70,
            350, this.crystal_y,
            250, my.sprite.player.y - 70,
            150, this.crystal_y,
            50, my.sprite.player.y - 70,
        ]);
        
        for (let i = 0; i < 5; i ++){
            let copy = Phaser.Utils.Objects.DeepCopy(crystal_path);
            let h = 4;
            for(let j = 0; j < 5; j++){
                if (j > i){
                    copy.points.unshift({x: 70 + h*160, y:this.crystal_y});
                    h--;
                } else if (j < i){
                    copy.points.push({x: 70 + j*160, y:this.crystal_y});
                }
            }
            copy.points.push({x: 70 + i*160, y:this.crystal_y});
            copy.points.unshift({x: 70 + i*160, y:this.crystal_y}); 
            let follower = new Crystal_enemy(
                this,
                copy,
                70 + i*160,
                this.crystal_y,
                "crystal_enemy"
            );
            follower.setScale(0.5);
            my.sprite.crystal_enemies.add(follower, true);
            follower.makeActive();
        }
        console.log(my.sprite.crystal_enemies);
        
        my.sprite.ice_bullets = this.add.group({
            active: true,
            defaultKey: "ice",
            maxSize: 20,
            runChildUpdate: true
            }
        );
        my.sprite.ice_bullets.createMultiple({
            classType: Ice_bullet,
            active: false,
            key: my.sprite.ice_bullets.defaultKey,
            repeat: my.sprite.ice_bullets.maxSize-1
        });
        my.sprite.ice_bullets.propertyValueSet("speed", this.enemyBulletSpeed);
        my.sprite.ice_bullets.setXY(-100, -100);
    }
    update(){
        let my = this.my;
        my.sprite.playerBullets.spawn(my.sprite.player.x, my.sprite.player.y);
        my.sprite.player.update();
        for (let bullet of my.sprite.playerBullets.getChildren()){
            if (bullet.active){
                let hit = this.check_hit_enemy(bullet, my.sprite.crystal_enemies);
                if (hit == null){
                    console.log("Bullet still flying");
                    //this.enemy_shot(bullet, my.sprite.crystal_enemies);
                    //Now check to see if it hit the clouds
                }
            }
        }
        for (let ice_enemy of my.sprite.crystal_enemies.getChildren()){
            if (ice_enemy.active == true && ice_enemy.shoot == true){
                let ice_bullet = my.sprite.ice_bullets.getFirstDead();
                if (ice_bullet != null){
                    ice_bullet.makeActive(ice_enemy.x, ice_enemy.y);
                }
                ice_enemy.shoot = false;
            }
        }
    }
    check_hit_enemy(bullet, enemygroup){
        for (let enemy of enemygroup.getChildren()){
            if (this.collides(bullet, enemy)){
                bullet.makeInactive();
                enemy.makeInactive();
                return enemy;
            }
        }
        return null;
    }
    collides(a, b) {
        if (Math.abs(a.x - b.x) > (a.displayWidth/2 + b.displayWidth/2)) return false;
        if (Math.abs(a.y - b.y) > (a.displayHeight/2 + b.displayHeight/2)) return false;
        return true;
    }
}