import React, { useState, useRef } from "react";
import "../styles/styles.scss";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

function Card() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const textareaRef = useRef(null);

  const handleEdit = () => {
    // Handle edit logic here
    console.log("Editing the card");
  };

  const handleDelete = () => {
    // Handle delete logic here
    console.log("Deleting the card");
  };

  const adjustHeight = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = `${textarea.scrollHeight}px`; // Set height based on scrollHeight
    }
  };

  const handleChange = (e) => {
    setContent(e.target.value);
    adjustHeight();
  };

  return (
    <div className="card">
      <div className="card-header">
        <input
          type="text"
          className="title-input"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div className="card-body">
        <textarea
          ref={textareaRef}
          value={content}
          onChange={handleChange}
          placeholder="Type something..."
          className="content-input"
        />
      </div>
      <div className="card-footer">
        <button className="icon-btn" onClick={handleEdit} aria-label="Edit">
          <EditIcon />
        </button>
        <button className="icon-btn" onClick={handleDelete} aria-label="Delete">
          <DeleteIcon />
        </button>
      </div>
    </div>
  );
}

export default Card;
