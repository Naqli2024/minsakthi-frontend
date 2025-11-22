import React, { useState } from "react";
import RepairMaintenance from "../../assets/images/repair-maintentanance.svg";
import EBComplaints from "../../assets/images/eb-complaints.svg";
import SolarService from "../../assets/images/solar-service.svg";
import ContractServices from "../../assets/images/contract-service.svg";
import Electrical from "../../assets/images/electrical.svg";
import Appliance from "../../assets/images/appliance.svg";
import { useNavigate } from "react-router-dom";
import { FaCircleChevronLeft } from "react-icons/fa6";

const HomeBookingCard = () => {
  const navigateTo = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState(null);
  const formatUrl = (text) =>
    text.toLowerCase().replace(/&/g, "and").replace(/\s+/g, "-");

  const cards = [
    {
      image: RepairMaintenance,
      name: "Repair & Maintenance",
    },
    { image: EBComplaints, name: "EB Complaints" },
    { image: SolarService, name: "Installation"},
    { image: ContractServices, name: "Contract Services" },
  ];

  const handleCardClick = (card) => {
    if (card.subCategory) {
      setSelectedCategory(selectedCategory === card.name ? null : card.name);
    } else {
      const cardSlug = formatUrl(card.name);
      navigateTo(`/user/orders/${cardSlug}`);
    }
  };

  const handleSubCategoryClick = (category, sub) => {
    const categorySlug = formatUrl(category);
    const subSlug = formatUrl(sub);
    navigateTo(`/user/orders/${categorySlug}/${subSlug}`);
  };

  return (
    <div className="home-card-container d-flex justify-content-center align-items-center">
      <div className="outer-card bg-white shadow">
        <div className="cards-wrapper d-flex justify-content-between align-items-center flex-wrap">
          {cards
            .filter(
              (card) => !selectedCategory || selectedCategory === card.name
            )
            .map((card, index) => (
              <div
                key={index}
                className="single-card new-booking-cards d-flex align-items-center text-center position-relative"
              >
                {selectedCategory === card.name && card.subCategory && (
                  <div className="card-header">
                    <FaCircleChevronLeft
                      size={40}
                      color="#2FB972"
                      cursor={"pointer"}
                      onClick={() => handleCardClick(card)}
                    />
                  </div>
                )}
                <div className="single-card d-flex flex-column align-items-center text-center position-relative">
                  <div
                    className={`card-inner d-flex justify-content-center align-items-center ${
                      selectedCategory === card.name ? "active-card" : ""
                    }`}
                    onClick={() => handleCardClick(card)}
                  >
                    <img
                      src={card.image}
                      alt={card.name}
                      className="home-card-icon"
                    />
                  </div>
                  <p className="mt-3">{card.name}</p>
                </div>
                {selectedCategory === card.name && card.subCategory && (
                  <div className="subcategories-wrapper">
                    {card.subCategory.map((sub, i) => (
                      <div
                        className="sub-card-inner"
                        key={i}
                        onClick={() =>
                          handleSubCategoryClick(card.name, sub.name)
                        }
                      >
                        <img
                          src={sub.image}
                          alt={sub.name}
                          className="home-card-icon"
                        />
                        <hr className="sub-divider" />
                        <p>{sub.name}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default HomeBookingCard;
