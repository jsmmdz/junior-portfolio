import { useState, useEffect } from 'react'
import './StatusBar.css'

export default function StatusBar({ left = 'SYS_DATA // JUNTR', right }) {
  const [time, setTime] = useState(new Date())

  useEffect(() => {
    const t = setInterval(() => setTime(new Date()), 1000)
    return () => clearInterval(t)
  }, [])

  const pad = n => String(n).padStart(2, '0')
  const timeStr = `${pad(time.getHours())}:${pad(time.getMinutes())}:${pad(time.getSeconds())}`

  return (
    <div className="statusbar">
      <span className="statusbar-left">{left}</span>
      <span className="statusbar-mid">JUNTR // v4.1.1</span>
      <span className="statusbar-right">
        {right || `ONLINE // ${timeStr}`}
      </span>
    </div>
  )
}
