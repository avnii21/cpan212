import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import NavBar from "../components/NavBar";

const TicketmasterEvents = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [addedTaskIds, setAddedTaskIds] = useState(new Set());

  const storedUser = JSON.parse(sessionStorage.getItem("user"));
  const userId = storedUser?.userId;

  useEffect(() => {
    if (!userId) {
      alert("Please login first to view events");
      setLoading(false);
      return;
    }

    fetch(`http://localhost:8000/api/ticketmaster/events?userId=${userId}`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load events");
        return res.json();
      })
      .then((data) => {
        setEvents(data || []);
      })
      .catch((err) => alert(err.message))
      .finally(() => setLoading(false));
  }, [userId]);

  const handleAddTask = async (event) => {
    if (!userId) {
      alert("Please login first");
      return;
    }

    if (addedTaskIds.has(event.id || event._id)) {
      alert("Task already added!");
      return;
    }

    const taskData = {
      userId,
      title: `Attend concert: ${event.artist || event.title}`,
      description: `Concert at ${event.venue} on ${new Date(
        event.date || event.dueDate
      ).toLocaleString()}.`,
      status: "Pending",
      dueDate: event.date || event.dueDate,
    };

    try {
      const response = await fetch("/api/tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(taskData),
      });

      if (!response.ok) {
        const errData = await response.json();
        alert(errData.error || "Failed to add task");
        return;
      }

      alert("Task added successfully!");
      setAddedTaskIds((prev) => new Set(prev).add(event.id || event._id));
    } catch (error) {
      alert("Network error");
    }
  };

  if (loading) return <p>Loading Ticketmaster events...</p>;
  if (!userId) return <p>Please login to see Ticketmaster events.</p>;

  return (
    <>
      <NavBar />
      <div className="events-container" style={{ padding: "20px" }}>
        <h2 style={{ fontFamily: "Shrikhand, cursive", color: "#425849" }}>
          Ticketmaster Events
        </h2>
        {events.length === 0 ? (
          <p>No events available.</p>
        ) : (
          <div
            className="event-list"
            style={{
              display: "grid",
              gap: "20px",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            }}
          >
            {events.map((event) => {
              const eventId = event.id || event._id;
              return (
                <div
                  key={eventId}
                  className="event-card"
                  style={{
                    border: "2px solid #425849",
                    borderRadius: "10px",
                    padding: "20px",
                    boxShadow: "0 4px 8px rgba(66, 88, 73, 0.2)",
                    backgroundColor: "#f5f7f4",
                    color: "#2b2b2b",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                  }}
                >
                  <div>
                    <h3>{event.title || event.artist}</h3>
                    <p>
                      <strong>Date:</strong>{" "}
                      {new Date(event.dueDate || event.date).toLocaleString()}
                    </p>
                    <p>
                      <strong>Venue:</strong> {event.venue || "N/A"}
                    </p>
                    {/* Link to internal fake Ticketmaster page */}
                    <Link to={`/ticketmaster-event/${event.id || event._id}`} style={{ color: "#425849" }}>
  View Event
</Link>
                  </div>
                  <button
                    onClick={() => handleAddTask(event)}
                    disabled={addedTaskIds.has(eventId)}
                    style={{
                      marginTop: "16px",
                      padding: "10px 20px",
                      backgroundColor: addedTaskIds.has(eventId)
                        ? "#888"
                        : "#425849",
                      color: "white",
                      border: "none",
                      borderRadius: "8px",
                      cursor: addedTaskIds.has(eventId) ? "default" : "pointer",
                      transition: "background-color 0.3s ease",
                    }}
                  >
                    {addedTaskIds.has(eventId) ? "Added" : "Add as Task"}
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
};

export default TicketmasterEvents;
