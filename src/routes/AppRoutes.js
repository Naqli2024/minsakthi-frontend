import { Routes, Route, useLocation } from "react-router-dom";
import HomePage from "../pages/Auth/HomePage";
import Login from "../pages/Auth/Login";
import Signup from "../pages/Auth/Signup";
import VerifyOTP from "../pages/Auth/VerifyOTP";
import ForgotPassword from "../pages/Auth/ForgotPassword";
import Header from "../components/Header/Header";
import UserMain from "../pages/User/Dashboard/UserMain";
import Dashboard from "../pages/User/Dashboard/Dashboard";
import Bookings from "../pages/User/Bookings/Bookings";
import Payments from "../pages/User/Payments/Payments";
import Help from "../pages/User/Help/Help";
import Settings from "../pages/User/Settings/Settings";
import UserHeader from "../components/Header/UserHeader";
import NewBookingHomePage from "../pages/User/Bookings/NewBookingHomePage";
import EditProfile from "../pages/User/EditProfile/EditProfile";
import ProtectedRoutes from "./ProtectedRoutes";
import ResetPassword from "../pages/Auth/ResetPassword";
import AdminMain from "../pages/Admin/Dashboard/AdminMain";
import AdminDashboard from "../pages/Admin/Dashboard/AdminDashboard";
import AdminHome from "../pages/Admin/AdminHome.js/AdminHome";
import AdminHeader from "../components/Header/AdminHeader";
import Customers from "../pages/Admin/User/Customers/Customers";
import Technicians from "../pages/Admin/User/Technicians/Technicians";
import Employees from "../pages/Admin/User/Employees/Employees";
import ServiceList from "../pages/Admin/Services/ServiceList/ServiceList";
import ServiceProcess from "../pages/Admin/Services/ServiceProcess/ServiceProcess";
import PublicRoutes from "./PublicRoutes";
import BookingsStepper from "../pages/User/Bookings/BookingsStepper";
import PaymentMode from "../pages/User/Payments/PaymentMode";
import TechnicianHome from "../pages/Technician/Auth/TechnicianHome";
import SignUpStepper from "../pages/Technician/Auth/SignUp/SignUpStepper";
import Orders from "../pages/Admin/Services/Orders/Orders";
import TechnicianLogin from "../pages/Technician/Auth/TechnicianLogin/TechnicianLogin";
import TechnicianDashboard from "../pages/Technician/Dashboard/TechnicianDashboard";
import TechnicianMain from "../pages/Technician/Dashboard/TechnicianMain";
import TechnicianHeader from "../components/Header/TechnicianHeader";
import UpdatePassword from "../pages/Technician/Auth/TechnicianLogin/UpdatePassword";
import JobsManagement from "../pages/Technician/JobsManagement/JobsManagement";
import Earnings from "../pages/Technician/Earnings/Earnings";
import Notifications from "../pages/Technician/Notifications/Notifications";
import ServiceSOP from "../pages/Admin/Services/ServiceSOP/ServiceSOP";
import ServiceBOM from "../pages/Admin/Services/ServiceBOM/ServiceBOM";
import Schedule from "../pages/Admin/Services/Schedule/Schedule";
import TechEditProfile from "../pages/Technician/EditProfile/TechEditProfile";

