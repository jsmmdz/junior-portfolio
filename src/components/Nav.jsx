import './Nav.css'

export default function Nav({ section, onNavChange }) {
  return (
    <nav className="nav">
      <div className="nav-brand">
        <span className="brand-first">JUNIOR</span>
        <span className="brand-last">MEJIA</span>
      </div>

      <div className="nav-links">
        <button
          className={`nav-link ${section === 'projects' || section === 'project-detail' ? 'active' : ''}`}
          onClick={() => onNavChange('projects')}
        >
          PROJECTS
        </button>
        <button
          className={`nav-link ${section === 'services' ? 'active' : ''}`}
          onClick={() => onNavChange('services')}
        >
          SERVICES
        </button>
        <button
          className={`nav-link ${section === 'network' ? 'active' : ''}`}
          onClick={() => onNavChange('network')}
        >
          NETWORK
        </button>
      </div>

      <div className="nav-right">
        <span className="nav-icon">⚙</span>
        <span className="nav-icon">◫</span>
      </div>
    </nav>
  )
}
