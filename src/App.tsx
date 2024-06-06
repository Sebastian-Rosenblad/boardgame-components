import React, { useState } from 'react';
import './App.scss';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import { ProjectsP } from './pages/Projects/ProjectsP';
import { ProjectM } from './models/project.model';
import { ProjectP } from './pages/Project/ProjectP';
import { CardListP } from './pages/CardList/CardListP';
import { DataItemM } from './models/data-item.model';

function App() {
  const [project, setProject] = useState<ProjectM | undefined>();
  const navigate = useNavigate();

  function changeProject(newProject: ProjectM) {
    setProject(newProject);
    navigate("/" + newProject.id);
  }
  function updateData(newData: Array<DataItemM>) {
    if (project !== undefined) updateProject({ data: newData });
  }
  function updateProject(changes: { [key: string]: any; }) {
    if (project !== undefined) {
      setProject({
        id: changes.id || project.id,
        name: changes.name || project.name,
        path: changes.path || project.path,
        created: project.created,
        edited: Date.now(),
        data: changes.data || project.data
      });
    }
  }

  return (
    <div className="App">
      <nav className="App--navigation">
        <Link to="/"><button>Project list</button></Link>
        {project !== undefined && <Link to={"/" + project.id}><button>{project.name}</button></Link>}
        {project !== undefined && <Link to={"/" + project.id + "-cards"}><button>Cards</button></Link>}
      </nav>
      <main>
        <Routes>
          <Route path="/" element={<ProjectsP project={project} setProject={changeProject} />}></Route>
          {project !== undefined && <Route path={"/" + project.id} element={<ProjectP project={project} setProject={setProject} />}></Route>}
          {project !== undefined && <Route path={"/" + project.id + "-cards"} element={<CardListP data={project.data} path={project.path} updateData={updateData} />}></Route>}
        </Routes>
      </main>
    </div>
  );
}

export default App;
