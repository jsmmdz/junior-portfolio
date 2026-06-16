import './Services.css'
import { services } from '../data/projects'

function ServiceCard({ svc, index }) {
  return (
    <div
      className={`svc-card svc-card-${svc.color}`}
      style={{ animationDelay: `${index * 0.12}s` }}
    >
      <div className="svc-header">
        <span className="svc-ref">{svc.ref}</span>
        <span className={`svc-status status-${svc.color}`}>{svc.status}</span>
      </div>

      <div className="svc-body">
        <div className="svc-title-row">
          <span className={`svc-icon icon-${svc.color}`}>{svc.icon}</span>
          <h3 className="svc-title">{svc.title}</h3>
        </div>

        {svc.color === 'purple' && (
          <div className="svc-sub-label">● {svc.title}</div>
        )}

        <p className="svc-desc">{svc.description}</p>
      </div>

      <div className="svc-footer">
        <div className="svc-skill-row">
          <span className="skill-label">EXPERTISE</span>
          <div className="skill-bar">
            <div
              className={`skill-fill skill-fill-${svc.color}`}
              style={{ width: `${svc.expertise}%` }}
            />
          </div>
          <span className="skill-val">{svc.expertise}%</span>
        </div>

        <div className="svc-tags">
          {svc.tags.map(t => (
            <span key={t} className="svc-tag">{t}</span>
          ))}
        </div>

        <div className="svc-status-row">
          <span className="status-label">STATUS</span>
          <span className={`status-val-${svc.color}`}>{svc.status}</span>
        </div>
      </div>
    </div>
  )
}

export default function Services() {
  return (
    <div className="services">
      <div className="services-header">
        <div className="services-breadcrumb">SYS / NODE_DIRECTORY</div>
        <h2 className="services-title">SERVICES</h2>
      </div>

      <div className="services-grid">
        {services.map((svc, i) => (
          <ServiceCard key={svc.id} svc={svc} index={i} />
        ))}
      </div>

      <div className="services-footer">
        <div className="svc-load-row">
          <span className="load-label">SYS_LOAD</span>
          <div className="svc-bar">
            <div className="svc-bar-fill" style={{ width: '92%' }} />
          </div>
          <span className="load-val">92%</span>
        </div>
      </div>
    </div>
  )
}
