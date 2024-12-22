var randomizedQuestionsVerification = [
    {
        question: "What is the purpose of verifying information?",
        answers: ["A  To ensure accuracy and reliability", "B  To spread misinformation", "C  To make information more confusing", "D  To limit access to information"],
        correctIndex: 0
    },
    {
        question: "Why is it important to verify the source of information?",
        answers: ["A  To prevent the spread of false information", "B  To increase internet traffic", "C  To make information harder to find", "D  It is not important"],
        correctIndex: 0
    },
    {
        question: "What are some methods for verifying information?",
        answers: ["A  Checking multiple reliable sources", "B  Believing everything you read", "C  Sharing without fact-checking", "D  Ignoring conflicting information"],
        correctIndex: 0
    },
    {
        question: "How can bias affect the verification process?",
        answers: ["A  It can lead to overlooking conflicting information", "B  It improves accuracy", "C  It speeds up the process", "D  It has no effect"],
        correctIndex: 0
    },
    {
        question: "What role does critical thinking play in information verification?",
        answers: ["A  It helps evaluate the credibility of sources", "B  It makes information more confusing", "C  It slows down the verification process", "D  It is not necessary"],
        correctIndex: 0
    },
    {
        question: "Why is it important to verify information before sharing it?",
        answers: ["A  To prevent the spread of misinformation", "B  To increase social media followers", "C  To make information less accessible", "D  It is not important"],
        correctIndex: 0
    },
    {
        question: "What are the consequences of spreading unverified information?",
        answers: ["A  It can damage credibility and trust", "B  It improves online reputation", "C  It leads to faster dissemination of information", "D  There are no consequences"],
        correctIndex: 0
    }
    // add more questions
];


function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomizeQuestions(questionsArray) {
    const shuffledQuestions = [...questionsArray];

    for (let i = shuffledQuestions.length - 1; i > 0; i--) {
        const j = getRandomInt(0, i);
        const temp = shuffledQuestions[i];
        shuffledQuestions[i] = shuffledQuestions[j];
        shuffledQuestions[j] = temp;
    }

    return shuffledQuestions;
}
var verifyQuestions = []


class Verify extends Phaser.Scene {
    constructor() {
        super("verify")
        verifyQuestions = randomizeQuestions(randomizedQuestionsVerification);
    }
    preload() {
      //  console.log(config.height)
        // audio
        this.load.audio('jump', './audio/jump.mp3');
        this.load.audio('dead', './audio/dead.mp3');
        this.load.audio('run', './audio/run.wav');
        this.load.audio('attackAudio', './audio/slash-21834.mp3');
        this.load.audio('explosion', './audio/sfx-explosion.wav');
        this.load.audio('au1', './audio/Abstract2.mp3');
        this.load.audio('au2', './audio/African2.mp3');
        this.load.audio('au3', './audio/Coffee1.mp3');
        this.load.image("tiles", "assets/social/Platform-Tiles64.png")

        this.load.tilemapTiledJSON("map3", "assets/verify/verify.json")

        this.load.atlas("player", "assets/social/player.png", "assets/social/player.json")
        this.load.atlas("enemy", "assets/social/enemy.png", "assets/social/enemy.json")
        this.load.atlas("boom", "assets/verify/boom.png", "assets/verify/boom.json")
        this.load.spritesheet('explosion', 'assets/social/Burst of ice.png', {
            frameWidth: 128,
            frameHeight: 128
        });
        this.load.image('black', './assets/black.png')
        this.load.image("bg", "assets/social/bg.png")
    }
    addExplodeEffect() {
        this.effectHasplay = false
        var animationConfig = {
            key: 'explouse_anim',
            frames: this.anims.generateFrameNumbers('explosion', { start: 0, end: 6, }),
            frameRate: 14,
            repeat: 0
        };
        this.anims.create(animationConfig);

        this.explouseEffect = this.add.sprite(400, 300, 'explosion').setDepth(5).setScale(2)
        this.explouseEffect.visible = false;
    }
    addPlayerAnimate() {
        this.anims.create({
            key: "idle_anims",
            frames: this.anims.generateFrameNames("player", {
                prefix: "FR_Adventurer_Idle_", end: 11, zeroPad: 3,
            }),
            repeat: -1,
            frameRate: 20
        })
        this.anims.create({
            key: "run_anims",
            frames: this.anims.generateFrameNames("player", {
                prefix: "FR_Adventurer_Run_", end: 9, zeroPad: 3,
            }),
            repeat: -1,
            frameRate: 25
        })
        this.anims.create({
            key: "jump_anims",
            frames: this.anims.generateFrameNames("player", {
                prefix: "FR_Adventurer_Run_00"
            }),
            repeat: 0,
            frameRate: 20
        })
        this.anims.create({
            key: "fall_anims",
            frames: this.anims.generateFrameNames("player", {
                prefix: "FR_Adventurer_Run_00",
                zeroPad: 0,
                start: 4, // frame start index
                end: 4,   // frame end index (same as start for single frame)
            }),
            repeat: 0,
            frameRate: 20
        });
        this.anims.create({
            key: "attack_anims",
            frames: this.anims.generateFrameNames("player", {
                prefix: "FR_Adventurer_Slash_", end: 7, zeroPad: 3,
            }),
            repeat: 0,
            frameRate: 20
        })
        this.anims.create({
            key: "hurt_anims",
            frames: this.anims.generateFrameNames("player", {
                prefix: "FR_Adventurer_Hurt_", end: 5, zeroPad: 3,
            }),
            repeat: 0,
            frameRate: 18
        })
        this.anims.create({
            key: "dead_anims",
            frames: this.anims.generateFrameNames("player", {
                prefix: "FR_Adventurer_Dead_", end: 8, zeroPad: 3,
            }),
            repeat: 0,
            frameRate: 20
        })
        this.anims.create({
            key: "explouse_anims",
            frames: this.anims.generateFrameNames("boom", {
                prefix: "boom", start: 1, end: 9, zeroPad: 3,
            }),
            repeat: 0,
            frameRate: 17,
        })
        this.anims.create({
            key: "boom_anims",
            frames: this.anims.generateFrameNames("boom", {
                prefix: "boomon", start: 1, end: 9, zeroPad: 3,
            }),
            repeat: -1,
            frameRate: 20
        })
    }


