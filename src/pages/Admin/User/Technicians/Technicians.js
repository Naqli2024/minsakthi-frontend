import React, { useEffect, useState } from "react";
import { FormGroup, InputGroup, Form } from "react-bootstrap";
import { IoSearchOutline } from "react-icons/io5";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Box,
  Tab,
} from "@mui/material";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import {
  approveTechnician,
  getAllTechnician,
} from "../../../../redux/Technician/TechnicianSlice";
import Loader from "../../../../components/Loader";
import ViewTechnicianDetails from "./ViewTechnicianDetails";

const Technicians = () => {
  const [searchTerms, setSearchTerms] = useState("");
  const [technicianData, setTechnicianData] = useState([]);
  const [selectedTechnician, setSelectedTechnician] = useState(null); 
  const [openViewDetails, setOpenViewDetails] = useState(false);
  const [statusFilter, setStatusFilter] = useState("");
  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState("1");
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllTechnician())
      .unwrap()
      .then((response) => {
        setTechnicianData(response.data || []);
      })
      .catch((error) => toast.error(error));
  }, [dispatch]);

  const individualTechnicians = technicianData?.filter(
    (tech) => tech.technicianType === "Individual"
  );
  const organizationTechnicians = technicianData?.filter(
    (tech) => tech.technicianType === "Organization"
  );

  const filterSearch = (data) => {
    return data.filter((tech) => {
      const org = tech.organizationDetails || {};

      const matchesSearch =
        tech.firstName?.toLowerCase().includes(searchTerms.toLowerCase()) ||
        tech.lastName?.toLowerCase().includes(searchTerms.toLowerCase()) ||
        org.organizationName
          ?.toLowerCase()
          .includes(searchTerms.toLowerCase())

      let matchesStatus = true;
    if (statusFilter === "Approved") {
      matchesStatus = tech.verifiedByAdmin === true;
    } else if (statusFilter === "Pending") {
      matchesStatus = tech.verifiedByAdmin === false;
    }

      return matchesSearch && matchesStatus;
    });
  };

  const handleChange = (event, newValue) => setValue(newValue);

  const handleSubmit = async (techId) => {
    try {
      const payload = {
        technicianId: techId,
        action: "approve",
      };
      setLoading(true);
      await dispatch(approveTechnician(payload))
        .unwrap()
        .then((response) => {
          toast.success(response.message);
          setLoading(false);
          dispatch(getAllTechnician())
            .unwrap()
            .then((response) => {
              setTechnicianData(response.data || []);
            });
        });
    } catch (error) {
      toast.error(error);
      setLoading(false);
    }
  };

    const handleViewDetail = (techData) => {
    setSelectedTechnician(techData);
    setOpenViewDetails(true);
  };

  return (
    <div>
      {loading && <Loader isLoading={loading} />}
      {openViewDetails 
      ? (<ViewTechnicianDetails selectedTechnician={selectedTechnician} backToItems={()=> setOpenViewDetails(false)}/>)
    : ( <div className="admin-customers-overall-content">
        <h2>Technicians</h2>
        <p>Technicians: {technicianData.length || 0}</p>
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
                  "& .Mui-selected": { color: "#27ae60 !important" },
                  "& .MuiTabs-indicator": { backgroundColor: "#27ae60" },
                }}
              >
                <Tab label="Individual" value="1" />
                <Tab label="Organization" value="2" />
              </TabList>
            </Box>

            <TabPanel value="1">
              <div className="admin-customer-search-filter d-flex gap-3 flex-wrap">
                <FormGroup className="col-md-7">
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
                      type="text"
                      placeholder="Search by Technician name..."
                      style={{
                        borderLeft: "none",
                        height: "40px",
                        boxShadow: "none",
                      }}
                      onFocus={(e) => {
                        e.target.style.border = "1px solid #DBDBDB";
                        e.target.style.borderLeft = "none";
                      }}
                      value={searchTerms}
                      onChange={(e) => setSearchTerms(e.target.value)}
                    />
                  </InputGroup>
                </FormGroup>
                <Form.Group className="col-md-2">
                  <Form.Select
                    name="status"
                    className="custom-textfield"
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                  >
                    <option value="">Account Status</option>
                    <option value="Approved">Approved</option>
                    <option value="Pending">Pending</option>
                  </Form.Select>
                </Form.Group>
              </div>
              <div className="admin-customers-table mt-4">
                <TableContainer
                  sx={{
                    borderTopLeftRadius: "8px",
                    borderTopRightRadius: "8px",
                    overflow: "hidden",
                    height: "570px",
                    overflowX: "auto",
                    overflowY: "auto",
                  }}
                >
                  <Table
                    sx={{
                      width: "100%",
                      border: "1px solid #DBDBDB",
                      "& thead": {
                        backgroundColor: "#2fb972",
                      },
                      "& thead th": {
                        color: "#fff",
                        fontWeight: 600,
                        textAlign: "center",
                      },
                      "& tbody td": {
                        textAlign: "center",
                      },
                    }}
                  >
                    <TableHead>
                      <TableRow>
                        <TableCell>Tech ID</TableCell>
                        <TableCell>Profile</TableCell>
                        <TableCell>Name</TableCell>
                        <TableCell>Mobile</TableCell>
                        <TableCell>Email</TableCell>
                        <TableCell>Skills</TableCell>
                        <TableCell>Experience</TableCell>
                        <TableCell>Status</TableCell>
                        <TableCell>Account Status</TableCell>
                        <TableCell>Actions</TableCell>
                      </TableRow>
                    </TableHead>

                    <TableBody>
                      {filterSearch(individualTechnicians).length > 0 
                      ? (filterSearch(individualTechnicians).map(
                        (tech, index) => {
                          return (
                            <TableRow key={index}>
                              <TableCell>
                                <div className="id-link" 
                                onClick={() => handleViewDetail(tech)}>
                                  {tech._id}
                                  </div>
                              </TableCell>
                              <TableCell>
                                <img
                                  src={tech.profilePhoto}
                                  alt={tech.firstName}
                                  width={40}
                                  height={40}
                                  style={{ borderRadius: "50%" }}
                                />
                              </TableCell>
                              <TableCell>
                                {tech.firstName || "N/A"} {tech.lastName}
                              </TableCell>
                              <TableCell>
                                {tech.mobileNumber || "N/A"}
                              </TableCell>
                              <TableCell>{tech.email || "N/A"}</TableCell>
                              <TableCell>
                                {tech.skills.join(", ") || "N/A"}
                              </TableCell>
                              <TableCell>{tech.experienceYears || 0}</TableCell>
                              <TableCell
                                sx={{
                                  color:
                                    tech.status === "Active" ? "green" : "red",
                                }}
                              >
                                {tech.status}
                              </TableCell>
                              <TableCell>
                                {tech.verifiedByAdmin ? "Approved" : "Pending"}
                              </TableCell>
                              <TableCell>
                                <div
                                  className="admin-tech-approve-btn"
                                  onClick={() =>  !tech.verifiedByAdmin && (handleSubmit(tech._id))}
                                >
                                  {tech.verifiedByAdmin
                                    ? "Approved"
                                    : "Approve"}
                                </div>
                              </TableCell>
                            </TableRow>
                          );
                        }
                      ))
                      : (<TableRow>
                  <TableCell colspan={10}>No Technician Found</TableCell>
                </TableRow>)}
                    </TableBody>
                  </Table>
                </TableContainer>
              </div>
            </TabPanel>

            <TabPanel value="2">
              <div className="admin-customer-search-filter d-flex gap-3 flex-wrap">
                <FormGroup className="col-md-7">
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
                      type="text"
                      placeholder="Search by Organization name..."
                      style={{
                        borderLeft: "none",
                        height: "40px",
                        boxShadow: "none",
                      }}
                      onFocus={(e) => {
                        e.target.style.border = "1px solid #DBDBDB";
                        e.target.style.borderLeft = "none";
                      }}
                      value={searchTerms}
                      onChange={(e) => setSearchTerms(e.target.value)}
                    />
                  </InputGroup>
                </FormGroup>

                <Form.Group className="col-md-2">
                  <Form.Select
                    name="status"
                    className="custom-textfield"
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                  >
                    <option value="">Account Status</option>
                    <option value="Approved">Approved</option>
                    <option value="Pending">Pending</option>
                  </Form.Select>
                </Form.Group>
              </div>

              <div className="admin-customers-table mt-4">
                <TableContainer
                  sx={{
                    borderTopLeftRadius: "8px",
                    borderTopRightRadius: "8px",
                    overflow: "hidden",
                    height: "570px",
                    overflowX: "auto",
                    overflowY: "auto",
                  }}
                >
                  <Table
                    sx={{
                      width: "100%",
                      border: "1px solid #DBDBDB",
                      "& thead": { backgroundColor: "#2fb972" },
                      "& thead th": {
                        color: "#fff",
                        fontWeight: 600,
                        textAlign: "center",
                      },
                      "& tbody td": { textAlign: "center" },
                    }}
                  >
                    <TableHead>
                      <TableRow>
                        <TableCell>Tech ID</TableCell>
                        <TableCell>Organization Name</TableCell>
                        <TableCell>Owner</TableCell>
                        <TableCell>Email</TableCell>
                        <TableCell>Mobile</TableCell>
                        <TableCell>Office Address</TableCell>
                        <TableCell>No. of Technicians</TableCell>
                        <TableCell>Status</TableCell>
                        <TableCell>Account Status</TableCell>
                        <TableCell>Actions</TableCell>
                      </TableRow>
                    </TableHead>

                    <TableBody>
                      {filterSearch(organizationTechnicians).length > 0 
                      ? (filterSearch(organizationTechnicians).map(
                        (tech, index) => (
                          <TableRow key={index}>
                            <TableCell>
                              <div className="id-link"
                              onClick={() => handleViewDetail(tech)}>{tech._id}</div>
                            </TableCell>
                            <TableCell>
                              {tech.organizationDetails?.organizationName ||
                                "N/A"}
                            </TableCell>
                            <TableCell>
                              {tech.organizationDetails?.ownerName || "N/A"}
                            </TableCell>
                            <TableCell>
                              {tech.organizationDetails?.email || "N/A"}
                            </TableCell>
                            <TableCell>
                              {tech.organizationDetails?.mobileNumber || "N/A"}
                            </TableCell>
                            <TableCell>
                              {tech.organizationDetails?.officeAddress
                                ? `${tech.organizationDetails.officeAddress.street}, ${tech.organizationDetails.officeAddress.city}`
                                : "N/A"}
                            </TableCell>
                            <TableCell>
                              {tech.organizationDetails?.technicians?.length ||
                                0}
                            </TableCell>
                            <TableCell
                              sx={{
                                color:
                                  tech.status === "Active" ? "green" : "orange",
                              }}
                            >
                              {tech.status}
                            </TableCell>
                            <TableCell>
                              {tech.verifiedByAdmin ? "Approved" : "Pending"}
                            </TableCell>
                            <TableCell>
                              <div
                                className="admin-tech-approve-btn"
                                onClick={() => handleSubmit(tech._id)}
                              >
                                {tech.verifiedByAdmin ? "Approved" : "Approve"}
                              </div>
                            </TableCell>
                          </TableRow>
                        )
                      ))
                      : (<TableRow>
                  <TableCell colspan={10}>No Technician Found</TableCell>
                </TableRow>)}
                    </TableBody>
                  </Table>
                </TableContainer>
              </div>
            </TabPanel>
          </TabContext>
        </Box>
      </div>)}
    </div>
  );
};

export default Technicians;
