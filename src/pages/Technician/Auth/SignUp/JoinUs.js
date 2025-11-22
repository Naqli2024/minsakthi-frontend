import { Form, Row, Col, InputGroup } from "react-bootstrap";
import { useEffect, useState } from "react";

const JoinUs = ({
  formData,
  setFormData,
  technicianType,
  individualForm,
  organizationForm,
}) => {
  const [isIndividual, setIsIndividual] = useState(
    formData.technicianType === "Individual"
  );

  useEffect(() => {
    setFormData(isIndividual ? individualForm : organizationForm);
  }, [isIndividual]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleOrganizationDetailsChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      organizationDetails: {
        ...prev.organizationDetails,
        [name]: value,
      },
    }));
  };

  const handleOfficeAddressChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      organizationDetails: {
        ...prev.organizationDetails,
        officeAddress: {
          ...prev.organizationDetails.officeAddress,
          [name]: value,
        },
      },
    }));
  };

  return (
    <div>
      <Form className="px-5 py-3">
        <div className="service-scope-outer-toggle-container mb-4">
          <div className="service-scope-toggle-container">
            <span
              className={`service-scope-label ${isIndividual ? "active" : ""}`}
            >
              Individual
            </span>
            <label className="switch">
              <input
                type="checkbox"
                checked={!isIndividual}
                onChange={() => setIsIndividual(!isIndividual)}
              />
              <span className="slider"></span>
            </label>
            <span
              className={`service-scope-label ${!isIndividual ? "active" : ""}`}
            >
              Organisation
            </span>
          </div>
        </div>
        {technicianType === "Individual" ? (
          <div>
            <Row className="g-4 mb-4">
              <Form.Group as={Col} md={6} sm={12} xs={12}>
                <Form.Label className="fw-bold">First Name</Form.Label>
                <InputGroup>
                  <Form.Control
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                  />
                </InputGroup>
              </Form.Group>
              <Form.Group as={Col} md={6} sm={12} xs={12}>
                <Form.Label className="fw-bold">Last Name</Form.Label>
                <InputGroup>
                  <Form.Control
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                  />
                </InputGroup>
              </Form.Group>
            </Row>
            <Row className="g-4 mb-4">
              <Form.Group as={Col} md={6} sm={12} xs={12}>
                <Form.Label className="fw-bold">Mobile Number</Form.Label>
                <InputGroup>
                  <Form.Control
                    type="number"
                    name="mobileNumber"
                    value={formData.mobileNumber}
                    onChange={handleChange}
                  />
                </InputGroup>
              </Form.Group>
              <Form.Group as={Col} md={6} sm={12} xs={12}>
                <Form.Label className="fw-bold">Email</Form.Label>
                <InputGroup>
                  <Form.Control
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </InputGroup>
              </Form.Group>
            </Row>
            <Row className="g-4">
              <Form.Group as={Col} md={6} sm={12} xs={12}>
                <Form.Label className="fw-bold">Gender</Form.Label>
                <InputGroup>
                  <Form.Select
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                  >
                    <option value="">Select Gender</option>
                    <option>Male</option>
                    <option>Female</option>
                  </Form.Select>
                </InputGroup>
              </Form.Group>

              <Form.Group as={Col} md={6} sm={12} xs={12}>
                <Form.Label className="fw-bold">Date Of Birth</Form.Label>
                <InputGroup>
                  <Form.Control
                    type="date"
                    name="dateOfBirth"
                    value={formData.dateOfBirth}
                    onChange={handleChange}
                  />
                </InputGroup>
              </Form.Group>
            </Row>
          </div>
        ) : (
          <div>
            <Row className="g-4 mb-4">
              <Form.Group as={Col} md={4} sm={12} xs={12}>
                <Form.Label className="fw-bold">Organization Name</Form.Label>
                <InputGroup>
                  <Form.Control
                    type="text"
                    name="organizationName"
                    value={formData.organizationDetails.organizationName}
                    onChange={handleOrganizationDetailsChange}
                  />
                </InputGroup>
              </Form.Group>
              <Form.Group as={Col} md={4} sm={12} xs={12}>
                <Form.Label className="fw-bold">Owner Name</Form.Label>
                <InputGroup>
                  <Form.Control
                    type="text"
                    name="ownerName"
                    value={formData.organizationDetails.ownerName}
                    onChange={handleOrganizationDetailsChange}
                  />
                </InputGroup>
              </Form.Group>
              <Form.Group as={Col} md={4} sm={12} xs={12}>
                <Form.Label className="fw-bold">Email</Form.Label>
                <InputGroup>
                  <Form.Control
                    type="text"
                    name="email"
                    value={formData.organizationDetails.email}
                    onChange={handleOrganizationDetailsChange}
                  />
                </InputGroup>
              </Form.Group>
            </Row>
            <Row className="g-4 mb-4">
              <Form.Group as={Col} md={4} sm={12} xs={12}>
                <Form.Label className="fw-bold">Mobile Number</Form.Label>
                <InputGroup>
                  <Form.Control
                    type="number"
                    name="mobileNumber"
                    value={formData.organizationDetails.mobileNumber}
                    onChange={handleOrganizationDetailsChange}
                  />
                </InputGroup>
              </Form.Group>
              <Form.Group as={Col} md={4} sm={12} xs={12}>
                <Form.Label className="fw-bold">Street</Form.Label>
                <InputGroup>
                  <Form.Control
                    type="text"
                    name="street"
                    value={formData.organizationDetails.officeAddress.street}
                    onChange={handleOfficeAddressChange}
                  />
                </InputGroup>
              </Form.Group>
              <Form.Group as={Col} md={4} sm={12} xs={12}>
                <Form.Label className="fw-bold">City</Form.Label>
                <InputGroup>
                  <Form.Control
                    type="text"
                    name="city"
                    value={formData.organizationDetails.officeAddress.city}
                    onChange={handleOfficeAddressChange}
                  />
                </InputGroup>
              </Form.Group>
            </Row>
            <Row className="g-4">
              <Form.Group as={Col} md={4} sm={12} xs={12}>
                <Form.Label className="fw-bold">Region</Form.Label>
                <InputGroup>
                  <Form.Control
                    type="text"
                    name="region"
                    value={formData.organizationDetails.officeAddress.region}
                    onChange={handleOfficeAddressChange}
                  />
                </InputGroup>
              </Form.Group>
              <Form.Group as={Col} md={4} sm={12} xs={12}>
                <Form.Label className="fw-bold">Country</Form.Label>
                <InputGroup>
                  <Form.Control
                    type="text"
                    name="country"
                    value={formData.organizationDetails.officeAddress.country}
                    onChange={handleOfficeAddressChange}
                  />
                </InputGroup>
              </Form.Group>
              <Form.Group as={Col} md={4} sm={12} xs={12}>
                <Form.Label className="fw-bold">Pin Code</Form.Label>
                <InputGroup>
                  <Form.Control
                    type="text"
                    name="pincode"
                    value={formData.organizationDetails.officeAddress.pincode}
                    onChange={handleOfficeAddressChange}
                  />
                </InputGroup>
              </Form.Group>
            </Row>
          </div>
        )}
      </Form>
    </div>
  );
};

export default JoinUs;
