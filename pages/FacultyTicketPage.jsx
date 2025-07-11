import { Link } from "react-router-dom";
import { IoMdArrowBack } from "react-icons/io";
import { RiDeleteBinLine } from "react-icons/ri";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { UserContext } from "../UserContext";

export default function TicketPage() {
  const { user } = useContext(UserContext);

  const [userTickets, setUserTickets] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    if (user) {
      fetchTickets();
    }
  }, [user]);

  const fetchTickets = async () => {
    axios
      .get(`/tickets/user`)
      .then((response) => {
        setUserTickets(response.data);
      })
      .catch((error) => {
        console.error("Error fetching user tickets:", error);
      });
  };

  const filteredTickets = userTickets.filter((ticket) => {
    const { eventname, name, email } = ticket.ticketDetails || {};
    return (
      (eventname &&
        eventname.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (name && name.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (email && email.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  });

  return (
    <div className="flex flex-col flex-grow px-4 py-6">
      {/* Search Bar */}
      <div className="flex justify-center mb-6">
        <input
          type="text"
          placeholder="Search tickets by event name, name, or email"
          className="p-2 border border-gray-300 rounded-md w-full max-w-lg"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="flex flex-col flex-grow">
        <div className=" place-item-center hidden">
          <RiDeleteBinLine className="h-6 w-10 text-red-700 " />
        </div>
        <div className="mx-12 grid grid-cols-1 xl:grid-cols-2 gap-5">
          {filteredTickets.map((ticket) => (
            <div key={ticket._id}>
              <div className="">
                <div className="h-48 mt-2 gap-2 p-5 bg-gray-100 font-bold rounded-md relative">
                  <div className="flex justify-start place-items-center text-sm md:text-base font-normal">
                    <div className=" h-148 w-148">
                      <img
                        src={ticket.ticketDetails.qr}
                        alt="QRCode"
                        className="aspect-square object-fill "
                      />
                    </div>
                    <div className="ml-6 grid grid-cols-2 gap-x-6 gap-y-2">
                      <div className="">
                        Event Name : <br />
                        <span className=" font-extrabold text-primarydark">
                          {ticket.ticketDetails.eventname.toUpperCase()}
                        </span>
                      </div>

                      <div>
                        Date & Time:
                        <br />
                        <span className="font-extrabold text-primarydark">
                          {
                            ticket.ticketDetails.eventdate
                              .toUpperCase()
                              .split("T")[0]
                          }
                          , {ticket.ticketDetails.eventtime}
                        </span>
                      </div>
                      <div>
                        Name:{" "}
                        <span className="font-extrabold text-primarydark">
                          {ticket.ticketDetails.name.toUpperCase()}
                        </span>
                      </div>
                      <div>
                        Email:{" "}
                        <span className="font-extrabold text-primarydark">
                          {ticket.ticketDetails.email}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
