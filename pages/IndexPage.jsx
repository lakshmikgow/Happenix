/* eslint-disable react/jsx-key */
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { BsArrowRightShort } from "react-icons/bs";
import { BiLike } from "react-icons/bi";
import Header from "./Header"; // ✅ Imported Header

export default function IndexPage() {
  const [events, setEvents] = useState([]);

  // Fetch events from the server
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

  // Like Functionality
  const handleLike = (eventId) => {
    axios
      .post(`/event/${eventId}`)
      .then((response) => {
        setEvents((prevEvents) =>
          prevEvents.map((event) =>
            event._id === eventId ? { ...event, likes: event.likes + 1 } : event
          )
        );
      })
      .catch((error) => {
        console.error("Error liking ", error);
      });
  };

  return (
    <>
      <Header /> {/* ✅ Added Header here */}
      <div className="mt-1 flex flex-col">
        <div className="hidden sm:block">
          <div className="flex item-center inset-0">
            <img src="../src/assets/logo4.jpg" alt="" className="w-full" />
          </div>
        </div>

        {/* Happenings Button */}
        <div className="flex justify-center mt-6">
          <Link to="/EventListHome">
            <button className="bg-blue-800 text-white text-lg py-2 px-6 rounded-lg hover:bg-blue-600 transition-all">
              View Happenings
            </button>
          </Link>
        </div>
      </div>
    </>
  );
}
