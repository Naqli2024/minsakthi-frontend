import { Link, useNavigate } from "react-router-dom";
import Logo from "../../assets/images/logo.svg";
import { IoIosNotifications } from "react-icons/io";
import { IoMdPerson } from "react-icons/io";
import { Menu, MenuItem, IconButton, Breadcrumbs } from "@mui/material";
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import Cookies from "js-cookie";
import { getUserById } from "../../redux/User/UserSlice";
import { getTechnicianById } from "../../redux/Technician/TechnicianSlice";
import { toast } from "react-toastify";

const TechnicianHeader = () => {
  const [notifications, setNotifications] = useState(3);
  const [openMoreIcon, setMoreIcon] = useState(null);
  const openIcon = Boolean(openMoreIcon);
  const dispatch = useDispatch();
  const [technicianData, setTechnicianData] = useState(null);
  const technicianId = Cookies.get("technicianId");
  const navigate = useNavigate();

  const handleClick = (event) => {
    setMoreIcon(event.currentTarget);
  };

  const handleIconClose = () => {
    setMoreIcon(null);
  };


  const handleLogout = () => {
    navigate("/technician/login")
    Cookies.remove("token");
    Cookies.remove("technicianId");
    Cookies.remove("role");
  };
  
    useEffect(() => {
      dispatch(getTechnicianById(technicianId))
        .unwrap()
        .then((response) => {
          setTechnicianData(response.data);
        })
        .catch((error) => {
          toast.error(error);
        });
    }, [dispatch, technicianId]);

  return (
    <div class="top-content">
      <div class="container-fluid home">
        <nav class="navbar navbar-expand-lg">
          <Link class="navbar-brand">
            <img src={Logo} alt="Logo" class="logo" />
          </Link>
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav center-links fw-bold">
              <li class="nav-item">
                <Link class="nav-link active" aria-current="page">
                  Technician
                </Link>
              </li>
            </ul>
            <div class="user-header-end-group d-flex justify-content-between ms-auto flex-wrap align-items-center fw-bold button-group">
              <div>
                <React.Fragment>
                  <Menu
                    anchorEl={openMoreIcon}
                    open={openIcon}
                    onClose={handleIconClose}
                    aria-labelledby="with-menu-demo-breadcrumbs"
                  >
                    <MenuItem onClick={handleIconClose}>
                      No Notification
                    </MenuItem>
                  </Menu>
                  <Breadcrumbs aria-label="breadcrumbs">
                    <IconButton onClick={handleClick}>
                      <IoIosNotifications
                        size={25}
                        color="#2fb972"
                        className="notification-bell"
                      />
                      {notifications > 0 && (
                        <div pill className="notification-badge">
                          <p className="badge-count">{notifications}</p>
                        </div>
                      )}
                    </IconButton>
                  </Breadcrumbs>
                </React.Fragment>
              </div>
              <div className="user-header-profile">
                {technicianData?.profilePhoto ? (
                                  <img
                                    src={technicianData?.profilePhoto}
                                    alt="Profile"
                                    className="rounded-circle"
                                  />
                                ) : (
                                  <IoMdPerson size={20} color="#6b7280" />
                                )}
              </div>
              <div className="text-muted">
                {technicianData?.technicianType === "Individual"
                ? (`${technicianData?.firstName || "N/A"}${" "}${technicianData?.lastName}`) 
                : (`${technicianData?.organizationDetails.organizationName || "N/A"}`)}</div>
              <div class="nav-item login-btn">
                <span class="nav-link" onClick={handleLogout}>
                  Logout
                </span>
              </div>
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default TechnicianHeader;
