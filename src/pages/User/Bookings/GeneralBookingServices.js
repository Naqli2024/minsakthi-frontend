import { useState } from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import FixedCostServices from "./FixedCostServices";
import CustomizedBookingServices from "./CustomizedBookingServices";
import PreviewConfirmBookingModal from "./PreviewConfirmBookingModal";
import { useNavigate } from "react-router-dom";

const GeneralBookingServices = ({ serviceData = [], isHome }) => {
  const [value, setValue] = useState("1");
  const navigateTo = useNavigate();
  const [openPreviewOrderDialog, setOpenPreviewOrderDialog] = useState(false);
  const [serviceDetails, setServiceDetails] = useState({});

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const filteredGeneralServices = serviceData.filter(
    (service) =>
      service.serviceScope === (isHome ? "Home" : "Industry") &&
      service.serviceType?.toLowerCase() === "general"
  );

  const filteredFixedServices = serviceData.filter(
    (service) =>
      service.serviceScope === (isHome ? "Home" : "Industry") &&
      service.serviceType?.toLowerCase() === "fixed"
  );

  const handleClick = (service) => {
    setServiceDetails(service);
    setOpenPreviewOrderDialog(true);
  }

  return (
    <Box sx={{ width: "100%", typography: "body1", mt: 2 }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <TabList
            onChange={handleChange}
            variant="scrollable"
            scrollButtons
            allowScrollButtonsMobile
            sx={{
              "& .MuiTab-root": {
                textTransform: "capitalize",
                color: "#413F3F",
              },
              "& .Mui-selected": {
                color: "#27ae60 !important",
              },
              "& .MuiTabs-indicator": {
                backgroundColor: "#27ae60",
              },
            }}
          >
            <Tab label="General Services" value="1" />
            <Tab label="Fixed Cost Services" value="2" />
            <Tab label="Customized Services" value="3" />
          </TabList>
        </Box>

        <TabPanel value="1" className="booking-service-fixed-height">
          {filteredGeneralServices?.length > 0 ? (
            filteredGeneralServices?.map((service, index) => (
              <Accordion
                key={index}
                className="mx-4"
                sx={{
                  mt: 2,
                  boxShadow: "none",
                  border: "1px solid #DBDBDB",
                  borderRadius: "6px",
                  "&:before": { display: "none" },
                }}
              >
                <AccordionSummary
                  expandIcon={
                    <ArrowDropDownIcon sx={{ fontSize: "25px !important" }} />
                  }
                  sx={{
                    minHeight: 70,
                    "& .MuiAccordionSummary-content": {
                      alignItems: "center",
                      justifyContent: "space-between",
                      gap: 2,
                    },
                  }}
                >
                  <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                    <div className="service-img">
                      <img src={service.imageUrl} alt={service.serviceName} />
                    </div>
                    <Box sx={{ fontWeight: "bold", color: "#3E3E3E" }}>
                      {service.serviceName}
                    </Box>
                  </Box>
                  <Box className="service-price-tag">
                    &#8377;{service.servicePrice || 0}
                  </Box>
                </AccordionSummary>

                <AccordionDetails
                  sx={{ borderTop: "1px solid #DBDBDB", pb: 0 }}
                >
                  <Box className="row py-3">
                    <Box className="col-md-5">
                      {service.steps
                        .slice(0, Math.ceil(service.steps.length / 2))
                        .map((step, idx) => (
                          <ul key={idx} className="booking-description">
                            <li>
                              <p className="mb-0 fw-bold">{step.title}</p>
                              <p className="mb-0">- {step.details}</p>
                            </li>
                          </ul>
                        ))}
                    </Box>
                    <Box className="col-md-5">
                      {service.steps
                        .slice(Math.ceil(service.steps.length / 2))
                        .map((step, idx) => (
                          <ul key={idx} className="booking-description">
                            <li>
                              <p className="mb-0 fw-bold">{step.title}</p>
                              <p className="mb-0">- {step.details}</p>
                            </li>
                          </ul>
                        ))}
                    </Box>
                    <Box className="col-md-2 d-flex align-items-end justify-content-end">
                      <div
                        className="book-now-btn"
                        onClick={() =>handleClick(service)}
                      >
                        Book Now
                      </div>
                    </Box>
                  </Box>
                </AccordionDetails>
              </Accordion>
            ))
          ) : (
            <p className="text-center">No General Services Available</p>
          )}
        </TabPanel>
        <TabPanel value="2" className="booking-service-fixed-height">
          <FixedCostServices filteredFixedServices={filteredFixedServices} isHome={isHome}/>
        </TabPanel>
        <TabPanel value="3" className="booking-service-fixed-height">
          <CustomizedBookingServices isHome={isHome} />
        </TabPanel>
      </TabContext>
  
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
    </Box>
  );  
};

export default GeneralBookingServices;
