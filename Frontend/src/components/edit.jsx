import React, { useState } from "react";

const Edit = ({ item, itemName, onUpdate, onCancel }) => {
  const [name, setName] = useState(item.name);
  const [description, setDescription] = useState(item.description);
  const [links, setLinks] = useState(item.links);
  const [status, setStatus] = useState(item.status);

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate({ ...item, name, description, links, status });
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h4>Edit Project</h4>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder={`${itemName} Name`}
            style={{ width: "100%", padding: "0.5rem", marginBottom: "1rem" }}
          />
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder={`${itemName} Description`}
            style={{ width: "100%", padding: "0.5rem", marginBottom: "1rem" }}
          />
          <input
            type="text"
            value={links}
            onChange={(e) => setLinks(e.target.value)}
            placeholder={`${itemName} Links`}
            style={{ width: "100%", padding: "0.5rem", marginBottom: "1rem" }}
          />
          {
           itemName === "Project" ? 
            <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            style={{ width: "104%", padding: "0.5rem", marginBottom: "1rem" }}
            >
            <option value="working">Working</option>
            <option value="planned">Planned</option>
            <option value="completed">Completed</option>
          </select> : <></>
          }
          <div className="modal-buttons">
            <button type="submit">Update</button>
            <button type="button" onClick={onCancel}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Edit;
