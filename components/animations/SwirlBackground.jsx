import { useEffect, useRef, useState } from 'react'
import SimplexNoise from 'simplex-noise'

const TAU = 2 * Math.PI

const rand = n => n * Math.random()
const randRange = n => n - rand(2 * n)
const fadeInOut = (t, m) => {
  const hm = 0.5 * m
  return Math.abs(((t + hm) % m) - hm) / hm
}
const lerp = (n1, n2, speed) => (1 - speed) * n1 + speed * n2

/**
 * @see https://github.com/crnacura/AmbientCanvasBackgrounds
 */
class SwirlAnimation {
  constructor($window, $canvas, $reference, opacity = 0.7) {
    this.$window = $window
    this.$canvas = $canvas
    this.$reference = $reference
    this.opacity = opacity

    this.init()
    this.start()
  }

  init() {
    this.particleCount = 700
    this.particlePropCount = 9
    this.particlePropsLength = this.particleCount * this.particlePropCount
    this.rangeY = 100
    this.baseTTL = 50
    this.rangeTTL = 150
    //   this.baseSpeed = 0.1
    this.baseSpeed = 0.05
    //   this.rangeSpeed = 2
    this.rangeSpeed = 1
    this.baseRadius = 1
    this.rangeRadius = 4
    //   this.baseHue = 220
    this.baseHue = 200
    //   this.rangeHue = 100
    this.rangeHue = 50
    this.noiseSteps = 8
    this.xOff = 0.00125
    this.yOff = 0.00125
    this.zOff = 0.0005
    //   this.backgroundColor = 'hsla(260,40%,5%,1)'
    //   this.backgroundColor = '#121117'
    this.backgroundColor = 'hsla(250, 15%, 8%, 1)'

    this.canvas = null
    this.ctx = null
    this.center = null
    this.tick = null
    this.simplex = null
    this.particleProps = null
  }

  start() {
    this.createCanvas()
    this.resize()
    this.initParticles()
    this.draw()
  }

  createCanvas() {
    this.canvas = {
      a: this.$window.document.createElement('canvas'),
      b: this.$canvas,
    }

    this.ctx = {
      a: this.canvas.a.getContext('2d'),
      b: this.canvas.b.getContext('2d'),
    }

    this.center = []
  }

  resize() {
    const { offsetWidth, offsetHeight } = this.$reference

    this.canvas.a.width = offsetWidth
    this.canvas.a.height = offsetHeight

    this.ctx.a.drawImage(this.canvas.b, 0, 0)

    this.canvas.b.width = offsetWidth
    this.canvas.b.height = offsetHeight

    this.ctx.b.drawImage(this.canvas.a, 0, 0)

    this.center[0] = 0.5 * this.canvas.a.width
    this.center[1] = 0.5 * this.canvas.a.height
  }

  initParticles() {
    this.tick = 0
    this.simplex = new SimplexNoise()
    this.particleProps = new Float32Array(this.particlePropsLength)

    let i

    for (i = 0; i < this.particlePropsLength; i += this.particlePropCount) {
      this.initParticle(i)
    }
  }

  initParticle(i) {
    const x = rand(this.canvas.a.width)
    const y = this.center[1] + randRange(this.rangeY)
    const vx = 0
    const vy = 0
    const life = 0
    const ttl = this.baseTTL + rand(this.rangeTTL)
    const speed = this.baseSpeed + rand(this.rangeSpeed)
    const radius = this.baseRadius + rand(this.rangeRadius)
    const hue = this.baseHue + rand(this.rangeHue)

    this.particleProps.set([x, y, vx, vy, life, ttl, speed, radius, hue], i)
  }

  drawParticles() {
    for (let i = 0; i < this.particlePropsLength; i += this.particlePropCount) {
      this.updateParticle(i)
    }
  }

