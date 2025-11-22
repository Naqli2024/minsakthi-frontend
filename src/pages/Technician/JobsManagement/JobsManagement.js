import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { useState } from "react";
import { InputGroup, Form } from "react-bootstrap";
import { IoSearchOutline } from "react-icons/io5";
import { MdGridView } from "react-icons/md";
import { MdOutlineTableView } from "react-icons/md";
import { LuWrench } from "react-icons/lu";
import { IoMdPerson } from "react-icons/io";
import { IoLocationSharp } from "react-icons/io5";
import { MdAccessTimeFilled } from "react-icons/md";
import { ImWrench } from "react-icons/im";
import { IoEye } from "react-icons/io5";
import { FaPlay } from "react-icons/fa6";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

const JobsManagement = () => {
  const [value, setValue] = useState("1");
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState("card");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

    const jobStats = [
      { title: "Assigned Jobs", value: 12, color: "#FFF7ED"},
      { title: "Ongoing Jobs", value: 8, color: "#EDEEFC"},
      { title: "Completed Jobs", value: 42, color: "#E6F1FD"},
    ];
  return (
    <div className="technician-job-manage-container">
      <h2 className="fw-bold">Jobs Management</h2>
      <p className="text-muted">View and manage your service assignments</p>
      <div className="technician-dashboard-summary-cards mb-4">
        {jobStats.map((stat, index) => (
          <div key={index} className="technician-earnings-card-container" style={{backgroundColor:`${stat.color}`}}>
            <div>
              <p className="technician-dashboard-card-title">{stat.title}</p>
              <h3 className="technician-dashboard-card-value">{stat.value}</h3>
            </div>
          </div>
        ))}
      </div>
      <TabContext
        value={value}
        sx={{ width: "100%", typography: "body1", marginTop: "30px" }}
      >
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <TabList
            onChange={handleChange}
            sx={{
              "& .MuiTab-root": {
                textTransform: "capitalize",
                color: "#413F3F",
                marginRight: "40px",
              },
              "& .Mui-selected": {
                color: "#27ae60 !important",
              },
              "& .MuiTabs-indicator": {
                backgroundColor: "#27ae60",
              },
            }}
          >
            <Tab label="Assigned Jobs" value="1" />
            <Tab label="Ongoing Jobs" value="2" />
            <Tab label="Completed Jobs" value="3" />
          </TabList>
        </Box>
        <TabPanel value="1">
          <div className="technician-job-manage-toolbar">
            <Form.Group className="form-group">
              <InputGroup>
                <InputGroup.Text
                  style={{
                    background: "none",
                    borderRight: "none",
                    padding: "0",
                  }}
                >
                  <IoSearchOutline className="ms-3" />
                </InputGroup.Text>
                <Form.Control
                  className="booking-search-input"
                  placeholder="Search..."
                  style={{
                    borderLeft: "none",
                    height: "40px",
                    boxShadow: "none",
                  }}
                  type="text"
                  onFocus={(e) => {
                    e.target.style.border = "1px solid #DBDBDB";
                e.target.style.borderLeft = "none";
                  }}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </InputGroup>
            </Form.Group>

            <Form.Group className="form-group">
              <Form.Select className="custom-textfield">
                <option value="All">All Categories</option>
                <option value="Electrical">Electrical</option>
                <option value="Appliance">Appliance</option>
                <option value="Solar">Solar</option>
                <option value="EB Complaints">EB Complaints</option>
              </Form.Select>
            </Form.Group>

            <div className="technician-job-manage-view-buttons">
              <div
                className={`technician-job-manage-view-btn ${
                  viewMode === "card" ? "active" : ""
                }`}
                onClick={() => setViewMode("card")}
              >
                <MdGridView className="me-2" size={15} />
                Card View
              </div>
              <div
                className={`technician-job-manage-view-btn ${
                  viewMode === "table" ? "active" : ""
                }`}
                onClick={() => setViewMode("table")}
              >
                <MdOutlineTableView className="me-2" size={15} />
                Table View
              </div>
            </div>
          </div>
          {viewMode === "card" 
          ? (<div className="technician-job-manage-cards">
            <div className="technician-job-card-container">
              <h3>
                <LuWrench className="me-2" size={15} color="#2fb972" />
                #1033 | Ac General Maintenance
              </h3>
              <hr />
              <div>
                <p>
                  <IoMdPerson className=" text-muted" />
                  <span className="ms-3 text-muted">Customer: </span> Ethan
                  Carter
                </p>
                <p>
                  <IoLocationSharp className=" text-muted" />
                  <span className="ms-3 text-muted">Location: </span> 12/A, Town
                  New York
                </p>
                <p>
                  <MdAccessTimeFilled className=" text-muted" />
                  <span className="ms-3 text-muted">Scheduled: </span> 05 Nov,
                  10:00 AM
                </p>
                <p>
                  <ImWrench className=" text-muted" />
                  <span className="ms-3 text-muted">Service Type:</span> Repair
                  & Maintenance
                </p>
                <hr className="mt-4" />
                <div className="d-md-flex justify-content-between mt-4">
                  <p className="technician-job-view-details-btn ">
                    <IoEye size={20} /> View Details{" "}
                  </p>
                  <p className="technician-job-start-job-btn">
                    <FaPlay /> Start Job
                  </p>
                </div>
              </div>
            </div>
            <div className="technician-job-card-container">
              <h3>
                <LuWrench className="me-2" size={15} color="#2fb972" />
                #1033 | Ac General Maintenance
              </h3>
              <hr />
              <div>
                <p>
                  <IoMdPerson className=" text-muted" />
                  <span className="ms-3 text-muted">Customer: </span> Ethan
                  Carter
                </p>
                <p>
                  <IoLocationSharp className=" text-muted" />
                  <span className="ms-3 text-muted">Location: </span> 12/A, Town
                  New York
                </p>
                <p>
                  <MdAccessTimeFilled className=" text-muted" />
                  <span className="ms-3 text-muted">Scheduled: </span> 05 Nov,
                  10:00 AM
                </p>
                <p>
                  <ImWrench className=" text-muted" />
                  <span className="ms-3 text-muted">Service Type:</span> Repair
                  & Maintenance
                </p>
                <hr className="mt-4" />
                <div className="d-md-flex justify-content-between mt-4">
                  <p className="technician-job-view-details-btn ">
                    <IoEye size={20} /> View Details{" "}
                  </p>
                  <p className="technician-job-start-job-btn">
                    <FaPlay /> Start Job
                  </p>
                </div>
              </div>
            </div>
          </div>)
          : (<div className="mt-5">
            <TableContainer
                  sx={{
                    borderTopLeftRadius: "8px",
                    borderTopRightRadius: "8px",
                    overflow: "hidden",
                    height: "350px",
                    overflowX: "auto",
                    overflowY: "auto",
                  }}
                >
                  <Table
              stickyHeader
              sx={{
                width: "100%",
                border: "1px solid #DBDBDB",
                "& thead": {
                  backgroundColor: "#2fb972",
                },
                "& thead th": {
                  backgroundColor: "#2fb972",
                  color: "#fff",
                  fontWeight: 600,
                  textAlign: "center",
                },
                "& tbody td": {
                  textAlign: "center",
                },
                "& tbody tr:last-child td": {
                  borderBottom: "none",
                },
              }}
            >
                    <TableHead>
                      <TableRow>
                        <TableCell>Job ID</TableCell>
                        <TableCell>Service Name</TableCell>
                        <TableCell>Category</TableCell>
                        <TableCell>Customer Name</TableCell>
                        <TableCell>Location</TableCell>
                        <TableCell>Date & Time</TableCell>
                        <TableCell>Status</TableCell>
                        <TableCell>Actions</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                     <TableRow>
                  <TableCell><div className="technician-earnings-job-id">J-2000</div></TableCell>
                  <TableCell>Ac Service</TableCell>
                  <TableCell>Repair & Maintenance</TableCell>
                  <TableCell>Rajesh</TableCell>
                  <TableCell>Tuticorin</TableCell>
                  <TableCell>2025-11-11</TableCell>
                  <TableCell className="text-primary">Scheduled</TableCell>
                  <TableCell><div className="border border-success px-0 py-2 text-success rounded" style={{ cursor: "pointer" }}>Start Job</div></TableCell>
                </TableRow>
                     <TableRow>
                  <TableCell><div className="technician-earnings-job-id">J-2001</div></TableCell>
                  <TableCell>Ac Service</TableCell>
                  <TableCell>Repair & Maintenance</TableCell>
                  <TableCell>Rajesh</TableCell>
                  <TableCell>Tuticorin</TableCell>
                  <TableCell>2025-11-11</TableCell>
                  <TableCell className="text-danger">In Progress</TableCell>
                  <TableCell><div className="border border-primary px-0 py-2 text-primary rounded" style={{ cursor: "pointer" }}>Continue</div></TableCell>
                </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
          </div>)}
        </TabPanel>
        <TabPanel value="2">2</TabPanel>
        <TabPanel value="3">3</TabPanel>
      </TabContext>
    </div>
  );
};

export default JobsManagement;
