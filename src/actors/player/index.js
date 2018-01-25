import Octocat from './octocat'
import { PLAYER } from '../../shared/config'
import { getIsAvailable } from '../../shared/utils'

class Player extends Phaser.Group {

  constructor(game, name) {

    super(game, null, name)

    this.dead = false
    this.fireTime = 0
    this.currentPosition = 0

    this.y = PLAYER.y
    this.x = PLAYER.x

    this.die = this.die.bind(this)
    this.fire = this.fire.bind(this)
    this.move = this.move.bind(this)
    this.render = this.render.bind(this)
    this.goLeft = this.goLeft.bind(this)
    this.goRight = this.goRight.bind(this)

    PLAYER.frames.forEach((coordinates, frame) => {

      this.addChild(new Octocat(this.game, name, coordinates, frame))

    })

    this.game.world.addChild(this)

  }

  die() {

    this.dead = true
    this.game.sound.play('die')

  }

  fire() {

    this.game.sound.play('press')

    this.children[this.currentPosition].fire()
    this.fireTime = this.game.time.now

  }

  move() {

    this.game.sound.play('press')

    this.children.forEach((octocat, index) => {

      if (this.currentPosition !== index) {

        return octocat.disable()

      }

      return octocat.activate()

    })

  }

  goLeft() {

    if (!this.children[this.currentPosition - 1]) {

      return

    }

    this.currentPosition--

    this.move()

  }

  goRight() {

    if (!this.children[this.currentPosition + 1]) {

      return

    }

    this.currentPosition++

    this.move()

  }

  render() {

    const isUpdateAvailable = getIsAvailable(this.fireTime, this.game.time.now, Player.timeout)

    if (isUpdateAvailable) {

      this.children[this.currentPosition].disarm()

    }

  }

}

export default Player
