import React, { useState, useRef } from "react";
import "../styles/styles.scss";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useClickInside, useClickOutside } from "../hooks/useClick";
import useToggle from "../hooks/useToggle";

export function Card({ handleSubmit }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isActive, toggleIsActive] = useToggle(false);
  const textareaRef = useRef(null);
  const titleRef = useRef(null);
  const cardRef = useRef(null);

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

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const date = new Date();
    const formattedDate = date.toLocaleDateString();
    const formattedTime = date.toLocaleTimeString();

    const uniqueId = `${formattedDate} ${formattedTime}`;
    handleSubmit({
      id: uniqueId,
      title: title,
      content: content,
    });
    toggleIsActive(false);
    setTitle("");
    setContent("");
  };

  useClickInside(cardRef, (event) => {
    toggleIsActive(true);
    if (event.target !== titleRef.current) {
      setTimeout(() => textareaRef.current?.focus(), 0);
    }
  });
  useClickOutside(cardRef, () => toggleIsActive(false));

  return (
    <div className="card add-task_card" ref={cardRef}>
      <form onSubmit={handleFormSubmit}>
        <div className="card-header">
          {!isActive && <input type="text" className="card-preview__text" placeholder="Make a task..." />}
        </div>
        {isActive && (
          <>
            <div className="card-body">
              <input
                ref={titleRef}
                type="text"
                className="title-input"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <textarea
                ref={textareaRef}
                value={content}
                onChange={handleChange}
                placeholder="Type something..."
                className="content-input"
              />
            </div>
            <div className="card-footer">
              <button type="submit" className="btn card_submit_btn" aria-label="Delete">
                Close
              </button>
            </div>
          </>
        )}
      </form>
    </div>
  );
}

export function TaskCard({ handleSubmit, handleDelete, prevTitle = "", prevContent = "", id }) {
  const [isActive, toggleActive] = useToggle(false);
  const [title, setTitle] = useState(prevTitle);
  const [content, setContent] = useState(prevContent === "" ? "Empty note" : prevContent);
  const textareaRef = useRef(null);
  const titleRef = useRef(null);
  const cardRef = useRef(null);
  const [lastEdited, setLastEdited] = useState(null);

  const handleEdit = () => {
    if (!isActive) {
      toggleActive(true);
      setTimeout(() => textareaRef.current?.focus(), 0);
    }
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

  const handleFormSubmit = (event) => {
    toggleActive(false);
    if (prevContent === content || prevTitle === title) {
      alert("same");
      return;
    }

    if (event.type === "submit") event.preventDefault();
    handleSubmit({
      id: id,
      title: title,
      content: content,
    });

    const currentTime = new Date();
    setLastEdited(currentTime);
  };

  useClickInside(cardRef, (event) => {
    if (!isActive) {
      toggleActive(true);
      if (event.target !== titleRef.current) {
        setTimeout(() => textareaRef.current?.focus(), 0);
      }
    }
  });

  useClickOutside(cardRef, () => {
    if (isActive) {
      handleFormSubmit(event);
      toggleActive(false);
    }
  });

  const formatLastEdited = (prevLastEdited) => {
    const currentTime = new Date();
    const prevDate = new Date(prevLastEdited);

    const isToday = currentTime.toDateString() === prevDate.toDateString(); // Compare if the dates are the same
    const isYesterday =
      currentTime.getDate() - prevDate.getDate() === 1 &&
      currentTime.getMonth() === prevDate.getMonth() &&
      currentTime.getFullYear() === prevDate.getFullYear();

    if (isToday) {
      // If it's today, show the time
      return prevDate.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    } else if (isYesterday) {
      // If it's yesterday, show "Yesterday"
      return "Yesterday";
    } else {
      // Otherwise, show the full date
      return prevDate.toLocaleDateString([], { month: "short", day: "numeric" });
    }
  };

  return (
    <div className={`card card__task ${isActive && "current_active"}`} ref={cardRef}>
      <form onSubmit={handleFormSubmit}>
        {(title || isActive) && (
          <div className="card-header">
            <input
              ref={titleRef}
              type="text"
              className="title-input"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
        )}
        <div className="card-body">
          <textarea
            ref={textareaRef}
            value={content}
            onChange={handleChange}
            placeholder="Type something..."
            className="content-input"
          />
        </div>
        {isActive && (
          <div class="last-edited">
            <p>{lastEdited ? `Edited: ${formatLastEdited(lastEdited)}` : "No edits yet"}</p>
          </div>
        )}
        <div className="card-footer">
          <button type="button" className="icon-btn" onClick={handleEdit} aria-label="Edit">
            <EditIcon />
          </button>
          <button type="button" onClick={() => handleDelete(id)} className="icon-btn" aria-label="Delete">
            <DeleteIcon />
          </button>

          {isActive && (
            <button type="submit" className="btn card_submit_btn" aria-label="Delete">
              Close
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