    // addHome() {
    //     this.home = this.add.text(90 / 100 * config.width, 5 / 100 * config.height, "HOME", { fontSize: '30px', fontFamily: 'Times New Roman', fill: 'white' }).setDepth(8).setInteractive();
    //     // this.home.visible = false
    //     this.home.on('pointerover', () => {
    //         this.home.setColor('#00ff00');
    //     });
    //     this.home.on('pointerout', () => {
    //         this.home.setColor('white');
    //     });
    //     this.home.on('pointerdown', () => {
    //         this.DupMusic.play()
    //         this.home.setColor('red');
    //         this.scene.start("mainMenu")
    //     });
    //     this.home.on('pointerup', () => {
    //         this.home.setColor('white');
    //     });
    // }
    addAudio() {
        this.jumpMusic = this.sound.add('jump').setVolume(5);
        this.runMusic = this.sound.add('run').setVolume(4);
        this.deadMusic = this.sound.add('dead').setVolume(4);
        this.btnMusic = this.sound.add('au3').setVolume(6);
        this.DupMusic = this.sound.add('au2').setVolume(6);
        this.attackMusic = this.sound.add('attackAudio').setVolume(5);
        this.explosionMusic = this.sound.add('explosion').setVolume(5);
    }
    addAvatarAndFrame(){
        if(!localStorage.getItem('avatar'))
        localStorage.setItem('avatar', "CasualAvatar_00");
        var avatarequip=localStorage.getItem('avatar')
        this.avatarEquiped = this.add.sprite(2.35 / 100 * config.width, 3.62 / 100 * config.height,'avatars',avatarequip).setScale(0.16555).setOrigin(0,0).setInteractive()
        this.frame=this.add.rectangle(2.1 / 100 * config.width, 3.2 / 100 * config.height,50,50,0xff0000).setOrigin(0,0).setAlpha(1)
        this.frame.setDisplaySize(this.avatarEquiped.width*0.16555+0.5 / 100 * config.width,this.avatarEquiped.height*0.16555+ 0.8 / 100 * config.height)
        this.avatarEquiped.destroy()
        this.avatarEquiped = this.add.sprite(2.35 / 100 * config.width, 3.62 / 100 * config.height,'avatars',avatarequip).setScale(0.16555).setOrigin(0,0).setInteractive()
    }
    create() {
        this.addPlayerAnimate()
        this.addAudio()
        this.boom = 0
        this.totalScore = 0
        this.add.image(0, 0, 'bg').setOrigin(0, 0).setDisplaySize(config.width, config.height)
        // this.add.rectangle(0,0,25 / 100 * config.width,config.height,1).setOrigin(0,0).setDepth(6)
        // this.add.rectangle(77.5 / 100 * config.width,0,25 / 100 * config.width,config.height,1).setOrigin(0,0).setDepth(6)
        const map = this.make.tilemap({ key: "map3", tileWidth: 16, tileHeight: 16 })
        const tileset = map.addTilesetImage("tiles", "tiles")
        this.layerFront = map.createLayer("Tile Layer 1", tileset, 0,80/100*config.height)
        var layerWidth = this.layerFront.width;
        this.layerFront.displayWidth=config.width
        //console.log(this.layerFront.displayWidth=200)
        var layerHeight= this.layerFront.height
        this.playerState = {
            attack: "attack_anims",
            run: "run_anims",
            idle: "idle_anims",
            hurt: "hurt_anims",
            dead: "dead_anims",
            jump: "jump_anims",
            fall: "fall_anims"
        }
        this.currentIndex = 0;
        // this.addEnemy()
        this.player = new ObjectGameVerify(this, 55 / 100 * config.width, config.height  - 80/100*config.height, "player", this.playerState)
        this.physics.world.enable(this.player.body);
        this.physics.world.setBounds(25, -40/layerHeight, config.width-25,config.height+500);
        this.player.body.setCollideWorldBounds(true);
        this.player.body.flipX = true
        this.canAskNewQues = true
        this.win = false
        this.lose = false;
        this.table = false
        this.addCollision()
        // this.createBoom()
        //this.addQuestion()
        this.canPlay = false
        this.rightAnswers = false
        this.max = 0;
        this.isTurnBoom = true
        this.addAvatarAndFrame()
        this.addMenuInstruction()
        this.addDark()

    }
    addCollision() {
        this.physics.add.collider(this.player.body, this.layerFront, (player,layer) => { this.player.isgrounded = true; })
        this.layerFront.setCollisionBetween(1, 40)
        //this.layerFront.setCollisionByExclusion([0]);
    }
    addQuestion() {
        this.canAskNewQues = false
        this.ques = null
        this.ques = new QuestionVerify(this)
        this.ques.currentQuestionIndex=this.currentIndex
        this.darkness2 = this.add.image(0, 0, "black").setOrigin(0, 0).setDisplaySize(config.width, config.height)
        this.darkness2.alpha = 0
        this.tweens.add({
            targets: this.darkness2,
            alpha: 0.9,
            duration: 1000,
            ease: 'Linear',
            onComplete: () => {
                this.ques.createQuestions()
                this.currentIndex++
            }
        })
    }
    addDark(_Text) {
        // if (this.darkness2)
        //     this.darkness2.destroy()
        this.restart = this.add.text(38 / 100 * config.width, 65 / 100 * config.height, "RESTART", { fontSize: '30px', fontFamily: 'Times New Roman', fill: 'white' }).setDepth(5).setInteractive();
        this.restart.visible = false
        this.restart.on('pointerover', () => {
            this.restart.setColor('#00ff00');
        });
        this.restart.on('pointerout', () => {
            this.restart.setColor('white');
        });
        this.restart.on('pointerdown', () => {
            this.DupMusic.play()
            this.restart.setColor('red');
          //  verifyQuestions = randomizeQuestions(randomizedQuestionsVerification);
            this.scene.restart();
        });
        this.restart.on('pointerup', () => {
            this.restart.setColor('white');
        });


    }
    addMenuInstruction() {
        verifyQuestions = randomizeQuestions(randomizedQuestionsVerification);
        this.darkness2 = this.add.image(0, 0, "black").setOrigin(0, 0).setDisplaySize(config.width, config.height)
        this.darkness2.alpha = 0
        this.tweens.add({
            targets: this.darkness2,
            alpha: 0.9,
            duration: 2000,
            ease: 'Linear',
            onComplete: () => {
                var fontSize="20px"
                this.textInstruction = this.add.text(27 / 100 * config.width, 100, "Move the character with the arrow buttons to avoid boom", { fontSize: fontSize, fontFamily: 'Times New Roman', fill: 'white' }).setDepth(5);
                setTimeout(() => {
                    //this.addHome()
                }, 2000);
                setTimeout(() => {
                    this.textInstruction.destroy()
                    this.tweens.add({
                        targets: this.darkness2,
                        alpha: 0,
                        duration: 2000,
                        ease: 'Linear',
                        onComplete: () => {
                            setTimeout(() => {
                                this.canPlay = true
                                this.displayTotalScore()
                            }, 2000);
                        }
                    })
                }, 1500);



            }
        })
    }
    displayTotalScore(_Text) {
        this.totalScoreText = this.add.text(1 / 100 * config.width, 18 / 100 * config.height, "SCORE :" + _Text, { fontSize: '45px', fontFamily: 'Times New Roman', fill: 'red' }).setDepth(7);
    }
    
