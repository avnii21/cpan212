import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import PartyImg from "../assets/images/party.jpg";
import SZAImg from "../assets/images/sza.jpg";
import AdeleImg from "../assets/images/adele.jpg";
import DrakeImg from "../assets/images/drake.jpg";
import BillieImg from "../assets/images/billie.jpg";

const artistImages = {
  PartyNextDoor: PartyImg,
  SZA: SZAImg,
  Adele: AdeleImg,
  Drake: DrakeImg,
  "Billie Eilish": BillieImg,
};

const TicketmasterEventPage = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [added, setAdded] = useState(false);

  const storedUser = JSON.parse(sessionStorage.getItem("user"));
  const userId = storedUser?.userId;

  useEffect(() => {
    fetch(`http://localhost:8000/api/ticketmaster/events/${id}`)
      .then((res) => res.json())
      .then((data) => setEvent(data))
      .catch(console.error);
  }, [id]);

  const handleAddTask = async () => {
    if (!userId) {
      alert("Please log in to add tasks");
      return;
    }

    try {
      const response = await fetch("/api/tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId,
          title: `Attend concert: ${event.artist || event.title}`,
          description: `Concert at ${event.venue} on ${new Date(
            event.date
          ).toLocaleString()}.`,
          status: "Pending",
          dueDate: event.date,
        }),
      });
      if (!response.ok) throw new Error("Failed to add task");
      alert("Task added!");
      setAdded(true);
    } catch (err) {
      alert(err.message);
    }
  };

  if (!event) return <p>Loading event...</p>;

  const bannerImage =
    artistImages[event.artist] || "https://via.placeholder.com/900x350?text=Event";

  return (
    <div
      style={{
        fontFamily: "Arial, sans-serif",
        padding: "20px",
        maxWidth: "1000px",
        margin: "0 auto",
      }}
    >
      {/* Banner */}
      <div
        style={{
          height: "350px",
          backgroundImage: `url(${bannerImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          borderRadius: "8px",
          color: "white",
          display: "flex",
          alignItems: "flex-end",
          padding: "20px",
          fontSize: "3rem",
          fontWeight: "bold",
          textShadow: "2px 2px 8px rgba(0,0,0,0.7)",
        }}
      >
        {event.title || event.artist}
      </div>

      {/* Event Info Section */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          marginTop: "20px",
          background: "#f5f5f5",
          borderRadius: "8px",
          padding: "20px",
          gap: "20px",
        }}
      >
        {/* Left info column */}
        <div style={{ flex: "1 1 300px" }}>
          <h2>Event Details</h2>
          <p>
            <strong>Date & Time:</strong> {new Date(event.date).toLocaleString()}
          </p>
          <p>
            <strong>Venue:</strong> {event.venue}
          </p>
          <p>
            <strong>Price:</strong> ${event.price}
          </p>
          <p>
            <strong>Location:</strong> Toronto, Canada
          </p>
        </div>

        {/* Right action column */}
        <div
          style={{ flex: "1 1 200px", display: "flex", flexDirection: "column", gap: "10px" }}
        >
          <button
            onClick={handleAddTask}
            disabled={added}
            style={{
              padding: "12px 20px",
              backgroundColor: added ? "#888" : "#00aa55",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: added ? "default" : "pointer",
              fontWeight: "bold",
            }}
          >
            {added ? "Added to My Tasks" : "Add to My Tasks"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default TicketmasterEventPage;
