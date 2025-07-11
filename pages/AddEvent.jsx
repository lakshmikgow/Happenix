import { useContext, useState } from "react";
import axios from "axios";
import { UserContext } from "../UserContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function AddEvent() {
  const { user } = useContext(UserContext);

  const [formData, setFormData] = useState({
    owner: user ? user.name : "",
    title: "",
    optional: "",
    description: "",
    organizedBy: "",
    eventDate: "",
    eventTime: "",
    location: "",
    ticketPrice: 0,
    image: "",
    likes: 0,
  });

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    setFormData((prevState) => ({ ...prevState, image: file }));
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setFormData((prevState) => ({ ...prevState, [name]: files[0] }));
    } else {
      setFormData((prevState) => ({ ...prevState, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      data.append(key, value);
    });

    axios
      .post("/createEvent", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        toast.success("✅ Event posted successfully!");
        console.log("Event posted successfully:", response.data);
        // Optionally clear form after success:
        setFormData({
          owner: user ? user.name : "",
          title: "",
          optional: "",
          description: "",
          organizedBy: "",
          eventDate: "",
          eventTime: "",
          location: "",
          ticketPrice: 0,
          image: "",
          likes: 0,
        });
      })
      .catch((error) => {
        toast.error("❌ Failed to post event!");
        console.error("Error posting event:", error);
      });
  };

  return (
    <div className="flex flex-col items-center mt-10">
      <ToastContainer />

      <h1 className="font-bold text-[36px] mb-5">Post an Event</h1>

      <form onSubmit={handleSubmit} className="w-1/2 flex flex-col gap-4">
        <label className="flex flex-col">
          Title:
          <input
            type="text"
            name="title"
            className="rounded mt-1 pl-2 px-2 ring-sky-700 ring-2 h-8 border-none text-sm"
            value={formData.title}
            onChange={handleChange}
          />
        </label>

        <label className="flex flex-col">
          Description:
          <textarea
            name="description"
            className="rounded mt-1 pl-2 px-2 py-2 ring-sky-700 ring-2 h-20 border-none text-sm"
            value={formData.description}
            onChange={handleChange}
          />
        </label>

        <label className="flex flex-col">
          Organized By:
          <input
            type="text"
            name="organizedBy"
            className="rounded mt-1 pl-2 px-2 ring-sky-700 ring-2 h-8 border-none text-sm"
            value={formData.organizedBy}
            onChange={handleChange}
          />
        </label>

        <label className="flex flex-col">
          Event Date:
          <input
            type="date"
            name="eventDate"
            className="rounded mt-1 pl-2 px-2 ring-sky-700 ring-2 h-8 border-none text-sm"
            value={formData.eventDate}
            onChange={handleChange}
          />
        </label>

        <label className="flex flex-col">
          Event Time:
          <input
            type="time"
            name="eventTime"
            className="rounded mt-1 pl-2 px-2 ring-sky-700 ring-2 h-8 border-none text-sm"
            value={formData.eventTime}
            onChange={handleChange}
          />
        </label>

        <label className="flex flex-col">
          Location:
          <input
            type="text"
            name="location"
            className="rounded mt-1 pl-2 px-2 ring-sky-700 ring-2 h-8 border-none text-sm"
            value={formData.location}
            onChange={handleChange}
          />
        </label>

        <label className="flex flex-col">
          Ticket Price:
          <input
            type="number"
            name="ticketPrice"
            className="rounded mt-1 pl-2 px-2 ring-sky-700 ring-2 h-8 border-none text-sm"
            value={formData.ticketPrice}
            onChange={handleChange}
          />
        </label>

        <label className="flex flex-col">
          Image:
          <input
            type="file"
            name="image"
            className="rounded mt-1 px-2 py-2 ring-sky-700 ring-2 border-none text-sm"
            onChange={handleImageUpload}
          />
        </label>

        <button
          type="submit"
          className="bg-sky-700 text-white py-2 px-4 rounded hover:bg-sky-800 transition text-sm w-fit self-center"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
