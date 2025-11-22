import React, { useEffect, useState } from "react";
import { MdOutlineCancel } from "react-icons/md";
import { Button } from "react-bootstrap";
import { InputGroup, Form } from "react-bootstrap";
import { SiTicktick } from "react-icons/si";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { getUserById } from "../../../redux/User/UserSlice";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import { createOrder } from "../../../redux/User/BookingSlice";
import Loader from "../../../components/Loader";

const PreviewConfirmBookingModal = ({
  openPreviewOrderDialog,
  setOpenPreviewOrderDialog,
  onPlaceOrder,
  serviceDetails,
  isHome,
}) => {
  const [openEditAddress, setOpenEditAddress] = useState(false);
  const [userData, setUserData] = useState();
  const dispatch = useDispatch();
  const userId = Cookies.get("userId");
  const [address, setAddress] = useState("");
  const [serviceRequiredDate, setServiceRequiredDate] = useState("");
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    serviceName: serviceDetails.serviceName,
    serviceRequiredDate: "",
    servicePrice:
      serviceDetails.serviceType === "fixed"
        ? serviceDetails.sellingPrice
        : serviceDetails.servicePrice,
    orderType: serviceDetails.orderType,
    serviceType: serviceDetails.serviceType,
    serviceScope: isHome ? "Home" : "Industry",
    category: serviceDetails.category,
    issueLocation: "",
  });

  const handleSaveAddress = () => {
    setOpenEditAddress(false);
  };

  useEffect(() => {
    dispatch(getUserById(userId))
      .unwrap()
      .then((response) => {
        const data = response.data;
        setUserData(response.data);
        setAddress(data.address);
      })
      .catch((error) => {
        toast.error(error);
      });
  }, [dispatch, userId]);

  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      issueLocation: address,
      serviceRequiredDate: serviceRequiredDate,
    }));
  }, [address, serviceRequiredDate]);

  const handleSubmit = async () => {
    try {
      setLoading(true);
      await dispatch(createOrder(formData))
        .unwrap()
        .then((response) => {
          setLoading(false);
          toast(response.message);
          onPlaceOrder?.();
        });
    } catch (error) {
      toast.error(error);
      setLoading(false);
    }
  };

  return (
    <div>
      {loading && <Loader isLoading={loading} />}
      <Dialog
        open={openPreviewOrderDialog}
        onClose={() => setOpenPreviewOrderDialog(false)}
        sx={{
          "& .MuiDialog-paper": {
            width: "500px",
            maxWidth: "100vw",
            borderRadius: "10px",
          },
        }}
      >
        <DialogTitle sx={{ padding: 0 }}>
          <div className="new-booking-dialog-header">
            <p className="m-0 fw-bold">Preview Booking</p>
            <MdOutlineCancel
              color="white"
              cursor="pointer"
              size={25}
              onClick={() => setOpenPreviewOrderDialog(false)}
            />
          </div>
        </DialogTitle>
        <DialogContent>
          <div className="text-center">
            <div className="preview-service-image">
              <img
                src={serviceDetails.imageUrl}
                alt={serviceDetails.serviceName}
                style={{ width: "100px", height: "100px" }}
              />
            </div>

            <p className="mt-3 preview-service-name fw-bold">
              {serviceDetails.serviceName || "N/A"}
            </p>
          </div>
          <div className="mt-4">
            <p>
              <span className="fw-bold">Service Type :</span>{" "}
              {serviceDetails.serviceType.charAt(0).toUpperCase() +
                serviceDetails.serviceType.slice(1) || "N/A"}
            </p>
            <p>
              <span className="fw-bold">Order Type :</span>{" "}
              {serviceDetails.orderType || "N/A"}
            </p>
            <p>
              <span className="fw-bold">Service Name :</span>{" "}
              {serviceDetails.serviceName || "N/A"}
            </p>
            <p>
              <span className="fw-bold">Price :</span> &#8377;
              {serviceDetails.serviceType === "fixed"
                ? serviceDetails.sellingPrice || 0
                : serviceDetails.servicePrice || 0}
            </p>
            <p>
              <span className="fw-bold">Name :</span>{" "}
              {userData?.fullName || "N/A"}
            </p>
            <p>
              <span className="fw-bold">Mobile Number :</span>{" "}
              {userData?.phoneNumber || "N/A"}
            </p>
            <p className="d-flex justify-content-between align-items-center mb-0">
              <p>
                <span className="fw-bold">Address :</span> {address || "N/A"}
              </p>
              {!openEditAddress && (
                <span
                  className="edit-address-text"
                  onClick={() => setOpenEditAddress(true)}
                >
                  Edit
                </span>
              )}
            </p>
            {openEditAddress && (
              <InputGroup>
                <Form.Control
                  className="form-control mb-3"
                  type="text"
                  as="textarea"
                  rows={2}
                  name="address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
                <InputGroup.Text
                  className="mb-3"
                  style={{
                    background: "none",
                    padding: "10px",
                  }}
                >
                  <SiTicktick
                    color="#27ae60"
                    cursor="pointer"
                    onClick={handleSaveAddress}
                  />
                </InputGroup.Text>
              </InputGroup>
            )}
            <p>
              <span className="fw-bold">Service Required Date :</span>{" "}
              <InputGroup>
                <Form.Control
                  className="form-control mt-2"
                  type="date"
                  name="serviceRequiredDate"
                  value={serviceRequiredDate}
                  onChange={(e) => setServiceRequiredDate(e.target.value)}
                />
              </InputGroup>
            </p>
          </div>
        </DialogContent>

        <DialogActions className="d-md-flex align-items-center justify-content-center mx-5">
          <Button
            className="address-modal-btn px-5 mb-3"
            onClick={() => handleSubmit()}
          >
            Place Order
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default PreviewConfirmBookingModal;
