(() => {
  'use strict';

  enchant();

  const canvasSize = 320;
  const spriteSize = 32;
  const bearArea = canvasSize - spriteSize * 2;

  const core = new Core(canvasSize, canvasSize);
  core.preload('images/chara1.png');
  core.fps = 15;

  let score = 0;
  let timeLeft = 5 * core.fps;

  core.onload = () => {
    const bear = new Sprite(spriteSize, spriteSize);
    bear.x = rand(bearArea);
    bear.y = rand(bearArea);
    bear.frame = 0;
    bear.image = core.assets['images/chara1.png'];

    bear.on('touchstart', function (e) {
      scoreLabel.text = `Score: ${++score}`;
      this.x = rand(bearArea);
      this.y = rand(bearArea);
    });

    const scoreLabel = new Label('Score 0');
    scoreLabel.x = 200;
    scoreLabel.y = 5;

    const timeLabel = new Label('Time: ?');
    timeLabel.x = 5;
    timeLabel.y = 5;

    core.on('enterframe', function (e) {
      timeLabel.text = `Time: ${--timeLeft}`;
      if (timeLeft <= 0) {
        alert(`Your score: ${score}`);
        this.stop();
      }
    });

    core.rootScene.addChild(bear);
    core.rootScene.addChild(scoreLabel);
    core.rootScene.addChild(timeLabel);
  };

  core.start();

  const rand = (n) => Math.floor(Math.random() * (n + 1));

})();
