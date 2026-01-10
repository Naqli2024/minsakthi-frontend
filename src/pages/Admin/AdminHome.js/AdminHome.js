import React from "react";
import AdminHomeImg from "../../../assets/images/admin-home.svg";
import { FaUserGroup } from "react-icons/fa6";
import { RiCalendarTodoFill } from "react-icons/ri";
import { MdOutlinePayments } from "react-icons/md";
import { PiSuitcaseSimple } from "react-icons/pi";
import { useNavigate } from "react-router-dom";
import { useTranslation, Trans } from "react-i18next";

const AdminHome = () => {
  const { t } = useTranslation();
  const navigateTo = useNavigate();
  const featurePreview = [
    {
      icon: <FaUserGroup />,
      name: "user_management",
      description: "user_management_desc",
    },
    {
      icon: <RiCalendarTodoFill />,
      name: "booking_management",
      description: "booking_management_desc",
    },
    {
      icon: <MdOutlinePayments />,
      name: "payment_tracking",
      description: "payment_tracking_desc",
    },
    {
      icon: <PiSuitcaseSimple />,
      name: "service_management",
      description: "service_management_desc",
    },
  ];

  return (
    <div className="admin-overall-content">
      <div className="admin-top-content">
        <h2>
          <Trans i18nKey="welcome_title">
            Welcome to <span>Minsakthi</span> 24h Admin Console
          </Trans>
        </h2>
        <p className="mb-2">
          <Trans i18nKey="welcome_subtitle">
            Manage your users, bookings, payments, and services efficiently with
            our intuitive dashboard.
          </Trans>
        </p>
        <div
          className="admin-get-started-btn"
          onClick={() => navigateTo("/admin/dashboard")}
        >
          {t("get_started")}
        </div>

        <img src={AdminHomeImg} alt="Admin Home" className="admin-home-img" />
      </div>

      <div className="admin-bottom-content">
        <h2 className="fw-bold mb-5">{t("features_preview")}</h2>
        <div className="admin-feature-grid">
          {featurePreview.map((feature, index) => (
            <div className="admin-preview-card" key={index}>
              <div className="admin-preview-icon">{feature.icon}</div>
              <h3 className="fw-bold pt-3">{t(feature.name)}</h3>
              <p>{t(feature.description)}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminHome;
