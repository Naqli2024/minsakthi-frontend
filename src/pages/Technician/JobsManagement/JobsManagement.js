import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { useEffect, useState } from "react";
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
import { FiCheckCircle } from "react-icons/fi";
import { MdOutlineCancel } from "react-icons/md";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { useDispatch } from "react-redux";
import Cookies from "js-cookie";
import { getTechnicianById } from "../../../redux/Technician/TechnicianSlice";
import { toast } from "react-toastify";
import { getOrderByOrderId } from "../../../redux/User/BookingSlice";
import StartJob from "./StartJob";
import { getUserById } from "../../../redux/User/UserSlice";
import { VscDebugContinue } from "react-icons/vsc";
import Drawer from "@mui/material/Drawer";

const JobsManagement = () => {
  const [value, setValue] = useState("1");
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [viewMode, setViewMode] = useState("card");
  const dispatch = useDispatch();
  const [technicianData, setTechnicianData] = useState({ orders: [] });
  const [orderData, setOrderData] = useState({});
  const [customerName, setCustomerName] = useState();
  const [orderId, setOrderId] = useState();
  const technicianId = Cookies.get("technicianId");
  const [openStartJob, setOpenStartJob] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [viewOrderData, setViewOrderData] = useState();
  const closeDrawer = () => setDrawerOpen(false);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const jobStats = [
    { title: "Assigned Jobs", value: 12, color: "#FFF7ED" },
    { title: "Ongoing Jobs", value: 8, color: "#EDEEFC" },
    { title: "Completed Jobs", value: 42, color: "#E6F1FD" },
  ];

  useEffect(() => {
    dispatch(getTechnicianById(technicianId))
      .unwrap()
      .then((response) => {
        setTechnicianData(response.data);
      })
      .catch((error) => {
        toast.error(error);
      });
  }, [dispatch, technicianId]);

  useEffect(() => {
    if (!technicianData?.orders?.length) return;

    technicianData.orders.forEach((item) => {
      dispatch(getOrderByOrderId(item.orderId))
        .unwrap()
        .then((res) => {
          const order = res.data;
          setOrderData((prev) => ({
            ...prev,
            [item.orderId]: order,
          }));

          if (order?.customer) {
            dispatch(getUserById(order.customer))
              .unwrap()
              .then((user) => {
                setCustomerName((prev) => ({
                  ...prev,
                  [order.customer]: user.data,
                }));
              });
          }
        })
        .catch((err) => toast.error(err));
    });
  }, [technicianData]);

  const renderJobsCount = (title) => {
    switch (title) {
      case "Assigned Jobs":
        return assignedJobs?.length || 0;
      case "Ongoing Jobs":
        return ongoingJobs?.length || 0;
      case "Completed Jobs":
        return completedJobs?.length || 0;
      default:
        return null;
    }
  };

  const handleStartJob = (orderID) => {
    setOpenStartJob(true);
    setOrderId(orderID);
  };

  const filteredOrders = technicianData.orders
    ?.map((order) => {
      const details = orderData?.[order.orderId];
      const customer = customerName?.[details?.customer];

      return {
        ...order,
        details,
        customerName: customer?.fullName || "",
        serviceType: details?.serviceType || "",
        location: details?.issueLocation || "",
        orderStatus: details?.orderStatus || "",
        category: details?.category || "",
        arrivalConfirmed:
          details?.processes
            ?.find((p) => p.processName === "Site Visit")
            ?.subProcesses?.find((sp) => sp.name === "Arrival Confirmation")
            ?.isCompleted || false,
      };
    })
    .filter((item) => {
      if (!item) return false;

      const searchLower = searchQuery.toLowerCase();

      const matchesSearch =
        item.orderId.toLowerCase().includes(searchLower) ||
        item.customerName.toLowerCase().includes(searchLower) ||
        item.location.toLowerCase().includes(searchLower) ||
        item.serviceType.toLowerCase().includes(searchLower);

      const matchesCategory =
        categoryFilter === "" ? true : item.category === categoryFilter;

      return matchesSearch && matchesCategory;
    });

  const assignedJobs = filteredOrders?.filter(
    (job) => !job.arrivalConfirmed && job.orderStatus !== "Completed"
  );

  const ongoingJobs = filteredOrders?.filter(
    (job) => job.arrivalConfirmed && job.orderStatus !== "Completed"
  );

  const completedJobs = filteredOrders?.filter(
    (job) => job.orderStatus === "Completed"
  );

  const handleViewDetail = (orderData) => {
    setViewOrderData(orderData);
    setDrawerOpen(true);
  };

  return (
    <div>
      {openStartJob ? (
        <StartJob backToList={() => setOpenStartJob(false)} orderId={orderId} />
      ) : (
        <div className="technician-job-manage-container">
          <h2 className="fw-bold">Jobs Management</h2>
          <p className="text-muted">View and manage your service assignments</p>
          <div className="technician-dashboard-summary-cards mb-4">
            {jobStats.map((stat, index) => (
              <div
                key={index}
                className="technician-earnings-card-container"
                style={{ backgroundColor: `${stat.color}` }}
              >
                <div>
                  <p className="technician-dashboard-card-title">
                    {stat.title}
                  </p>
                  <h3 className="technician-dashboard-card-value">
                    {renderJobsCount(stat.title)}
                  </h3>
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
                  <InputGroup>
                    <Form.Select
                      className="custom-textfield"
                      value={categoryFilter}
                      onChange={(e) => setCategoryFilter(e.target.value)}
                    >
                      <option value="">All Categories</option>
                      <option>Electrical</option>
                      <option>Appliance</option>
                      <option>Solar</option>
                      <option>EB Complaints</option>
                    </Form.Select>
                  </InputGroup>
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
              {viewMode === "card" ? (
                assignedJobs.length > 0 ? (
                  assignedJobs?.map((order, index) => {
                    const details = orderData?.[order.orderId] || {};
                    const customer = customerName?.[details.customer] || {};
                    return (
                      <div className="technician-job-manage-cards" key={index}>
                        <div className="technician-job-card-container">
                          <h3>
                            <LuWrench
                              className="me-2"
                              size={15}
                              color="#2fb972"
                            />
                            {order.orderId} |{" "}
                            {details.serviceType?.charAt(0).toUpperCase() +
                              details.serviceType?.slice(1) || "N/A"}
                          </h3>
                          <hr />
                          <div>
                            <p>
                              <IoMdPerson className=" text-muted" />
                              <span className="ms-3 text-muted">
                                Customer:{" "}
                              </span>
                              {customer.fullName || "N/A"}
                            </p>
                            <p>
                              <IoLocationSharp className=" text-muted" />
                              <span className="ms-3 text-muted">
                                Location:{" "}
                              </span>
                              {details.issueLocation || "N/A"}
                            </p>
                            <p>
                              <MdAccessTimeFilled className=" text-muted" />
                              <span className="ms-3 text-muted">
                                Scheduled:{" "}
                              </span>
                              {details?.processes
                                ?.find((p) => p.processName === "Site Visit")
                                ?.subProcesses?.find(
                                  (sp) => sp.name === "Schedule Visit"
                                )?.scheduledDate || "N/A"}
                              {" | "}
                              {details?.processes
                                ?.find((p) => p.processName === "Site Visit")
                                ?.subProcesses?.find(
                                  (sp) => sp.name === "Schedule Visit"
                                )?.scheduledTime || "N/A"}
                            </p>
                            <p>
                              <ImWrench className=" text-muted" />
                              <span className="ms-3 text-muted">
                                Service Type:{" "}
                              </span>
                              {details.orderType || "N/A"}
                            </p>
                            <hr className="mt-4" />
                            <div className="d-md-flex justify-content-between mt-4">
                              <p
                                className="technician-job-view-details-btn"
                                onClick={() => handleViewDetail(details)}
                              >
                                <IoEye size={20} /> View Details
                              </p>
                              <p
                                className="technician-job-start-job-btn"
                                onClick={() => handleStartJob(order.orderId)}
                              >
                                <FaPlay /> Start Job
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <div className="text-center mt-5 text-muted">
                    No Assigned Jobs found
                  </div>
                )
              ) : (
                <div className="mt-5">
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
                          <TableCell>Order ID</TableCell>
                          <TableCell>Service Name</TableCell>
                          <TableCell>Category</TableCell>
                          <TableCell>Customer Name</TableCell>
                          <TableCell>Location</TableCell>
                          <TableCell>Scheduled Date & Time</TableCell>
                          <TableCell>Description</TableCell>
                          <TableCell>Actions</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {assignedJobs?.length > 0 ? (
                          assignedJobs?.map((order, index) => {
                            const details = orderData?.[order.orderId] || {};
                            const customer =
                              customerName?.[details.customer] || {};
                            return (
                              <TableRow key={index}>
                                <TableCell>
                                  <div
                                    className="technician-earnings-job-id"
                                    onClick={() => handleViewDetail(details)}
                                  >
                                    {order.orderId}
                                  </div>
                                </TableCell>
                                <TableCell>
                                  {details.serviceName || "N/A"}
                                </TableCell>
                                <TableCell>
                                  {details.orderType || "N/A"}
                                </TableCell>
                                <TableCell>
                                  {customer.fullName || "N/A"}
                                </TableCell>
                                <TableCell>
                                  {details.issueLocation || "N/A"}
                                </TableCell>
                                <TableCell>
                                  {details?.processes
                                    ?.find(
                                      (p) => p.processName === "Site Visit"
                                    )
                                    ?.subProcesses?.find(
                                      (sp) => sp.name === "Schedule Visit"
                                    )?.scheduledDate || "N/A"}
                                  {" | "}
                                  {details?.processes
                                    ?.find(
                                      (p) => p.processName === "Site Visit"
                                    )
                                    ?.subProcesses?.find(
                                      (sp) => sp.name === "Schedule Visit"
                                    )?.scheduledTime || "N/A"}
                                </TableCell>
                                <TableCell>
                                  {details.issueDescription || "N/A"}
                                </TableCell>
                                <TableCell>
                                  <div
                                    className="border border-success px-0 py-2 text-success rounded"
                                    style={{ cursor: "pointer" }}
                                    onClick={() =>
                                      handleStartJob(order.orderId)
                                    }
                                  >
                                    Start Job
                                  </div>
                                </TableCell>
                              </TableRow>
                            );
                          })
                        ) : (
                          <TableRow>
                            <TableCell colSpan={8}>
                              No Assigned Jobs found
                            </TableCell>
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </div>
              )}
            </TabPanel>
            <TabPanel value="2">
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
                  <InputGroup>
                    <Form.Select
                      className="custom-textfield"
                      value={categoryFilter}
                      onChange={(e) => setCategoryFilter(e.target.value)}
                    >
                      <option value="">All Categories</option>
                      <option>Electrical</option>
                      <option>Appliance</option>
                      <option>Solar</option>
                      <option>EB Complaints</option>
                    </Form.Select>
                  </InputGroup>
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
              {viewMode === "card" ? (
                ongoingJobs?.length > 0 ? (
                  ongoingJobs?.map((order, index) => {
                    const details = orderData?.[order.orderId] || {};
                    const customer = customerName?.[details.customer] || {};
                    return (
                      <div className="technician-job-manage-cards" key={index}>
                        <div className="technician-job-card-container">
                          <h3>
                            <LuWrench
                              className="me-2"
                              size={15}
                              color="#2fb972"
                            />
                            {order.orderId} |{" "}
                            {details.serviceType?.charAt(0).toUpperCase() +
                              details.serviceType?.slice(1) || "N/A"}
                          </h3>
                          <hr />
                          <div>
                            <p>
                              <IoMdPerson className=" text-muted" />
                              <span className="ms-3 text-muted">
                                Customer:{" "}
                              </span>
                              {customer.fullName || "N/A"}
                            </p>
                            <p>
                              <IoLocationSharp className=" text-muted" />
                              <span className="ms-3 text-muted">
                                Location:{" "}
                              </span>
                              {details.issueLocation || "N/A"}
                            </p>
                            <p>
                              <MdAccessTimeFilled className=" text-muted" />
                              <span className="ms-3 text-muted">
                                Scheduled:{" "}
                              </span>
                              {details?.processes
                                ?.find((p) => p.processName === "Site Visit")
                                ?.subProcesses?.find(
                                  (sp) => sp.name === "Schedule Visit"
                                )?.scheduledDate || "N/A"}
                              {" | "}
                              {details?.processes
                                ?.find((p) => p.processName === "Site Visit")
                                ?.subProcesses?.find(
                                  (sp) => sp.name === "Schedule Visit"
                                )?.scheduledTime || "N/A"}
                            </p>
                            <p>
                              <ImWrench className=" text-muted" />
                              <span className="ms-3 text-muted">
                                Service Type:{" "}
                              </span>
                              {details.orderType || "N/A"}
                            </p>
                            <hr className="mt-4" />
                            <div className="d-md-flex justify-content-between mt-4">
                              <p
                                className="technician-job-view-details-btn"
                                onClick={() => handleViewDetail(details)}
                              >
                                <IoEye size={20} /> View Details
                              </p>
                              <p
                                className="d-flex align-items-center border border-primary px-2 py-2 text-primary rounded"
                                style={{ cursor: "pointer" }}
                                onClick={() => handleStartJob(order.orderId)}
                              >
                                <VscDebugContinue size={20} className="me-2" />{" "}
                                Continue
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <div className="text-center mt-5 text-muted">
                    No Ongoing Jobs found
                  </div>
                )
              ) : (
                <div className="mt-5">
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
                          <TableCell>Order ID</TableCell>
                          <TableCell>Service Name</TableCell>
                          <TableCell>Category</TableCell>
                          <TableCell>Customer Name</TableCell>
                          <TableCell>Location</TableCell>
                          <TableCell>Scheduled Date & Time</TableCell>
                          <TableCell>Description</TableCell>
                          <TableCell>Actions</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {ongoingJobs?.length > 0 ? (
                          ongoingJobs?.map((order, index) => {
                            const details = orderData?.[order.orderId] || {};
                            const customer =
                              customerName?.[details.customer] || {};
                            return (
                              <TableRow key={index}>
                                <TableCell>
                                  <div
                                    className="technician-earnings-job-id"
                                    onClick={() => handleViewDetail(details)}
                                  >
                                    {order.orderId}
                                  </div>
                                </TableCell>
                                <TableCell>
                                  {details.serviceName || "N/A"}
                                </TableCell>
                                <TableCell>
                                  {details.orderType || "N/A"}
                                </TableCell>
                                <TableCell>
                                  {customer.fullName || "N/A"}
                                </TableCell>
                                <TableCell>
                                  {details.issueLocation || "N/A"}
                                </TableCell>
                                <TableCell>
                                  {details?.processes
                                    ?.find(
                                      (p) => p.processName === "Site Visit"
                                    )
                                    ?.subProcesses?.find(
                                      (sp) => sp.name === "Schedule Visit"
                                    )?.scheduledDate || "N/A"}
                                  {" | "}
                                  {details?.processes
                                    ?.find(
                                      (p) => p.processName === "Site Visit"
                                    )
                                    ?.subProcesses?.find(
                                      (sp) => sp.name === "Schedule Visit"
                                    )?.scheduledTime || "N/A"}
                                </TableCell>
                                <TableCell>
                                  {details.issueDescription || "N/A"}
                                </TableCell>
                                <TableCell>
                                  <div
                                    className="d-flex align-items-center justify-content-center border border-primary px-2 py-2 text-primary rounded"
                                    style={{ cursor: "pointer" }}
                                    onClick={() =>
                                      handleStartJob(order.orderId)
                                    }
                                  >
                                    Continue
                                  </div>
                                </TableCell>
                              </TableRow>
                            );
                          })
                        ) : (
                          <TableRow>
                            <TableCell colSpan={8}>
                              No Assigned Jobs found
                            </TableCell>
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </div>
              )}
            </TabPanel>
            <TabPanel value="3">
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
                  <Form.Select
                    className="custom-textfield"
                    value={categoryFilter}
                    onChange={(e) => setCategoryFilter(e.target.value)}
                  >
                    <option value="">All Categories</option>
                    <option>Electrical</option>
                    <option>Appliance</option>
                    <option>Solar</option>
                    <option>EB Complaints</option>
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
              {viewMode === "card" ? (
                completedJobs.length > 0 ? (
                  completedJobs?.map((order, index) => {
                    const details = orderData?.[order.orderId] || {};
                    const customer = customerName?.[details.customer] || {};
                    return (
                      <div className="technician-job-manage-cards" key={index}>
                        <div className="technician-job-card-container">
                          <h3>
                            <LuWrench
                              className="me-2"
                              size={15}
                              color="#2fb972"
                            />
                            {order.orderId} |{" "}
                            {details.serviceType?.charAt(0).toUpperCase() +
                              details.serviceType?.slice(1) || "N/A"}
                          </h3>
                          <hr />
                          <div>
                            <p>
                              <IoMdPerson className=" text-muted" />
                              <span className="ms-3 text-muted">
                                Customer:{" "}
                              </span>
                              {customer.fullName || "N/A"}
                            </p>
                            <p>
                              <IoLocationSharp className=" text-muted" />
                              <span className="ms-3 text-muted">
                                Location:{" "}
                              </span>
                              {details.issueLocation || "N/A"}
                            </p>
                            <p>
                              <MdAccessTimeFilled className=" text-muted" />
                              <span className="ms-3 text-muted">
                                Scheduled:{" "}
                              </span>
                              {details?.processes
                                ?.find((p) => p.processName === "Site Visit")
                                ?.subProcesses?.find(
                                  (sp) => sp.name === "Schedule Visit"
                                )?.scheduledDate || "N/A"}
                              {" | "}
                              {details?.processes
                                ?.find((p) => p.processName === "Site Visit")
                                ?.subProcesses?.find(
                                  (sp) => sp.name === "Schedule Visit"
                                )?.scheduledTime || "N/A"}
                            </p>
                            <p>
                              <ImWrench className=" text-muted" />
                              <span className="ms-3 text-muted">
                                Service Type:{" "}
                              </span>
                              {details.orderType || "N/A"}
                            </p>
                            <hr className="mt-4" />
                            <div className="d-md-flex justify-content-between mt-4">
                              <p
                                className="technician-job-view-details-btn"
                                onClick={() => handleViewDetail(details)}
                              >
                                <IoEye size={20} /> View Details
                              </p>
                              <p
                                className="technician-job-start-job-btn"
                                style={{ cursor: "auto" }}
                              >
                                <FiCheckCircle size={20} className="me-2" />{" "}
                                Completed
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <div className="text-center mt-5 text-muted">
                    No Completed Jobs found
                  </div>
                )
              ) : (
                <div className="mt-5">
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
                          <TableCell>Order ID</TableCell>
                          <TableCell>Service Name</TableCell>
                          <TableCell>Category</TableCell>
                          <TableCell>Customer Name</TableCell>
                          <TableCell>Location</TableCell>
                          <TableCell>Scheduled Date & Time</TableCell>
                          <TableCell>Description</TableCell>
                          <TableCell>Actions</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {completedJobs?.length > 0 ? (
                          completedJobs?.map((order, index) => {
                            const details = orderData?.[order.orderId] || {};
                            const customer =
                              customerName?.[details.customer] || {};
                            return (
                              <TableRow key={index}>
                                <TableCell>
                                  <div
                                    className="technician-earnings-job-id"
                                    onClick={() => handleViewDetail(details)}
                                  >
                                    {order.orderId}
                                  </div>
                                </TableCell>
                                <TableCell>
                                  {details.serviceName || "N/A"}
                                </TableCell>
                                <TableCell>
                                  {details.orderType || "N/A"}
                                </TableCell>
                                <TableCell>
                                  {customer.fullName || "N/A"}
                                </TableCell>
                                <TableCell>
                                  {details.issueLocation || "N/A"}
                                </TableCell>
                                <TableCell>
                                  {details?.processes
                                    ?.find(
                                      (p) => p.processName === "Site Visit"
                                    )
                                    ?.subProcesses?.find(
                                      (sp) => sp.name === "Schedule Visit"
                                    )?.scheduledDate || "N/A"}
                                  {" | "}
                                  {details?.processes
                                    ?.find(
                                      (p) => p.processName === "Site Visit"
                                    )
                                    ?.subProcesses?.find(
                                      (sp) => sp.name === "Schedule Visit"
                                    )?.scheduledTime || "N/A"}
                                </TableCell>
                                <TableCell>
                                  {details.issueDescription || "N/A"}
                                </TableCell>
                                <TableCell>
                                  <div className="d-flex align-items-center justify-content-center border border-success px-2 py-2 text-success rounded">
                                    <FiCheckCircle size={20} className="me-2" />{" "}
                                    Completed
                                  </div>
                                </TableCell>
                              </TableRow>
                            );
                          })
                        ) : (
                          <TableRow>
                            <TableCell colSpan={8}>
                              No Completed Jobs found
                            </TableCell>
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </div>
              )}
            </TabPanel>
          </TabContext>
        </div>
      )}
      <Drawer
        anchor="bottom"
        open={drawerOpen}
        onClose={closeDrawer}
        PaperProps={{
          sx: {
            borderTopLeftRadius: "10px",
            borderTopRightRadius: "10px",
            width: "800px",
            mx: "auto",
          },
        }}
      >
        <Box className="drawer-booking-details">
          <div className="new-booking-dialog-header px-3 py-3">
            <p className="m-0 fw-bold">View Details</p>
            <MdOutlineCancel
              color="white"
              cursor="pointer"
              size={25}
              onClick={closeDrawer}
            />
          </div>
          <div className="booking-view-details">
            <div className="d-flex justify-content-between align-items-center">
              <h4 className="fw-bold">
                Order ID:{" "}
                {viewOrderData?.orderId ||
                  viewOrderData?.originalOrderId ||
                  "N/A"}
              </h4>
            </div>
            <div className="px-3 py-5 row gap-5">
              <div className="col-md-6">
                <div className="row">
                  <div className="col-md-6">
                    <p className="fw-bold mb-2">Service Type</p>
                    <p className="text-muted">
                      {viewOrderData?.serviceScope || "N/A"} -{" "}
                      {viewOrderData?.serviceType.charAt(0).toUpperCase() +
                        viewOrderData?.serviceType.slice(1) || "N/A"}
                    </p>
                  </div>
                  <div className="col-md-6">
                    <p className="fw-bold mb-2">Order Type</p>
                    <p className="text-muted">
                      {viewOrderData?.orderType || "N/A"}
                    </p>
                  </div>
                  <div className="col-md-6 mt-4">
                    <p className="fw-bold mb-2">Category</p>
                    <p className="text-muted">
                      {viewOrderData?.category || "N/A"}
                    </p>
                  </div>
                  <div className="col-md-6 mt-4">
                    <p className="fw-bold mb-2">Service Name</p>
                    <p className="text-muted">
                      {viewOrderData?.serviceName || "N/A"}
                    </p>
                  </div>
                  <div className="col-md-10 mt-4">
                    <p className="fw-bold mb-2">User</p>
                    <div className="d-flex align-items-center">
                      <div className="view-details-avatar">
                        <img
                          src={
                            customerName?.[viewOrderData?.customer]?.profile
                              ?.imageUrl
                          }
                        />
                      </div>
                      <div className="ms-3">
                        <p className="text-muted mb-1">
                          {customerName?.[viewOrderData?.customer]?.fullName ||
                            "N/A"}
                        </p>
                        <p className="text-muted mb-1">
                          {customerName?.[viewOrderData?.customer]?._id ||
                            "N/A"}
                        </p>
                        <p className="text-muted mb-1">
                          {customerName?.[viewOrderData?.customer]
                            ?.emailAddress || "N/A"}
                        </p>
                        <p className="text-muted">
                          {customerName?.[viewOrderData?.customer]
                            ?.phoneNumber || "N/A"}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6 mt-4">
                    <p className="fw-bold mb-2">Service Address</p>
                    <p className="text-muted">
                      {viewOrderData?.issueLocation || "N/A"}
                    </p>
                  </div>
                  <div className="col-md-6 mt-4">
                    <p className="fw-bold mb-2">Scheduled Date & Time</p>
                    <p className="text-muted">
                      {viewOrderData?.processes
                        ?.find((p) => p.processName === "Site Visit")
                        ?.subProcesses?.find(
                          (sp) => sp.name === "Schedule Visit"
                        )?.scheduledDate || "N/A"}
                      {" | "}
                      {viewOrderData?.processes
                        ?.find((p) => p.processName === "Site Visit")
                        ?.subProcesses?.find(
                          (sp) => sp.name === "Schedule Visit"
                        )?.scheduledTime || "N/A"}
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-md-5">
                <p className="fw-bold text-left">Picture of the Issue</p>
                <div className="booking-view-details-card">
                  {viewOrderData?.pictureOfTheIssue ? (
                    <img
                      src={viewOrderData.pictureOfTheIssue}
                      style={{ maxHeight: "200px", objectFit: "cover" }}
                    />
                  ) : (
                    <p className="mt-3">No image uploaded</p>
                  )}
                </div>
                <p className="fw-bold text-left mt-4 mb-2">
                  Recorded Voice of the Issue
                </p>
                <div className="booking-view-details-card">
                  {viewOrderData?.voiceRecordOfTheIssue ? (
                    <audio
                      src={viewOrderData.voiceRecordOfTheIssue}
                      controls
                      style={{ width: "100%" }}
                    />
                  ) : (
                    <p className="mt-3">No voice message available</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </Box>
      </Drawer>
    </div>
  );
};

export default JobsManagement;
