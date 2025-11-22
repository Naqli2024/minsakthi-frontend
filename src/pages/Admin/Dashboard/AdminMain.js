import React, { useEffect, useState } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import { IoMdPerson } from "react-icons/io";
import {
  MdKeyboardDoubleArrowRight,
  MdKeyboardDoubleArrowLeft,
} from "react-icons/md";
import { useDispatch } from "react-redux";
import Cookies from "js-cookie";
import { getUserById } from "../../../redux/User/UserSlice";
import BirthdayWishComponent from "../../../components/HomeCard/BirthdayWishComponent";
import { adminItems } from "../../../helpers/AdminSideBarData";
import MinSakthi from "../../../assets/images/minsakthi-sidebar.svg";
import MSLogo from "../../../assets/images/minsakthi-ms.svg";
import { FaCaretDown, FaCaretRight } from "react-icons/fa";

const AdminMain = () => {
  const location = useLocation();
  const navigateTo = useNavigate();
  const dispatch = useDispatch();
  const userId = Cookies.get("userId");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [userData, setUserData] = useState(null);
  const [openMenus, setOpenMenus] = useState({});
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const toggleCollapse = () => setIsCollapsed(!isCollapsed);

  const handleDropdownToggle = (itemPath) => {
    setOpenMenus((prev) => {
      if (prev[itemPath]) return {};
      return { [itemPath]: true };
    });
  };

  useEffect(() => {
    dispatch(getUserById(userId))
      .unwrap()
      .then((response) => setUserData(response.data))
      .catch((error) => console.error(error));
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
                onClick={() => navigateTo("/admin/edit-profile")}
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

            {adminItems.map((item) => {
              const isActive =
                location.pathname.startsWith(`/admin/${item.path}`) ||
                (item.subItem &&
                  item.subItem.some((sub) =>
                    location.pathname.startsWith(`/admin/${sub.path}`)
                  ));

              return (
                <li
                  key={item.path}
                  className={`${
                    isCollapsed ? "collapsed-side-links" : "main-sideLinks"
                  } ${isActive ? "active" : ""}`}
                  style={{ position: "relative" }}
                >
                  <div
                    className={`nav-link d-flex align-items-center ${
                      isCollapsed
                        ? "justify-content-center"
                        : "justify-content-between"
                    }`}
                    onClick={() => {
                      if (item.subItem) {
                        if (isCollapsed) {
                          setIsCollapsed(false);
                        } else {
                          handleDropdownToggle(item.path);
                        }
                      } else {
                        navigateTo(`/admin/${item.path}`);
                      }
                    }}
                    style={{ cursor: "pointer" }}
                  >
                    <div
                      className={`d-flex align-items-center ${
                        isCollapsed ? "justify-content-center" : ""
                      }`}
                    >
                      <span className="me-2">{item.icon}</span>
                      {!isCollapsed && (
                        <span className="sidebar-text">{item.item}</span>
                      )}
                    </div>

                    {!isCollapsed && item.subItem && (
                      <span>
                        {openMenus[item.path] ? (
                          <FaCaretDown size={16} />
                        ) : (
                          <FaCaretRight size={16} />
                        )}
                      </span>
                    )}
                  </div>

                  {!isCollapsed && item.subItem && openMenus[item.path] && (
                    <ul className="sub-menu">
                      {item.subItem.map((sub) => (
                        <li
                          key={sub.path}
                          className={`sub-link ${
                            location.pathname === `/admin/${sub.path}`
                              ? "active"
                              : ""
                          }`}
                          onClick={() => navigateTo(`/admin/${sub.path}`)}
                        >
                          {sub.item}
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              );
            })}
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

        <div className="mainbar">
          <Outlet />
        </div>
      </div>

      <BirthdayWishComponent userData={userData} />
    </>
  );
};

export default AdminMain;
