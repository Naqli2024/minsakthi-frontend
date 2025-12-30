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
import GenerateBOM from "./GenerateBOM";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import CancelBooking from "../../../../assets/images/cancel-booking.svg";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { deleteBOM } from "../../../../redux/Admin/ServiceSlice";
import { MdOutlineCancel } from "react-icons/md";

const ServiceBOM = () => {
  const [openGenerateBOM, setOpenGenerateBOM] = useState(false);
  const [openDeleteBOMModal, setOpenDeleteBOMModal] = useState(false);
  const dispatch = useDispatch();
  const [orderData, setTableOrderData] = useState([]);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [orderId, setOrderId] = useState();
  const [viewBOM, setViewBOM] = useState(false);
  const [isEditBOM, setIsEditBOM] = useState(false);

  useEffect(() => {
    dispatch(getAllOrders())
      .unwrap()
      .then((res) => setTableOrderData(res?.data || []))
      .catch((error) => toast.error(error));
  }, [dispatch]);

  const validOrders = orderData.filter(
    (item) => item?.processes?.length > 0 && item.serviceType === "custom"
  );

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

  const handleOpenBOMDetail = (order) => {
    setOrderId(order.orderId);
    setOpenGenerateBOM(true);
    setViewBOM(true);
  };

  const handleCreateBOMDetail = (order) => {
    setOrderId(order.orderId);
    setOpenGenerateBOM(true);
    setViewBOM(false);
    setIsEditBOM(false);
  };

  const handleEditBOM = (order) => {
    setOrderId(order.orderId);
    setIsEditBOM(true);
    setOpenGenerateBOM(true);
    setViewBOM(false);
  };

  const handleDeleteBOM = () => {
    try {
      dispatch(deleteBOM(orderId))
        .unwrap()
        .then((response) => {
          toast.success(response.message);
          setOpenDeleteBOMModal(false);
          dispatch(getAllOrders())
            .unwrap()
            .then((res) => setTableOrderData(res?.data || []));
        });
    } catch (error) {
      toast.error(error);
    }
  };

  return (
    <div>
      {openGenerateBOM ? (
        <GenerateBOM
          backToList={() => setOpenGenerateBOM(false)}
          orderId={orderId}
          viewBOM={viewBOM}
          setTableOrderData={setTableOrderData}
          isEditBOM={isEditBOM}
        />
      ) : (
        <div className="admin-pl-overall-container">
          <h1>Service BOM Management</h1>
          <p className="text-muted fw-bold">
            Service BOM: {validOrders.length}
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
                    <TableCell>Location</TableCell>
                    <TableCell>Order Status</TableCell>
                    <TableCell>BOM</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {finalFilteredData.length > 0 ? (
                    finalFilteredData.map((order, index) => (
                      <TableRow key={index}>
                        <TableCell>
                          <div
                            className="id-link"
                            onClick={
                              order.billOfMaterial 
                              ? () => handleOpenBOMDetail(order)
                              : () => toast.info("Generate BOM to view BOM")
                            }
                          >
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
                        <TableCell>{order.issueLocation || "N/A"}</TableCell>
                        <TableCell>{order.orderStatus || "N/A"}</TableCell>
                        <TableCell>
                          {order.billOfMaterial?.totalPayable ? (
                            <div className="d-flex justify-content-center">
                              <div className="admin-generate-bom-orderid-tag">
                                ₹{order?.billOfMaterial?.totalPayable || 0}
                              </div>
                            </div>
                          ) : (
                            <div
                              className="generate-bom-btn"
                              onClick={() => handleCreateBOMDetail(order)}
                            >
                              Generate BOM
                              <MdKeyboardDoubleArrowRight size={15} />
                            </div>
                          )}
                        </TableCell>
                        <TableCell>
                          <div className="d-flex align-items-center justify-content-center gap-2">
                            <MdModeEdit
                              size={20}
                              color={
                                !order.billOfMaterial ? "#cccccc" : "#2fb972"
                              }
                              style={{
                                cursor: !order.billOfMaterial
                                  ? "not-allowed"
                                  : "pointer",
                              }}
                              onClick={
                                order.billOfMaterial &&
                                (() => handleEditBOM(order))
                              }
                            />
                            <MdDelete
                              size={20}
                              color={order.billOfMaterial ? "red" : "#cccccc"}
                              style={{
                                cursor: order.billOfMaterial
                                  ? "pointer"
                                  : "not-allowed",
                              }}
                              onClick={
                                order.billOfMaterial &&
                                (() => {
                                  setOrderId(order.orderId);
                                  setOpenDeleteBOMModal(true);
                                })
                              }
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

      <Dialog
        open={openDeleteBOMModal}
        onClose={() => setOpenDeleteBOMModal(false)}
        sx={{
          "& .MuiDialog-paper": { width: "600px", maxWidth: "100vw" },
        }}
      >
        <DialogTitle sx={{ padding: 0 }}>
          <div className="d-flex justify-content-end p-3">
            <MdOutlineCancel
              cursor="pointer"
              size={25}
              onClick={() => setOpenDeleteBOMModal(false)}
            />
          </div>
        </DialogTitle>
        <DialogContent>
          <div className="congrats-logo">
            <img src={CancelBooking} alt="congrats" />
          </div>
          <div className="new-user-text">
            {orderId}
          </div>
          <div className="d-flex justify-content-center m-3 fw-bold">
            Are you sure you want to delete this BOM?
          </div>
        </DialogContent>
        <DialogActions className="d-md-flex align-items-center justify-content-center m-3">
          <Button
            className="address-modal-btn text-white px-5 text-capitalize"
            onClick={() => setOpenDeleteBOMModal(false)}
          >
            No, Continue
          </Button>
          <Button
            className="bg-danger border-0 text-white px-5 text-capitalize"
            onClick={handleDeleteBOM}
          >
            Yes, Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ServiceBOM;
