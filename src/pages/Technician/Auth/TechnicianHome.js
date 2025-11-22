import React from "react";
import { CiCalendar } from "react-icons/ci";
import { IoTrendingUp } from "react-icons/io5";
import { MdOutlinePayments } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import TechLanding from "../../../assets/images/tech-landing.svg";

const TechnicianHome = () => {
  const navigateTo = useNavigate();
  const partnerWithUs = [
    {
      image: CiCalendar,
      topic: "Regular Service Request",
      description:
        "Get daily job assignments directly to your device and keep your schedule full",
    },
    {
      image: IoTrendingUp,
      topic: "Better Earnings",
      description:
        "Benefit from our platform's reach and earn more with repeat, satisfied customers.",
    },
    {
      image: MdOutlinePayments,
      topic: "On - Time Payments",
      description:
        "Receive your payment instantly and securely right after the job is completed.",
    },
  ];

  return (
    <div>
      <div className="tech-top-content">
        <div className="col-12 col-md-6 tech-left-content d-flex flex-column gap-3">
          <h1>
            Partner With <span>Minsakthi24h</span>
          </h1>
          <p>
            Grow your income by providing quality home &<br />
            industrial services.
          </p>
          <div className="d-flex flex-column flex-sm-row gap-3">
            <p
              className="tech-signup-btn"
              onClick={() => navigateTo("/technician/sign-up")}
            >
              Sign up
            </p>
            <p className="tech-login-btn" onClick={() => navigateTo("/technician/login")}>
              Login
            </p>
          </div>
        </div>
        <div className="col-12 col-md-6 tech-right-content">
          <img src={TechLanding} />
        </div>
      </div>
      <div className="tech-partner-with-us-text">Why Partner With Us?</div>
      <div className="tech-bottom-content">
        {partnerWithUs.map((item, index) => (
          <div className="tech-bottom-card" key={index}>
            <div className="tech-box-icon mb-3">
              <item.image size={25} color="#2fb972" />
            </div>
            <h5 className="mt-2">{item.topic}</h5>
            <p>{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TechnicianHome;
