import { useState } from 'react'
import './Network.css'

const SOCIALS = [
  { label: 'LINKEDIN', handle: 'junior-mejia', icon: '↗' },
  { label: 'BEHANCE', handle: 'juniormejia', icon: '↗' },
  { label: 'GITHUB', handle: 'juniormejia', icon: '↗' },
  { label: 'EMAIL', handle: 'hola@juniormejia.com', icon: '↗' },
]

export default function Network() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState(null)

  function validate() {
    const e = {}
    if (!form.name.trim()) e.name = 'FIELD_REQUIRED'
    if (!form.email.trim()) e.email = 'FIELD_REQUIRED'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'INVALID_FORMAT'
    if (!form.message.trim()) e.message = 'FIELD_REQUIRED'
    return e
  }

  function handleChange(field, value) {
    setForm(f => ({ ...f, [field]: value }))
    if (errors[field]) setErrors(e => ({ ...e, [field]: undefined }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) {
      setErrors(errs)
      return
    }
    setStatus('sending')
    await new Promise(r => setTimeout(r, 1200))
    setStatus('success')
    setForm({ name: '', email: '', message: '' })
  }

  function handleRetry() {
    setStatus(null)
  }

  return (
    <div className="network">
      <div className="network-inner">
        <div className="network-left">
          <div className="net-panel">
            <div className="net-panel-header">
              <span className="net-ref">NET_CHANNELS // v1.0</span>
            </div>
            <div className="net-title-block">
              <h2 className="net-title">NETWORK</h2>
              <p className="net-sub">Canales de comunicación disponibles. Tiempo de respuesta estimado: 24–48h.</p>
            </div>

            <div className="socials-list">
              {SOCIALS.map(s => (
                <div key={s.label} className="social-item">
                  <div className="social-info">
                    <span className="social-label">{s.label}</span>
                    <span className="social-handle">{s.handle}</span>
                  </div>
                  <button className="social-link">{s.icon}</button>
                </div>
              ))}
            </div>

            <div className="net-status">
              <span className="status-dot" />
              <span className="net-status-text">CHANNEL_STATUS: OPEN</span>
            </div>
          </div>
        </div>

        <div className="network-right">
          <div className="net-panel form-panel">
            <div className="net-panel-header">
              <span className="net-ref">MESSAGE_COMPOSE // SECURE</span>
              {status === 'success' && (
                <span className="form-success-badge">MESSAGE_SENT // OK</span>
              )}
              {status === 'error' && (
                <span className="form-error-badge">TRANSMISSION_FAILED</span>
              )}
            </div>

            {status === 'success' ? (
              <div className="form-success">
                <div className="success-icon">✓</div>
                <p className="success-msg">MESSAGE_SENT // OK</p>
                <p className="success-sub">Mensaje recibido. Te contactaré en 24–48h.</p>
                <button className="btn-new" onClick={handleRetry}>
                  NUEVO MENSAJE →
                </button>
              </div>
            ) : (
              <form className="contact-form" onSubmit={handleSubmit} noValidate>
                <div className="form-field">
                  <label className="field-label">
                    NOMBRE / NAME
                    {errors.name && <span className="field-error">{errors.name}</span>}
                  </label>
                  <input
                    type="text"
                    className={`field-input ${errors.name ? 'input-error' : ''}`}
                    value={form.name}
                    onChange={e => handleChange('name', e.target.value)}
                    placeholder="Tu nombre"
                    disabled={status === 'sending'}
                  />
                </div>

                <div className="form-field">
                  <label className="field-label">
                    CORREO / EMAIL
                    {errors.email && <span className="field-error">{errors.email}</span>}
                  </label>
                  <input
                    type="email"
                    className={`field-input ${errors.email ? 'input-error' : ''}`}
                    value={form.email}
                    onChange={e => handleChange('email', e.target.value)}
                    placeholder="correo@ejemplo.com"
                    disabled={status === 'sending'}
                  />
                </div>

                <div className="form-field">
                  <label className="field-label">
                    MENSAJE / MESSAGE
                    {errors.message && <span className="field-error">{errors.message}</span>}
                  </label>
                  <textarea
                    className={`field-textarea ${errors.message ? 'input-error' : ''}`}
                    value={form.message}
                    onChange={e => handleChange('message', e.target.value)}
                    placeholder="Cuéntame en qué puedo ayudarte..."
                    rows={5}
                    disabled={status === 'sending'}
                  />
                </div>

                <button
                  type="submit"
                  className="btn-send"
                  disabled={status === 'sending'}
                >
                  {status === 'sending' ? 'TRANSMITTING...' : 'TRANSMIT →'}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
