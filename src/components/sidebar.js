import React from "react";
import "../styles/sidebar.scss";

const Section = ({ header, items }) => (
  <div className="sidebar-section">
    <div className="section-header">{header}</div>
    <ul className="section-items">
      {items.map((item, index) => (
        <li key={index} className="section-item">
          {item}
        </li>
      ))}
    </ul>
  </div>
);

const Sidebar = () => {
  return (
    <div className="sidebar">
      <Section header="Section 1" items={["Item 1", "Item 2", "Item 3"]} />
      <Section header="Section 2" items={["Item 4", "Item 5", "Item 6"]} />
      <Section header="Section 3" items={["Item 7", "Item 8", "Item 9"]} />
    </div>
  );
};

export default Sidebar;
