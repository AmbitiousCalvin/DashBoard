import React from "react";
import { Card, TaskCard } from "../components/taskCard";
import { useLocalStorage } from "../hooks/useStorage";
import Masonry from "@mui/lab/Masonry";
import { createTheme, ThemeProvider } from "@mui/material";

const Tasks_Page = () => {
  console.log("Tasks_Page rerendered");

  const [tasks, setTasks] = useLocalStorage("tasks", []);
  function handleSubmit({ id, title, content }) {
    setTasks((prevTasks) => {
      const taskIndex = prevTasks.findIndex((task) => task.id === id);

      if (taskIndex !== -1) {
        const updatedTasks = [...prevTasks];
        updatedTasks[taskIndex] = { id, title, content };
        return updatedTasks;
      }

      return [...prevTasks, { id, title, content }];
    });
  }

  function handleDelete(id) {
    setTasks((prevTasks) => {
      const updatedTasks = prevTasks.filter((task) => task.id !== id);
      return updatedTasks;
    });
  }

  const theme = createTheme({
    breakpoints: {
      values: {
        xs: 0,
        sm: 650,
        md: 1000,
        lg: 1200,
        xl: 1536,
      },
    },
  });

  return (
    <>
      <ThemeProvider theme={theme}>
        <h1>Task Page</h1>
        <div className="card-placeholder">
          <Card handleSubmit={handleSubmit} />
        </div>
        <Masonry sequential columns={{ xs: 1, sm: 2, md: 3, lg: 4 }} spacing={1}>
          {tasks.reverse().map((task, index) => (
            <TaskCard
              key={index}
              handleSubmit={handleSubmit}
              handleDelete={handleDelete}
              prevTitle={task.title}
              prevContent={task.content}
              id={task.id}
            />
          ))}
        </Masonry>
      </ThemeProvider>
    </>
  );
};

export default Tasks_Page;
