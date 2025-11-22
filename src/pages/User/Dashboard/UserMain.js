import React, { useEffect, useState } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import { userItems } from "../../../helpers/UserSideBarData";
import MinSakthi from "../../../assets/images/minsakthi-sidebar.svg";
import MSLogo from "../../../assets/images/minsakthi-ms.svg";
import UserSidebarAvatar from "../../../assets/images/user-sidebar.svg";
import { IoMdPerson } from "react-icons/io";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import { MdKeyboardDoubleArrowLeft } from "react-icons/md";
import { getUserById } from "../../../redux/User/UserSlice";
import { useDispatch } from "react-redux";
import Cookies from "js-cookie";
import BirthdayWishComponent from "../../../components/HomeCard/BirthdayWishComponent";

const UserMain = () => {
  const location = useLocation();
  const navigateTo = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [userData, setUserData] = useState(null);
  const userId = Cookies.get("userId");
  const dispatch = useDispatch();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
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
                {userData?.profile?.imageUrl ? (
                  <img
                    src={userData?.profile?.imageUrl}
                    alt="Profile"
                    className="rounded-circle"
                  />
                ) : (
                  <IoMdPerson size={60} color="#6b7280" />
                )}
              </div>
              <h2 className="mt-3">{userData?.fullName || "N/A"}</h2>
              <h2
                className="edit-profile-text"
                onClick={() => navigateTo("/user/edit-profile")}
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
            {userItems.map((item) => (
              <React.Fragment key={item.path}>
                <li
                  style={{ cursor: "pointer", position: "relative" }}
                  className={`${
                    isCollapsed ? "collapsed-side-links" : "main-sideLinks"
                  } ${
                    location.pathname.startsWith(`/user/${item.path}`)
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
                    to={`/user/${item.path}`}
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
            <img src={UserSidebarAvatar} className="mt-3"/>
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

      <BirthdayWishComponent userData={userData}/>
    </>
  );
};

export default UserMain;
