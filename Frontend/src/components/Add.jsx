import axios from "axios";
import React, { useState } from "react";

const Add = ({ item, onAdd, onCancel }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [links, setLink] = useState("");
  const [status, setStatus] = useState("working");

  const handleSubmit = async (e) => {
    e.preventDefault();
    let newItem ;
    if(item === "Project"){
      newItem = { name, description, status };
    } 
    else{
      newItem = { name, description };
    }     
  // console.log(newItem)
    if (links.trim()) {
      newItem.links = links;
    }
    onAdd(newItem);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <form action="submit" onSubmit={handleSubmit}>
          <input
            type="text"
            value={name}
            placeholder={`${item} Name`}
            onChange={(e) => setName(e.target.value)}
            style={{ width: "100%", padding: "0.5rem", marginBottom: "1rem" }}
          />
          <textarea
            value={description}
            placeholder={`${item} Description`}
            onChange={(e) => setDescription(e.target.value)}
            style={{ width: "100%", padding: "0.5rem", marginBottom: "1rem" }}
          />
          <input
            type="text"
            value={links}
            placeholder={`${item} Link`}
            onChange={(e) => setLink(e.target.value)}
            style={{ width: "100%", padding: "0.5rem", marginBottom: "1rem" }}
          />
          {
            item === "Project" ?
            <select
            onChange={(e) => setStatus(e.target.value)}
            style={{ width: "104%", padding: "0.5rem", marginBottom: "1rem" }}
            >
            <option value="working">Working</option>
            <option value="planned">Planned</option>
            <option value="completed">Completed</option>
          </select>: <></>
          }
          <div className="modal-buttons">
            <button type="submit">Add</button>
            <button type="button" onClick={onCancel}>
              Cancel
            </button>
          </div> 
        </form>
      </div>
    </div>
  );
};

export default Add;
