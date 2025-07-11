import Header from "./pages/Header";
import Footer from "./pages/Footer";
import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <Footer />
      <Outlet />
    </div>
  );
}
