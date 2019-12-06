var config = {
    type: Phaser.CANVAS,
    width: 1200,
    height: 900,
    physics: {
        default: 'arcade',
        arcade: { 
            debug: true,
        }
    },
    scene: {
        preload: preload,
        create: create
    }
};


var game = new Phaser.Game(1200, 900, Phaser.CANVAS, "", this, false, true, {"arcade":true,debug:true});
function init() {
    game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    game.scale.pageAlignHorizontally = true;
    game.scale.pageAlignVertically = true;
}
function preload() {
	//game.load.image('bot','assets/gfx/player.png');
	game.load.image('banane','assets/gfx/banane.jpg');
	game.load.spritesheet('bot','assets/gfx/character1.png',188,136,10);
	game.load.image('route', 'assets/gfx/route.jpg');
	//game.load.image('voiture','assets/gfx/bus-png-top-view.png');
	game.load.image('voiture','assets/gfx/car4.png');
	//game.load.atlasJSONHash('bot','assets/gfx/player.png');;
}
function create() {
	
	murs = game.world.setBounds(0, 0, 1200, 900);
	
	game.add.tileSprite(0, 0, 1200, 900, 'route');
	
    //game.stage.background = 0xaaaaaa;
    this.speed=20;
    this.delay=5000;
    
    robot = game.add.sprite(game.world.centerX, game.world.centerY, 'bot');
    this.robot.anchor.setTo(0.5, 0.5);
    this.robot.scale.setTo(0.6, 0.6);
    this.robot.animations.add('run',[1,2,3,4,5,6,7,8,9,10],speed,true);
    this.robot.animations.add('idle',[0],speed,true);
    this.robot.play('idle');
    
    ROTATION_SPEED = 280; // degrees/second
    game.physics.enable(robot, Phaser.Physics.ARCADE);
	
	robot.body.collideWorldBounds=true;
	
    
    
    //Generation de voiture
    
    voiture = game.add.sprite(360,-250,'voiture');
    this.voiture.anchor.setTo(0.5,0.5);
    this.voiture.scale.setTo(0.5,0.5);
    this.game.add.tween(this.voiture).to({y:900+this.voiture.height},delay,Phaser.Easing.Linear.None,true,500,-1);
    game.physics.enable(voiture, Phaser.Physics.ARCADE);
    
    //groupe voiture
    cars = this.game.add.group();   
    this.robot.body.setSize(110,110,30,30);

}
speedDIR= 8;
modifs = {
	1: {angle:-90, speedX:-1, speedY:0 },
	2: {angle:180, speedX:0, speedY:1},
	3: {angle:-135, speedX:-1, speedY:1},
	4: {angle:90, speedX:1, speedY:0},
	6: {angle:135, speedX:1, speedY:1},
	8: {angle:0, speedX:0, speedY:-1},
	9: {angle:-45, speedX:-1, speedY:-1},
	12: {angle:45, speedX:1, speedY:-1}
	
}

function update() {
	dir = game.input.keyboard.isDown(Phaser.Keyboard.LEFT) +
	game.input.keyboard.isDown(Phaser.Keyboard.DOWN) *2 +
	game.input.keyboard.isDown(Phaser.Keyboard.RIGHT) *4 +
	game.input.keyboard.isDown(Phaser.Keyboard.UP) *8;
	
	game.physics.arcade.collide(robot, voiture, collisionHard);
	
	
	if (modifs[dir]){
	
		
	robot.angle = modifs[dir].angle;
	robot.x+=modifs[dir].speedX*speedDIR;
	robot.y+=modifs[dir].speedY*speedDIR;
	}
	if (dir!=0){
		this.robot.play('run');
	}else{
	this.robot.play('idle');
	}

}

function collisionHard(){
	//this.game.physics;
}

function render() {
	game.debug.body(robot);
	game.debug.body(voiture);
    game.debug.spriteInfo(robot, 20, 32);

}

/*function onYoyoHandler (tween, target)
{
    console.log(arguments);

    target.toggleFlipX().setAlpha(0.2 + Math.random());
}*/