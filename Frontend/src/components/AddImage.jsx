import axios from "axios";
import React, { useState } from "react";

const AddImage = ({ item, onAdd, onCancel }) => {
  const [file, setFile] = useState();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", file);
    onAdd(formData, item._id);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <form action="submit" onSubmit={handleSubmit}>
          <input
            type="file"
            accept="image"
            onChange={(e) => setFile(e.target.files[0])}
            style={{ width: "100%", padding: "0.5rem", marginBottom: "1rem" }}
          />
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

export default AddImage;
