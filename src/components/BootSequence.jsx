import { useState, useEffect } from 'react'
import './BootSequence.css'

const BOOT_LINES = [
  { text: '> INITIALIZING PORTFOLIO_OS', delay: 0 },
  { text: '> KERNEL_CORE: .............. OK', delay: 320 },
  { text: '> MOUNTING /VAR/PROJECTS: .... OK', delay: 640 },
  { text: '  LOADING_ASSETS: ........... OK', delay: 900 },
  { text: '> FETCHING METADATA .......... ', delay: 1150 },
  { text: '> PROCESSING FRAME_COMPLEX ...', delay: 1400 },
  { text: '> ALLOCATING VRAM ............', delay: 1650 },
  { text: '> CLIENT_IO: WARM_END ........', delay: 1900 },
  { text: '', delay: 2100 },
  { text: '  // SYSTEM READY', delay: 2200 },
]

export default function BootSequence({ onComplete }) {
  const [visibleCount, setVisibleCount] = useState(0)
  const [done, setDone] = useState(false)
  const [cursor, setCursor] = useState(true)
  const [fadeOut, setFadeOut] = useState(false)
  useEffect(() => {
    const timers = BOOT_LINES.map((line, i) =>
      setTimeout(() => setVisibleCount(i + 1), line.delay)
    )
    const doneTimer = setTimeout(() => setDone(true), 2500)
    return () => { timers.forEach(clearTimeout); clearTimeout(doneTimer) }
  }, [])

  useEffect(() => {
    if (!done) return
    const t = setTimeout(() => {
      setFadeOut(true)
      setTimeout(onComplete, 400)
    }, 400)
    return () => clearTimeout(t)
  }, [done])

  useEffect(() => {
    const t = setInterval(() => setCursor(c => !c), 530)
    return () => clearInterval(t)
  }, [])

  function handleSkip() {
    setFadeOut(true)
    setTimeout(onComplete, 200)
  }

  return (
    <div className={`boot ${fadeOut ? 'boot-out' : ''}`}>
      <div className="boot-window">
        <div className="boot-titlebar">
          <span className="dot dot-red" />
          <span className="dot dot-yellow" />
          <span className="dot dot-green" />
          <span className="titlebar-path">SYS.0137.092 // 14.0.1</span>
        </div>

        <div className="boot-body">
          {BOOT_LINES.slice(0, visibleCount).map((line, i) => (
            <div key={i} className="boot-line-item">
              {line.text}
              {i === visibleCount - 1 && !done && (
                <span className={cursor ? 'cursor-on' : 'cursor-off'}>▮</span>
              )}
            </div>
          ))}
          {done && (
            <div className="boot-line-item boot-ready">
              <span className={cursor ? 'cursor-on' : 'cursor-off'}>▮</span>
            </div>
          )}
        </div>

        <div className="boot-statusbar">
          <span>SYS_DATA // JUNTR</span>
          <button className="boot-skip" onClick={handleSkip}>
            ENTER / SKIP →
          </button>
          <span>READY // 11.1</span>
        </div>
      </div>
    </div>
  )
}
