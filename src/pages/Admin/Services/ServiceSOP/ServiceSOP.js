import { Form, Row, Col, Button, InputGroup } from "react-bootstrap";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { MdModeEdit, MdDelete, MdAdd } from "react-icons/md";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getAllOrders } from "../../../../redux/User/BookingSlice";
import { toast } from "react-toastify";
import ViewServiceSOP from "./ViewServiceSOP";

const ServiceSOP = () => {
  const [openNewSOP, setOpenNewSOP] = useState(false);
  const dispatch = useDispatch();
  const [orderData, setOrderData] = useState([]);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [orderId, setOrderId] = useState();

  useEffect(() => {
    dispatch(getAllOrders())
      .unwrap()
      .then((res) => setOrderData(res?.data || []))
      .catch((error) => toast.error(error));
  }, [dispatch]);

  const validOrders = orderData.filter((item) => item?.processes?.length > 0);

  const finalFilteredData = validOrders.filter((order) => {
    const searchText = search.toLowerCase();

    const matchesSearch =
      order.orderId?.toLowerCase().includes(searchText) ||
      order.serviceType?.toLowerCase().includes(searchText) ||
      order.serviceName?.toLowerCase().includes(searchText) ||
      order.issueDescription?.toLowerCase().includes(searchText) ||
      order.issueLocation?.toLowerCase().includes(searchText);

    const matchesCategory = categoryFilter
      ? order.category === categoryFilter
      : true;
    const matchesStatus = statusFilter
      ? order.orderStatus === statusFilter
      : true;

    return matchesSearch && matchesCategory && matchesStatus;
  });

  const handleOpenSOPDetail = (order) => {
    setOrderId(order.orderId);
    setOpenNewSOP(true);
  }

  return (
    <div>
      {openNewSOP ? (
        <ViewServiceSOP backToList={() => setOpenNewSOP(false)} orderId={orderId}/>
      ) : (
        <div className="admin-pl-overall-container">
          <h1>Service SOP Management</h1>
          <p className="text-muted fw-bold">
            Service SOP: {validOrders.length}
          </p>

          <div className="admin-pl-search-section">
            <Form.Group className="col-md-6">
              <InputGroup>
                <Form.Control
                  type="text"
                  placeholder="Search by Service name, Order Id..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </InputGroup>
            </Form.Group>

            <div className="d-flex align-items-center gap-2">
              <Form.Group className="col-md-2">
              <InputGroup>
                <Form.Select
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                >
                  <option value="">Category</option>
                  <option>Electrical</option>
                  <option>Appliance</option>
                  <option>Eb-Complaints</option>
                </Form.Select>
              </InputGroup>
            </Form.Group>

            <Form.Group className="col-md-2">
              <InputGroup>
                <Form.Select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                >
                  <option value="">Order Status</option>
                  <option>Completed</option>
                  <option>Confirmed</option>
                  <option>Cancelled</option>
                </Form.Select>
              </InputGroup>
            </Form.Group>
            </div>
          </div>

          <div>
            <TableContainer
              sx={{
                borderTopLeftRadius: "8px",
                borderTopRightRadius: "8px",
                maxHeight: "450px",
                overflow: "auto",
              }}
            >
              <Table
                stickyHeader
                sx={{
                  width: "100%",
                  border: "1px solid #DBDBDB",
                  "& thead": { backgroundColor: "#2fb972" },
                  "& thead th": {
                    backgroundColor: "#2fb972",
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
                    <TableCell>Order ID</TableCell>
                    <TableCell>Service Type</TableCell>
                    <TableCell>Service Name</TableCell>
                    <TableCell>Order Type</TableCell>
                    <TableCell>Category</TableCell>
                    <TableCell>Issue Description</TableCell>
                    <TableCell>Service Required Date</TableCell>
                    <TableCell>Location</TableCell>
                    <TableCell>Order Status</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {finalFilteredData.length > 0 ? (
                    finalFilteredData.map((order, index) => (
                      <TableRow key={index}>
                        <TableCell>
                          <div className="id-link" onClick={()=> handleOpenSOPDetail(order)}>
                            {order.orderId || "N/A"}
                          </div>
                        </TableCell>
                        <TableCell>
                          {order.serviceType
                            ? order.serviceType.charAt(0).toUpperCase() +
                              order.serviceType.slice(1)
                            : "N/A"}
                        </TableCell>
                        <TableCell>{order.serviceName || "N/A"}</TableCell>
                        <TableCell>{order.orderType || "N/A"}</TableCell>
                        <TableCell>{order.category || "N/A"}</TableCell>
                        <TableCell>{order.issueDescription || "N/A"}</TableCell>
                        <TableCell>
                          {order.serviceRequiredDate
                            ? new Date(
                                order.serviceRequiredDate
                              ).toLocaleDateString()
                            : "N/A"}
                        </TableCell>
                        <TableCell>{order.issueLocation || "N/A"}</TableCell>
                        <TableCell>{order.orderStatus || "N/A"}</TableCell>
                        <TableCell>
                          <div className="d-flex align-items-center justify-content-center gap-2">
                            <MdModeEdit
                              size={20}
                              color="#2fb972"
                              style={{ cursor: "pointer" }}
                            />
                            <MdDelete
                              size={20}
                              color="red"
                              style={{ cursor: "pointer" }}
                            />
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={10}>No Orders Found</TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        </div>
      )}
    </div>
  );
};

export default ServiceSOP;
