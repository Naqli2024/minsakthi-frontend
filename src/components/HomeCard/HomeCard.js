import React from "react";
import RepairMaintenance from "../../assets/images/repair-maintentanance.svg";
import EBComplaints from "../../assets/images/eb-complaints.svg";
import SolarService from "../../assets/images/solar-service.svg";
import ContractServices from "../../assets/images/contract-service.svg";
import { useNavigate } from "react-router-dom";

const HomeCard = () => {
  const navigateTo = useNavigate();
  const cards = [
    { image: RepairMaintenance, name: "Repair & Maintenance" },
    { image: EBComplaints, name: "EB Complaints" },
    { image: SolarService, name: "Solar Services" },
    { image: ContractServices, name: "Contract Services" },
  ];

  return (
    <div className="home-card-container d-flex justify-content-center align-items-center">
      <div className="outer-card bg-white shadow">
        <div className="cards-wrapper d-flex justify-content-between align-items-center flex-wrap">
          {cards.map((card, index) => (
            <div
              key={index}
              className="single-card d-flex flex-column align-items-center text-center position-relative"
            >
              <div className="card-inner d-flex justify-content-center align-items-center"
              onClick={()=>navigateTo(`/login`)}>
                <img
                  src={card.image}
                  alt={card.name}
                  className="home-card-icon"
                />
              </div>
              <p className="mt-3">{card.name}</p>
              {/* {index !== cards.length - 1 && (
                <svg
                  width="273"
                  height="250"
                  viewBox="-10 0 240 200"
                  className="wave-line"
                >
                  {" "}
                  <path
                    d="M 30 180 C 120 250, 190 -30, 250 70"
                    fill="none"
                    strokeLinecap="round"
                    stroke="#B7C7D1"
                    strokeWidth="2"
                    strokeDasharray="5,5"
                  />
                </svg>
              )} */}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomeCard;
