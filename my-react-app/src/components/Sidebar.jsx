// src/components/Sidebar.jsx
import React, { useState } from "react";
import { Drawer, List, ListItem, ListItemIcon, ListItemText, IconButton } from "@mui/material";
import { Menu, ChevronLeft, Dashboard, Category } from "@mui/icons-material";
import ConsoleEmulator from "./ConsoleEmulator";

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: isCollapsed ? 60 : 400,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: isCollapsed ? 60 : 400,
          boxSizing: "border-box",
          transition: "width 0.3s ease",
          display: "flex",
          flexDirection: "column",
        },
      }}
    >
      <div style={{ display: "flex", justifyContent: "flex-end", padding: "8px" }}>
        <IconButton onClick={toggleSidebar}>
          {isCollapsed ? <ChevronLeft /> : <Menu />}
        </IconButton>
      </div>
      <List>
        <ListItem button>
          <ListItemIcon>
            <Dashboard />
          </ListItemIcon>
          {!isCollapsed && <ListItemText primary="Dashboard" />}
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <Category />
          </ListItemIcon>
          {!isCollapsed && <ListItemText primary="Components" />}
        </ListItem>
      </List>
      <div style={{ flex: 2, overflow: "auto", padding: "10px" }}>
        <ConsoleEmulator />
      </div>
    </Drawer>
  );
};

export default Sidebar;