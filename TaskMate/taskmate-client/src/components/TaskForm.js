import React from "react";

const TaskForm = ({ onTaskAdded, defaultDueDate }) => {
  const [title, setTitle] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [dueDate, setDueDate] = React.useState(defaultDueDate || "");
  const [status, setStatus] = React.useState("Pending");

  React.useEffect(() => {
    if (defaultDueDate) {
      setDueDate(defaultDueDate);
    }
  }, [defaultDueDate]);

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
      const response = await fetch("/api/tasks", {
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
      setDueDate(defaultDueDate || "");
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

export default TaskForm;
