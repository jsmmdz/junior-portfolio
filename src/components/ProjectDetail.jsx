import { useState } from 'react'
import './ProjectDetail.css'
import useReveal from '../hooks/useReveal'

const LOG_COLORS = { info: '', error: 'log-error', success: 'log-success' }

function HeroOrb() {
  return (
    <div className="hero-orb">
      <div className="hero-orb-ring" />
      <div className="hero-orb-ring hero-orb-ring-2" />
      <div className="hero-orb-ring hero-orb-ring-3" />
      <div className="hero-orb-blob" />
    </div>
  )
}

export default function ProjectDetail({ project, onBack }) {
  const [activeTab, setActiveTab] = useState('process')
  const [command, setCommand] = useState('')

  if (!project) return null

  function handleCommand(e) {
    e.preventDefault()
    setCommand('')
  }

  const perfVal = project.metrics.performance !== '—' ? project.metrics.performance : '14'

  const detailRef = useReveal({ threshold: 0.01 })

  return (
    <div className="detail reveal-stagger" ref={detailRef}>
      {/* ── Topbar ── */}
      <div className="detail-topbar" style={{ '--reveal-i': 0 }}>
        <div className="detail-breadcrumb">
          <button className="back-btn" onClick={onBack}>← DIRECTORY</button>
          <span className="bc-sep">/</span>
          <span className="bc-current">{project.ref}</span>
        </div>
        <span className="detail-ref">CORE_CONTAINER // V.1.0</span>
      </div>

      {/* ── Hero section ── */}
      <div className="detail-hero" style={{ '--reveal-i': 1 }}>
        {/* CORE_CONTAINER panel */}
        <div className="hero-core">
          <div className="hero-core-header">
            <span className="hero-core-dot" />
            <span className="hero-core-label">CORE_CONTAINER // V.1.0</span>
            <div className="hero-traffic">
              <span className="traffic-dot traffic-yellow" />
              <span className="traffic-dot traffic-yellow" />
              <span className="traffic-dot traffic-red" />
            </div>
          </div>

          <div className="hero-core-body">
            {/* Info card */}
            <div className="hero-info-card">
              <span className="info-card-corner">┐</span>
              <h2 className="info-card-title">{project.title}</h2>
              <p className="info-card-sub">{project.subtitle}</p>
              <div className="info-card-tags">
                {project.tags.map(t => (
                  <span key={t} className="info-card-tag">{t}</span>
                ))}
              </div>
              <div className="info-card-actions">
                <button className="btn-ejecutar">▶ EJECUTAR</button>
                <button className="btn-cotizar">COTIZAR</button>
              </div>
            </div>

            {/* 3D asset render */}
            <div className="hero-render">
              <div className="hero-render-inner">
                {project.thumbnail
                  ? <img src={project.thumbnail} alt={project.title} className="hero-render-img" />
                  : <HeroOrb />
                }
              </div>
              <div className="hero-render-label">ASSET_RENDER_01</div>
            </div>
          </div>

          <div className="hero-core-cmd">
            <span className="cmd-prompt">›</span>
            <span className="cmd-placeholder">ENTER QUERY_STR</span>
          </div>

          <div className="hero-core-footer">
            <span>SYS_DIAGNOSTIC: CLEAN</span>
            <span className="hero-load">LOAD: {perfVal}%</span>
          </div>
        </div>

        {/* CIRCUIT_LOG panel */}
        <div className="circuit-log">
          <div className="circuit-log-header">
            <span className="circuit-icon">■</span>
            <span className="circuit-title">CIRCUIT_LOG</span>
            <span className="circuit-status-dot" />
          </div>

          <div className="circuit-entries">
            <div className="circuit-entry">
              <div className="circuit-ts-row">
                <span className="circuit-ts">TIMESTAMP: 001</span>
                <span className="circuit-type circuit-init">INIT</span>
              </div>
              <p className="circuit-text">Establishing neural handshake. Handshake verified.</p>
            </div>

            <div className="circuit-entry">
              <div className="circuit-ts-row">
                <span className="circuit-ts">TIMESTAMP: 042</span>
                <span className="circuit-type circuit-exec">EXEC</span>
              </div>
              <div className="circuit-code">
                <div>• MEMORY_ALLOC: 0x9F02A</div>
                <div>• RENDER_TARGET: ACQUIRED</div>
              </div>
            </div>

            <div className="circuit-entry">
              <div className="circuit-ts-row">
                <span className="circuit-ts">TIMESTAMP: 088</span>
                <span className="circuit-type circuit-wait">WAIT</span>
              </div>
              <p className="circuit-text circuit-dim">Awaiting user input sequence...</p>
            </div>
          </div>
        </div>
      </div>

      {/* ── 3-column dashboard ── */}
      <div className="detail-layout" style={{ '--reveal-i': 2 }}>
        {/* Left: viewer + metrics */}
        <div className="detail-left">
          <div className="detail-panel viewer-panel">
            <div className="panel-label">VIEWER</div>
            <div className="viewer-content">
              {project.thumbnail ? (
                <img src={project.thumbnail} alt={project.title} className="viewer-img" />
              ) : (
                <div className="viewer-placeholder">
                  <div className="viewer-orb">
                    <div className="orb-ring" />
                    <div className="orb-ring orb-ring-2" />
                    <div className="orb-core" />
                  </div>
                  <span className="viewer-ref">// {project.ref}_ASSET</span>
                </div>
              )}
            </div>

            <div className="viewer-title-block">
              <h2 className="viewer-title">{project.title}</h2>
              <p className="viewer-subtitle">{project.subtitle}</p>
            </div>

            <div className="viewer-tech">
              {project.technologies.map(t => (
                <span key={t} className="tech-tag">{t}</span>
              ))}
            </div>

            <div className="viewer-actions">
              <button className="action-btn action-exec">EXECUTE</button>
              <button className="action-btn action-abort">ABORT</button>
            </div>
          </div>

          <div className="detail-panel metrics-panel">
            <div className="panel-label">OPR_METRICS // {project.ref}</div>
            <p className="metrics-desc">Real-time monitoring and hardware utilization parameters.</p>

            <div className="metric-row">
              <span className="metric-name">SYS_LOAD</span>
              <div className="metric-bar-wrap">
                <div className="metric-bar">
                  <div className="metric-fill" style={{ width: `${perfVal}%` }} />
                </div>
              </div>
              <span className="metric-pct">{perfVal}%</span>
            </div>

            <div className="metric-row">
              <span className="metric-name">CPU_ALLOC</span>
              <div className="metric-bar-wrap">
                <div className="metric-bar">
                  <div className="metric-fill" style={{ width: '78%' }} />
                </div>
              </div>
              <span className="metric-pct">78%</span>
            </div>

            <div className="metric-row">
              <span className="metric-name">MEM_ALLOC</span>
              <div className="metric-bar-wrap">
                <div className="metric-bar">
                  <div className="metric-fill metric-fill-purple" style={{ width: '55%' }} />
                </div>
              </div>
              <span className="metric-pct">55%</span>
            </div>
          </div>
        </div>

        {/* Center: activity log */}
        <div className="detail-center">
          <div className="detail-panel log-panel">
            <div className="panel-label-row">
              <span className="panel-label">ACTIVITY_LOG</span>
              <div className="status-indicator">
                <span className="status-dot" />
                <span className="status-text">Active Now</span>
              </div>
              <button className="panel-btn">EXPORT</button>
            </div>

            <div className="log-list">
              {project.logs.map((log, i) => (
                <div key={i} className={`log-entry ${LOG_COLORS[log.type] || ''}`}>
                  <span className="log-time">{log.time}</span>
                  <span className="log-msg">{log.msg}</span>
                </div>
              ))}
            </div>

            <div className="meta-grid">
              <div className="meta-cell">
                <span className="meta-cell-label">IS_AVAIL_SPACE</span>
                <span className="meta-cell-val">4.2GF</span>
                <span className="meta-cell-tag">80/5</span>
              </div>
              <div className="meta-cell">
                <span className="meta-cell-label">THERMAL_STATS</span>
                <span className="meta-cell-val">40.2°</span>
                <span className="meta-cell-tag tag-stable">● STABLE</span>
              </div>
            </div>

            <div className="log-tabs">
              {['process', 'result', 'info'].map(tab => (
                <button
                  key={tab}
                  className={`log-tab ${activeTab === tab ? 'active' : ''}`}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab.toUpperCase()}
                </button>
              ))}
            </div>

            <div className="tab-content">
              {activeTab === 'process' && <p className="tab-text">{project.process}</p>}
              {activeTab === 'result'  && <p className="tab-text">{project.result}</p>}
              {activeTab === 'info'    && <p className="tab-text">{project.description}</p>}
            </div>

            <form className="command-input" onSubmit={handleCommand}>
              <span className="cmd-prompt">›</span>
              <input
                type="text"
                className="cmd-field"
                placeholder="Input a command..."
                value={command}
                onChange={e => setCommand(e.target.value)}
              />
            </form>
          </div>
        </div>

        {/* Right: tasks + status */}
        <div className="detail-right">
          <div className="detail-panel task-panel">
            <div className="panel-label">SYS_TASK_NOTIFY</div>
            <div className="task-item">
              <span className="task-icon task-icon-yellow">↗</span>
              <div>
                <div className="task-title">LOGIC ROUTER</div>
                <div className="task-desc">Configure hardware-level bootrom routing.</div>
              </div>
            </div>
            <div className="task-item">
              <span className="task-icon task-icon-red">⚡</span>
              <div>
                <div className="task-title">POWER SURPLUS</div>
                <div className="task-desc">Manage distribution limits across subsystems.</div>
              </div>
            </div>
          </div>

          <div className="detail-panel status-panel">
            <div className="panel-label">DATOS DEL PROYECTO</div>
            <div className="status-rows">
              <div className="status-row">
                <span>DURATION</span>
                <span className="status-val">{project.duration}</span>
              </div>
              <div className="status-row">
                <span>YEAR</span>
                <span className="status-val">{project.year}</span>
              </div>
              <div className="status-row">
                <span>COMPONENTS</span>
                <span className="status-val">{project.metrics.components}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