const AppRoutes = () => {
  const location = useLocation();
  const publicPaths = [
    "/",
    "/login",
    "/signup",
    "/verify-otp",
    "/forgot-password",
    "/reset-password",
    "/technician",
    "/technician/sign-up",
    "/technician/login"
  ];
  const showPublicHeader = publicPaths.includes(location.pathname);
  const showAdminHeader = location.pathname.startsWith("/admin");
  const showTechnicianHeader = location.pathname.startsWith("/technician");
  return (
    <>
      {showPublicHeader ? (
        <Header />
      ) : showAdminHeader ? (
        <AdminHeader />
      ) : showTechnicianHeader ? (
        <TechnicianHeader />
      ) : (
        <UserHeader/>
      )}
      <Routes>
        {/* Public Routes */}
        <Route
          path="/"
          element={
            <PublicRoutes>
              <HomePage/>
            </PublicRoutes>
          }
        />
        <Route
          path="/login"
          element={
            <PublicRoutes>
              <Login />
            </PublicRoutes>
          }
        />
        <Route
          path="/signup"
          element={
            <PublicRoutes>
              <Signup />
            </PublicRoutes>
          }
        />
        <Route
          path="/verify-otp"
          element={
            <PublicRoutes>
              <VerifyOTP />
            </PublicRoutes>
          }
        />
        <Route
          path="/forgot-password"
          element={
            <PublicRoutes >
              <ForgotPassword />
            </PublicRoutes>
          }
        />
        <Route
          path="/reset-password"
          element={
            <PublicRoutes>
              <ResetPassword />
            </PublicRoutes>
          }
        />
        <Route
          path="/user/new-bookings"
          element={
            <ProtectedRoutes>
              <NewBookingHomePage />
            </ProtectedRoutes>
          }
        />
        <Route
            path="/admin/home"
            element={
              <ProtectedRoutes adminOnly>
                <AdminHome />
              </ProtectedRoutes>
            }
          />
        <Route
            path="/technician"
            element={
              <PublicRoutes>
                <TechnicianHome />
              </PublicRoutes>
            }
          />
        <Route
            path="/technician/sign-up"
            element={
              <PublicRoutes>
                <SignUpStepper />
              </PublicRoutes>
            }
          />
        <Route
            path="/technician/login"
            element={
              <PublicRoutes>
                <TechnicianLogin />
              </PublicRoutes>
            }
          />
        <Route
            path="/technician/update-password"
            element={
              <PublicRoutes>
                <UpdatePassword />
              </PublicRoutes>
            }
          />

        {/* User Routes */}
        <Route path="/user" element={<UserMain />}>
          <Route
            path="dashboard"
            element={
              <ProtectedRoutes roleRequired="user">
                <Dashboard />
              </ProtectedRoutes>
            }
          />
          <Route
            path="orders"
            element={
              <ProtectedRoutes roleRequired="user">
                <Bookings />
              </ProtectedRoutes>
            }
          />
          <Route
            path="orders/:category/:subcategory?"
            element={
              <ProtectedRoutes roleRequired="user">
                <BookingsStepper />
              </ProtectedRoutes>
            }
          />
          <Route
            path="payments"
            element={
              <ProtectedRoutes roleRequired="user">
                <Payments />
              </ProtectedRoutes>
            }
          />
          <Route
            path="help-support"
            element={
              <ProtectedRoutes roleRequired="user">
                <Help />
              </ProtectedRoutes>
            }
          />
          <Route
            path="settings"
            element={
              <ProtectedRoutes roleRequired="user">
                <Settings />
              </ProtectedRoutes>
            }
          />
          <Route
            path="edit-profile"
            element={
              <ProtectedRoutes roleRequired="user">
                <EditProfile />
              </ProtectedRoutes>
            }
          />
          <Route
            path="payment-mode"
            element={
              <ProtectedRoutes roleRequired="user">
                <PaymentMode />
              </ProtectedRoutes>
            }
          />
        </Route>

        {/* Admin Routes */}
        <Route path="/admin" element={<AdminMain />}>
          <Route
            path="dashboard"
            element={
              <ProtectedRoutes roleRequired="admin">
                <AdminDashboard/>
              </ProtectedRoutes>
            }
          />
          <Route
            path="customers"
            element={
              <ProtectedRoutes roleRequired="admin">
                <Customers />
              </ProtectedRoutes>
            }
          />
          <Route
            path="technicians"
            element={
              <ProtectedRoutes roleRequired="admin">
                <Technicians />
              </ProtectedRoutes>
            }
          />
          <Route
            path="employees"
            element={
              <ProtectedRoutes roleRequired="admin">
                <Employees />
              </ProtectedRoutes>
            }
          />
          <Route
            path="orders"
            element={
              <ProtectedRoutes roleRequired="admin">
                <Orders />
              </ProtectedRoutes>
            }
          />
          <Route
            path="service-list"
            element={
              <ProtectedRoutes roleRequired="admin">  
                <ServiceList />
              </ProtectedRoutes>
            }
          />
          <Route
            path="process-list"
            element={
              <ProtectedRoutes roleRequired="admin">
                <ServiceProcess />
              </ProtectedRoutes>
            }
          />
          <Route
            path="service-sop"
            element={
              <ProtectedRoutes roleRequired="admin">
                <ServiceSOP />
              </ProtectedRoutes>
            }
          />
          <Route
           path="service-bom"
           element={
            <ProtectedRoutes roleRequired="admin">
              <ServiceBOM/>
            </ProtectedRoutes>
           }/>
          <Route
           path="schedule"
           element={
            <ProtectedRoutes roleRequired="admin">
              <Schedule/>
            </ProtectedRoutes>
           }/>
        </Route>

        {/* Technician Routes */}
        <Route path="/technician" element={<TechnicianMain />}>
          <Route
            path="dashboard"
            element={
              <ProtectedRoutes roleRequired="technician">
                <TechnicianDashboard />
              </ProtectedRoutes>
            }
          />
          <Route
            path="job-management"
            element={
              <ProtectedRoutes roleRequired="technician">
                <JobsManagement />
              </ProtectedRoutes>
            }
          />
          <Route
            path="earnings"
            element={
              <ProtectedRoutes roleRequired="technician">
                <Earnings />
              </ProtectedRoutes>
            }
          />
          <Route
            path="notifications"
            element={
              <ProtectedRoutes roleRequired="technician">
                <Notifications />
              </ProtectedRoutes>
            }
          />
          <Route
            path="edit-profile"
            element={
              <ProtectedRoutes roleRequired="technician">
                <TechEditProfile />
              </ProtectedRoutes>
            }
          />
          </Route>
      </Routes>
    </>
  );
};

export default AppRoutes;
