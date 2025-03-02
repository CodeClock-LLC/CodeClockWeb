// src/components/ConsoleEmulator.jsx
import React from "react";
import Terminal from "react-console-emulator";

const ConsoleEmulator = () => {
  const commands = {
    note: {
      description: "Add a note to the log.",
      usage: "note <message>",
      fn: (...args) => {
        const message = args.join(" ");
        return `Note added: ${message}`;
      },
    },
  };

  return (
    <Terminal
      commands={commands}
      welcomeMessage="Welcome to the Code Clock Console! Type 'help' for a list of commands."
      promptLabel="> "
      autoFocus={true}
      style={{
        height: "200px",
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