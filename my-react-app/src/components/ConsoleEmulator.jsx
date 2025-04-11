// src/components/ConsoleEmulator.jsx
import { Height } from "@mui/icons-material";
import React from "react";
import Terminal from "react-console-emulator";

const ConsoleEmulator = () => {
  // Create a reference to access terminal methods
  const terminalRef = React.useRef();

  const addNote = (...args) => {
    const message = args.join(" ");
    return `Note added: ${message}`;
  };

  const commands = {
    note: {
      description: "Add a note to the log.",
      usage: "note <message>",
      fn: addNote
    },
  };

  return (
    <Terminal
        commands={commands}
        ref={terminalRef}
        promptLabel="> "
        autoFocus={true}
        noCommandFound={(cmd) => {
            // Treat any unknown command as a note
            return addNote(cmd);
        }}
        style={{
            minHeight: "85vh",
            backgroundColor: "#1e1e1e",
            color: "#00ff00",
            fontFamily: "monospace",
            fontSize: "14px",
            padding: "10px",
            borderRadius: "5px",
        }}
    />
  );
};

export default ConsoleEmulator;