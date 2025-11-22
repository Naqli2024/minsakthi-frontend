import React, { useEffect, useRef, useState } from "react";
import { Form, Row, Col, Button, InputGroup } from "react-bootstrap";
import Camera from "../../../assets/images/camera.svg";
import { Dropdown } from "react-bootstrap";
import { MdDelete } from "react-icons/md";
import { MdOutlineCancel } from "react-icons/md";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { getAllServices } from "../../../redux/Admin/ServiceSlice";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import PreviewConfirmBookingModal from "./PreviewConfirmBookingModal";
import BookingConfirmed from "../../../assets/images/booking-confirmed.svg";
import { ReactMediaRecorder } from "react-media-recorder";
import { MdOutlineMic } from "react-icons/md";
import { IoStop } from "react-icons/io5";
import { LuRefreshCw } from "react-icons/lu";
import Cookies from "js-cookie";
import { getUserById } from "../../../redux/User/UserSlice";
import { createOrder } from "../../../redux/User/BookingSlice";
import { useNavigate } from "react-router-dom";
import Loader from "../../../components/Loader";

const CustomizedBookingServices = ({ isHome }) => {
  const photoInputRef = useRef(null);
  const [photoFiles, setPhotoFiles] = useState([]);
  const [voiceFiles, setVoiceFiles] = useState([]);
  const [recorderKey, setRecorderKey] = useState(0);
  const voiceInputRef = useRef(null);
  const [openNewAddressModal, setOpenNewAddressModal] = useState(false);
  const handlePhotoDragOver = (e) => e.preventDefault();
  const handlePhotoBrowseClick = () => photoInputRef.current.click();
  const [selected, setSelected] = useState("Home");
  const [serviceData, setServiceData] = useState([]);
  const [addresses, setAddresses] = useState([]);
  const [recordedBlob, setRecordedBlob] = useState(null);
  const [loading, setLoading] = useState(false);
  const [bookingResponseData, setBookingResponseData] = useState();
  const navigateTo = useNavigate();
  const [openPreviewOrderDialog, setOpenPreviewOrderDialog] = useState(false);
  const [openBookingConfirmedModal, setOpenBookingConfirmedModal] =
    useState(false);
  const dispatch = useDispatch();
  const userId = Cookies.get("userId");

  const handlePhotoFileChange = (e) => {
    const selected = Array.from(e.target.files);
    setPhotoFiles(selected);
  };

  const handlePhotoDrop = (e) => {
    e.preventDefault();
    const dropped = Array.from(e.dataTransfer.files);
    setPhotoFiles(dropped);
  };

  const handleVoiceDrop = (e) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files);
    setVoiceFiles((prev) => [...prev, ...files]);
  };

  const handleVoiceDragOver = (e) => e.preventDefault();

  const handleVoiceBrowseClick = () => {
    voiceInputRef.current?.click();
  };

  const handleVoiceFileChange = (e) => {
    const files = Array.from(e.target.files);
    setVoiceFiles((prev) => [...prev, ...files]);
  };

  const [formData, setFormData] = useState({
    serviceName: "",
    serviceRequiredDate: "",
    expectedBudget: "",
    issueDescription: "",
    pictureOfTheIssue: "",
    voiceRecordOfTheIssue: "",
    orderType: "",
    serviceType: "",
    serviceScope: "",
    category: "",
    issueLocation: "",
    materialRequired: "no",
    customCategory: "",
    customServiceName: "",
  });

  const [newAddress, setNewAddress] = useState({
    type: "",
    addressLine: "",
    street: "",
    city: "",
    state: "",
    pincode: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    if (!userId) return;

    dispatch(getUserById(userId))
      .unwrap()
      .then((response) => {
        const data = response.data;
        setFormData((prev) => ({
          ...prev,
          name: data.fullName,
          emailAddress: data.emailAddress,
          phoneNumber: data.phoneNumber,
        }));

        const userAddresses =
          typeof data.address === "string"
            ? [{ type: "Home", address: data.address }]
            : [];

        setAddresses(userAddresses);

        if (userAddresses.length > 0) {
          setSelected(userAddresses[0].type);
        }

        if (userAddresses.length > 0) {
          setSelected(userAddresses[0]?.type || "Home");
        }
      })
      .catch((error) => toast.error(error));
  }, [dispatch, userId]);

  useEffect(() => {
    dispatch(getAllServices())
      .then((response) => setServiceData(response.payload))
      .catch((error) => toast.error(error));
  }, [dispatch]);

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const formDataToSend = new FormData();

      formDataToSend.append(
        "serviceName",
        formData.serviceName === "Others"
          ? formData.customServiceName
          : formData.serviceName
      );
      formDataToSend.append(
        "serviceRequiredDate",
        formData.serviceRequiredDate || new Date().toISOString().split("T")[0]
      );
      formDataToSend.append("expectedBudget", formData.expectedBudget);
      formDataToSend.append("issueDescription", formData.issueDescription);
      formDataToSend.append("orderType", "Repair/Maintenance");
      formDataToSend.append("serviceType", "custom");
      formDataToSend.append("serviceScope", isHome ? "Home" : "Industry");
      formDataToSend.append(
        "category",
        formData.category === "Others"
          ? formData.customCategory
          : formData.category
      );
      formDataToSend.append(
        "issueLocation",
        formData.issueLocation ||
          addresses.find((a) => a.type === selected)?.address
      );
      formDataToSend.append("materialRequired", formData.materialRequired);

      if (photoFiles.length > 0) {
        formDataToSend.append("pictureOfTheIssue", photoFiles[0]);
      }

      if (voiceFiles.length > 0) {
        formDataToSend.append("voiceRecordOfTheIssue", voiceFiles[0]);
      } else if (recordedBlob) {
        const voiceFile = new File([recordedBlob], "recorded_audio.mp3", {
          type: "audio/mp3",
        });
        formDataToSend.append("voiceRecordOfTheIssue", voiceFile);
      }

      const requiredFields = [
        "serviceName",
        "category",
        "serviceRequiredDate",
        "issueLocation",
      ];
      for (const field of requiredFields) {
        if (!formDataToSend.get(field)) {
          toast.error(`Please fill the required field: ${field}`);
          return;
        }
      }
      const response = await dispatch(createOrder(formDataToSend)).unwrap();
      if (response.success) {
        setBookingResponseData(response.data);
        setLoading(false);
        toast.success(response.message);
        setOpenBookingConfirmedModal(true);
        setPhotoFiles([]);
        setVoiceFiles([]);
      } else {
        toast.error(response.message);
        setLoading(false);
      }
    } catch (error) {
      toast.error(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (openBookingConfirmedModal) {
      const timer = setTimeout(() => {
        setOpenBookingConfirmedModal(false);
        navigateTo("/user/orders");
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, [openBookingConfirmedModal, navigateTo]);

  return (
    <div>
      {loading && <Loader isLoading={loading} />}
      <div className="custom-booking-service-container">
        <h5>
          Create Your Custom Service -{" "}
          <span className="text-success">{isHome ? "Home" : "Industry"}</span>
        </h5>

        <Form className="p-2 p-md-4">
          <Row className="g-4 mb-4">
            <Form.Group as={Col} md={4} sm={6} xs={12}>
              <Form.Label className="fw-bold">Select Category</Form.Label>
              <Form.Select
                name="category"
                value={formData.category}
                onChange={handleChange}
              >
                <option value="">Select</option>
                {[...new Set(serviceData.map((s) => s.category))].map(
                  (category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  )
                )}
                <option value="Others">Others</option>
              </Form.Select>

              {formData.category === "Others" && (
                <Form.Control
                  type="text"
                  placeholder="Enter category name"
                  name="customCategory"
                  value={formData.customCategory || ""}
                  onChange={handleChange}
                  className="mt-3"
                />
              )}
            </Form.Group>

            <Form.Group as={Col} md={4} sm={6} xs={12}>
              <Form.Label className="fw-bold">Service Name</Form.Label>
              <Form.Select
                name="serviceName"
                value={formData.serviceName}
                onChange={handleChange}
              >
                <option value="">Select</option>
                {serviceData
                  .filter((s) => s.category === formData.category)
                  .map((srv) => (
                    <option key={srv._id} value={srv.serviceName}>
                      {srv.serviceName}
                    </option>
                  ))}
                <option value="Others">Others</option>
              </Form.Select>

              {formData.serviceName === "Others" && (
                <Form.Control
                  type="text"
                  placeholder="Enter service name"
                  name="customServiceName"
                  value={formData.customServiceName || ""}
                  onChange={handleChange}
                  className="mt-3"
                />
              )}
            </Form.Group>

            <Form.Group as={Col} md={4} sm={12} xs={12}>
              <Form.Label className="fw-bold">Preferred Date</Form.Label>
              <InputGroup>
                <Form.Control
                  type="date"
                  name="serviceRequiredDate"
                  value={formData.serviceRequiredDate}
                  onChange={handleChange}
                />
              </InputGroup>
            </Form.Group>
          </Row>
          <Row className="g-4 mb-4">
            <Form.Group as={Col} md={4} sm={6} xs={12}>
              <Form.Label className="fw-bold">Need Material From Us</Form.Label>
              <div className="d-flex align-items-center flex-wrap gap-4">
                <Form.Check
                  type="radio"
                  name="materialRequired"
                  label="Yes"
                  value="yes"
                  checked={formData.materialRequired === "yes"}
                  onChange={handleChange}
                />
                <Form.Check
                  type="radio"
                  name="materialRequired"
                  label="No"
                  value="no"
                  checked={formData.materialRequired === "no"}
                  onChange={handleChange}
                />
              </div>
            </Form.Group>

            <Form.Group as={Col} md={4} sm={6} xs={12}>
              <Form.Label className="fw-bold">Add Expected Budget</Form.Label>
              <InputGroup>
                <Form.Control
                  type="number"
                  name="expectedBudget"
                  value={formData.expectedBudget}
                  onChange={handleChange}
                  placeholder="Enter amount"
                />
              </InputGroup>
            </Form.Group>
          </Row>
          <h5 className="fw-semibold mb-3 mt-3">Contact Information</h5>
          <Row className="g-4 mb-4">
            <Form.Group as={Col} md={4} sm={6} xs={12}>
              <Form.Label className="fw-bold">Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                readOnly
              />
            </Form.Group>

            <Form.Group as={Col} md={4} sm={6} xs={12}>
              <Form.Label className="fw-bold">Email Address</Form.Label>
              <Form.Control
                type="text"
                name="emailAddress"
                value={formData.emailAddress}
                onChange={handleChange}
                readOnly
              />
            </Form.Group>

            <Form.Group as={Col} md={4} sm={12} xs={12}>
              <Form.Label className="fw-bold">Phone Number</Form.Label>
              <Form.Control
                type="text"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                readOnly
              />
            </Form.Group>
            <Col md={12} xs={12}>
              <div className="fw-semibold mt-3 mb-2">Location</div>
              <Dropdown className="booking-address-dropdown w-100">
                <Dropdown.Toggle
                  variant="white"
                  className="w-100 text-start dropdown-toggle-custom d-flex justify-content-between align-items-center"
                  style={{ padding: "12px 16px" }}
                >
                  <div className="dropdown-text">
                    <small className="text-wrap">
                      {addresses.find((a) => a.type === selected)?.address ||
                        "No address"}
                    </small>
                  </div>
                </Dropdown.Toggle>

                <Dropdown.Menu className="w-100 dropdown-menu-custom">
                  {addresses.map((item, index) => (
                    <Dropdown.Item
                      key={index}
                      onClick={() => setSelected(item.type)}
                      className="py-2 d-flex align-items-center justify-content-between flex-wrap"
                    >
                      <small style={{ whiteSpace: "pre-line" }}>
                        {item.address}
                      </small>
                      <MdDelete
                        color="red"
                        size={20}
                        onClick={(e) => {
                          e.stopPropagation();
                          setAddresses(addresses.filter((_, i) => i !== index));
                        }}
                      />
                    </Dropdown.Item>
                  ))}
                  <Dropdown.Divider />
                  <Dropdown.Item
                    className="text-success"
                    onClick={() => setOpenNewAddressModal(true)}
                  >
                    + Add new address
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Col>
          </Row>
          <Row className="g-4 mb-4">
            <Form.Group as={Col} md={4} sm={12} xs={12}>
              <Form.Label className="fw-bold">
                Describe the problem or requirement
              </Form.Label>
              <Form.Control
                as="textarea"
                rows={6}
                name="issueDescription"
                value={formData.issueDescription}
                onChange={handleChange}
                placeholder="Please provide as much detail as possible..."
              />
            </Form.Group>

            {/* PHOTO UPLOAD */}
            <Col md={4} sm={6} xs={12}>
              <Form.Label className="fw-bold">Upload Photos</Form.Label>
              <div
                className="upload-card p-3 text-center"
                onDrop={handlePhotoDrop}
                onDragOver={handlePhotoDragOver}
              >
                <img src={Camera} alt="camera" width={25} />
                <div className="mt-3">
                  {photoFiles.length > 0 ? (
                    photoFiles.map((file, idx) => <p key={idx}>{file.name}</p>)
                  ) : (
                    <p className="text-muted small">
                      Drag and Drop or Browse to Upload
                    </p>
                  )}
                </div>
                <div
                  className="browse-file-btn"
                  onClick={handlePhotoBrowseClick}
                >
                  Browse files
                </div>
                <input
                  type="file"
                  ref={photoInputRef}
                  style={{ display: "none" }}
                  multiple
                  onChange={handlePhotoFileChange}
                />
              </div>
            </Col>
            <Col md={4} sm={6} xs={12}>
              <Form.Label className="fw-bold">
                Record a Voice Message
              </Form.Label>
              <div
                className="upload-card p-3 text-center"
                onDrop={handleVoiceDrop}
                onDragOver={handleVoiceDragOver}
              >
                <ReactMediaRecorder
                  key={recorderKey}
                  audio
                  onStop={(blobUrl, blob) => setRecordedBlob(blob)}
                  render={({
                    status,
                    startRecording,
                    stopRecording,
                    mediaBlobUrl,
                  }) => (
                    <div className="recorder-section mt-4">
                      <div className="d-flex align-items-center justify-content-center gap-3 flex-wrap">
                        <div
                          className="browse-file-btn"
                          onClick={handleVoiceBrowseClick}
                        >
                          Browse files
                        </div>
                        {mediaBlobUrl && status !== "recording" ? (
                          <div
                            className="mic-avatar"
                            onClick={() => {
                              setRecordedBlob(null);
                              setVoiceFiles([]);
                              setRecorderKey((prev) => prev + 1);
                            }}
                          >
                            <LuRefreshCw color="white" size={20} />
                          </div>
                        ) : status === "recording" ? (
                          <div className="mic-avatar" onClick={stopRecording}>
                            <IoStop color="white" size={20} />
                          </div>
                        ) : (
                          <div className="mic-avatar" onClick={startRecording}>
                            <MdOutlineMic color="white" size={20} />
                          </div>
                        )}
                      </div>

                      {mediaBlobUrl && (
                        <div className="recorded-preview mt-3">
                          <audio src={mediaBlobUrl} controls />
                        </div>
                      )}
                    </div>
                  )}
                />

                {!recordedBlob && (
                  <div className="mt-3">
                    {voiceFiles.length > 0 ? (
                      <div className="uploaded-files">
                        {voiceFiles.map((file, idx) => (
                          <p key={idx}>{file.name}</p>
                        ))}
                      </div>
                    ) : (
                      <p className="text-muted small">
                        Drag and Drop or Browse to Upload
                      </p>
                    )}
                    <input
                      type="file"
                      ref={voiceInputRef}
                      accept="audio/*"
                      multiple
                      style={{ display: "none" }}
                      onChange={handleVoiceFileChange}
                    />
                  </div>
                )}
              </div>
            </Col>
          </Row>

          <div className="d-flex justify-content-end">
            <div className="submit-book-req-btn" onClick={handleSubmit}>
              Submit Request
            </div>
          </div>
        </Form>

        <Dialog
          open={openNewAddressModal}
          onClose={() => setOpenNewAddressModal(false)}
          sx={{
            "& .MuiDialog-paper": { width: "700px", maxWidth: "100vw" },
          }}
        >
          <DialogTitle sx={{ padding: 0 }}>
            <div className="new-booking-dialog-header">
              <p className="m-0 fw-bold">Add New Address</p>
              <MdOutlineCancel
                color="white"
                cursor="pointer"
                size={25}
                onClick={() => setOpenNewAddressModal(false)}
              />
            </div>
          </DialogTitle>
          <DialogContent>
            <div className="row g-4 mt-4">
              <Form.Group className="col-md-6 col-12">
                <Form.Label>Address</Form.Label>
                <InputGroup>
                  <Form.Control
                    className="form-control"
                    type="text"
                    value={newAddress.addressLine}
                    onChange={(e) =>
                      setNewAddress({
                        ...newAddress,
                        addressLine: e.target.value,
                      })
                    }
                  />
                </InputGroup>
              </Form.Group>
              <Form.Group className="col-md-6 col-12">
                <Form.Label>City</Form.Label>
                <InputGroup>
                  <Form.Control
                    className="form-control"
                    type="text"
                    value={newAddress.city}
                    onChange={(e) =>
                      setNewAddress({ ...newAddress, city: e.target.value })
                    }
                  />
                </InputGroup>
              </Form.Group>
            </div>

            <div className="row g-4 mt-3">
              <Form.Group className="col-md-6 col-12">
                <Form.Label>State</Form.Label>
                <InputGroup>
                  <Form.Control
                    className="form-control"
                    type="text"
                    value={newAddress.state}
                    onChange={(e) =>
                      setNewAddress({ ...newAddress, state: e.target.value })
                    }
                  />
                </InputGroup>
              </Form.Group>

              <Form.Group className="col-md-6 col-12">
                <Form.Label>Pincode</Form.Label>
                <InputGroup>
                  <Form.Control
                    className="form-control"
                    type="text"
                    value={newAddress.pincode}
                    onChange={(e) =>
                      setNewAddress({ ...newAddress, pincode: e.target.value })
                    }
                  />
                </InputGroup>
              </Form.Group>
            </div>
          </DialogContent>

          <DialogActions className="d-md-flex align-items-center justify-content-center m-3">
            <Button
              className="bg-danger border-0 px-5"
              onClick={() => setOpenNewAddressModal(false)}
            >
              Cancel
            </Button>

            <Button
              className="address-modal-btn px-5"
              onClick={() => {
                if (!newAddress.addressLine) {
                  toast.error("Please fill required fields");
                  return;
                }

                const newEntry = {
                  address: `${newAddress.addressLine}, ${newAddress.city}, ${newAddress.state} - ${newAddress.pincode}`,
                };

                setAddresses((prev) => [...prev, newEntry]);
                setFormData((prev) => ({
                  ...prev,
                  issueLocation: newEntry.address,
                }));
                setOpenNewAddressModal(false);
                toast.success("New address added!");
              }}
            >
              Save
            </Button>
          </DialogActions>
        </Dialog>
        {openPreviewOrderDialog && (
          <PreviewConfirmBookingModal
            openPreviewOrderDialog={openPreviewOrderDialog}
            setOpenPreviewOrderDialog={setOpenPreviewOrderDialog}
          />
        )}

        <Dialog
          open={openBookingConfirmedModal}
          onClose={() => navigateTo("/user/orders")}
          sx={{
            "& .MuiDialog-paper": { width: "700px", maxWidth: "100vw" },
          }}
        >
          <DialogTitle sx={{ padding: 0 }}>
            <div className="d-flex justify-content-end p-3">
              <MdOutlineCancel
                color="#3F3F3F"
                cursor="pointer"
                size={25}
                onClick={() => navigateTo("/user/orders")}
              />
            </div>
          </DialogTitle>
          <DialogContent>
            <div className="booking-confirm-modal">
              <img src={BookingConfirmed} />
              <p className="fw-bold confirm-text">
                Our Team Will Contact you Soon..
              </p>
              <p className="text-muted mb-3">
                Order ID: {bookingResponseData?.orderId || "N/A"}
              </p>
              <div className="sub-divider" />
              <p className="text-muted m-2">
                {bookingResponseData?.issueLocation || "N/A"}
              </p>
            </div>
          </DialogContent>
          <DialogActions className="d-flex justify-content-center m-2">
            <Button
              className="address-modal-btn px-5"
              onClick={() => navigateTo("/user/orders")}
            >
              OK
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  );
};

export default CustomizedBookingServices;