    createBoom() {
        var width = (Math.random() * 100) / 100 * config.width;

        var height = -(Math.floor(Math.random() * (200)+50))
        var currentBoom = this.physics.add.sprite(width, height, 'boom')
        currentBoom.play("boom_anims").setOrigin(0, 0)
        var delta = Math.random()
        if (delta > 0.5) delta = 1
        else delta = -1
        currentBoom.body.setCollideWorldBounds(true);
        currentBoom.setVelocity(delta * (Math.random() * (100 - 90 + 1) + 90), null)
        var hasFall = false
        this.physics.add.overlap(currentBoom, this.layerFront, (element,layer) => {
            hasFall = true
            element.setVelocity(0, 0)
            element.setSize(100, 100).setOffset(0, -30)
            if (element.anims.currentAnim.key != "explouse_anims")
                element.play("explouse_anims")
            currentBoom.on('animationcomplete', (animation, frame) => {
                if (animation.key === 'explouse_anims') {
                    currentBoom.destroy()
                }
            }, this);
        })
        this.physics.add.overlap(currentBoom, this.player.body, (element) => {
            // if(!this.explosionMusic.isPlaying)
            // this.explosionMusic.play()
            element.setVelocity(0, 0)
            element.setSize(100, 100).setOffset(0, -30)
            if (!hasFall)
                this.lose = true
            if (element.anims.currentAnim.key != "explouse_anims")
                element.play("explouse_anims")
            currentBoom.on('animationcomplete', (animation, frame) => {
                if (animation.key === 'explouse_anims') {
                    currentBoom.destroy()

                }
            }, this);
        })

        currentBoom.setSize(30, 30).setOffset(35, 55)
        // currentBoom.body.setBounce(0.2);


    }
    addBoomRandom() {
        if (!this.isTurnBoom || this.max == 2) return
        this.createBoom();
        this.max++

        if (this.max == 2) {
            setTimeout(() => {
                this.max = 0
                this.totalScore += 3
            }, 400);
        }
    }
    playerDeadHandler() {
        this.lose = true; // Đặt trạng thái thua
    
        // Hiển thị thông báo giữa màn hình
        const gameOverText = this.add.text(config.width / 2, config.height / 2, 
            "Game Over\nPress Any Key to Restart", 
            { fontSize: '32px', fontFamily: 'Arial', color: '#FFFFFF', align: 'center' }
        ).setOrigin(0.5).setDepth(10);
    
        // Đảm bảo game không tiếp tục
     //   this.physics.pause();
        //this.player.body.setVelocity(0, 0);
    
        // Lắng nghe phím bất kỳ
        this.input.keyboard.once('keydown', () => {
            this.scene.restart(); // Reset lại cảnh chơi
        });
    }
    update() {
        if (!this.canPlay) return
   

        if (this.lose && !this.table) {
            this.totalScoreText.visible = false
            this.player.body.setVelocity(0, 0)
            this.player.dead = true
            this.deadMusic.play()
            this.player.body.play(this.playerState.dead)
            //this.scene.restart();
            this.table=true;
            if(this.lose){
                this.input.keyboard.once('keydown', () => {
                    this.scene.restart(); // Reset lại cảnh chơi
                });
            }
        }
        if (this.lose) return
        this.totalScoreText.setText("SCORE : " + this.totalScore)

        this.addBoomRandom()
        this.player.update()

    }
}
class StateMachine {

}
class ObjectGameVerify {
    constructor(_scene, _x, _y, _type, _state) {
        this.scene = _scene
        this.x = _x;
        this.y = _y;
        this.type = _type;
        this.state = _state;
        this.body = null;
        this.run = false
        this.dead = false
        this.idle = true
        this.canJump = false
        this.jump = false
        this.fall = false
        this.canMove = false
        this.createObject()
        this.addControl()

    }
    createObject() {
        this.body = this.scene.physics.add.sprite(this.x, this.y, this.type).setScale(0.2).play(this.state.idle)
        this.body.setSize(200, 630);

        // this.body.body.setBounds();
    }
    addControl() {
        this.scene.input.keyboard.on('keydown', (event) => {
            if (this.dead) return
            if (event.key === 'ArrowRight') {
                this.move(370, 0)
            } else if (event.key === 'ArrowLeft') {
                this.move(-370, 0)
            }
        });
        this.scene.input.keyboard.on('keyup', (event) => {
            if (this.dead) return
            this.move(0, 0)
            if (!this.idle) {
                this.idle = true
                this.run = false
                this.body.play(this.state.idle)
            }
        });
    }
    move(_velocityX, _velocityY) {
        if (this.dead) return
        if (_velocityX != 0 && !this.scene.runMusic.isPlaying) this.scene.runMusic.play()
        if (!this.run) {
            this.run = true
            this.idle = false
            this.body.play(this.state.run)
        }
        if (_velocityX > 0) this.body.flipX = true
        else if (_velocityX < 0) this.body.flipX = false
        // if(this.body.x<30/100*config.width&&_velocityX<0||this.body.x>73/100*config.width&&_velocityX>0)
        //    this.body.setVelocity(0,0)
        // else
        this.body.setVelocity(_velocityX, _velocityY)
    }
    dead() {

    }
    jump() {

    }
    update() {
    }
}

