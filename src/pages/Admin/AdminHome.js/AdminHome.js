import React from "react";
import AdminHomeImg from "../../../assets/images/admin-home.svg";
import { FaUserGroup } from "react-icons/fa6";
import { RiCalendarTodoFill } from "react-icons/ri";
import { MdOutlinePayments } from "react-icons/md";
import { PiSuitcaseSimple } from "react-icons/pi";
import { useNavigate } from "react-router-dom";

const AdminHome = () => {
  const navigateTo = useNavigate();
  const featurePreview = [
    {
      icon: <FaUserGroup />,
      name: "User Management",
      description: "Easily manage user accounts, roles, and permissions.",
    },
    {
      icon: <RiCalendarTodoFill />,
      name: "Booking Management",
      description: "Track and manage bookings with real-time updates.",
    },
    {
      icon: <MdOutlinePayments />,
      name: "Payment Tracking",
      description: "Monitor payments, generate reports, and handle refunds.",
    },
    {
      icon: <PiSuitcaseSimple />,
      name: "Service Management",
      description: "Manage your services, pricing, and availability.",
    },
  ];

  return (
    <div className="admin-overall-content">
      <div className="admin-top-content">
        <h2>
          Welcome to <span>Minsakthi</span> 24h Admin Console
        </h2>
        <p className="mb-2">
          Manage your users, bookings, payments, and services
        </p>
        <p className="mb-4">efficiently with our intuitive dashboard.</p>
        <div
          className="admin-get-started-btn"
          onClick={() => navigateTo("/admin/dashboard")}
        >
          Get started
        </div>

        <img src={AdminHomeImg} alt="Admin Home" className="admin-home-img" />
      </div>

      <div className="admin-bottom-content">
        <h2 className="fw-bold mb-5">Features Preview</h2>
        <div className="admin-feature-grid">
          {featurePreview.map((feature, index) => (
            <div className="admin-preview-card" key={index}>
              <div className="admin-preview-icon">{feature.icon}</div>
              <h3 className="fw-bold pt-3">{feature.name}</h3>
              <p>{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminHome;