  updateParticle(i) {
    const i2 = 1 + i
    const i3 = 2 + i
    const i4 = 3 + i
    const i5 = 4 + i
    const i6 = 5 + i
    const i7 = 6 + i
    const i8 = 7 + i
    const i9 = 8 + i

    const x = this.particleProps[i]
    const y = this.particleProps[i2]
    const n = this.simplex.noise3D(x * this.xOff, y * this.yOff, this.tick * this.zOff) * this.noiseSteps * TAU
    const vx = lerp(this.particleProps[i3], Math.cos(n), 0.5)
    const vy = lerp(this.particleProps[i4], Math.sin(n), 0.5)
    let life = this.particleProps[i5]
    const ttl = this.particleProps[i6]
    const speed = this.particleProps[i7]
    const x2 = x + vx * speed
    const y2 = y + vy * speed
    const radius = this.particleProps[i8]
    const hue = this.particleProps[i9]

    this.drawParticle(x, y, x2, y2, life, ttl, radius, hue)

    life++

    this.particleProps[i] = x2
    this.particleProps[i2] = y2
    this.particleProps[i3] = vx
    this.particleProps[i4] = vy
    this.particleProps[i5] = life

    if (this.checkBounds(x, y) || life > ttl) {
      this.initParticle(i)
    }
  }

  drawParticle(x, y, x2, y2, life, ttl, radius, hue) {
    this.ctx.a.save()
    this.ctx.a.lineCap = 'round'
    this.ctx.a.lineWidth = radius
    this.ctx.a.strokeStyle = `hsla(${hue},100%,60%,${Math.max(0, fadeInOut(life, ttl) - (1 - this.opacity))})`
    this.ctx.a.beginPath()
    this.ctx.a.moveTo(x, y)
    this.ctx.a.lineTo(x2, y2)
    this.ctx.a.stroke()
    this.ctx.a.closePath()
    this.ctx.a.restore()
  }

  checkBounds(x, y) {
    return x > this.canvas.a.width || x < 0 || y > this.canvas.a.height || y < 0
  }

  renderGlow() {
    this.ctx.b.save()
    this.ctx.b.filter = 'blur(8px) brightness(200%)'
    this.ctx.b.globalCompositeOperation = 'lighter'
    this.ctx.b.drawImage(this.canvas.a, 0, 0)
    this.ctx.b.restore()

    this.ctx.b.save()
    this.ctx.b.filter = 'blur(4px) brightness(200%)'
    this.ctx.b.globalCompositeOperation = 'lighter'
    this.ctx.b.drawImage(this.canvas.a, 0, 0)
    this.ctx.b.restore()
  }

  renderToScreen() {
    this.ctx.b.save()
    this.ctx.b.globalCompositeOperation = 'lighter'
    this.ctx.b.drawImage(this.canvas.a, 0, 0)
    this.ctx.b.restore()
  }

  draw() {
    this.tick++

    this.ctx.a.clearRect(0, 0, this.canvas.a.width, this.canvas.a.height)

    this.ctx.b.fillStyle = this.backgroundColor
    this.ctx.b.fillRect(0, 0, this.canvas.a.width, this.canvas.a.height)

    this.drawParticles()
    this.renderGlow()
    this.renderToScreen()

    this.$window.requestAnimationFrame(this.draw.bind(this))
  }
}

export default function SwirlBackground({ baseRef }) {
  const canvasRef = useRef(null)
  const [hasRendered, setHasRendered] = useState(false)

  useEffect(() => {
    const $canvas = canvasRef.current
    const $base = baseRef.current

    if (!process.browser || hasRendered || $canvas === null || $base === null) {
      return
    }

    setTimeout(() => {
      // eslint-disable-next-line no-new
      new SwirlAnimation(window, $canvas, $base)
    }, 250)

    setHasRendered(true)
  }, [baseRef, hasRendered])

  return (
    <>
      <canvas ref={canvasRef} />

      <style jsx>{`
        canvas {
          position: absolute;
        }
      `}</style>
    </>
  )
}
