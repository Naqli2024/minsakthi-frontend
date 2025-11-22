import React, { useEffect, useState } from "react";
import { FormGroup } from "react-bootstrap";
import { InputGroup, Form } from "react-bootstrap";
import { IoSearchOutline } from "react-icons/io5";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { useDispatch } from "react-redux";
import { getAllUsers } from "../../../../redux/User/UserSlice";
import { toast } from "react-toastify";
import { MdModeEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import SuperCoin from "../../../../assets/images/supercoin.svg";
import Drawer from "@mui/material/Drawer";
import { MdOutlineCancel } from "react-icons/md";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";

const Customers = () => {
  const [userData, setUserData] = useState([]);
  const [searchTerms, setSearchTerms] = useState("");
  const dispatch = useDispatch();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const closeDrawer = () => setDrawerOpen(false);
  const [value, setValue] = useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    dispatch(getAllUsers())
      .unwrap()
      .then((response) => {
        setUserData(response.data);
      })
      .catch((error) => {
        toast.error(error);
      });
  }, [dispatch]);

  return (
    <div className="admin-customers-overall-content">
      <h2>Customers</h2>
      <p>Customers: {userData.length || 0}</p>
      <div className="admin-customer-search-filter">
        <FormGroup className="col-md-5">
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
              placeholder="Search..."
              style={{ borderLeft: "none", height: "40px", boxShadow: "none" }}
              onFocus={(e) => {
                e.target.style.border = "1px solid #DBDBDB";
                e.target.style.borderLeft = "none";
              }}
              value={searchTerms}
              onChange={(e) => setSearchTerms(e.target.value)}
            />
          </InputGroup>
        </FormGroup>
        <FormGroup className="col-md-2">
          <InputGroup>
            <Form.Control
              type="text"
              placeholder="City"
              className="custom-textfield"
            />
          </InputGroup>
        </FormGroup>
        <Form.Group className="col-md-2">
          <Form.Select name="status" className="custom-textfield">
            <option>Status</option>
            <option>Active</option>
            <option>Inactive</option>
          </Form.Select>
        </Form.Group>
        <FormGroup className="col-md-2">
          <InputGroup>
            <Form.Control
              type="date"
              placeholder="Search...'"
              className="custom-textfield"
            />
          </InputGroup>
        </FormGroup>
      </div>
      <div className="admin-customers-table mt-5">
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
              "& tbody tr:last-child td": {
                borderBottom: "none",
              },
            }}
          >
            <TableHead>
              <TableRow>
                <TableCell>User ID</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Phone</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>City</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Bookings</TableCell>
                <TableCell>Points</TableCell>
                <TableCell>Last Login</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {userData.length > 0 ? (
                userData.map((item) => (
                  <TableRow>
                    <TableCell>
                      <div
                        className="id-link"
                        onClick={() => setDrawerOpen(true)}
                      >
                        {item._id}
                      </div>
                    </TableCell>
                    <TableCell>{item.fullName}</TableCell>
                    <TableCell>{item.phoneNumber}</TableCell>
                    <TableCell>{item.emailAddress}</TableCell>
                    <TableCell>{item.address}</TableCell>
                    <TableCell>Active</TableCell>
                    <TableCell>10</TableCell>
                    <TableCell>
                      <div className="d-flex align-items-center justify-content-center gap-2">
                        <img src={SuperCoin} className="admin-super-coin" />5
                      </div>
                    </TableCell>
                    <TableCell>16-10-2025</TableCell>
                    <TableCell>
                      <div className="d-flex align-items-center justify-content-center gap-2">
                        <MdModeEdit
                          size={20}
                          color="#2fb972"
                          cursor={"Pointer"}
                        />
                        <MdDelete size={20} color="red" cursor={"Pointer"} />
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colspan={10}>No Data Found</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </div>

      <Drawer
        anchor="bottom"
        open={drawerOpen}
        onClose={closeDrawer}
        PaperProps={{
          sx: {
            borderTopLeftRadius: "10px",
            borderTopRightRadius: "10px",
            width: {
              xs: "100%",
              sm: "95%",
              md: "90%",
              lg: "80%",
              xl: "1200px",
            },
            height: "100%",
            maxHeight: "90vh",
            mx: "auto",
            overflowY: "auto",
          },
        }}
      >
        <div className="admin-customer-drawer-container">
          <div className="admin-customer-profile-card">
            <div className="d-flex justify-content-between px-3 py-3">
              <h2 className="fw-bold">User Profile</h2>
              <MdOutlineCancel
                size={25}
                cursor="pointer"
                onClick={closeDrawer}
              />
            </div>

            <div className="admin-customer-profile-top-content">
              <div className="admin-customer-profile-avatar"></div>
              <p className="mt-3">Ravi Kumar</p>
              <div className="status">Active</div>
            </div>

            <div className="admin-customer-profile-content">
              <div>
                <div className="info-row">
                  <span className="label">Email</span>
                  <span className="value">ravi@email.com</span>
                </div>
                <div className="info-row">
                  <span className="label">Phone</span>
                  <span className="value">123456789</span>
                </div>
              </div>
              <div className="register-date">
                <span className="fw-bold">Registration Date</span>
                <span className="value mt-2">2023-07-22</span>
              </div>
              <div>
                <div className="info-row">
                  <span className="label">City</span>
                  <span className="value">New York</span>
                </div>
                <div className="info-row">
                  <span className="label">Last Login</span>
                  <span className="value">2023-01-15</span>
                </div>
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
                  <Tab label="Booking History" value="1" />
                  <Tab label="Payment History" value="2" />
                  <Tab label="Complaints/Support" value="3" />
                </TabList>
              </Box>
              <TabPanel value="1">
                <Box sx={{ width: "100%", overflowX: "auto" }}>
                  <TableContainer
                    sx={{
                      borderRadius: "8px",
                      height: "350px",
                      overflowY: "auto",
                    }}
                  >
                    <Table
                      sx={{
                        minWidth: "900px",
                        border: "1px solid #DBDBDB",
                        "& thead": { backgroundColor: "#2fb972" },
                        "& thead th": {
                          color: "#fff",
                          fontWeight: 600,
                          textAlign: "center",
                        },
                        "& tbody td": { textAlign: "center" },
                        "& tbody tr:last-child td": { borderBottom: "none" },
                      }}
                    >
                      <TableHead>
                        <TableRow>
                          <TableCell>Booking ID</TableCell>
                          <TableCell>Service</TableCell>
                          <TableCell>Provider</TableCell>
                          <TableCell>Technician</TableCell>
                          <TableCell>Date</TableCell>
                          <TableCell>Points</TableCell>
                          <TableCell>Status</TableCell>
                          <TableCell>Payment</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        <TableRow>
                          <TableCell>B-1234</TableCell>
                          <TableCell>Electrical</TableCell>
                          <TableCell>HomeClean</TableCell>
                          <TableCell>Ravi Kumar</TableCell>
                          <TableCell>20-25-2025</TableCell>
                          <TableCell>
                            <div className="d-flex align-items-center justify-content-center gap-2">
                              <img
                                src={SuperCoin}
                                className="admin-super-coin"
                              />
                              5
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="completed-badge-wrapper">
                              <div className="completed-badge">Completed</div>
                            </div>
                          </TableCell>
                          <TableCell>&#8377;200</TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Box>
              </TabPanel>
              <TabPanel value="2">
                <Box sx={{ width: "100%", overflowX: "auto" }}>
                  <TableContainer
                    sx={{
                      borderRadius: "8px",
                      height: "350px",
                      overflowY: "auto",
                    }}
                  >
                    <Table
                      sx={{
                        minWidth: "700px",
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
                          <TableCell>Payment ID</TableCell>
                          <TableCell>Amount</TableCell>
                          <TableCell>Method</TableCell>
                          <TableCell>Booking ID</TableCell>
                          <TableCell>Date</TableCell>
                          <TableCell>Status</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        <TableRow>
                          <TableCell>1233</TableCell>
                          <TableCell>&#8377;200</TableCell>
                          <TableCell>Cash</TableCell>
                          <TableCell>B-1234</TableCell>
                          <TableCell>20-25-2025</TableCell>
                          <TableCell>
                            <div className="completed-badge-wrapper">
                              <div className="completed-badge">Completed</div>
                            </div>
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Box>
              </TabPanel>
              <TabPanel value="3">
                <div className="admin-customer-profile-complaints-tab">
                  <div className="d-flex flex-column gap-2">
                    <span className="fw-bold">Ticket</span>
                    <span>#B123</span>
                  </div>
                  <div className="d-flex flex-column gap-2">
                    <span className="fw-bold">Issue</span>
                    <span>Delay and clarification in service period</span>
                  </div>
                  <div className="d-flex flex-column gap-2">
                    <span className="fw-bold">Status</span>
                    <div className="completed-badge-wrapper">
                      <div className="completed-badge">Completed</div>
                    </div>
                  </div>
                  <div className="d-flex flex-column gap-2">
                    <span className="fw-bold">Date</span>
                    <span>16/10/2025</span>
                  </div>
                </div>
              </TabPanel>
            </TabContext>
          </Box>
        </div>
      </Drawer>
    </div>
  );
};

export default Customers;
