import React, { useEffect, useState } from "react";
import { CiEdit } from "react-icons/ci";
import { IoTrashBinOutline, IoImages } from "react-icons/io5";
import axios from "axios";
import Images from "../components/images";
import DeleteProject from "../components/delete";
import EditProject from "../components/edit";
import Add from "../components/Add";
import AddImage from "../components/AddImage";

const Project = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(null); // For delete confirmation
  const [showEditModal, setShowEditModal] = useState(null); // For edit modal
  const [showAddModal, setShowAddModal] = useState(null); // For Add modal
  const [showAddImageModal, setShowAddImageModal] = useState(null); // For Add Image modal
  const token = localStorage.getItem("token");

  // Fetch projects from the server
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/student/projects",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setProjects(response.data.Projects);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setError("Failed to fetch projects");
        setLoading(false);
      }
    };

    fetchProjects();
  }, [projects]);

  const deleteProject = async (projectId) => {
    try {
      await axios.delete(
        `http://localhost:5000/student/projects/${projectId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setProjects(projects.filter((project) => project._id !== projectId));
      setShowDeleteModal(null); // Close the delete modal
    } catch (error) {
      console.error("Failed to delete project:", error);
    }
  };

  const updateProject = async (updatedProject) => {
    try {
      const response = await axios.patch(
        `http://localhost:5000/student/projects/${updatedProject._id}`,
        updatedProject,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setProjects(
        projects.map((project) =>
          project._id === updatedProject._id ? response.data.project : project
        )
      );
      setShowEditModal(null); // Close the edit modal
    } catch (error) {
      console.error("Failed to update project:", error);
    }
  };

  const addProject = async (updatedProject) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/student/projects",
        updatedProject,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const addedProject = response.data.project;
      setProjects([...projects, addedProject])
      setShowAddModal(null)
    } catch (error) {
      console.log(error);
    }
  }

  const addImage = async (addedImage, project) => {
    try {
      const response = await axios.post(
        `http://localhost:5000/student/projects/${project}/images`,
         addedImage,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setProjects([...projects])
      setShowAddImageModal(null)
    } catch (error) {
      console.log(error)
    }
  }

  if (loading) return <div>Loading projects...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="item-body">
      <div className="heading">
        <h2>Student Projects</h2>
        <button className="add-btn" onClick={() => setShowAddModal(true)}>
          Add Project
        </button>
      </div>
      <div className="list">
        {projects.length > 0 ? (
          projects.map((project, index) => (
            <div key={index} className="item">
              <div className="item-buttons">
                {/* Delete and Edit buttons */}
                <h2>{project.name.toUpperCase()}</h2>
                <button id="add-images" title="Add Images" onClick={() => setShowAddImageModal(project._id)}>
                  <IoImages />
                </button>
                <button
                  id="delete"
                  title="Delete Project"
                  onClick={() => setShowDeleteModal(project._id)}
                >
                  <IoTrashBinOutline />
                </button>
                <button
                  id="edit"
                  title="Edit Project"
                  onClick={() => setShowEditModal(project)}
                >
                  <CiEdit />
                </button>
              </div>
              <p>{project.description}</p>
              <p>{project.status}</p>
              {project.links ? <p>{project.links}</p> : <></>}
              <Images item={project} itemName = "projects" token={token} />

              {/* Delete confirmation modal */}
              {showDeleteModal === project._id && (
                <DeleteProject
                  onDelete={() => deleteProject(project._id)}
                  onCancel={() => setShowDeleteModal(null)}
                />
              )}

              {/* Edit project modal */}
              {showEditModal && showEditModal._id === project._id && (
                <EditProject
                  item={project}
                  itemName="Project"
                  onUpdate={updateProject}
                  onCancel={() => setShowEditModal(null)}
                />
              )}

              {showAddImageModal === project._id && (
                <AddImage 
                  item={project}
                  onAdd={addImage}
                  onCancel={() => setShowAddImageModal(null)}
                />
              )
              }
            </div>
          ))
        ) : (
          <p>No projects available</p>
        )}
        {showAddModal && (
          <Add
            item="Project"
            onAdd={addProject}
            onCancel={() => setShowAddModal(null)}
          />
        )}
      </div>
    </div>
  );
};

export default Project;
