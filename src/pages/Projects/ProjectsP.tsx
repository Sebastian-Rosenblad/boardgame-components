import { useState } from 'react';
import './ProjectsP.scss';
import { ProjectM } from '../../models/project.model';
import { projectsDB } from '../../database/projects.db';
import { PROJECTS_KEY } from '../../database/storage.keys';
import { getNewID } from '../../scripts/id';

function InitPorjects(): Array<ProjectM> {
  const data: string | null = localStorage.getItem(PROJECTS_KEY);
  if (data !== null) return JSON.parse(data);
  return projectsDB;
}

export function ProjectsP(props: {
  project: ProjectM | undefined;
  setProject: (project: ProjectM) => void;
}): JSX.Element {
  const [projects, setProjects] = useState<Array<ProjectM>>(InitPorjects());

  function addProject() {
    const newProjects: Array<ProjectM> = [...projects, getNewProject()];
    setProjects(newProjects);
    localStorage.setItem(PROJECTS_KEY, JSON.stringify(newProjects));
  }
  function saveProjects() {
    navigator.clipboard.writeText('import{ProjectM}from"../models/project.model";export const projectsDB:Array<ProjectM>=' + JSON.stringify(projects) + ';');
  }
  function loadFile() {
    localStorage.setItem(PROJECTS_KEY, JSON.stringify(projectsDB));
    setProjects(projectsDB);
  }
  function getNewProject(): ProjectM {
    return {
      id: getNewID(projects.map(project => project.id)),
      name: "New Project",
      path: "",
      created: Date.now(),
      edited: Date.now(),
      data: []
    };
  }

  return <div className="projects">
    <h1 className="projects--title">Projects</h1>
    <div className="projects--list">
      {projects.sort((a, b) => b.edited - a.edited).map(project =>
        <button key={"project-" + project.id} onClick={() => props.setProject(project)}>{project.name}</button>
      )}
    </div>
    <div className="projects--buttons">
      <button onClick={addProject}>Add project</button>
      <button onClick={saveProjects}>Save project list</button>
      <button onClick={loadFile}>Load from file</button>
    </div>
  </div>;
}
