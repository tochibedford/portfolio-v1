import { useEffect, useRef } from 'react'
import styles from '../styles/CanvasWork.module.scss'


export default function CanvasWork() {
    const canvasRef = useRef<HTMLCanvasElement | null>(null)
    const gravity = 0.0;
    const friction = 1;
    const maxRadius = 10;
    const maxMass = 1;

    const mouse = {
        x: 0,
        y: 0,
    }

    const colors = [
        [0, 39, 87],
        [255, 255, 255],
        [189, 150, 150]
    ]

    function randomIntFromRange(min: number, max: number) {
        return Math.floor(Math.random() * (max - min + 1) + min)
    }

    function randomColor() {
        return colors[Math.floor(Math.random() * colors.length)]
    }

    function getDistance(x1: number, y1: number, x2: number, y2: number) {
        let xDistance = x2 - x1
        let yDistance = y2 - y1

        //using the pythagorean theorem
        return Math.sqrt(Math.pow(xDistance, 2) + Math.pow(yDistance, 2))
    }

    function rotate(velocity: { x: number, y: number }, angle: number) {
        const rotatedVelocities = {
            x: velocity.x * Math.cos(angle) - velocity.y * Math.sin(angle),
            y: velocity.x * Math.sin(angle) + velocity.y * Math.cos(angle)
        };

        return rotatedVelocities;
    }

    function resolveCollision(particle: Particle, otherParticle: Particle) {
        const xVelocityDiff = particle.dx - otherParticle.dx;
        const yVelocityDiff = particle.dy - otherParticle.dy;

        const xDist = otherParticle.x - particle.x;
        const yDist = otherParticle.y - particle.y;

        // Prevent accidental overlap of particles
        if (xVelocityDiff * xDist + yVelocityDiff * yDist >= 0) {
            // Grab angle between the two colliding particles
            const angle = -Math.atan2(otherParticle.y - particle.y, otherParticle.x - particle.x);

            // Store mass in var for better readability in collision equation
            const m1 = particle.mass;
            const m2 = otherParticle.mass;

            // Velocity before equation
            const u1 = rotate({ x: particle.dx, y: particle.dy }, angle);
            const u2 = rotate({ x: otherParticle.dx, y: otherParticle.dy }, angle);

            // Velocity after 1d collision equation
            const v1 = { x: u1.x * (m2 - m1) / (m1 + m2) + u2.x * 2 * m2 / (m1 + m2), y: u1.y };
            const v2 = { x: u2.x * (m2 - m1) / (m1 + m2) + u1.x * 2 * m2 / (m1 + m2), y: u2.y };

            // Final velocity after rotating axis back to original location
            const vFinal1 = rotate(v1, -angle);
            const vFinal2 = rotate(v2, -angle);

            // Swap particle velocities for realistic bounce effect
            particle.dx = vFinal1.x;
            particle.dy = vFinal1.y;

            otherParticle.dx = vFinal2.x;
            otherParticle.dy = vFinal2.y;
        }
    }

    class Particle {
        x
        y
        dx
        dy
        radius
        fill
        color
        mass

        constructor(x: number, y: number, dx: number, dy: number, radius: number, color: number[]) {
            this.x = x
            this.y = y
            this.dx = dx
            this.dy = dy
            this.radius = radius
            this.fill = 0
            this.color = color
            this.mass = maxMass * (radius / maxRadius) // calculate mass based on radius
            const originalRadius = radius
        }


        draw = (ctx: CanvasRenderingContext2D) => {
            ctx.beginPath()
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
            ctx.strokeStyle = `rgba(${this.color[0]},${this.color[1]},${this.color[2]},1)`
            ctx.fillStyle = `rgba(${this.color[0]},${this.color[1]},${this.color[2]},${this.fill})`
            ctx.stroke()
            ctx.fill()
            ctx.closePath()
        }

        update = (particles: Particle[], canvas: HTMLCanvasElement) => {
            //     collision detection
            particles.forEach((particle) => {
                if (this !== particle) {
                    if (getDistance(this.x, this.y, particle.x, particle.y) - this.radius - particle.radius < 0) {
                        // console.log(`${this.id} collided with ${particle.id}`)
                        resolveCollision(this, particle)
                    }
                }
            })

            //mouse position color
            if (getDistance(this.x, this.y, mouse.x, mouse.y) < 100) {
                this.fill += 0.1
                this.fill = Math.min(1, this.fill)
            } else {
                this.fill -= 0.1
                this.fill = Math.max(0, this.fill)
            }
            // this.fill = Math.abs(100-Math.min(5,getDistance(this.x, this.y, mouse.x, mouse.y)))
            // console.log(mouse.x, mouse.y)

            //     motion
            if (this.x + this.radius + this.dx > canvas.width || this.x - this.radius + this.dx < 0) {
                this.dx = -(this.dx * friction)
            }
            if (this.y + this.radius + this.dy > canvas.height || this.y - this.radius + this.dy < 0) {
                this.dy = -(this.dy * friction)
                this.dx = this.dx * friction
            } else {
                this.dy += gravity
            }
            this.y += this.dy
            this.x += this.dx
            this.draw(canvas.getContext('2d') as CanvasRenderingContext2D)

        }
    }

    const particles: Particle[] = [];

    function init(canvas: HTMLCanvasElement) {
        for (let i = 0; i < 300; i++) {
            let radius = maxRadius;
            let x = randomIntFromRange(radius, canvas.width - radius)
            let y = randomIntFromRange(radius, canvas.height - radius)
            let dx = randomIntFromRange(-1, 1)
            let dy = randomIntFromRange(-1, 1)
            let color = colors[Math.floor(Math.random() * colors.length)]

            if (i !== 0) {
                for (let j = 0; j < particles.length; j++) {
                    if (getDistance(x, y, particles[j].x, particles[j].y) - radius * 2 < 0) {
                        // console.log(x,y)
                        x = randomIntFromRange(radius, canvas.width - radius)
                        y = randomIntFromRange(radius, canvas.height - radius)
                        j = -1
                    }
                }
            }

            particles.push(new Particle(x, y, dx, dy, radius, color))
        }
    }

    function animate(canvas: HTMLCanvasElement) {
        if (!canvasRef.current) return;
        requestAnimationFrame(() => { animate(canvas) })
        const ctx = canvas.getContext('2d') as CanvasRenderingContext2D
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        particles.forEach(particle => {
            particle.update(particles, canvas)
        })
    }

    useEffect(() => {
        const canvas = canvasRef.current
        const ctx = canvas?.getContext('2d')

        if (canvas) {
            canvas.width = window.innerWidth - 14
            canvas.height = 500
        }

        const handleResize = () => {
            if (canvas) {
                canvas.width = window.innerWidth - 14
            }
        }
        window.addEventListener('resize', handleResize)

        const handleMouseMove = (e: MouseEvent) => {
            const rect = (e.target as HTMLCanvasElement)?.getBoundingClientRect();
            mouse.x = e.clientX - rect.left; //x position within the element.
            mouse.y = e.clientY - rect.top;  //y position within the element.
        }
        canvas?.addEventListener('mousemove', handleMouseMove)
        if (canvas) {
            init(canvas)
            animate(canvas)
        }

        return () => {
            canvas?.removeEventListener('mousemove', handleMouseMove)
            window.removeEventListener('resize', handleResize)
        }
    }, [])

    return (
        <div className={styles.canvas__container}>
            <canvas ref={canvasRef}></canvas>
        </div>
    )
}