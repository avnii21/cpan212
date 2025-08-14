import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar";
import TaskSummary from "../components/TaskSummary"; // import TaskSummary

const TaskForm = ({ onTaskAdded }) => {
  const [title, setTitle] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [dueDate, setDueDate] = React.useState("");
  const [status, setStatus] = React.useState("Pending");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const storedUser = JSON.parse(sessionStorage.getItem("user"));
    if (!storedUser || !storedUser.userId) {
      alert("Please login first");
      return;
    }
    if (!title || !dueDate) {
      alert("Please provide at least a title and due date");
      return;
    }
    try {
      const response = await fetch("http://localhost:8000/api/tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: storedUser.userId,
          title,
          description,
          dueDate,
          status,
        }),
      });
      if (!response.ok) {
        const errorData = await response.json();
        alert(errorData.error || "Failed to add task");
        return;
      }
      const newTask = await response.json();
      onTaskAdded(newTask);
      setTitle("");
      setDescription("");
      setDueDate("");
      setStatus("Pending");
    } catch (error) {
      alert("Network error");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        backgroundColor: "#f0f5f2",
        padding: "20px",
        borderRadius: "12px",
        boxShadow: "0 4px 8px rgba(66, 88, 73, 0.15)",
        marginBottom: "2rem",
        maxWidth: "600px",
        marginLeft: "auto",
        marginRight: "auto",
        fontFamily: "'Merriweather', serif",
      }}
    >
      <h3 style={{ color: "#425849", marginBottom: "12px" }}>Add New Task</h3>
      <input
        type="text"
        placeholder="Title *"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
        style={{
          width: "100%",
          padding: "10px",
          borderRadius: "8px",
          border: "1px solid #8aa392",
          marginBottom: "12px",
          fontSize: "1rem",
          fontFamily: "'Merriweather', serif",
        }}
      />
      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        style={{
          width: "100%",
          padding: "10px",
          borderRadius: "8px",
          border: "1px solid #8aa392",
          marginBottom: "12px",
          fontSize: "1rem",
          fontFamily: "'Merriweather', serif",
          resize: "vertical",
          minHeight: "60px",
        }}
      />
      <input
        type="date"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
        required
        style={{
          width: "100%",
          padding: "10px",
          borderRadius: "8px",
          border: "1px solid #8aa392",
          marginBottom: "12px",
          fontSize: "1rem",
          fontFamily: "'Merriweather', serif",
        }}
      />
      <select
        value={status}
        onChange={(e) => setStatus(e.target.value)}
        style={{
          width: "100%",
          padding: "10px",
          borderRadius: "8px",
          border: "1px solid #8aa392",
          marginBottom: "16px",
          fontSize: "1rem",
          fontFamily: "'Merriweather', serif",
          backgroundColor: "white",
          color: "#425849",
        }}
      >
        <option value="Pending">Pending</option>
        <option value="Completed">Completed</option>
        <option value="In Progress">In Progress</option>
      </select>
      <button
        type="submit"
        style={{
          backgroundColor: "#8aa392",
          color: "white",
          padding: "12px 20px",
          border: "none",
          borderRadius: "12px",
          cursor: "pointer",
          fontSize: "1rem",
          fontFamily: "'Shrikhand', cursive",
          transition: "background-color 0.3s ease",
        }}
        onMouseEnter={(e) => (e.target.style.backgroundColor = "#73886f")}
        onMouseLeave={(e) => (e.target.style.backgroundColor = "#8aa392")}
      >
        Add Task
      </button>
    </form>
  );
};

const MyTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTasks = () => {
      const storedUser = JSON.parse(sessionStorage.getItem("user"));
      if (!storedUser || !storedUser.userId) {
        alert("Please login first");
        navigate("/login");
        return;
      }
      fetch(`/api/tasks?userId=${storedUser.userId}`)
        .then((res) => {
          if (!res.ok) throw new Error("Failed to fetch tasks");
          return res.json();
        })
        .then((data) => setTasks(data))
        .catch((err) => alert(err.message))
        .finally(() => setLoading(false));
    };
    fetchTasks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigate]);

  const handleTaskAdded = (newTask) => {
    setTasks((prev) => [newTask, ...prev]);
  };

  // New delete handler
  const handleDelete = async (taskId) => {
    if (!window.confirm("Are you sure you want to delete this task?")) return;

    try {
      const response = await fetch(`/api/tasks/${taskId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const errData = await response.json();
        alert(errData.error || "Failed to delete task");
        return;
      }

      // Remove deleted task from state to update UI immediately
      setTasks((prev) => prev.filter((task) => task._id !== taskId));
    } catch (error) {
      alert("Network error");
    }
  };

  if (loading)
    return (
      <p
        style={{
          fontFamily: "'Merriweather', serif",
          color: "#425849",
          textAlign: "center",
          marginTop: "2rem",
        }}
      >
        Loading tasks...
      </p>
    );

  return (
    <>
      <NavBar />
      <div
        className="mytasks-container"
        style={{
          padding: "1rem 2rem",
          maxWidth: "900px",
          margin: "0 auto",
          fontFamily: "'Merriweather', serif",
          color: "#425849",
        }}
      >
        <h2
          className="mytasks-heading"
          style={{
            marginBottom: "1.5rem",
            fontFamily: "'Shrikhand', cursive",
            fontSize: "2.5rem",
            textAlign: "center",
          }}
        >
          My Tasks
        </h2>

        <TaskForm onTaskAdded={handleTaskAdded} />

        {tasks.length === 0 ? (
          <p style={{ textAlign: "center", fontSize: "1.2rem" }}>
            No tasks found.
          </p>
        ) : (
          <div className="task-list">
            {tasks.map((task) => (
              <div
                className="task-card"
                key={task._id}
                style={{
                  position: "relative",
                  marginBottom: "1rem",
                  padding: "1rem",
                  border: "2px solid #8aa392",
                  borderRadius: "12px",
                  boxShadow: "0 3px 5px rgba(66, 88, 73, 0.1)",
                  backgroundColor: "#f9fdf9",
                  transition: "transform 0.2s ease",
                  cursor: "default",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.transform = "scale(1.02)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.transform = "scale(1)")
                }
              >
                {/* Delete button */}
                <button
                  onClick={() => handleDelete(task._id)}
                  style={{
                    position: "absolute",
                    top: "10px",
                    right: "10px",
                    background: "transparent",
                    border: "none",
                    color: "#c0392b",
                    fontWeight: "bold",
                    fontSize: "1.4rem",
                    cursor: "pointer",
                    lineHeight: "1",
                  }}
                  aria-label={`Delete task ${task.title}`}
                  title="Delete task"
                >
                  ×
                </button>

                <h3 style={{ marginBottom: "8px", color: "#425849" }}>
                  {task.title}
                </h3>
                <p>
                  <strong>Status:</strong> {task.status}
                </p>
                <p>
                  <strong>Due:</strong> {new Date(task.dueDate).toLocaleDateString()}
                </p>
                {task.description && <p>{task.description}</p>}

                {/* Render user-triggered AI summary component */}
                {task.description && <TaskSummary description={task.description} />}
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default MyTasks;
