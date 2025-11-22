import { Form, Row, Col, InputGroup, Button } from "react-bootstrap";
import OutlinedInput from "@mui/material/OutlinedInput";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import { FaCirclePlus } from "react-icons/fa6";
import { AiFillMinusCircle } from "react-icons/ai";
import { FiMinusCircle } from "react-icons/fi";

const ProfessionalDetails = ({ formData, setFormData, technicianType }) => {
  const specializations = ["Electrical", "Ac Service"];
  const skills = ["Wiring", "Motor Repair"];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleLicenseChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      licenseDetails: {
        ...prev.licenseDetails,
        [name]: value,
      },
    }));
  };

  const handleCertificationChange = (e, index) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      const updated = [...prev.certificationDetails];
      updated[index][name] = value;
      return { ...prev, certificationDetails: updated };
    });
  };

  const handleRemoveCertification = (index) => {
    setFormData((prev) => {
      const updated = prev.certificationDetails.filter((_, i) => i !== index);
      return { ...prev, certificationDetails: updated };
    });
  };

  const handleTechLicenseChange = (e, index) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      const updatedTechs = [...prev.organizationDetails.technicians];
      updatedTechs[index] = {
        ...updatedTechs[index],
        licenseDetails: {
          ...updatedTechs[index].licenseDetails,
          [name]: value,
        },
      };
      return {
        ...prev,
        organizationDetails: {
          ...prev.organizationDetails,
          technicians: updatedTechs,
        },
      };
    });
  };

  const handleTechChange = (e, index) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      const updatedTechs = [...prev.organizationDetails.technicians];
      updatedTechs[index] = { ...updatedTechs[index], [name]: value };
      return {
        ...prev,
        organizationDetails: {
          ...prev.organizationDetails,
          technicians: updatedTechs,
        },
      };
    });
  };

  const addTechnician = () => {
    setFormData((prev) => ({
      ...prev,
      organizationDetails: {
        ...prev.organizationDetails,
        technicians: [
          ...prev.organizationDetails.technicians,
          {
            firstName: "",
            lastName: "",
            mobileNumber: "",
            email: "",
            specialization: [],
            skills: [],
            experienceYears: "",
            licenseDetails: { licenseNo: "", expiryDate: "" },
          },
        ],
      },
    }));
  };

  const removeTechnician = (index) => {
    setFormData((prev) => ({
      ...prev,
      organizationDetails: {
        ...prev.organizationDetails,
        technicians: prev.organizationDetails.technicians.filter(
          (_, i) => i !== index
        ),
      },
    }));
  };

  return (
    <div>
      {technicianType === "Individual" ? (
        <Form className="px-5 py-3">
          <Row className="g-4 mb-4">
            <div className="col-12 col-md-4">
              <Form.Label className="fw-bold">Specialization</Form.Label>
              <FormControl fullWidth>
                <Select
                  multiple
                  displayEmpty
                  name="specialization"
                  value={formData.specialization}
                  onChange={(event) => {
                    const {
                      target: { value },
                    } = event;
                    setFormData((prev) => ({
                      ...prev,
                      specialization:
                        typeof value === "string" ? value.split(",") : value,
                    }));
                  }}
                  input={
                    <OutlinedInput
                      sx={{
                        height: 38,
                        "& .MuiOutlinedInput-notchedOutline": {
                          borderColor: "#dee2e6",
                        },
                        "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
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
                      <em>Select Specialization</em>
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
                    <em>Select Specialization</em>
                  </MenuItem>
                  {specializations.map((name) => (
                    <MenuItem key={name} value={name}>
                      {name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
            <div className="col-12 col-md-4">
              <Form.Label className="fw-bold">Skills</Form.Label>
              <FormControl fullWidth>
                <Select
                  multiple
                  displayEmpty
                  name="skills"
                  value={formData.skills}
                  onChange={(event) => {
                    const {
                      target: { value },
                    } = event;
                    setFormData((prev) => ({
                      ...prev,
                      skills:
                        typeof value === "string" ? value.split(",") : value,
                    }));
                  }}
                  input={
                    <OutlinedInput
                      sx={{
                        height: 38,
                        "& .MuiOutlinedInput-notchedOutline": {
                          borderColor: "#dee2e6",
                        },
                        "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
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
                      <em>Select Skills</em>
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
                    <em>Select Skills</em>
                  </MenuItem>
                  {skills.map((name) => (
                    <MenuItem key={name} value={name}>
                      {name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
            <Form.Group as={Col} md={4} sm={12} xs={12}>
              <Form.Label className="fw-bold">Experience (Years)</Form.Label>
              <InputGroup>
                <Form.Control
                  type="number"
                  name="experienceYears"
                  value={formData.experienceYears}
                  onChange={handleChange}
                />
              </InputGroup>
            </Form.Group>
          </Row>
          <p
            className="mb-2 fw-bold d-flex align-items-center"
            style={{ cursor: "pointer" }}
          >
            Certifications Details
            <span
              onClick={() =>
                setFormData((prev) => ({
                  ...prev,
                  certificationDetails: [
                    ...prev.certificationDetails,
                    { certificationName: "", issuedBy: "", issueDate: "" },
                  ],
                }))
              }
            >
              <FaCirclePlus
                className="ms-2"
                color="#2fb972"
                size={20}
                cursor="pointer"
              />
            </span>
          </p>

          {formData.certificationDetails.map((cert, index) => (
            <div key={index} className="mb-3">
              <Row className="g-4 mb-2">
                <Form.Group as={Col} md={4} sm={12}>
                  <Form.Label className="fw-bold">
                    Certification Name
                  </Form.Label>
                  <InputGroup>
                    <Form.Control
                      type="text"
                      name="certificationName"
                      value={cert.certificationName}
                      onChange={(e) => handleCertificationChange(e, index)}
                    />
                  </InputGroup>
                </Form.Group>

                <Form.Group as={Col} md={4} sm={12}>
                  <Form.Label className="fw-bold">Issued By</Form.Label>
                  <InputGroup>
                    <Form.Control
                      type="text"
                      name="issuedBy"
                      value={cert.issuedBy}
                      onChange={(e) => handleCertificationChange(e, index)}
                    />
                  </InputGroup>
                </Form.Group>
                <Form.Group as={Col} md={4} sm={12}>
                  <Form.Label className="fw-bold">Issue Date</Form.Label>
                  <InputGroup>
                    <Form.Control
                      type="date"
                      name="issueDate"
                      value={cert.issueDate}
                      onChange={(e) => handleCertificationChange(e, index)}
                    />
                  </InputGroup>
                </Form.Group>
              </Row>

              {formData.certificationDetails.length > 1 && (
                <div
                  onClick={() => handleRemoveCertification(index)}
                  style={{
                    color: "red",
                    cursor: "pointer",
                    fontWeight: "500",
                    textAlign: "right",
                  }}
                >
                  <FiMinusCircle className="ms-2" color="red" size={20} />
                </div>
              )}
            </div>
          ))}

          <p className="mb-2 fw-bold">License Details</p>
          <Row className="g-4 mb-4">
            <Form.Group as={Col} md={3} sm={12} xs={12}>
              <Form.Label className="fw-bold">License Number</Form.Label>
              <InputGroup>
                <Form.Control
                  type="text"
                  name="licenseNumber"
                  value={formData.licenseDetails.licenseNumber}
                  onChange={handleLicenseChange}
                />
              </InputGroup>
            </Form.Group>
            <Form.Group as={Col} md={3} sm={12} xs={12}>
              <Form.Label className="fw-bold">IssuedBy</Form.Label>
              <InputGroup>
                <Form.Control
                  type="text"
                  name="issuedBy"
                  value={formData.licenseDetails.issuedBy}
                  onChange={handleLicenseChange}
                />
              </InputGroup>
            </Form.Group>
            <Form.Group as={Col} md={3} sm={12} xs={12}>
              <Form.Label className="fw-bold">Issue Date</Form.Label>
              <InputGroup>
                <Form.Control
                  type="date"
                  name="issueDate"
                  value={formData.licenseDetails.issueDate}
                  onChange={handleLicenseChange}
                />
              </InputGroup>
            </Form.Group>
            <Form.Group as={Col} md={3} sm={12} xs={12}>
              <Form.Label className="fw-bold">Expiry Date</Form.Label>
              <InputGroup>
                <Form.Control
                  type="date"
                  name="expiryDate"
                  value={formData.licenseDetails.expiryDate}
                  onChange={handleLicenseChange}
                />
              </InputGroup>
            </Form.Group>
          </Row>
        </Form>
      ) : (
        <Form className="px-5 py-3">
          {formData.organizationDetails.technicians.map((tech, index) => (
            <div key={index} className="mb-4">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h5 className="fw-bold">
                  Technician {index + 1}
                  <FaCirclePlus
                    className="ms-2"
                    color="#2fb972"
                    size={20}
                    cursor="pointer"
                    onClick={addTechnician}
                  />
                </h5>
                {index > 0 && (
                  <FiMinusCircle
                    className="ms-2"
                    color="red"
                    size={20}
                    cursor="pointer"
                    onClick={() => removeTechnician(index)}
                  />
                )}
              </div>

              <Row className="g-4 mb-4">
                <Form.Group as={Col} md={4}>
                  <Form.Label className="fw-bold">First Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="firstName"
                    value={tech.firstName}
                    onChange={(e) => handleTechChange(e, index)}
                  />
                </Form.Group>
                <Form.Group as={Col} md={4}>
                  <Form.Label className="fw-bold">Last Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="lastName"
                    value={tech.lastName}
                    onChange={(e) => handleTechChange(e, index)}
                  />
                </Form.Group>
                <Form.Group as={Col} md={4}>
                  <Form.Label className="fw-bold">Mobile Number</Form.Label>
                  <Form.Control
                    type="number"
                    name="mobileNumber"
                    value={tech.mobileNumber}
                    onChange={(e) => handleTechChange(e, index)}
                  />
                </Form.Group>
                <Form.Group as={Col} md={4}>
                  <Form.Label className="fw-bold">Email</Form.Label>
                  <Form.Control
                    type="text"
                    name="email"
                    value={tech.email}
                    onChange={(e) => handleTechChange(e, index)}
                  />
                </Form.Group>
                <Form.Group as={Col} md={4}>
                  <Form.Label className="fw-bold">Specialization</Form.Label>
                  <FormControl fullWidth>
                    <Select
                      multiple
                      displayEmpty
                      name="specialization"
                      value={tech.specialization || []}
                      onChange={(event) => {
                        const {
                          target: { value },
                        } = event;
                        const selected =
                          typeof value === "string" ? value.split(",") : value;
                        setFormData((prev) => {
                          const updatedTechnicians = [
                            ...prev.organizationDetails.technicians,
                          ];
                          updatedTechnicians[index] = {
                            ...updatedTechnicians[index],
                            specialization: selected,
                          };
                          return {
                            ...prev,
                            organizationDetails: {
                              ...prev.organizationDetails,
                              technicians: updatedTechnicians,
                            },
                          };
                        });
                      }}
                      input={<OutlinedInput sx={{ height: 38 }} />}
                      renderValue={(selected) =>
                        selected.length === 0 ? (
                          <em>Select Specialization</em>
                        ) : (
                          selected.join(", ")
                        )
                      }
                    >
                      <MenuItem disabled value="">
                        <em>Select Specialization</em>
                      </MenuItem>
                      {specializations.map((name) => (
                        <MenuItem key={name} value={name}>
                          {name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Form.Group>
                <Form.Group as={Col} md={4}>
                  <Form.Label className="fw-bold">Skills</Form.Label>
                  <FormControl fullWidth>
                    <Select
                      multiple
                      displayEmpty
                      name="skills"
                      value={tech.skills || []}
                      onChange={(event) => {
                        const {
                          target: { value },
                        } = event;
                        const selected =
                          typeof value === "string" ? value.split(",") : value;
                        setFormData((prev) => {
                          const updatedTechnicians = [
                            ...prev.organizationDetails.technicians,
                          ];
                          updatedTechnicians[index] = {
                            ...updatedTechnicians[index],
                            skills: selected,
                          };
                          return {
                            ...prev,
                            organizationDetails: {
                              ...prev.organizationDetails,
                              technicians: updatedTechnicians,
                            },
                          };
                        });
                      }}
                      input={<OutlinedInput sx={{ height: 38 }} />}
                      renderValue={(selected) =>
                        selected.length === 0 ? (
                          <em>Select Skills</em>
                        ) : (
                          selected.join(", ")
                        )
                      }
                    >
                      <MenuItem disabled value="">
                        <em>Select Skills</em>
                      </MenuItem>
                      {skills.map((name) => (
                        <MenuItem key={name} value={name}>
                          {name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Form.Group>
                <Form.Group as={Col} md={4}>
                  <Form.Label className="fw-bold">
                    Experience (Years)
                  </Form.Label>
                  <Form.Control
                    type="number"
                    name="experienceYears"
                    value={tech.experienceYears}
                    onChange={(e) => handleTechChange(e, index)}
                  />
                </Form.Group>
                <Form.Group as={Col} md={4}>
                  <Form.Label className="fw-bold">License Number</Form.Label>
                  <Form.Control
                    type="text"
                    name="licenseNo"
                    value={tech.licenseDetails.licenseNo}
                    onChange={(e) => handleTechLicenseChange(e, index)}
                  />
                </Form.Group>
                <Form.Group as={Col} md={4}>
                  <Form.Label className="fw-bold">Expiry Date</Form.Label>
                  <Form.Control
                    type="date"
                    name="expiryDate"
                    value={tech.licenseDetails.expiryDate}
                    onChange={(e) => handleTechLicenseChange(e, index)}
                  />
                </Form.Group>
                <Form.Group as={Col} md={4}>
                  <Form.Label className="fw-bold">Technician Photo</Form.Label>
                  <Form.Control
                    type="file"
                    name="technicianProfilePhotos"
                    onChange={handleChange}
                  />
                </Form.Group>
              </Row>
            </div>
          ))}
        </Form>
      )}
    </div>
  );
};

export default ProfessionalDetails;
