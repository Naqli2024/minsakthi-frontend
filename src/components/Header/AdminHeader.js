import { Link, useLocation, useNavigate } from "react-router-dom";
import Logo from "../../assets/images/logo.svg";
import { IoIosNotifications } from "react-icons/io";
import { IoMdPerson } from "react-icons/io";
import { Menu, MenuItem, IconButton, Breadcrumbs } from "@mui/material";
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import Cookies from "js-cookie";
import { getUserById } from "../../redux/User/UserSlice";

const AdminHeader = () => {
  const [notifications, setNotifications] = useState(3);
  const [openMoreIcon, setMoreIcon] = useState(null);
  const openIcon = Boolean(openMoreIcon);
  const dispatch = useDispatch();
  const [userData, setUserData] = useState(null);
  const userId = Cookies.get("userId");
  const navigate = useNavigate();
  const location = useLocation();

  const handleClick = (event) => {
    setMoreIcon(event.currentTarget);
  };

  const handleIconClose = () => {
    setMoreIcon(null);
  };

  useEffect(() => {
    dispatch(getUserById(userId))
      .unwrap()
      .then((response) => {
        setUserData(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [dispatch, userId]);

  const handleLogout = () => {
    const currentDate = new Date().toISOString().slice(5, 10);
    Cookies.remove("token");
    Cookies.remove("userId");
    Cookies.remove("role");
    Cookies.remove(`birthdayWishShown_${currentDate}`);
    navigate("/login");
  };

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
                  Admin
                </Link>
              </li>
            </ul>
            {location.pathname.startsWith(`/admin/`) && (
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
                {userData?.profile?.imageUrl ? (
                                  <img
                                    src={userData?.profile?.imageUrl}
                                    alt="Profile"
                                    className="rounded-circle"
                                  />
                                ) : (
                                  <IoMdPerson size={20} color="#6b7280" />
                                )}
              </div>
              <div className="text-muted">{userData?.fullName || "N/A"}</div>
              <div class="nav-item login-btn">
                <Link class="nav-link" onClick={handleLogout}>
                  Logout
                </Link>
              </div>
            </div>
            )}
          </div>
        </nav>
      </div>
    </div>
  );
};

export default AdminHeader;
