// src/components/Sidebar.jsx
import React, { useState } from 'react';

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div className={`sidebar ${isCollapsed ? 'collapsed' : ''}`}>
      <button onClick={toggleSidebar}>
        {isCollapsed ? 'Expand' : 'Collapse'}
      </button>
      <div className="sidebar-content">
        {/* Sidebar content goes here */}
      </div>
    </div>
  );
};

export default Sidebar;