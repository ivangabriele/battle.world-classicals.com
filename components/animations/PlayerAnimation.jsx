/* eslint no-param-reassign: ["error", { "props": true, "ignorePropertyModificationsFor": ["$canvas"] }] */
/* eslint-disable max-classes-per-file */
/* eslint-disable no-new */

import { useEffect, useRef, useState } from 'react'

class Firefly {
  constructor(context, width, height) {
    this.context = context
    this.width = width
    this.height = height

    this.init()
  }

  init() {
    this.x = Math.random() * this.width
    this.y = Math.random() * this.height
    this.s = Math.random() * 2
    this.ang = Math.random() * 2 * Math.PI
    this.v = (this.s * this.s) / 4

    this.fireflies = []
  }

  move() {
    this.x += this.v * Math.cos(this.ang)
    this.y += this.v * Math.sin(this.ang)
    this.ang += (Math.random() * 20 * Math.PI) / 180 - (10 * Math.PI) / 180
  }

  show() {
    this.context.beginPath()
    this.context.arc(this.x, this.y, this.s, 0, 2 * Math.PI)
    this.context.fillStyle = 'rgba(255, 255, 255, 0.5)'
    this.context.fill()
  }
}

class FirefliesAnimation {
  constructor($window, $canvas) {
    this.$window = $window
    this.$canvas = $canvas
    this.context = $canvas.getContext('2d')

    this.init()
    this.update()
  }

  init() {
    this.width = this.$window.innerWidth
    this.height = this.$window.innerHeight
    this.fireflies = []

    this.$canvas.width = this.width
    this.$canvas.height = this.height

    this.context.fillRect(0, 0, this.width, this.height)
  }

  update() {
    this.$window.requestAnimationFrame(this.update.bind(this))
    this.context.clearRect(0, 0, this.width, this.height)

    this.draw()
  }

  draw() {
    if (this.fireflies.length < 100) {
      for (let index = 0; index < 10; index++) {
        this.fireflies.push(new Firefly(this.context, this.width, this.height))
      }
    }

    for (let index = 0; index < this.fireflies.length; index++) {
      const firefly = this.fireflies[index]

      firefly.move()
      firefly.show()
      if (firefly.x < 0 || firefly.x > this.width || firefly.y < 0 || firefly.y > this.height) {
        this.fireflies.splice(index, 1)
      }
    }
  }
}

export default function PlayerAnimation() {
  const canvasRef = useRef(null)
  const [hasRendered, setHasRendered] = useState(false)

  useEffect(() => {
    const $canvas = canvasRef.current

    if (!process.browser || hasRendered || $canvas === null) {
      return
    }

    const firefliesAnimation = new FirefliesAnimation(window, $canvas)
    window.addEventListener('resize', firefliesAnimation.init.bind(firefliesAnimation))

    setHasRendered(true)
  }, [hasRendered])

  return (
    <>
      <canvas ref={canvasRef} />

      <style jsx>{`
        canvas {
          left: 0;
          position: fixed;
          top: 0;
          z-index: 9999;
        }
      `}</style>
    </>
  )
}
