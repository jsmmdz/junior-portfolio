import './ProjectDirectory.css'
import { projects } from '../data/projects'

const TAG_COLORS = {
  'CLAUDE':     'green',
  'FIGMA':      'purple',
  'WEBFLOW':    'purple',
  'AI':         'blue',
  'EDITORIAL':  'purple',
  'ILLUSTRATOR':'green',
  'UI/UX':      'green',
  'REACT':      'green',
  'TYPESCRIPT': 'green',
  '3D':         'purple',
  'WEBGL':      'purple',
  'MOTION':     'purple',
  'BRANDING':   'blue',
  'DESIGN SYS': 'blue',
  'FRAMER':     'purple',
}

function getTagColor(tag) {
  return TAG_COLORS[tag] || 'dim'
}

function AwaitingCard({ project }) {
  return (
    <div className="project-card project-card-awaiting">
      <div className="card-header">
        <span className="card-ref">{project.ref}</span>
        <span className="card-status status-awaiting">AWAITING_DATA</span>
      </div>

      <div className="card-thumb card-thumb-awaiting">
        <div className="awaiting-grid">
          {Array.from({ length: 9 }).map((_, i) => (
            <div key={i} className="awaiting-cell" />
          ))}
        </div>
        <span className="awaiting-label">SLOT // {project.ref}</span>
      </div>

      <div className="card-body">
        <h3 className="card-title card-title-dim">{project.title}</h3>
        <p className="card-subtitle">{project.subtitle}</p>

        <div className="card-tags">
          <span className="tag tag-awaiting">AWAITING_DATA</span>
          <span className="tag tag-awaiting">AWAITING_DATA</span>
        </div>
      </div>

      <div className="card-footer">
        <span className="card-year">——</span>
        <span className="btn-explore btn-explore-dim">RESERVED</span>
      </div>
    </div>
  )
}

function ProjectCard({ project, onClick }) {
  if (project.awaiting) {
    return <AwaitingCard project={project} />
  }

  const statusColorMap = {
    OPERATIONAL: 'green',
    COMPLETE:    'green',
    ARCHIVED:    'purple',
    'IN PROGRESS': 'yellow',
  }
  const statusColor = statusColorMap[project.status] || 'dim'

  return (
    <div className="project-card" onClick={() => onClick(project)}>
      <div className="card-header">
        <span className="card-ref">{project.ref}</span>
        <span className={`card-status status-${statusColor}`}>
          {project.status}
        </span>
      </div>

      <div className="card-thumb">
        {project.thumbnail ? (
          <img src={project.thumbnail} alt={project.title} />
        ) : (
          <div className="card-thumb-placeholder">
            <div className="thumb-grid">
              {Array.from({ length: 9 }).map((_, i) => (
                <div key={i} className="thumb-cell" />
              ))}
            </div>
            <span className="thumb-label">ASSET // {project.ref}</span>
          </div>
        )}
      </div>

      <div className="card-body">
        <h3 className="card-title">{project.title}</h3>
        <p className="card-subtitle">{project.subtitle}</p>

        <div className="card-tags">
          {project.tags.map(tag => (
            <span key={tag} className={`tag tag-${getTagColor(tag)}`}>{tag}</span>
          ))}
        </div>
      </div>

      <div className="card-footer">
        <span className="card-year">{project.year}</span>
        <button className="btn-explore">EXPLORAR →</button>
      </div>
    </div>
  )
}

export default function ProjectDirectory({ onOpenProject }) {
  return (
    <div className="directory">
      <div className="directory-header">
        <div className="directory-breadcrumb">DIR: /VAR/PROJECTS/ACTIVE</div>
        <div className="directory-title-row">
          <h2 className="directory-title">PROJECT DIRECTORY</h2>
          <div className="directory-meta">
            <span className="display-badge">DISPLAY: GRID [4:1]</span>
          </div>
        </div>
      </div>

      <div className="directory-grid">
        {projects.map(p => (
          <ProjectCard key={p.id} project={p} onClick={onOpenProject} />
        ))}
      </div>

      <div className="directory-footer">
        <div className="sys-load">
          <span className="load-label">SYS_LOAD</span>
          <div className="load-bar">
            <div className="load-fill" style={{ width: '68%' }} />
          </div>
          <span className="load-val">68%</span>
        </div>
        <div className="mem-row">
          <span className="load-label">MEM</span>
          <span className="mem-val">1024GB / 4096GB</span>
        </div>
      </div>
    </div>
  )
}
