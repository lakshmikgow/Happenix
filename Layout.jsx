import { Outlet } from "react-router-dom";
import Footer from "./pages/Footer";

export default function Layout() {
  return (
    <div className="flex flex-col min-h-screen">
      <Outlet />
      <Footer />
    </div>
  );
}
