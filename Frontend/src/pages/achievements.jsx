import React, { useEffect, useState } from "react";
import { CiEdit } from "react-icons/ci";
import { IoTrashBinOutline } from "react-icons/io5";
import axios from "axios";
import Images from "../components/images";
import Deleteachievement from "../components/delete";
import Editachievement from "../components/edit";
import Add from "../components/Add";

const Achievement = () => {
  const [Achievements, setAchievements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(null); // For delete confirmation
  const [showEditModal, setShowEditModal] = useState(null); // For edit modal
  const [showAddModal, setShowAddModal] = useState(null); // For edit modal
  const token = localStorage.getItem("token");

  // Fetch Achievements from the server
  useEffect(() => {
    const fetchAchievements = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/student/achievements",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setAchievements(response.data.Achievements);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setError("Failed to fetch Achievements");
        setLoading(false);
      }
    };

    fetchAchievements();
  }, []);

  const deleteAchievement = async (AchievementId) => {
    try {
      await axios.delete(
        `http://localhost:5000/student/achievements/${AchievementId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setAchievements(Achievements.filter((Achievement) => Achievement._id !== AchievementId));
      setShowDeleteModal(null); // Close the delete modal
    } catch (error) {
      console.error("Failed to delete Achievement:", error);
    }
  };

  const updateAchievement = async (updatedAchievement) => {
    try {
      const response = await axios.patch(
        `http://localhost:5000/student/achievements/${updatedAchievement._id}`,
        updatedAchievement,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setAchievements(
        Achievements.map((Achievement) =>
          Achievement._id === updatedAchievement._id ? response.data.Achievement : Achievement
        )
      );
      setShowEditModal(null); // Close the edit modal
    } catch (error) {
      console.error("Failed to update Achievement:", error);
    }
  };

  const addAchievement = async (newAchievement) => {
    try {
        // console.log(newAchievement.name); 
      const response = await axios.post(
        "http://localhost:5000/student/achievements",
        newAchievement,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const addedAchievement = response.data.achievement;
      setAchievements([...Achievements, addedAchievement]);
      setShowAddModal(null);
    } catch (error) {
      console.log(error);
    }
  };

  if (loading) return <div>Loading Achievements...</div>;
  if (error) return <div>{error}</div>;
//   console.log(Achievements)
  return (
    <div className="item-body">
      <div className="heading">
        <h2>Student Achievements</h2>
        <button className="add-btn" onClick={() => setShowAddModal(true)}>
          Add Achievement
        </button>
      </div>
      <div className="list">
        {Achievements.length > 0 ? (
          Achievements.map((Achievement, index) => (
            <div key={index} className="item">
              <div className="item-buttons">
                {/* Delete and Edit buttons */}
                <h2>{Achievement.name.toUpperCase()}</h2>
                <button
                  id="delete"
                  onClick={() => setShowDeleteModal(Achievement._id)}
                >
                  <IoTrashBinOutline />
                </button>
                <button id="edit" onClick={() => setShowEditModal(Achievement)}>
                  <CiEdit />
                </button>
              </div>
              <p>{Achievement.description}</p>
              {Achievement.links ? <p>{Achievement.links}</p> : <></>}
              <Images project={"achievement"} token={token} />

              {/* Delete confirmation modal */}
              {showDeleteModal === Achievement._id && (
                <Deleteachievement
                  onDelete={() => deleteAchievement(Achievement._id)}
                  onCancel={() => setShowDeleteModal(null)}
                />
              )}

              {/* Edit Achievement modal */}
              {showEditModal && showEditModal._id === Achievement._id && (
                <Editachievement
                  item={Achievement}
                  itemName = "Achievement"
                  onUpdate={updateAchievement}
                  onCancel={() => setShowEditModal(null)}
                />
              )}
            </div>
          ))
        ) : (
          <p>No Achievements available</p>
        )}
        {showAddModal && (
          <Add
            item="Achievement"
            onAdd={addAchievement}
            onCancel={() => setShowAddModal(null)}
          />
        )}
      </div>
    </div>
  );
};

export default Achievement;
