import React, { useRef, useState } from "react";
import Drawer from "@mui/material/Drawer";
import { MdOutlineCancel } from "react-icons/md";
import { InputGroup, Form } from "react-bootstrap";
import OutlinedInput from "@mui/material/OutlinedInput";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import {
  bulkUpload,
  createService,
  getAllServices,
} from "../../../../redux/Admin/ServiceSlice";
import Loader from "../../../../components/Loader";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import Button from "@mui/material/Button";
import { IoCloudUploadOutline } from "react-icons/io5";
import { IoMdAddCircleOutline, IoMdCloseCircleOutline } from "react-icons/io";

const CreateNewServiceList = ({
  openDrawer,
  setOpenDrawer,
  setServiceData,
  isBulkUploadClicked,
  value,
}) => {
  const closeDrawer = () => setOpenDrawer(false);
  const processNames = ["Site Inspection", "Labour", "Material", "Transport"];
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const photoInputRef = useRef(null);
  const [photoFiles, setPhotoFiles] = useState([]);
  const handlePhotoDragOver = (e) => e.preventDefault();
  const handlePhotoBrowseClick = () => photoInputRef.current.click();

  const [formData, setFormData] = useState({
    orderType: "",
    serviceType: value === "1" ? "general" : "fixed",
    serviceScope: "",
    category: "",
    serviceName: "",
    servicePrice: "",
    steps: value === "1" ? [{ title: "", details: "" }] : [],
    process: [],
    imageUrl: "",
    sellingPrice: "",
    priceType: "",
    companyRevenuePercent: "",
    costToCompany: "",
    providerType: "",
    workingTime: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const payload = {
        ...formData,
        workingTime: `${formData.workingTime} ${formData.timeUnit || "mins"}`,
      };

      const response = await dispatch(createService(payload)).unwrap();
      setLoading(false);
      setOpenDrawer(false);
      toast.success(response.message);
      dispatch(getAllServices()).then((response) =>
        setServiceData(response.payload)
      );
      setFormData({
        orderType: "",
        serviceScope: "",
        category: "",
        serviceName: "",
        servicePrice: "",
        steps: [{ title: "", details: "" }],
        process: [],
        imageUrl: "",
        sellingPrice: "",
        priceType: "",
        companyRevenuePercent: "",
        costToCompany: "",
        providerType: "",
        workingTime: "",
      });
    } catch (error) {
      toast.error(error);
      setLoading(false);
    }
  };

  const handleBulkUploadSubmit = async (e) => {
    e.preventDefault();

    if (photoFiles.length === 0) {
      toast.error("Please select a file to upload.");
      return;
    }

    try {
      setLoading(true);
      const formDataToSend = new FormData();

      formDataToSend.append("file", photoFiles[0]);
      const response = await dispatch(bulkUpload(formDataToSend)).unwrap();
      setLoading(false);
      setOpenDrawer(false);
      toast.success(response.message);
      dispatch(getAllServices()).then((response) =>
        setServiceData(response.payload)
      );
      setPhotoFiles([]);
    } catch (error) {
      toast.error(error);
      setLoading(false);
    }
  };

  const handlePhotoFileChange = (e) => {
    const selected = Array.from(e.target.files);
    setPhotoFiles(selected);
  };

  const handlePhotoDrop = (e) => {
    e.preventDefault();
    const dropped = Array.from(e.dataTransfer.files);
    setPhotoFiles(dropped);
  };

  const handleStepChange = (index, field, value) => {
    const updatedSteps = [...formData.steps];
    updatedSteps[index][field] = value;
    setFormData({ ...formData, steps: updatedSteps });
  };

  const handleAddStep = () => {
    setFormData({
      ...formData,
      steps: [...formData.steps, { title: "", details: "" }],
    });
  };

  const handleRemoveStep = (index) => {
    const updatedSteps = formData.steps.filter((_, i) => i !== index);
    setFormData({ ...formData, steps: updatedSteps });
  };

  return (
    <div>
      {loading && <Loader isLoading={loading} />}
      <Drawer
        anchor="bottom"
        open={openDrawer}
        onClose={closeDrawer}
        PaperProps={{
          sx: {
            borderTopLeftRadius: "10px",
            borderTopRightRadius: "10px",
            width: "100%",
            maxWidth: { xl: 900, lg: 800, md: "90%", sm: "95%", xs: "100%" },
            height: "100%",
            maxHeight: "70vh",
            mx: "auto",
            overflowY: "auto",
            p: 0,
          },
        }}
      >
        {!isBulkUploadClicked ? (
          <div>
            <div className="new-booking-dialog-header position-sticky top-0 px-3 py-3 d-flex justify-content-between align-items-center">
              <p className="m-0 fw-bold text-white">
                Add New {value === "1" ? "General" : "Fixed"} Item
              </p>
              <MdOutlineCancel
                color="white"
                cursor="pointer"
                size={25}
                onClick={closeDrawer}
              />
            </div>
            {value === "1" ? (
              <div className="px-4 py-4">
                <Form>
                  <div className="row gy-4">
                    <div className="col-12 col-md-6">
                      <Form.Group>
                        <Form.Label>Order Type</Form.Label>
                        <Form.Select
                          name="orderType"
                          value={formData.orderType}
                          onChange={handleChange}
                        >
                          <option>Select Order Type</option>
                          <option>Repair/Maintenance</option>
                        </Form.Select>
                      </Form.Group>
                    </div>
                    <div className="col-12 col-md-6">
                      <Form.Group>
                        <Form.Label>Image Url</Form.Label>
                        <Form.Control
                          type="text"
                          name="imageUrl"
                          value={formData.imageUrl}
                          onChange={handleChange}
                        />
                      </Form.Group>
                    </div>
                    <div className="col-12 col-md-6">
                      <Form.Group>
                        <Form.Label>Service Scope</Form.Label>
                        <Form.Select
                          name="serviceScope"
                          value={formData.serviceScope}
                          onChange={handleChange}
                        >
                          <option>Select Service Scope</option>
                          <option>Home</option>
                          <option>Industry</option>
                        </Form.Select>
                      </Form.Group>
                    </div>
                    <div className="col-12 col-md-6">
                      <Form.Group>
                        <Form.Label>Category</Form.Label>
                        <Form.Select
                          name="category"
                          value={formData.category}
                          onChange={handleChange}
                        >
                          <option>Select Category</option>
                          <option>Electrical</option>
                          <option>Appliance</option>
                          <option>Solar</option>
                          <option>EB Complaints</option>
                        </Form.Select>
                      </Form.Group>
                    </div>
                    <div className="col-12 col-md-6">
                      <Form.Group>
                        <Form.Label>Service Name</Form.Label>
                        <Form.Control
                          type="text"
                          name="serviceName"
                          value={formData.serviceName}
                          onChange={handleChange}
                        />
                      </Form.Group>
                    </div>
                    <div className="col-12 col-md-6">
                      <Form.Group>
                        <Form.Label>Service Price</Form.Label>
                        <Form.Control
                          type="number"
                          name="servicePrice"
                          value={formData.servicePrice}
                          onChange={handleChange}
                        />
                      </Form.Group>
                    </div>
                    <div className="col-12">
                      <Form.Label className="fw-bold">Steps</Form.Label>

                      {formData.steps.map((step, index) => (
                        <div
                          key={index}
                          className="border rounded p-3 mb-3 position-relative bg-light"
                        >
                          <div className="d-flex justify-content-between align-items-center mb-2">
                            <h6 className="mb-0">Step {index + 1}</h6>
                            {formData.steps.length > 1 && (
                              <IoMdCloseCircleOutline
                                size={22}
                                color="red"
                                cursor="pointer"
                                onClick={() => handleRemoveStep(index)}
                              />
                            )}
                          </div>

                          <Form.Group className="mb-2">
                            <Form.Label>Title</Form.Label>
                            <Form.Control
                              type="text"
                              placeholder="Enter step title"
                              value={step.title}
                              onChange={(e) =>
                                handleStepChange(index, "title", e.target.value)
                              }
                            />
                          </Form.Group>

                          <Form.Group>
                            <Form.Label>Details</Form.Label>
                            <Form.Control
                              as="textarea"
                              rows={2}
                              placeholder="Enter step details"
                              value={step.details}
                              onChange={(e) =>
                                handleStepChange(
                                  index,
                                  "details",
                                  e.target.value
                                )
                              }
                            />
                          </Form.Group>
                        </div>
                      ))}

                      <Button
                        variant="outline-success"
                        className="d-flex align-items-center gap-2"
                        onClick={handleAddStep}
                      >
                        <IoMdAddCircleOutline size={20} />
                        Add Step
                      </Button>
                    </div>
                  </div>
                  <div className="d-flex justify-content-center gap-3 mt-5 flex-wrap">
                    <div
                      className="admin-service-save-btn"
                      onClick={handleSubmit}
                    >
                      Save
                    </div>
                    <div
                      className="admin-service-cancel-btn"
                      onClick={closeDrawer}
                    >
                      Cancel
                    </div>
                  </div>
                </Form>
              </div>
            ) : (
              <div className="px-4 py-4">
                <Form>
                  <div className="row gy-4">
                    <div className="col-12 col-md-6">
                      <Form.Group>
                        <Form.Label>Order Type</Form.Label>
                        <Form.Select
                          name="orderType"
                          value={formData.orderType}
                          onChange={handleChange}
                        >
                          <option>Select Order Type</option>
                          <option>Repair/Maintenance</option>
                        </Form.Select>
                      </Form.Group>
                    </div>
                    <div className="col-12 col-md-6">
                      <Form.Group>
                        <Form.Label>Image Url</Form.Label>
                        <Form.Control
                          type="text"
                          name="imageUrl"
                          value={formData.imageUrl}
                          onChange={handleChange}
                        />
                      </Form.Group>
                    </div>
                    <div className="col-12 col-md-6">
                      <Form.Group>
                        <Form.Label>Service Scope</Form.Label>
                        <Form.Select
                          name="serviceScope"
                          value={formData.serviceScope}
                          onChange={handleChange}
                        >
                          <option>Select Service Scope</option>
                          <option>Home</option>
                          <option>Industry</option>
                        </Form.Select>
                      </Form.Group>
                    </div>
                    <div className="col-12 col-md-6">
                      <Form.Group>
                        <Form.Label>Category</Form.Label>
                        <Form.Select
                          name="category"
                          value={formData.category}
                          onChange={handleChange}
                        >
                          <option>Select Category</option>
                          <option>Electrical</option>
                          <option>Appliance</option>
                          <option>Solar</option>
                          <option>EB Complaints</option>
                        </Form.Select>
                      </Form.Group>
                    </div>
                    <div className="col-12 col-md-6">
                      <Form.Group>
                        <Form.Label>Service Name</Form.Label>
                        <Form.Control
                          type="text"
                          name="serviceName"
                          value={formData.serviceName}
                          onChange={handleChange}
                        />
                      </Form.Group>
                    </div>
                    <div className="col-12 col-md-6">
                      <Form.Group>
                        <Form.Label>Provider Type</Form.Label>
                        <Form.Select
                          name="providerType"
                          value={formData.providerType}
                          onChange={handleChange}
                        >
                          <option>Select Provider Type</option>
                          <option>Internal</option>
                          <option>External</option>
                        </Form.Select>
                      </Form.Group>
                    </div>
                    <div className="col-12 col-md-6">
                      <Form.Group>
                        <Form.Label>Selling Price / Qty</Form.Label>
                        <Form.Control
                          type="number"
                          name="sellingPrice"
                          value={formData.sellingPrice}
                          onChange={handleChange}
                        />
                      </Form.Group>
                    </div>
                    <div className="col-12 col-md-6">
                      <Form.Group>
                        <Form.Label>Company Revenue (%)</Form.Label>
                        <Form.Control
                          type="number"
                          name="companyRevenuePercent"
                          value={formData.companyRevenuePercent}
                          onChange={handleChange}
                        />
                      </Form.Group>
                    </div>
                    <div className="col-12 col-md-6">
                      <Form.Group>
                        <Form.Label>Cost to Company</Form.Label>
                        <Form.Control
                          type="number"
                          name="costToCompany"
                          value={formData.costToCompany}
                          onChange={handleChange}
                        />
                      </Form.Group>
                    </div>
                    <div className="col-12 col-md-6">
                      <Form.Group>
                        <Form.Label>Working Time</Form.Label>
                        <InputGroup>
                          <Form.Control
                            type="number"
                            name="workingTime"
                            value={formData.workingTime}
                            onChange={handleChange}
                            placeholder="Enter time"
                          />
                          <Form.Select
                            name="timeUnit"
                            value={formData.timeUnit || "mins"}
                            onChange={handleChange}
                            style={{
                              maxWidth: "90px",
                              borderTopLeftRadius: 0,
                              borderBottomLeftRadius: 0,
                            }}
                          >
                            <option value="mins">mins</option>
                            <option value="hrs">hrs</option>
                          </Form.Select>
                        </InputGroup>
                      </Form.Group>
                    </div>
                    <div className="col-12 col-md-6">
                      <Form.Label>Process</Form.Label>
                      <FormControl fullWidth>
                        <Select
                          multiple
                          displayEmpty
                          name="process"
                          value={formData.process}
                          onChange={(event) => {
                            const {
                              target: { value },
                            } = event;
                            setFormData((prev) => ({
                              ...prev,
                              process:
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
                            selected.length === 0 ? (
                              <em>Select Process</em>
                            ) : (
                              selected.join(", ")
                            )
                          }
                          MenuProps={{
                            PaperProps: {
                              style: { maxHeight: 40 * 4.5 + 8, width: 250 },
                            },
                          }}
                        >
                          <MenuItem disabled value="">
                            <em>Select Process</em>
                          </MenuItem>
                          {processNames.map((name) => (
                            <MenuItem key={name} value={name}>
                              {name}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </div>
                    <div className="col-12 col-md-6">
                      <Form.Group>
                        <Form.Label>Price Type</Form.Label>
                        <Form.Select
                          name="priceType"
                          value={formData.priceType}
                          onChange={handleChange}
                        >
                          <option>Select Price Type</option>
                          <option>Fixed</option>
                          <option>Variable</option>
                        </Form.Select>
                      </Form.Group>
                    </div>
                  </div>
                  <div className="d-flex justify-content-center gap-3 mt-5 flex-wrap">
                    <div
                      className="admin-service-save-btn"
                      onClick={handleSubmit}
                    >
                      Save
                    </div>
                    <div
                      className="admin-service-cancel-btn"
                      onClick={closeDrawer}
                    >
                      Cancel
                    </div>
                  </div>
                </Form>
              </div>
            )}
          </div>
        ) : (
          <div>
            <div className="new-booking-dialog-header px-3 py-3 d-flex justify-content-between align-items-center">
              <p className="m-0 fw-bold text-white">Add Bulk Item</p>
              <MdOutlineCancel
                color="white"
                cursor="pointer"
                size={25}
                onClick={closeDrawer}
              />
            </div>
            <div className="col-12 p-5">
              <div
                className="upload-card"
                onDrop={handlePhotoDrop}
                onDragOver={handlePhotoDragOver}
              >
                <IoCloudUploadOutline color="#2fb972" size={35} />
                <div>
                  {photoFiles.length > 0 ? (
                    <div className="mt-3">
                      {photoFiles.map((file, idx) => (
                        <p key={idx}>{file.name}</p>
                      ))}
                    </div>
                  ) : (
                    <div>
                      <p className="mt-3 mb-0">Upload Files</p>
                      <p>Drag and Drop or Browse to Upload</p>
                    </div>
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
            </div>
            <div className="d-flex justify-content-center gap-3 mt-5 flex-wrap">
              <div
                className="admin-service-save-btn"
                onClick={handleBulkUploadSubmit}
              >
                Save
              </div>
              <div className="admin-service-cancel-btn" onClick={closeDrawer}>
                Cancel
              </div>
            </div>
          </div>
        )}
      </Drawer>
    </div>
  );
};

export default CreateNewServiceList;
