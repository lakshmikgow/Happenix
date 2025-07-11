import { Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import "./App.css";
import IndexPage from "./pages/IndexPage";
import AdminPage from "./pages/AdminPage";
import RegisterPage from "./pages/RegisterPage";
import Layout from "./Layout";
import LayoutHome from "./LayoutHome";
import axios from "axios";
import { UserContextProvider } from "./UserContext";
import UserAccountPage from "./pages/UserAccountPage";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import AddEvent from "./pages/AddEvent";
import EventPage from "./pages/EventPage";
import EventPageHome from "./pages/EventPageHome";
import CalendarView from "./pages/CalendarView";
import OrderSummary from "./pages/OrderSummary";
import PaymentSummary from "./pages/PaymentSummary";
import TicketPage from "./pages/TicketPage";
import FacultyTicketPage from "./pages/FacultyTicketPage";
import Faculty from "./pages/Faculty";
import FacultyHome from "./pages/FacultyHome";
import FacultyEDetails from "./pages/FacultyEDetails";
import HeaderAdmin from "./pages/HeaderAdmin";
import EventList from "./pages/EventList";
import EventListHome from "./pages/EventListHome";
import UpdateEventPage from "./pages/UpdateEventPage";
import HeaderF from "./pages/HeaderF";
import CreatEvent from "./pages/CreateEvent";

axios.defaults.baseURL = "http://localhost:4000/";
axios.defaults.withCredentials = true;

function App() {
  return (
    <UserContextProvider>
      <Routes>
        {/* Make login the default route */}
        <Route path="/" element={<LoginPage />} />

        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/forgotpassword" element={<ForgotPassword />} />
        <Route path="/resetpassword" element={<ResetPassword />} />

        {/* All protected/inner routes go under Layout */}
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<LayoutHome />}></Route>
          <Route path="/home" element={<IndexPage />} />
          <Route path="/EventPage/:id" element={<EventPageHome />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/EventList" element={<EventList />} />
          <Route path="/EventListHome" element={<EventListHome />} />
          <Route path="/useraccount" element={<UserAccountPage />} />
          <Route path="/createEvent" element={<AddEvent />} />
          <Route path="/event/:id" element={<EventPage />} />
          <Route path="/calendar" element={<CalendarView />} />
          <Route path="/wallet" element={<TicketPage />} />
          <Route path="/FacultyTicket" element={<FacultyTicketPage />} />
          <Route path="/Faculty" element={<Faculty />} />
          <Route path="/FacultyHome" element={<FacultyHome />} />
          <Route path="/Events/:id" element={<FacultyEDetails />} />
          <Route path="/HeaderAdmin" element={<HeaderAdmin />} />
          <Route path="/HeaderF" element={<HeaderF />} />
          <Route path="/event/:id/ordersummary" element={<OrderSummary />} />
          <Route path="/update/:id" element={<UpdateEventPage />} />
          <Route
            path="/event/:id/ordersummary/paymentsummary"
            element={<PaymentSummary />}
          />
        </Route>
      </Routes>
    </UserContextProvider>
  );
}

export default App;
