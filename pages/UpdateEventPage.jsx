import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const UpdateEventPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    organizedBy: "",
    eventDate: "",
    eventTime: "",
    location: "",
    ticketPrice: 0,
  });
  const [image, setImage] = useState(null);

  useEffect(() => {
    axios
      .get(`/event/${id}`)
      .then((res) => {
        const data = res.data;
        setEvent(data);
        setFormData({
          title: data.title,
          description: data.description,
          organizedBy: data.organizedBy,
          eventDate: data.eventDate?.slice(0, 10),
          eventTime: data.eventTime,
          location: data.location,
          ticketPrice: data.ticketPrice,
        });
      })
      .catch((err) => console.error(err));
  }, [id]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedData = new FormData();
    Object.keys(formData).forEach((key) => {
      updatedData.append(key, formData[key]);
    });
    if (image) {
      updatedData.append("image", image);
    }

    try {
      await axios.put(`http://localhost:4000/update/${id}`, updatedData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true, // If you're using cookies for auth
      });
      alert("Event updated successfully!");
      navigate("/EventList");
    } catch (err) {
      console.error("Error updating event:", err);
      alert("Failed to update event.");
    }
  };

  if (!event) return <div>Loading...</div>;

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white shadow rounded">
      <h2 className="text-2xl font-bold mb-6 text-center">Update Event</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          placeholder="Title"
          required
        />
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          placeholder="Description"
          required
        />
        <input
          type="text"
          name="organizedBy"
          value={formData.organizedBy}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          placeholder="Organized By"
          required
        />
        <input
          type="date"
          name="eventDate"
          value={formData.eventDate}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />
        <input
          type="time"
          name="eventTime"
          value={formData.eventTime}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />
        <input
          type="text"
          name="location"
          value={formData.location}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          placeholder="Location"
          required
        />

        <input
          type="number"
          name="ticketPrice"
          value={formData.ticketPrice}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          placeholder="Ticket Price"
          required
        />
        <input
          type="file"
          onChange={(e) => setImage(e.target.files[0])}
          className="w-full"
          accept="image/*"
        />
        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Update Event
        </button>
      </form>
    </div>
  );
};

export default UpdateEventPage;
