import { LineChart } from "@mui/x-charts/LineChart";
import { PieChart } from "@mui/x-charts/PieChart";
import { BarChart } from "@mui/x-charts/BarChart";
import { useEffect, useRef, useState } from "react";
import { Form, Row, Col, Button, InputGroup } from "react-bootstrap";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import StepContent from "@mui/material/StepContent";
import Typography from "@mui/material/Typography";
import { IoCheckmarkCircleSharp } from "react-icons/io5";
import { RiProgress8Line } from "react-icons/ri";
import { MdCancel } from "react-icons/md";
import { FiCheckCircle } from "react-icons/fi";
import { MdAdd } from "react-icons/md";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { getAllOrders } from "../../../../redux/User/BookingSlice";
import { getUserById } from "../../../../redux/User/UserSlice";
import {
  getAllTechnician,
  getTechnicianById,
} from "../../../../redux/Technician/TechnicianSlice";
import { useNavigate } from "react-router-dom";
import { assignTechnician } from "../../../../redux/Admin/ServiceSlice";
import { FormControl, Select, MenuItem, OutlinedInput } from "@mui/material";
import { toast } from "react-toastify";
import { TbCancel } from "react-icons/tb";

const Orders = () => {
  const containerRef = useRef(null);
  const [chartSize, setChartSize] = useState({ width: 520, height: 250 });
  const [openProcessDetailModal, setOpenProcessDetailModal] = useState(false);
  const [openActivityLogModal, setOpenActivityLogModal] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [technicianData, setTechnicianData] = useState({});
  const [processDes, setProcessDes] = useState();
  const [techName, setTechName] = useState();
  const [assignTechAction, setAssignTechAction] = useState({});
  const dispatch = useDispatch();
  const navigateTo = useNavigate();
  const [assignedTechnician, setAssignedTechnician] = useState({});
  const [orderData, setOrderData] = useState();
  const [userData, setUserData] = useState({});
  const [search, setSearch] = useState("");

  useEffect(() => {
    const resizeObserver = new ResizeObserver((entries) => {
      if (entries && entries[0]) {
        const { width } = entries[0].contentRect;
        const dynamicHeight = Math.max(200, Math.min(350, width * 0.5));
        setChartSize({ width: width - 40, height: dynamicHeight });
      }
    });
    if (containerRef.current) resizeObserver.observe(containerRef.current);
    return () => {
      if (containerRef.current) resizeObserver.unobserve(containerRef.current);
    };
  }, []);

  const overTimeData = [
    { month: "Jan", value: 2 },
    { month: "Feb", value: 5.5 },
    { month: "Mar", value: 2 },
    { month: "Apr", value: 8.5 },
    { month: "May", value: 1.5 },
    { month: "Jun", value: 5 },
    { month: "Jul", value: 3 },
    { month: "Aug", value: 4 },
    { month: "Sep", value: 2 },
    { month: "Oct", value: 5 },
    { month: "Nov", value: 7 },
    { month: "Dec", value: 8 },
  ];

  const ordersOverallData = [
    {
      name: "Total Orders Received",
      count: "8",
      color: "#ACC9FF",
    },
    {
      name: "Orders In Estimation",
      count: "2",
      color: "#CEA5FF",
    },
    {
      name: "Estimates Accepted",
      count: "5",
      color: "#96DFA0",
    },
    {
      name: "Orders In Execution",
      count: "2",
      color: "#FFD287",
    },
    {
      name: "Orders Completed",
      count: "3",
      color: "#ADF8D5",
    },
    {
      name: "Payment Completed",
      count: "2",
      color: "#E9E9E9",
    },
  ];

  const steps = [
    {
      label: "Execution Progress Updated to 65%",
      description: `ORD-001 in about 1hour John Smith`,
    },
    {
      label: `Partial Payment Received (\u20B917,500)`,
      description: "ORD-006  1 minute ago Finance Team",
    },
    {
      label: "Estimate Sent to Client",
      description: `ORD-003 about 17hours ago Sarah Johnson`,
    },
    {
      label: "Payment Completed",
      description: `ORD-003 2 days ago Sarah Johnson`,
    },
  ];

  const getColor = (index) => {
    const gradients = [
      "linear-gradient(135deg, #E8FFF5, #DFFFEA)", // 1 mint light
      "linear-gradient(135deg, #FFF4E6, #FFEBD9)", // 2 peach light (updated)
      "linear-gradient(135deg, #EFF4FF, #E4EBFF)", // 3 cool pale blue (updated)
      "linear-gradient(135deg, #FFF8E8, #FFF1D6)", // 4 mild sand (updated)
      "linear-gradient(135deg, #F3FFEA, #E8FFD7)", // 5 fresh green fog (updated)
      "linear-gradient(135deg, #FFF0F6, #FFE4F0)", // 6 soft pink (new)
      "linear-gradient(135deg, #EFFFFF, #DFFFFF)", // 7 aqua breeze (new)
    ];

    return gradients[index % gradients.length];
  };

  const getBorderColor = (index) => {
    const borderColors = [
      "#76c7a1", // 1 mint dark
      "#d79b6c", // 2 peach brownish (updated)
      "#6f8fd9", // 3 blue mid-tone (updated)
      "#d6a446", // 4 golden sand (updated)
      "#75bb64", // 5 natural green (updated)
      "#d4669e", // 6 deep rose pink (new)
      "#50b6b6", // 7 teal aqua (new)
    ];

    return borderColors[index % borderColors.length];
  };

  useEffect(() => {
    dispatch(getAllOrders())
      .unwrap()
      .then((res) => setOrderData(res?.data || []))
      .catch((error) => toast.error(error));
  }, [dispatch]);

  useEffect(() => {
    dispatch(getAllTechnician())
      .unwrap()
      .then((res) => setTechName(res?.data || []))
      .catch((error) => toast.error(error));
  }, [dispatch]);

  useEffect(() => {
    const fetchUsersAndTechnicians = async () => {
      const tempUserMap = {};
      const tempTechMap = {};
      const techPromises = [];

      for (const order of orderData) {
        // Fetch customer name
        if (order?.customer && !tempUserMap[order.customer]) {
          const res = await dispatch(getUserById(order.customer)).unwrap();
          tempUserMap[order.customer] = res?.data?.fullName || "";
        }

        // Fetch technician names
        for (const process of order?.processes || []) {
          for (const sub of process?.subProcesses || []) {
            for (const techId of sub?.assignedTechnicians || []) {
              if (techId && !tempTechMap[techId]) {
                techPromises.push(
                  dispatch(getTechnicianById(techId))
                    .unwrap()
                    .then((tRes) => {
                      tempTechMap[techId] = `${tRes?.data?.firstName || ""} ${
                        tRes?.data?.lastName ||
                        `${tRes?.data.organizationDetails.organizationName}`
                      }`.trim();
                    })
                );
              }
            }
          }
        }
      }

      await Promise.all(techPromises);

      setUserData(tempUserMap);
      setTechnicianData(tempTechMap);
    };

    if (orderData?.length > 0) fetchUsersAndTechnicians();
  }, [dispatch, orderData]);

  const handleProcessDescription = (process) => {
    setProcessDes(process);
    setOpenProcessDetailModal(true);
  };

  const handleChangeTechAction = (index) => {
    setAssignTechAction((prev) => ({
      ...prev,
      [index]: true,
    }));
  };

  const handleAssignTechnician = async (index, orderId) => {
    try {
      const selectedTech = assignedTechnician[index];

      if (!selectedTech || selectedTech.length === 0) {
        return toast.info("Please select at least one technician");
      }
      const payload = {
        technicianIds: selectedTech,
      };

      await dispatch(assignTechnician({ orderId, payload }))
        .unwrap()
        .then((response) => {
          toast.success(response.message);
          setAssignTechAction((prev) => ({
            ...prev,
            [index]: false,
          }));

          dispatch(getAllOrders())
            .unwrap()
            .then((res) => setOrderData(res?.data || []));
        });
    } catch (error) {
      toast.error(error);
    }
  };

  const filteredOrder = orderData?.filter((order) => {
    const searchText = search.toLowerCase();

    const orderIdMatch = order.orderId?.toLowerCase().includes(searchText);

    const clientName = userData[order.customer]?.toLowerCase() || "";
    const clientMatch = clientName.includes(searchText);

    return orderIdMatch || clientMatch;
  });

  return (
    <div className="admin-orders-overall-container">
      <h1>Order Management Dashboard</h1>
      <div className="admin-orders-dashboard-container">
        <div ref={containerRef} className="admin-orders-over-time-card">
          <p>Orders Over Time</p>
          <LineChart
            dataset={overTimeData}
            xAxis={[
              {
                dataKey: "month",
                scaleType: "band",
                tickLabelStyle: { fontSize: "10px" },
              },
            ]}
            yAxis={[
              {
                valueFormatter: (v) => v,
                tickMinStep: 1,
                position: "left",
              },
            ]}
            series={[
              {
                data: overTimeData.map((d) => d.value),
                dataKey: "value",
                color: "#4C83EE",
                area: false,
              },
            ]}
            height={chartSize.height}
            width={chartSize.width}
          />
        </div>
        <div className="admin-orders-over-time-card">
          <p>Execution Status Breakdown</p>
          <PieChart
            series={[
              {
                data: [
                  { id: 0, value: 10, label: "Not Shared", color: "#62B2FD" },
                  { id: 1, value: 15, label: "In Progress", color: "#97A3B6" },
                  { id: 2, value: 20, label: "Completed", color: "#5EC16A" },
                ],
              },
            ]}
            width={chartSize.width * 0.4}
            height={chartSize.height}
            slotProps={{
              legend: { sx: { marginLeft: "50px", marginRight: "auto" } },
            }}
          />
        </div>
        <div className="admin-orders-over-time-card">
          <p>Financial Health</p>
          <div className="chart-wrapper">
            <BarChart
              xAxis={[{ data: ["Paid", "Pending"], scaleType: "band" }]}
              series={[
                {
                  data: [20000, null],
                  label: "Paid: 20,000",
                  color: "#9BE4C2",
                },
                {
                  data: [null, 10000],
                  label: "Pending: 10,000",
                  color: "#FFB74D",
                },
              ]}
              height={chartSize.height - 30}
              width={chartSize.width * 0.95}
              slotProps={{
                legend: {
                  sx: { marginTop: "0px" },
                  direction: "row",
                  position: { vertical: "bottom", horizontal: "middle" },
                  itemMarkWidth: 10,
                  itemMarkHeight: 10,
                },
              }}
              borderRadius={6}
            />
          </div>
        </div>
      </div>
      <div className="admin-orders-dashboard-overview">
        {ordersOverallData.map((order) => (
          <div
            className="admin-orders-overview-card"
            style={{ background: order.color }}
          >
            <p className="mb-2">{order.name}</p>
            <p className="fw-bold">{orderData?.length || 0}</p>
          </div>
        ))}
      </div>
      <div className="admin-orders-filters-outer-container">
        <div className="admin-orders-filters">
          <Form.Group className="admin-orders-filters-text-field">
            <InputGroup>
              <Form.Control
                type="text"
                placeholder="Search by Client / Order ID"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </InputGroup>
          </Form.Group>
          <Form.Group className="admin-orders-filters-text-field">
            <InputGroup>
              <Form.Select>
                <option className="orders-label">Estimate Status</option>
                <option>Accepted</option>
                <option>Rejected</option>
                <option>Pending</option>
                <option>Sent</option>
                <option>Completed</option>
              </Form.Select>
            </InputGroup>
          </Form.Group>
          <Form.Group className="admin-orders-filters-text-field">
            <InputGroup>
              <Form.Select>
                <option value="">Execution Status</option>
                <option>In Progress</option>
                <option>Not Started</option>
                <option>Completed</option>
              </Form.Select>
            </InputGroup>
          </Form.Group>
          <Form.Group className="admin-orders-filters-text-field">
            <InputGroup>
              <Form.Select>
                <option value="">Payment Status</option>
                <option>Pending</option>
                <option>Overdue</option>
                <option>Partial</option>
                <option>Completed</option>
              </Form.Select>
            </InputGroup>
          </Form.Group>
          <Form.Group className="admin-orders-filters-text-field">
            <InputGroup>
              <Form.Control type="date" />
            </InputGroup>
          </Form.Group>
          <Form.Group className="admin-orders-filters-text-field">
            <InputGroup>
              <Form.Select>
                <option value="">Preferences</option>
                <option>Newest First</option>
                <option>Oldest First</option>
              </Form.Select>
            </InputGroup>
          </Form.Group>
        </div>
      </div>
      <p className="fw-bold mb-2 mt-5 fs-5">Order List</p>
      <p className="fw-bold">Orders: {orderData?.length || 0}</p>
      <div className="admin-orders-list-container">
        <TableContainer
          sx={{
            borderTopLeftRadius: "8px",
            borderTopRightRadius: "8px",
            height: "450px",
            overflow: "auto",
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
                <TableCell>Client Name</TableCell>
                <TableCell>Process</TableCell>
                <TableCell>Technician</TableCell>
                <TableCell>Activity Log</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredOrder?.length > 0 ? (
                filteredOrder.map((order, index) => {
                  const processOrder1 = order.processes?.find(
                    (p) => p.order === 1
                  );
                  const techIds =
                    processOrder1?.subProcesses?.[0]?.assignedTechnicians;
                  return (
                    <TableRow key={index}>
                      <TableCell>{order.orderId || "N/A"}</TableCell>
                      <TableCell>{userData[order.customer] || "N/A"}</TableCell>
                      <TableCell>
                        <div className="d-flex align-items-center justify-content-center">
                          {order.processes.length > 0 ? (
                            order.processes
                              ?.slice()
                              ?.sort((a, b) => a.order - b.order)
                              .map((process, pIndex) => (
                                <div className="admin-order-list-process">
                                  <div
                                    className="admin-process-list-card-container"
                                    key={pIndex}
                                    style={{
                                      background: getColor(pIndex),
                                      border: `1px solid ${getBorderColor(
                                        pIndex
                                      )}`,
                                    }}
                                    onClick={() =>
                                      handleProcessDescription(process)
                                    }
                                    tabIndex="0"
                                    data-bs-toggle="tooltip"
                                    title={process.processName}
                                  >
                                    {process.status === "Completed" || process.status ===  "Arrived" ? (
                                      <IoCheckmarkCircleSharp
                                        color="#2fb972"
                                        size={"16px"}
                                        className="admin-orders-icon"
                                      />
                                    ) : process.status === "Pending" ? (
                                      <MdCancel
                                        color="#F67879"
                                        size={"16px"}
                                        className="admin-orders-icon"
                                      />
                                    ) : (
                                      <RiProgress8Line
                                        color="#ffb197"
                                        size={"16px"}
                                        className="admin-orders-icon"
                                      />
                                    )}
                                    <p className="mb-0 mt-1">
                                      {process.processName}
                                    </p>
                                  </div>
                                  {pIndex !== order.processes.length - 1 && (
                                    <div className="admin-process-list-divider" />
                                  )}
                                </div>
                              ))
                          ) : (
                            <div
                              className="admin-orders-create-process-btn"
                              onClick={() => navigateTo("/admin/process-list")}
                            >
                              <MdAdd size={18} /> Create Process
                            </div>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        {techIds?.length > 0
                          ? techIds
                              .map((id) => technicianData[id] || "N/A")
                              .join(", ")
                          : "N/A"}
                      </TableCell>

                      <TableCell>
                        <div className="d-flex align-items-center justify-content-center">
                          <div
                            className="activity-log-btn"
                            onClick={() => setOpenActivityLogModal(true)}
                          >
                            View
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="d-flex align-items-center justify-content-center">
                          {assignTechAction[index] ? (
                            <div className="assign-tech-row">
                              <FormControl sx={{ minWidth: 230 }}>
                                <Select
                                  multiple
                                  displayEmpty
                                  value={assignedTechnician[index] || []}
                                  onChange={(event) => {
                                    const {
                                      target: { value },
                                    } = event;

                                    setAssignedTechnician((prev) => ({
                                      ...prev,
                                      [index]:
                                        typeof value === "string"
                                          ? value.split(",")
                                          : value,
                                    }));
                                  }}
                                  input={
                                    <OutlinedInput
                                      sx={{
                                        height: 38,
                                        "& .MuiOutlinedInput-notchedOutline": {
                                          borderColor: "#dee2e6",
                                        },
                                        "&.Mui-focused .MuiOutlinedInput-notchedOutline":
                                          {
                                            borderColor: "#2fb972",
                                          },
                                        "& .MuiSelect-select": {
                                          padding: "6px 10px",
                                        },
                                      }}
                                    />
                                  }
                                  renderValue={(selected) =>
                                    selected?.length === 0 ? (
                                      <em>Select Technician</em>
                                    ) : (
                                      techName
                                        .filter((tech) =>
                                          selected.includes(tech._id)
                                        )
                                        .map(
                                          (tech) =>
                                            `${
                                              tech.firstName ||
                                              tech.organizationDetails
                                                ?.organizationName
                                            } ${tech.lastName || ""}`
                                        )
                                        .join(", ")
                                    )
                                  }
                                  MenuProps={{
                                    PaperProps: {
                                      style: {
                                        maxHeight: 40 * 4.5 + 8,
                                        width: 250,
                                      },
                                    },
                                  }}
                                >
                                  <MenuItem disabled value="">
                                    <em>Select Technician</em>
                                  </MenuItem>

                                  {techName.map((tech) => (
                                    <MenuItem key={tech._id} value={tech._id}>
                                      {tech.firstName ||
                                        tech.organizationDetails
                                          ?.organizationName}{" "}
                                      {tech.lastName}
                                    </MenuItem>
                                  ))}
                                </Select>
                              </FormControl>

                              <span
                                className="check-icon-btn"
                                onClick={() =>
                                  handleAssignTechnician(index, order.orderId)
                                }
                              >
                                <FiCheckCircle size={18} color="#2fb972" />
                              </span>

                              <span
                                className="cancel-icon-btn"
                                onClick={() =>
                                  setAssignTechAction((prev) => ({
                                    ...prev,
                                    [index]: false,
                                  }))
                                }
                              >
                                <TbCancel size={18} color="red" />
                              </span>
                            </div>
                          ) : (
                            <div
                              className="assign-tech-btn"
                              onClick={() => handleChangeTechAction(index)}
                            >
                              Assign Technician
                            </div>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })
              ) : (
                <TableRow>
                  <TableCell colSpan={6}>No Orders Found</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </div>

      <Dialog
        open={openProcessDetailModal}
        onClose={() => setOpenProcessDetailModal(false)}
        sx={{
          "& .MuiDialog-paper": {
            width: "400px",
            maxWidth: "100vw",
            borderRadius: "20px",
          },
        }}
      >
        <DialogContent>
          <p className="fw-bold text-success">
            {processDes?.processName || "N/A"}
          </p>
          <p className="fw-bold">Description</p>
          <p>{processDes?.processDescription || "N/A"}</p>
          <p className="fw-bold">Sub Process</p>
          {processDes?.subProcesses?.map((sub, index) => (
            <ul key={index}>
              <li>
                <div className="d-flex flex-column">
                  <span>{sub.name}</span>
                  <span className="text-muted">
                    {sub.subProcessDescription}
                  </span>
                </div>
              </li>
            </ul>
          ))}
        </DialogContent>

        <DialogActions className="d-md-flex align-items-center justify-content-center m-3">
          <Button
            className="border-0 px-5"
            style={{ background: "#2fb972" }}
            onClick={() => setOpenProcessDetailModal(false)}
          >
            OK
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={openActivityLogModal}
        onClose={() => setOpenActivityLogModal(false)}
        sx={{
          "& .MuiDialog-paper": { width: "400px", maxWidth: "100vw" },
        }}
      >
        <DialogContent>
          <Box sx={{ maxWidth: 400 }}>
            <Stepper
              activeStep={activeStep}
              orientation="vertical"
              sx={{
                "& .MuiStepConnector-line": {
                  minHeight: "35px",
                  borderColor: "#ccc",
                },
                "& .MuiStepIcon-root": {
                  width: "32px",
                  height: "32px",
                },
                "& .MuiStepIcon-text": {
                  fontSize: "12px !important",
                },
                "& .MuiStepContent-root": {
                  marginLeft: "12px",
                  paddingLeft: "16px",
                },
              }}
            >
              {steps.map((step) => (
                <Step key={step.label} expanded>
                  <StepLabel>
                    <Typography sx={{ fontWeight: 600 }}>
                      {step.label}
                    </Typography>
                  </StepLabel>
                  <StepContent>
                    <Typography sx={{ color: "#555" }}>
                      {step.description}
                    </Typography>
                  </StepContent>
                </Step>
              ))}
            </Stepper>
          </Box>
        </DialogContent>

        <DialogActions className="d-md-flex align-items-center justify-content-center m-3">
          <Button
            className="border-0 px-5"
            style={{ background: "#2fb972" }}
            onClick={() => setOpenActivityLogModal(false)}
          >
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Orders;
