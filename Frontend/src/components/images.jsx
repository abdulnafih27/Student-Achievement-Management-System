import React, { useEffect, useState } from "react";
import axios from "axios";
import { MdDeleteForever } from "react-icons/md";

const Images = ({ item,itemName, token }) => {
  const [imageUrls, setImageUrls] = useState([]); // Store the image filenames
  const [isOpen, setIsOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/student/${itemName}/${item._id}/images`,
          {
            headers: {
              Authorization: `Bearer ${token}`, 
            },
          }
        );
        // Assuming response.data.data contains an array of image filenames
        setImageUrls(response.data.data);
      } catch (error) {
        console.error("Error fetching images:", error);
      }
    };

    fetchImages();
  }, [item, token]);


  // Build the image path
  const getImagePath = (filename) => {
    return `http://localhost:5000/images/${filename}`; // Adjust the URL to match where you're serving images
  };

  // Open modal and set current image index
  const openModal = (index) => {
    setCurrentIndex(index);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const goLeft = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? imageUrls.length - 1 : prevIndex - 1
    );
  };

  const goRight = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === imageUrls.length - 1 ? 0 : prevIndex + 1
    );
  };

const deleteImage = async () => {
  const imageToDelete = imageUrls[currentIndex];
  try {
    await axios.delete(
      `http://localhost:5000/student/projects/${item._id}/images/${imageToDelete._id}`, // Adjust the URL according to your API
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    // Update state to remove the deleted image
    setImageUrls((prevImages) => {
      const updatedImages = prevImages.filter(
        (_, index) => index !== currentIndex
      );
      // Check if currentIndex is now out of bounds
      if (updatedImages.length === 0) {
        closeModal(); // Close the modal if there are no images left
        return updatedImages;
      }
      // Adjust currentIndex to be valid
      if (currentIndex >= updatedImages.length) {
        setCurrentIndex(updatedImages.length - 1); // Point to the last image
      }
      return updatedImages;
    });
    closeModal(); // Close the modal after deletion
  } catch (error) {
    console.error("Error deleting image:", error);
  }
};

  return (
    <div className="images">
      {imageUrls.map((filename, index) => (
        <img
          key={index}
          src={getImagePath(filename.url)}
          alt={`Project Image ${index + 1}`}
          onClick={() => openModal(index)}
          style={{
            cursor: "pointer",
            width: "10rem", // Set a fixed width
            height: "15rem", // Set a fixed height
            objectFit: "cover", // Ensure the image covers the specified dimensions
          }}
        />
      ))}

      {isOpen && (
        <div className="modal">
          <span className="close" onClick={closeModal}>
            &times;
          </span>
          {
           imageUrls.length > 0 && (
            <img
            className="modal-content-image"
            src={getImagePath(
              imageUrls[currentIndex].url || imageUrls[currentIndex]
            )} // Use the current index correctly
            alt="Large view"
            style={{
              maxHeight: "70vh",
              maxWidth: "80vw",
              objectFit: "contain",
            }}
            /> )
          }
          <button id="delete-image" onClick={deleteImage}>
            <MdDeleteForever />
          </button>
          <button className="prev" onClick={goLeft}>
            &#10094;
          </button>
          <button className="next" onClick={goRight}>
            &#10095;
          </button>
        </div>
      )}
    </div>
  );
};

export default Images;
