import { useState, useEffect } from 'react'
import './Home.css'

const initLines = [
  '> BOOT_SEQUENCE: INITIALIZED',
  '> KERNEL_LOAD: SUCCESS',
  '> NEURAL_LINK: ACTIVE',
  '> AWAITING_INPUT...',
]

const terminatedLines = [
  '> SESSION: TERMINATED',
  '> PROCESS_KILL: CONFIRMED',
  '> MEMORY_FLUSH: COMPLETE',
  '> STANDBY_MODE: ACTIVE',
]

export default function Home({ onStart }) {
  const [visibleLines, setVisibleLines] = useState(0)
  const [cursor, setCursor] = useState(true)
  const [fadingOut, setFadingOut] = useState(false)
  const [terminated, setTerminated] = useState(false)
  const [termLines, setTermLines] = useState(0)

  useEffect(() => {
    if (terminated) return
    if (visibleLines < initLines.length) {
      const t = setTimeout(() => setVisibleLines(v => v + 1), 280)
      return () => clearTimeout(t)
    }
  }, [visibleLines, terminated])

  useEffect(() => {
    if (!terminated) return
    if (termLines < terminatedLines.length) {
      const t = setTimeout(() => setTermLines(v => v + 1), 220)
      return () => clearTimeout(t)
    }
  }, [termLines, terminated])

  useEffect(() => {
    const t = setInterval(() => setCursor(c => !c), 530)
    return () => clearInterval(t)
  }, [])

  function handleStart() {
    setFadingOut(true)
    setTimeout(onStart, 350)
  }

  function handleExit() {
    setTerminated(true)
    setTermLines(0)
  }

  function handleRestart() {
    setTerminated(false)
    setVisibleLines(0)
  }

  if (terminated) {
    return (
      <div className="home">
        <div className="home-window home-window-terminated">
          <div className="home-titlebar">
            <span className="dot dot-red" />
            <span className="dot dot-yellow" />
            <span className="dot dot-green" />
            <span className="titlebar-path">SYS.0137.092 // 14.0.1</span>
          </div>

          <div className="home-body">
            <div className="home-terminal">
              {terminatedLines.slice(0, termLines).map((line, i) => (
                <div key={i} className={`boot-line ${i === 0 ? 'line-terminated' : ''}`}>
                  {line}
                </div>
              ))}
              {termLines < terminatedLines.length && (
                <div className="boot-line">
                  <span className="cursor-blink">{cursor ? '▮' : ' '}</span>
                </div>
              )}
              {termLines >= terminatedLines.length && (
                <div className="boot-line">
                  <span className="cursor-blink">{cursor ? '▮' : ' '}</span>
                </div>
              )}
            </div>

            <div className="terminated-block">
              <p className="terminated-msg">SESIÓN TERMINADA — SISTEMA EN ESPERA</p>
              <button className="btn-primary" onClick={handleRestart}>
                | INICIAR NUEVA SESIÓN |
              </button>
            </div>
          </div>

          <div className="home-statusbar">
            <span>SESSION // TERMINATED</span>
            <span className="status-right">STANDBY // 0.0</span>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={`home${fadingOut ? ' home-out' : ''}`}>
      <div className="home-window">
        <div className="home-titlebar">
          <span className="dot dot-red" />
          <span className="dot dot-yellow" />
          <span className="dot dot-green" />
          <span className="titlebar-path">SYS.0137.092 // 14.0.1</span>
        </div>

        <div className="home-body">
          <div className="home-terminal">
            {initLines.slice(0, visibleLines).map((line, i) => (
              <div key={i} className="boot-line">{line}</div>
            ))}
            {visibleLines < initLines.length && (
              <div className="boot-line">
                <span className="cursor-blink">{cursor ? '▮' : ' '}</span>
              </div>
            )}
          </div>

          <div className="home-content">
            <div className="home-brand">
              <h1 className="brand-name">
                <span className="brand-first">JUNIOR</span>
                <span className="brand-last">MEJIA</span>
                <span className="brand-portfolio">PORTFOLIO</span>
              </h1>
            </div>

            <div className="home-actions">
              <button className="btn-primary" onClick={handleStart}>
                | INICIAR |
              </button>
              <button className="btn-secondary" onClick={handleExit}>
                | SALIR |
              </button>
            </div>
          </div>

          <div className="home-tagline">
            <span className="tagline-accent">Creador Digital</span> enfocado en UX/UI, experiencias 3D,<br />
            desarrollo front-end y comunicación visual.
          </div>
        </div>

        <div className="home-statusbar">
          <span>MEM: 6470 / 11878</span>
          <span className="status-right">COORDS_X: 502 Y: D10</span>
        </div>
      </div>
    </div>
  )
}
