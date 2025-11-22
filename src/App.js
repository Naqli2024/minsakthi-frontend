import { ToastContainer } from "react-toastify";
import AppRoutes from "./routes/AppRoutes";
import "../src/assets/styles/style.css";
import "../src/assets/styles/adminStyle.css";
import "../src/assets/styles/technicianStyle.css";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
      <ToastContainer autoClose={2000} />
    </BrowserRouter>
  );
}

export default App;
