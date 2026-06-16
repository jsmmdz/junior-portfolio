import Nav from './Nav'
import StatusBar from './StatusBar'
import ProjectDirectory from './ProjectDirectory'
import ProjectDetail from './ProjectDetail'
import Services from './Services'
import Network from './Network'
import './MainLayout.css'

export default function MainLayout({
  section,
  selectedProject,
  onNavChange,
  onOpenProject,
  onBackToProjects,
}) {
  function renderSection() {
    switch (section) {
      case 'projects':
        return <ProjectDirectory onOpenProject={onOpenProject} />
      case 'project-detail':
        return <ProjectDetail project={selectedProject} onBack={onBackToProjects} />
      case 'services':
        return <Services />
      case 'network':
        return <Network />
      default:
        return <ProjectDirectory onOpenProject={onOpenProject} />
    }
  }

  const statusLeft = section === 'project-detail' && selectedProject
    ? `SYS / ${selectedProject.ref}`
    : 'SYS_DATA // JUNTR'

  return (
    <div className="main-layout">
      <Nav section={section} onNavChange={onNavChange} />
      <div className="main-content">
        {renderSection()}
      </div>
      <StatusBar left={statusLeft} />
    </div>
  )
}
