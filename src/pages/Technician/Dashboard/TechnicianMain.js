import React, { useEffect, useState } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import { userItems } from "../../../helpers/UserSideBarData";
import MinSakthi from "../../../assets/images/minsakthi-sidebar.svg";
import MSLogo from "../../../assets/images/minsakthi-ms.svg";
import { IoMdPerson } from "react-icons/io";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import { MdKeyboardDoubleArrowLeft } from "react-icons/md";
import { getUserById } from "../../../redux/User/UserSlice";
import { useDispatch } from "react-redux";
import Cookies from "js-cookie";
import { technicianItems } from "../../../helpers/TechnicianSideBarData";
import { getTechnicianById } from "../../../redux/Technician/TechnicianSlice";

const TechnicianMain = () => {
  const location = useLocation(); 
  const navigateTo = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [technicianData, setTechnicianData] = useState(null);
  const technicianId = Cookies.get("technicianId");
  const dispatch = useDispatch();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  useEffect(() => {
    dispatch(getTechnicianById(technicianId))
      .unwrap()
      .then((response) => {
        setTechnicianData(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [dispatch, technicianId]);

  return (
    <>
      <div
        className={`menu-icon ${isSidebarOpen ? "open" : ""}`}
        onClick={toggleSidebar}
      >
        {isSidebarOpen ? (
          <FaTimes className="cancel-icon" />
        ) : (
          <FaBars className="icon" />
        )}
      </div>
      <div className="layout-container">
        <div
          className={`sidebar ${isSidebarOpen ? "open" : ""} ${
            isCollapsed ? "collapsed" : ""
          }`}
        >
          {!isCollapsed && (
            <div className="sidebar-profile">
              <div className="user-profile">
                {technicianData?.profilePhoto ? (
                  <img
                    src={technicianData?.profilePhoto}
                    alt="Profile"
                    className="rounded-circle"
                  />
                ) : (
                  <IoMdPerson size={60} color="#6b7280" />
                )}
              </div>
              <h2 className="mt-3">{technicianData?.technicianType === "Individual"
                ? (`${technicianData?.firstName || "N/A"}${" "}${technicianData?.lastName}`) 
                : (`${technicianData?.organizationDetails.organizationName || "N/A"}`)}</h2>
              <h2 className="text-muted">({technicianData?.technicianType || "N/A"})</h2>
              <h2
                className="edit-profile-text"
                onClick={() => navigateTo("/technician/edit-profile")}
              >
                Edit Profile
              </h2>
            </div>
          )}
          {!isCollapsed && <hr />}
          <ul className="nav flex-column">
            {isCollapsed && (
              <div className="ms-sidebar-Logo">
                <img src={MSLogo} alt="minsakthi-logo" />
              </div>
            )}
            {technicianItems.map((item) => (
              <React.Fragment key={item.path}>
                <li
                  style={{ cursor: "pointer", position: "relative" }}
                  className={`${
                    isCollapsed ? "collapsed-side-links" : "main-sideLinks"
                  } ${
                    location.pathname.startsWith(`/technician/${item.path}`)
                      ? "active"
                      : ""
                      ? "active"
                      : ""
                  }`}
                >
                  <Link
                    className={`nav-link d-flex align-items-center ${
                      isCollapsed ? "justify-content-center" : ""
                    }`}
                    to={`/technician/${item.path}`}
                    onClick={toggleSidebar}
                  >
                    <span className="me-2">{item.icon}</span>
                    {!isCollapsed && (
                      <span className="sidebar-text">{item.item}</span>
                    )}
                  </Link>
                </li>
              </React.Fragment>
            ))}
          </ul>
          <div className="sidebar-footer">
            <div className="sidebar-logo">
              {!isCollapsed && <img src={MinSakthi} alt="minsakthi-logo" />}
              <div onClick={toggleCollapse}>
                {isCollapsed ? (
                  <MdKeyboardDoubleArrowRight
                    size={24}
                    className="arrow-border"
                  />
                ) : (
                  <MdKeyboardDoubleArrowLeft
                    size={24}
                    className="arrow-border"
                  />
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="mainbar">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default TechnicianMain;
