import { useState } from 'react';
import './ProjectP.scss';
import { ProjectM } from '../../models/project.model';
import { PROJECTS_KEY } from '../../database/storage.keys';

interface PropsM {
  project: ProjectM;
  setProject: (project: ProjectM) => void;
}

export function ProjectP(props: PropsM): JSX.Element {
  const [project, setProject] = useState<ProjectM>(props.project);
  const [changes, setChanges] = useState<boolean>(false);

  function updateProject(changes: { [key: string]: any }) {
    setChanges(true);
    setProject({
      id: project.id,
      name: changes.name || project.name,
      path: changes.path || project.path,
      created: project.created,
      edited: Date.now(),
      data: changes.data || project.data
    });
  }
  function saveProject() {
    const data: string | null = localStorage.getItem(PROJECTS_KEY);
    if (data !== null) {
      const projects: Array<ProjectM> = JSON.parse(data);
      localStorage.setItem(PROJECTS_KEY, JSON.stringify(projects.map(p => project.id === p.id ? project : p)));
    }
    props.setProject(project);
    setChanges(false);
  }

  return <div className="project">
    <input className="project--title" value={project.name} onChange={(evt) => updateProject({ name: evt.target.value })}></input>
    <label>
      Path:
      <input className="project--path" value={project.path} onChange={(evt) => updateProject({ path: evt.target.value })}></input>
    </label>
    {changes && <button className="project--save" onClick={saveProject}>Save</button>}
  </div>;
}
