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
    this.context.fillStyle = '#fddba3'
    this.context.fill()
  }
}

class FirefliesAnimation {
  constructor($window, $canvas, $reference) {
    this.$window = $window
    this.$canvas = $canvas
    this.$reference = $reference
    this.context = $canvas.getContext('2d')

    this.init()
    this.update()
  }

  init() {
    this.width = this.$reference.offsetWidth
    this.height = this.$reference.offsetHeight
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

export default function TeamHeader({ name }) {
  const canvasRef = useRef(null)
  const sectionRef = useRef(null)
  const [hasRendered, setHasRendered] = useState(false)

  useEffect(() => {
    const $canvas = canvasRef.current
    const $section = sectionRef.current

    if (!process.browser || hasRendered || $canvas === null || $section === null) {
      return
    }

    const firefliesAnimation = new FirefliesAnimation(window, $canvas, $section)
    window.addEventListener('resize', firefliesAnimation.init.bind(firefliesAnimation))

    setHasRendered(true)
  }, [hasRendered])

  return (
    <>
      <section ref={sectionRef} className="bg-dark bg-size-cover overflow-hidden ">
        <canvas ref={canvasRef} />
        <div className="d-flex justify-content-center align-items-center pt-5 pt-md-6 pt-lg-7 pb-5">
          {/* <h1 className="d-inline-flex display-5 mb-5 text-light">&#8203;</h1> */}
          <h1 className="d-inline-flex display-5 mb-5 text-light">{name}</h1>
        </div>
      </section>

      <style jsx>{`
        section {
        }

        canvas {
          position: absolute;
        }

        h1 {
          /*text-shadow: 0 0 3rem yellow;*/
        }
      `}</style>
    </>
  )
}
