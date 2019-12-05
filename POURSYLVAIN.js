var game = new Phaser.Game(1200, 900, Phaser.CANVAS, "", this, false, true, {"arcade":true});
function init() {
    game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    game.scale.pageAlignHorizontally = true;
    game.scale.pageAlignVertically = true;
}
function preload() {
	//game.load.image('bot','assets/gfx/player.png');
	game.load.spritesheet('bot','assets/gfx/SPRITE.png',264,354,3);
	game.load.image('route', 'assets/gfx/route.jpg');
	//game.load.atlasJSONHash('bot','assets/gfx/player.png');;
}
function create() {
	this.speed=7;
    game.stage.backgroundColor = 0xaaaaaa;
    this.game.add.image(0,0,'route');
    robot = game.add.sprite(game.world.centerX, game.world.centerY, 'bot');
    this.robot.anchor.setTo(0.5, 0.5);
    this.robot.scale.setTo(0.5, 0.5);
    this.robot.animations.add('idle',[0,1,2],speed,true);
    this.robot.play('idle');
    ROTATION_SPEED = 280; // degrees/second
    game.physics.enable(s, Phaser.Physics.ARCADE);
    /*s.animations.add('run');
    s.animations.play('run', 10, true);*/
}

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
	speedDIR= 4;
	dir = game.input.keyboard.isDown(Phaser.Keyboard.LEFT) +
	game.input.keyboard.isDown(Phaser.Keyboard.DOWN) *2 +
	game.input.keyboard.isDown(Phaser.Keyboard.RIGHT) *4 +
	game.input.keyboard.isDown(Phaser.Keyboard.UP) *8;
	if (modifs[dir]){
	
	robot.angle = modifs[dir].angle;
	robot.x+=modifs[dir].speedX*speedDIR;
	robot.y+=modifs[dir].speedY*speedDIR;
	}

}

function render() {
    game.debug.spriteInfo(robot, 20, 32);

}
