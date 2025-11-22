import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import GeneralBookingServices from "./GeneralBookingServices";
import SuperCoin from "../../../assets/images/supercoin.svg";
import { IoArrowBackOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getAllServices } from "../../../redux/Admin/ServiceSlice";
import { toast } from "react-toastify";
import PreviewConfirmBookingModal from "./PreviewConfirmBookingModal";

const BookingsStepper = () => {
  const [activeStep, setActiveStep] = useState(1);
  const [isHome, setIsHome] = useState(true);
  const [serviceData, setServiceData] = useState([]);
  const navigateTo = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllServices())
    .then((response) => setServiceData(response.payload))
    .catch((error) => toast.error(error));
  },[dispatch])


  const steps = [
    "Select a Service Type",
    "Select a Service Problem",
    "Book a Service",
    "Booking Confirmed"
  ];

  const renderStepContent = () => {
    switch (activeStep) {
      case 1:
        return <GeneralBookingServices serviceData={serviceData} isHome={isHome}/>;
      case 2:
        return <PreviewConfirmBookingModal />;
      case 3:
        return <PreviewConfirmBookingModal />;
      default:
        return null;
    }
  };

  return (
    <div className="booking-stepper-overall-container">
      <div className="bookings-head px-5 py-4">
        <div className="d-flex align-items-center">
          <IoArrowBackOutline
            size={25}
            cursor={"pointer"}
            onClick={() => navigateTo(`/user/new-bookings`)}
          />
          <h3 className="ms-2 mt-2">Orders</h3>
        </div>
        <p className="super-coin">
          <img src={SuperCoin} className="me-2" />
          0
        </p>
      </div>
      <Box sx={{ width: "100%" }}>
        <Stepper
          activeStep={activeStep}
          alternativeLabel
          sx={{
            "& .MuiStepLabel-label": { color: "#333" },
            "& .MuiStepIcon-root": {
              color: "#ccc",
              width: 36,
              height: 36,
            },
            "& .MuiStepIcon-root.Mui-active": {
              color: "#2FB972",
            },
            "& .MuiStepIcon-root.Mui-completed": {
              color: "#2FB972",
            },
          }}
        >
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
      </Box>

      {/* <div className="d-flex justify-content-between px-5 py-4">
        <span
          className="d-inline-block"
          tabIndex="0"
          data-bs-toggle="tooltip"
          title="Back"
          style={{ cursor: "pointer" }}
          onClick={handleBack}
        >
          <BsArrowLeftCircleFill size={35} color="#2FB972" />
        </span>
        <span
          className="d-inline-block"
          tabIndex="0"
          data-bs-toggle="tooltip"
          title="Next"
          style={{ cursor: "pointer" }}
          onClick={handleNext}
        >
          <BsArrowRightCircleFill size={35} color="#2FB972" />
        </span>
      </div> */}
      <div className="mt-5">
        <p className="text-center fw-bold">Select Service Scope</p>
      <div className="service-scope-outer-toggle-container">
        <div className="service-scope-toggle-container">
      <span className={`service-scope-label ${isHome ? "active" : ""}`}>Home</span>
      <label className="switch">
        <input
          type="checkbox"
          checked={!isHome}
          onChange={() => setIsHome(!isHome)}
        />
        <span className="slider"></span>
      </label>
      <span className={`service-scope-label ${!isHome ? "active" : ""}`}>Industry</span>
    </div>
      </div>
      </div>
      <div className="mt-3">{renderStepContent()}</div>
    </div>
  );
};

export default BookingsStepper;
