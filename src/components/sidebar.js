import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router";
import "../styles/sidebar.scss";
import DashboardIcon from "@mui/icons-material/Dashboard";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import TaskIcon from "@mui/icons-material/Task";
import MusicNoteIcon from "@mui/icons-material/MusicNote";
import RestaurantMenuIcon from "@mui/icons-material/RestaurantMenu";
import GitHubIcon from "@mui/icons-material/GitHub";

const NAVIGATION = [
  {
    header: "Main",
    items: [
      {
        title: "Tasks",
        icon: <TaskIcon fontSize="large" />,
        path: "/tasks",
      },
      {
        title: "View Budgets",
        icon: <AccountBalanceIcon fontSize="large" />,
        path: "/budgets",
      },
    ],
  },
  {
    header: "Hobbies",
    items: [
      {
        title: "Music",
        icon: <MusicNoteIcon fontSize="large" />,
        path: "/music",
      },
      {
        title: "Cooking",
        icon: <RestaurantMenuIcon fontSize="large" />,
        path: "/cooking",
      },
      {
        title: "GitHub Activity",
        icon: <GitHubIcon fontSize="large" />,
        path: "/github-activity",
      },
    ],
  },
];

const Section = ({ header, items, handleClick, activeIndex, sectionIndex }) => (
  <div className="sidebar-section">
    <div className="section-header">{header}</div>
    <ul className="section-items">
      {items?.map((item, itemIndex) => {
        const uniqueIndex = `${sectionIndex}-${itemIndex}`; // Generate unique index
        return (
          <Link
            to={item.path}
            key={itemIndex}
            className={`section-item ${
              activeIndex === uniqueIndex ? "active" : ""
            }`}
            onClick={() => handleClick(itemIndex)}
          >
            <div className="section-item__icon">{item.icon}</div>
            <div className="section-item__title">{item.title}</div>
          </Link>
        );
      })}
    </ul>
  </div>
);

const Sidebar = ({ isSidebarOpen }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className={`sidebar ${isSidebarOpen ? "mini" : ""}`}>
      {NAVIGATION.map((section, sectionIndex) => (
        <Section
          key={sectionIndex}
          header={section.header}
          items={section.items}
          handleClick={
            (itemIndex) => setActiveIndex(`${sectionIndex}-${itemIndex}`) // Set unique active index
          }
          activeIndex={activeIndex}
          sectionIndex={sectionIndex}
        />
      ))}
    </div>
  );
};

export default Sidebar;
