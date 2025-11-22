import { FormGroup } from "react-bootstrap";
import { InputGroup, Form } from "react-bootstrap";
import { IoSearchOutline } from "react-icons/io5";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { MdModeEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { useEffect, useState } from "react";
import {
  deleteService,
  getAllServices,
} from "../../../../redux/Admin/ServiceSlice";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { MdOutlineCancel } from "react-icons/md";
import Button from "@mui/material/Button";
import { PiWarningCircleLight } from "react-icons/pi";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";

const GeneralServiceList = ({ serviceData, setServiceData }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedProvider, setSelectedProvider] = useState("All");
  const [filteredData, setFilteredData] = useState([]);
  const [serviceId, setServiceId] = useState(null);
  const dispatch = useDispatch();
  const [openConfirmDeleteDialog, setOpenConfirmDeleteDialog] = useState(false);
  const [openViewStepsDialog, setOpenViewStepsDialog] = useState(false);
  const [selectedService, setSelectedService] = useState(null);

  useEffect(() => {
    let filtered = [...serviceData];

    if (searchTerm.trim() !== "") {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (service) =>
          service.category?.toLowerCase().includes(term) ||
          service.serviceName?.toLowerCase().includes(term)
      );
    }

    if (selectedCategory !== "All") {
      filtered = filtered.filter(
        (service) => service.category === selectedCategory
      );
    }

    if (selectedProvider !== "All") {
      filtered = filtered.filter(
        (service) => service.providerType === selectedProvider
      );
    }

    setFilteredData(filtered);
  }, [searchTerm, selectedCategory, selectedProvider, serviceData]);

  const handleDelete = async (serviceId) => {
    try {
      const response = await dispatch(deleteService(serviceId)).unwrap();
      toast.success(response.message);
      setServiceId(null);
      setOpenConfirmDeleteDialog(false);
      dispatch(getAllServices()).then((response) => {
        setServiceData(response.payload || []);
      });
    } catch (error) {
      toast.error(error);
    }
  };

  const handleViewStep = (service) => {
    setSelectedService(service);
    setOpenViewStepsDialog(true);
  };
  return (
    <div className="admin-booking-service-fixed-height">
      <p>
        Service List:{" "}
        {serviceData?.filter((order) => order.serviceType === "general")
          .length || 0}
      </p>
      <div className="admin-customer-search-filter">
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
              placeholder="Search by Category, Service name..."
              style={{ borderLeft: "none", height: "40px", boxShadow: "none" }}
              onFocus={(e) => {
                e.target.style.border = "1px solid #DBDBDB";
                e.target.style.borderLeft = "none";
              }}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </InputGroup>
        </FormGroup>
        <Form.Group className="col-md-2">
          <Form.Select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="custom-textfield"
          >
            <option value="All">All Categories</option>
            <option value="Electrical">Electrical</option>
            <option value="Appliance">Appliance</option>
            <option value="Solar">Solar</option>
            <option value="EB Complaints">EB Complaints</option>
          </Form.Select>
        </Form.Group>
        <Form.Group className="col-md-2">
          <Form.Select
            value={selectedProvider}
            onChange={(e) => setSelectedProvider(e.target.value)}
            className="custom-textfield"
          >
            <option value="All">All Providers</option>
            <option value="Internal">Internal</option>
            <option value="External">External</option>
          </Form.Select>
        </Form.Group>
      </div>
      <div className="admin-customers-table mt-5">
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
                <TableCell>Service ID</TableCell>
                <TableCell>Service Type</TableCell>
                <TableCell>Order Type</TableCell>
                <TableCell>Image</TableCell>
                <TableCell>Service Scope</TableCell>
                <TableCell>Category</TableCell>
                <TableCell>Steps</TableCell>
                <TableCell>Service Name</TableCell>
                <TableCell>Selling Price / Qty</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredData?.filter((order) => order.serviceType === "general")
                .length > 0 ? (
                filteredData
                  ?.filter((order) => order.serviceType === "general")
                  .map((service) => (
                    <TableRow>
                      <TableCell>
                        <div className="id-link">{service.serviceId}</div>
                      </TableCell>
                      <TableCell>
                        {service.serviceType.charAt(0).toUpperCase() +
                          service.serviceType.slice(1) || "N/A"}
                      </TableCell>
                      <TableCell>{service.orderType || "N/A"}</TableCell>
                      <TableCell>
                        <div className="admin-service-image">
                          <img src={service.imageUrl} />
                        </div>
                      </TableCell>
                      <TableCell>{service.serviceScope || "N/A"}</TableCell>
                      <TableCell>{service.category || "N/A"}</TableCell>
                      <TableCell>
                        <div
                          className="admin-service-list-view-btn"
                          onClick={() => handleViewStep(service)}
                        >
                          View
                        </div>
                      </TableCell>
                      <TableCell>{service.serviceName || "N/A"}</TableCell>
                      <TableCell>
                        <div className="d-flex flex-column">
                          <span>&#8377;{service.servicePrice || "N/A"}</span>
                          <span className="text-success">
                            ({service.priceType || "N/A"})
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="d-flex align-items-center justify-content-center gap-2">
                          <MdModeEdit
                            size={20}
                            color="#2fb972"
                            cursor={"Pointer"}
                          />
                          <MdDelete
                            size={20}
                            color="red"
                            cursor={"Pointer"}
                            onClick={() => {
                              setServiceId(service._id);
                              setOpenConfirmDeleteDialog(true);
                            }}
                          />
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
              ) : (
                <TableRow>
                  <TableCell colspan={10}>No Service Found</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </div>

      <Dialog
        open={openConfirmDeleteDialog}
        onClose={() => setOpenConfirmDeleteDialog(false)}
        sx={{
          "& .MuiDialog-paper": { width: "500px", maxWidth: "100vw" },
        }}
      >
        <DialogTitle sx={{ padding: 0 }}>
          <div className="d-flex justify-content-end p-3">
            <MdOutlineCancel
              color="#3F3F3F"
              cursor="pointer"
              size={25}
              onClick={() => setOpenConfirmDeleteDialog(false)}
            />
          </div>
        </DialogTitle>
        <DialogContent>
          <div className="text-center">
            <PiWarningCircleLight color="red" size={80} />
            <p className="mt-3 mb-0">
              Are you sure you want to delete this Services?
            </p>
          </div>
        </DialogContent>
        <DialogActions className="d-md-flex align-items-center justify-content-center m-3">
          <Button
            className="address-modal-btn text-white px-5 text-capitalize"
            onClick={() => setOpenConfirmDeleteDialog(false)}
          >
            No, Continue
          </Button>
          <Button
            className="bg-danger border-0 text-white px-5 text-capitalize"
            onClick={() => handleDelete(serviceId)}
          >
            Yes, Delete
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={openViewStepsDialog}
        onClose={() => setOpenViewStepsDialog(false)}
        sx={{
          "& .MuiDialog-paper": { width: "500px", maxWidth: "100vw" },
        }}
      >
        <DialogTitle sx={{ padding: 0 }}>
          <div className="d-flex justify-content-end p-3">
            <MdOutlineCancel
              color="#3F3F3F"
              cursor="pointer"
              size={25}
              onClick={() => setOpenViewStepsDialog(false)}
            />
          </div>
        </DialogTitle>
        <DialogContent>
          <div>
            {Array.isArray(selectedService?.steps) &&
            selectedService.steps?.length > 0 ? (
              selectedService.steps?.map((step, index) => (
                <ul key={index}>
                  <li className="fw-bold">{step.title}</li>
                  <li className="list-unstyled">{step.details}</li>
                </ul>
              ))
            ) : (
              <p>No steps available</p>
            )}
          </div>
        </DialogContent>
        <DialogActions className="d-md-flex align-items-center justify-content-center m-3">
          <Button
            className="address-modal-btn text-white px-5 text-capitalize"
            onClick={() => setOpenViewStepsDialog(false)}
          >
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default GeneralServiceList;
