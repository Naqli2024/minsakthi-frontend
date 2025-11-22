import { useState } from "react";
import Switch from "../../../assets/images/switch.svg";
import { MdStarRate } from "react-icons/md";
import { MdAccessTime } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import PreviewConfirmBookingModal from "./PreviewConfirmBookingModal";

const FixedCostServices = ({ filteredFixedServices, isHome }) => {
  const [openPreviewOrderDialog, setOpenPreviewOrderDialog] = useState(false);
  const [serviceDetails, setServiceDetails] = useState({});
  const navigateTo = useNavigate();

  const getColor = (index) => {
    const colors = ["#E2F4E8", "#F2E2F4", "#F8EBCC", "#DAFCFA", "#E1F5FE"];
    return colors[index % colors.length];
  };

  const handleClick = (service) => {
    setServiceDetails(service);
    setOpenPreviewOrderDialog(true);
  }

  return (
    <div>
      <div className="services-grid mx-4">
        {filteredFixedServices?.length > 0 ? (
          filteredFixedServices?.map((service, index) => (
            <div className="service-card">
              <div className="service-card-image">
                <img src={service.imageUrl} alt={service.serviceName} />
              </div>
              <div className="service-card-content">
                <h4>{service.serviceName}</h4>
                <div className="service-meta">
                  <MdAccessTime />
                  <p className="ms-2">{service.workingTime}</p>
                </div>
                <div className="fixed-service-process-tags mt-3">
                  {service.process?.length > 0 ? (
                    service.process.map((step, index) => (
                      <span
                        key={index}
                        className="admin-process-badge"
                        style={{ backgroundColor: getColor(index) }}
                      >
                        {step}
                      </span>
                    ))
                  ) : (
                    <span className="text-muted">N/A</span>
                  )}
                </div>
                <div className="card-actions">
                  <div className="view-detail">
                    <p className="price">&#8377;{service.sellingPrice}</p>
                  </div>
                  <div
                    className="book-btn"
                     onClick={() =>handleClick(service)}
                  >
                    Book now
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center">No Fixed Cost Services Available</p>
        )}
      </div>

       {openPreviewOrderDialog && (
        <PreviewConfirmBookingModal
          openPreviewOrderDialog={openPreviewOrderDialog}
          setOpenPreviewOrderDialog={setOpenPreviewOrderDialog}
          onPlaceOrder={() => {
            setOpenPreviewOrderDialog(false);
            navigateTo("/user/payment-mode");
          }}
          serviceDetails={serviceDetails}
          isHome={isHome}
        />
      )}
    </div>
  );
};

export default FixedCostServices;
