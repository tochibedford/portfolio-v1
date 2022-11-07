import { useRef } from 'react'
import styles from '../styles/CanvasWork.module.scss'
import { useCanvasWork } from './hooks/useCanvasWork'
import { motion } from 'framer-motion'
import Link from 'next/link'

export default function CanvasWork() {
    const canvasRef = useRef<HTMLCanvasElement>(null)
    useCanvasWork(canvasRef, 400, 300)
    const menuItems = [{ title: "PROJECTS", url: "/projects", local: true }, { title: "TALK TO ME", url: "/contact", local: true }, { title: "MUSIC", url: "/music", local: true }]
    return (
        <nav className={styles.canvas__container}>
            <canvas ref={canvasRef}></canvas>
            <ul role='navigation' className={styles.canvas__menu}>
                {
                    menuItems.map((item, i) => {
                        return (
                            <motion.li key={i} initial={{ opacity: 0, y: -100, filter: 'blur(20px)' }} whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.6, delay: 0.1 * i } }}>
                                {item.local? <Link href={`${item.url}`}>{item.title}</Link>:<a href={`${item.url}`}></a>}
                            </motion.li>
                        )
                    })
                }
            </ul>
        </nav>
    )
}