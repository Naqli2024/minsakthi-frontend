import { useEffect, useState } from "react";
import { MdAdd } from "react-icons/md";
import { useDispatch } from "react-redux";
import CreateNewServiceList from "./CreateNewServiceList";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import GeneralServiceList from "./GeneralServiceList";
import FixedServiceList from "./FixedServiceList";
import { getAllServices } from "../../../../redux/Admin/ServiceSlice";
import { toast } from "react-toastify";

const ServiceList = () => {
  const [openDrawer, setOpenDrawer] = useState(false);
  const [serviceData, setServiceData] = useState([]);
  const [isBulkUploadClicked, setIsBulkUploadClicked] = useState(false);
  const [value, setValue] = useState("1");
  const dispatch = useDispatch();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

    useEffect(() => {
      dispatch(getAllServices())
        .then((response) => {
          setServiceData(response.payload);
        })
        .catch((error) => toast.error(error));
    }, [dispatch]);

  return (
    <div className="admin-service-list-overall-container">
      <div className="d-md-flex justify-content-between">
        <div className="bookings-head">
          <h3 className="fw-bold">List Of Services</h3>
        </div>
        <div className="d-md-flex gap-3">
          {value ===  "2" && (
            <div className="admin-bulk-item-btn" 
          onClick={() => {
              setOpenDrawer(true)
              setIsBulkUploadClicked(true)
            }}>
            <MdAdd color="white" size={15}/>
            Add Bulk Item
          </div>
          )}
          <div
            className="admin-bulk-item-btn"
            onClick={() => {
              setOpenDrawer(true)
              setIsBulkUploadClicked(false)
            }}
          >
            <MdAdd color="white" size={15} />
            Add New Item
          </div>
        </div>
      </div>
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
          </TabList>
        </Box>

        <TabPanel value="1">
           <GeneralServiceList serviceData={serviceData} setServiceData={setServiceData}/>
        </TabPanel>
        <TabPanel value="2" >
          <FixedServiceList serviceData={serviceData} setServiceData={setServiceData}/>
        </TabPanel>
      </TabContext>
      </Box>

      <CreateNewServiceList
        openDrawer={openDrawer}
        setOpenDrawer={setOpenDrawer}
        setServiceData={setServiceData}
        isBulkUploadClicked={isBulkUploadClicked}
        value={value}
      />
    </div>
  );
};

export default ServiceList;
