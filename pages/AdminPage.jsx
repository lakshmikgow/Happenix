/* eslint-disable react/jsx-key */
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import HeaderAdmin from "./HeaderAdmin"; // Keep only HeaderAdmin import

export default function IndexPage() {
  const [events, setEvents] = useState([]);

  const AdminPage = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
      axios
        .get("http://localhost:4000/profile", { withCredentials: true })
        .then((response) => setUser(response.data))
        .catch((error) => console.error(error));
    }, []);

    if (!user) return <div>Loading...</div>;

    return (
      <div>
        <h1>admin</h1>
        {user.role === "admin" && (
          <div>
            <button onClick={() => (window.location.href = "/createEvent")}>
              Create Event
            </button>
          </div>
        )}
      </div>
    );
  };

  useEffect(() => {
    axios
      .get("/createEvent")
      .then((response) => {
        setEvents(response.data);
      })
      .catch((error) => {
        console.error("Error fetching events:", error);
      });
  }, []);

  const handleLike = (eventId) => {
    axios
      .post(`/event/${eventId}`)
      .then((response) => {
        setEvents((prevEvents) =>
          prevEvents.map((event) =>
            event._id === eventId ? { ...event, likes: event.likes + 1 } : event
          )
        );
        console.log("done", response);
      })
      .catch((error) => {
        console.error("Error liking ", error);
      });
  };

  return (
    <>
      <HeaderAdmin />
      <div className="mt-1 flex flex-col">
        <div className="hidden sm:block">
          <div className="flex item-center inset-0">
            <img
              src="../src/assets/logo4.jpg"
              alt=""
              className="w-full h-200"
            />
          </div>
        </div>

        {/* Happenings Button */}
        <div className="flex justify-center mt-6">
          <Link to="/EventList">
            <button className="bg-blue-800 text-white text-lg py-2 px-6 rounded-lg hover:bg-blue-600 transition-all">
              View Happenings
            </button>
          </Link>
        </div>
      </div>
    </>
  );
}
