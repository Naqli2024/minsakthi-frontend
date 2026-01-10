import React from "react";
import { CiCalendar } from "react-icons/ci";
import { IoTrendingUp } from "react-icons/io5";
import { MdOutlinePayments } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import TechLanding from "../../../assets/images/tech-landing.svg";
import { useTranslation, Trans } from "react-i18next";

const TechnicianHome = () => {
  const { t } = useTranslation();
  const navigateTo = useNavigate();

  const partnerWithUs = [
    {
      image: CiCalendar,
      topic: "regular_service",
      description:
        "regular_service_desc",
    },
    {
      image: IoTrendingUp,
      topic: "better_earnings",
      description:
        "better_earnings_desc",
    },
    {
      image: MdOutlinePayments,
      topic: "on_time_payments",
      description:
        "on_time_payments_desc",
    },
  ];

  return (
    <div>
      <div className="tech-top-content">
        <div className="col-12 col-md-6 tech-left-content d-flex flex-column gap-3">
          <h1>
            <Trans i18nKey="partner_title">
              Partner With <span>Minsakthi24h</span>
            </Trans>{" "}
          </h1>
          <p>
            {t("partner_subtitle")}
          </p>
          <div className="d-flex flex-column flex-sm-row gap-3">
            <p
              className="tech-signup-btn"
              onClick={() => navigateTo("/technician/sign-up")}
            >
              {t("signup")}
            </p>
            <p
              className="tech-login-btn"
              onClick={() => navigateTo("/technician/login")}
            >
              {t("login")}
            </p>
          </div>
        </div>
        <div className="col-12 col-md-6 tech-right-content">
          <img src={TechLanding} />
        </div>
      </div>
      <div className="tech-partner-with-us-text">{t("why_partner")}</div>
      <div className="tech-bottom-content">
        {partnerWithUs.map((item, index) => (
          <div className="tech-bottom-card" key={index}>
            <div className="tech-box-icon mb-3">
              <item.image size={25} color="#2fb972" />
            </div>
            <h3 className="mt-2 fw-bold">{t(item.topic)}</h3>
            <p>{t(item.description)}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TechnicianHome;
