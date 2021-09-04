import chalk from 'chalk'
import ora from 'ora'

class Spinner {
  constructor() {
    this.normalSpinner = {
      frames: [
        '▰▱▱▱▱▱▱▱▱▱',
        '▰▰▱▱▱▱▱▱▱▱',
        '▰▰▰▱▱▱▱▱▱▱',
        '▰▰▰▰▱▱▱▱▱▱',
        '▰▰▰▰▰▱▱▱▱▱',
        '▰▰▰▰▰▰▱▱▱▱',
        '▰▰▰▰▰▰▰▱▱▱',
        '▰▰▰▰▰▰▰▰▱▱',
        '▰▰▰▰▰▰▰▰▰▱',
        '▰▰▰▰▰▰▰▰▰▰',
        '▰▱▱▱▱▱▱▱▱▱',
      ],
      interval: 80,
    }

    this.progressSpinner = {
      frames: [''],
      interval: 80,
    }

    this.ora = ora()
  }

  _getProgressBar(percentage) {
    const progressCharsCount = Math.floor(percentage * 10)

    return `\x08`.concat(chalk.yellow(`\x08${'▰'.repeat(progressCharsCount)}${'▱'.repeat(10 - progressCharsCount)}`))
  }

  start(message) {
    this.ora.spinner = this.normalSpinner
    this.ora.start(message)
  }

  progress(message, percentage) {
    this.ora.spinner = this.progressSpinner
    this.ora.text = `${this._getProgressBar(percentage)} ${message}`
  }

  update(message) {
    this.ora.text = message
  }

  fail(message) {
    this.ora.fail(message)
  }

  succeed(message) {
    this.ora.succeed(message)
  }
}

export default new Spinner()
