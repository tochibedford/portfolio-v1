import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.scss'

import { motion } from 'framer-motion'
import CanvasWork from '../components/CanvasWork'
import { useEffect, useRef, useState } from 'react'

declare global {
  interface Window {
    opera: any;
  }
}

export const isDeviceMobileOrTablet = function () {
  let check = false;
  if (typeof window !== undefined && typeof navigator !== undefined) {
    (function (a) { if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) check = true; })(navigator.userAgent || navigator.vendor || window.opera);
  }
  return check;
};

export default function Home() {
  const skillRef = useRef<HTMLDivElement>(null)
  const [iseDeviceMOT, setIsDeviceMOT] = useState(true);

  const skills = ["PYTHON", "JAVASCRIPT", "TYPESCRIPT", "REACT", "THE CANVAS"]


  let count = 1
  const handleTransitionEnd = () => {
    if (count > skills.length - 1) {
      count = 0
    }
    if (skillRef.current?.textContent !== undefined) {
      skillRef.current.textContent = skills[count]
      count++
    }
  }
  useEffect(() => {
    setIsDeviceMOT(isDeviceMobileOrTablet())
    if (skillRef.current?.textContent !== undefined) {
      skillRef.current.textContent = skills[0]
      skillRef.current.addEventListener('animationiteration', () => {
        handleTransitionEnd()
      })
    }

    // const skillInterval = setInterval(()=>{
    //   if(count>skills.length-1){
    //     count = 0
    //   }
    //   if(skillRef.current?.textContent !== undefined){
    //     skillRef.current.textContent = skills[count]  
    //     count++
    //   }
    // }, 3000)

    // return ()=>{
    //   clearInterval(skillInterval)
    // }
  }, [])
  return (
    <div className={styles.container}>
      <Head>
        <title>Tochi Bedford | Portfolio</title>
        <meta name="description" content="Tochi's software engineering portfolio" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main__container}>
        <motion.svg className={styles.svg__back} xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 2000 2000" initial={{ opacity: 0.6 }} animate={{ opacity: 1, transition: { duration: 0.7, delay: 0.3 } }}>
          <g>
            <g fill="hsl(16, 100%, 50%)" id="star" transform="matrix(1,0,0,1,0,-25)">
              <path d="M 20.979024793718054 335.6643216860044 C 1000 1000 1000 1000 1958.0419580419584 76.92307692307696 C 1000 1000 1000 1000 1835.6643237133967 1220.2796801587085 C 1000 1000 1000 1000 -17.482518202774827 2045.4545189917508 C 1000 1000 1000 1000 20.979024793718054 335.6643216860044" strokeLinecap="round" strokeLinejoin="round"></path>
            </g>
          </g>
        </motion.svg>

        {/* text noise */}
        <svg className={styles.svg__filter}>
          <filter id="noise">
            <motion.feTurbulence baseFrequency="0.8 0.3" result="NOISE" numOctaves="1" id="turbulence" animate={{ baseFrequency: "1 1", transition: { duration: 0.7 } }} />
            <feDisplacementMap in="SourceGraphic" in2="NOISE" scale={20} />
          </filter>
        </svg>

        {/* canvas noise */}
        <svg className={styles.svg__filter}>
          <filter id="canvasNoise">
            <motion.feTurbulence baseFrequency="0.01 0.03" result="NOISE" numOctaves="1" id="turbulence" />
            <feDisplacementMap in="SourceGraphic" in2="NOISE" scale={14} />
          </filter>
        </svg>

        <motion.h1 className={styles.main__heading} initial={{ y: -100, opacity: 0 }} animate={{ y: 0, opacity: 1, transition: { duration: 0.7 } }}>{"HI I'M TOCHI"}</motion.h1>
        <div className={styles.work__with}>
          <motion.h2 className={styles.main__subheading} initial={{ x: -100, opacity: 0 }} animate={{ x: 0, opacity: 1, transition: { duration: 0.7, delay: 0.3 } }}>{"I WORK WITH"}</motion.h2>
          <h2 ref={skillRef} className={styles.main__subheading__2} ></h2>
        </div>
        {iseDeviceMOT ? "" : <CanvasWork />}
      </main>
    </div>
  )
}
