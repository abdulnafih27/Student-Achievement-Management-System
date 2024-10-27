import React from 'react'

const Delete = ({ onDelete, onCancel }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h4>Do you really want to delete this project?</h4>
        <div className="modal-buttons">
          <button onClick={onDelete}>Accept</button>
          <button onClick={onCancel}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default Delete