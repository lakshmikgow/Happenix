import { useContext, useEffect, useRef, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { UserContext } from "../UserContext";
import { RxExit } from "react-icons/rx";
import { FaUserCircle } from "react-icons/fa";

export default function HeaderF() {
  const { user, setUser } = useContext(UserContext);
  const [isMenuOpen, setisMenuOpen] = useState(false);
  const [events, setEvents] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const searchInputRef = useRef();

  //! Fetch events from the server -------------------------------------------------
  useEffect(() => {
    axios
      .get("/events")
      .then((response) => {
        setEvents(response.data);
      })
      .catch((error) => {
        console.error("Error fetching events:", error);
      });
  }, []);

  //! Search bar functionality----------------------------------------------------
  useEffect(() => {
    const handleDocumentClick = (event) => {
      // Check if the clicked element is the search input or its descendant
      if (
        searchInputRef.current &&
        !searchInputRef.current.contains(event.target)
      ) {
        setSearchQuery("");
      }
    };

    // Listen for click events on the entire document
    document.addEventListener("click", handleDocumentClick);

    return () => {
      document.removeEventListener("click", handleDocumentClick);
    };
  }, []);

  //! Logout Function --------------------------------------------------------
  async function logout() {
    await axios.post("/logout");
    setUser(null);
  }
  //! Search input ----------------------------------------------------------------
  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  return (
    <div>
      <header className="flex py-2 px-6 sm:px-6 justify-between place-items-center">
        <Link to={"/"} className="flex item-center ">
          <img src="../src/assets/logo2.png" alt="" className="w-500 h-20" />
        </Link>
        <div className="flex bg-white rounded py-2.5 px-4 w-1/3 gap-4 items-center shadow-md shadow-gray-200">
          <button>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-4 h-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
              />
            </svg>
          </button>
          <div ref={searchInputRef}>
            <input
              type="text"
              placeholder="Search"
              value={searchQuery}
              onChange={handleSearchInputChange}
              className="text-sm text-black outline-none w-full "
            />
          </div>
          {/* <div className='text-sm text-gray-300 font-semibold'>Search</div> */}
        </div>

        {/*------------------------- Search Functionality -------------------  */}
        {searchQuery && (
          <div className="p-1 w-120 z-10 absolute rounded left-[15%] top-14 md:w-80 md:left-[25%] md:top-16 lg:w-[96] lg:left-[25%] lg:top-16 bg-blue-100">
            {/* Filter events based on the search query */}
            {events
              .filter((event) =>
                event.title.toLowerCase().includes(searchQuery.toLowerCase())
              )
              .map((event) => (
                <div key={event._id} className="p-2">
                  {/* Display event details */}
                  <Link to={"/Events/" + event._id}>
                    <div className="text-black text-lg w-full">
                      {event.title}
                    </div>
                  </Link>
                </div>
              ))}
          </div>
        )}

        <div className="hidden lg:flex gap-5 text-sm">
          <Link to={"/calendar"}>
            {" "}
            {/*TODO:Route calendar page after creating it */}
            <div className="flex flex-col place-items-center py-1 px-10 rounded cursor-pointer hover:text-primarydark hover:bg-white hover:shadow-sm shadow-gray-200 hover:transition-shadow duration-1500">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-5 py-1"
              >
                <path d="M12.75 12.75a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM7.5 15.75a.75.75 0 100-1.5.75.75 0 000 1.5zM8.25 17.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM9.75 15.75a.75.75 0 100-1.5.75.75 0 000 1.5zM10.5 17.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12 15.75a.75.75 0 100-1.5.75.75 0 000 1.5zM12.75 17.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM14.25 15.75a.75.75 0 100-1.5.75.75 0 000 1.5zM15 17.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM16.5 15.75a.75.75 0 100-1.5.75.75 0 000 1.5zM15 12.75a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM16.5 13.5a.75.75 0 100-1.5.75.75 0 000 1.5z" />
                <path
                  fillRule="evenodd"
                  d="M6.75 2.25A.75.75 0 017.5 3v1.5h9V3A.75.75 0 0118 3v1.5h.75a3 3 0 013 3v11.25a3 3 0 01-3 3H5.25a3 3 0 01-3-3V7.5a3 3 0 013-3H6V3a.75.75 0 01.75-.75zm13.5 9a1.5 1.5 0 00-1.5-1.5H5.25a1.5 1.5 0 00-1.5 1.5v7.5a1.5 1.5 0 001.5 1.5h13.5a1.5 1.5 0 001.5-1.5v-7.5z"
                  clipRule="evenodd"
                />
              </svg>
              <div>Calendar</div>
            </div>
          </Link>
        </div>

        {/* -------------------IF user is Logged DO this Main-------------------- */}
        {!!user && (
          <div className="flex flex-row items-center gap-2 sm:gap-8 ">
            <div className="flex items-center gap-2">
              <Link to={"/useraccount"}>
                {" "}
                {/*TODO: Route user profile page after creating it -> 1.50*/}
                {user.name.toUpperCase()}
              </Link>

              <FaUserCircle
                className="h-7 w-7 text-gray-700 rounded-full cursor-pointer"
                onClick={() => setisMenuOpen(!isMenuOpen)}
              />
            </div>
            <div className="hidden md:flex">
              <button onClick={logout} className="secondary">
                <div>Log out</div>
                <RxExit />
              </button>
            </div>
          </div>
        )}

        {/* -------------------IF user is not Logged in DO this MAIN AND MOBILE-------------------- */}
        {!user && (
          <div>
            <Link to={"/login"} className=" ">
              <button className="primary">
                <div>Sign in </div>
              </button>
            </Link>
          </div>
        )}
      </header>
    </div>
  );
}
