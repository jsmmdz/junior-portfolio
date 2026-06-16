import { useState } from 'react'
import Home from './components/Home'
import BootSequence from './components/BootSequence'
import MainLayout from './components/MainLayout'
import './App.css'

export default function App() {
  const [view, setView] = useState('home')
  const [section, setSection] = useState('projects')
  const [selectedProject, setSelectedProject] = useState(null)

  function handleStart() {
    setView('boot')
  }

  function handleBootComplete() {
    setView('main')
    setSection('projects')
  }

  function handleNavChange(newSection) {
    setSection(newSection)
    setSelectedProject(null)
  }

  function handleOpenProject(project) {
    setSelectedProject(project)
    setSection('project-detail')
  }

  function handleBackToProjects() {
    setSelectedProject(null)
    setSection('projects')
  }

  return (
    <div className="app">
      {view === 'home' && <Home onStart={handleStart} />}
      {view === 'boot' && <BootSequence onComplete={handleBootComplete} />}
      {view === 'main' && (
        <MainLayout
          section={section}
          selectedProject={selectedProject}
          onNavChange={handleNavChange}
          onOpenProject={handleOpenProject}
          onBackToProjects={handleBackToProjects}
        />
      )}
    </div>
  )
}
