import { Form, Row, Col, InputGroup, FormControl } from "react-bootstrap";
import { useTranslation, Trans } from "react-i18next";

const PersonalDetails = ({ formData, setFormData, technicianType }) => {
  const { t } = useTranslation();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCommercialLicenseChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      organizationDetails: {
        ...prev.organizationDetails,
        commercialLicense: {
          ...prev.organizationDetails.commercialLicense,
          [name]: value,
        },
      },
    }));
  };

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      address: {
        ...prev.address,
        [name]: value,
      },
    }));
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files[0],
    }));
  };

  return (
    <div>
      {technicianType === "Individual" ? (
        <Form className="px-5 py-3">
          <Row className="g-4 mb-5">
            <Form.Group as={Col} md={4} sm={12} xs={12}>
              <Form.Label className="fw-bold">{t("id_proof_document")}</Form.Label>
              <InputGroup>
                <Form.Control
                  type="file"
                  name="idProofDocument"
                  onChange={handleFileChange}
                />
              </InputGroup>
            </Form.Group>
            <Form.Group as={Col} md={4} sm={12} xs={12}>
              <Form.Label className="fw-bold">{t("license_file")}</Form.Label>
              <InputGroup>
                <Form.Control
                  type="file"
                  name="licenseFile"
                  onChange={handleFileChange}
                />
              </InputGroup>
            </Form.Group>
            <Form.Group as={Col} md={4} sm={12} xs={12}>
              <Form.Label className="fw-bold">{t("certifications")}</Form.Label>
              <InputGroup>
                <Form.Control
                  type="file"
                  name="certifications"
                  onChange={handleFileChange}
                />
              </InputGroup>
            </Form.Group>
          </Row>
          <Row className="g-4 mb-5">
            <Form.Group as={Col} md={4} sm={12} xs={12}>
              <Form.Label className="fw-bold">{t("profile_photo")}</Form.Label>
              <InputGroup>
                <Form.Control
                  type="file"
                  name="profilePhoto"
                  onChange={handleFileChange}
                />
              </InputGroup>
            </Form.Group>
            <Form.Group as={Col} md={4} sm={12} xs={12}>
              <Form.Label className="fw-bold">{t("street")}</Form.Label>
              <InputGroup>
                <FormControl
                  type="text"
                  name="street"
                  value={formData.address.street}
                  onChange={handleAddressChange}
                ></FormControl>
              </InputGroup>
            </Form.Group>
            <Form.Group as={Col} md={4} sm={12} xs={12}>
              <Form.Label className="fw-bold">{t("city")}</Form.Label>
              <InputGroup>
                <FormControl
                  type="text"
                  name="city"
                  value={formData.address.city}
                  onChange={handleAddressChange}
                ></FormControl>
              </InputGroup>
            </Form.Group>
          </Row>
          <Row className="g-4 mb-3">
            <Form.Group as={Col} md={4} sm={12} xs={12}>
              <Form.Label className="fw-bold">{t("region")}</Form.Label>
              <InputGroup>
                <Form.Control
                  type="text"
                  name="region"
                  value={formData.address.region}
                  onChange={handleAddressChange}
                />
              </InputGroup>
            </Form.Group>
            <Form.Group as={Col} md={4} sm={12} xs={12}>
              <Form.Label className="fw-bold">{t("country")}</Form.Label>
              <InputGroup>
                <Form.Control
                  type="text"
                  name="country"
                  value={formData.address.country}
                  onChange={handleAddressChange}
                />
              </InputGroup>
            </Form.Group>
            <Form.Group as={Col} md={4} sm={12} xs={12}>
              <Form.Label className="fw-bold">{t("pincode")}</Form.Label>
              <InputGroup>
                <Form.Control
                  type="number"
                  name="zipCode"
                  value={formData.address.zipCode}
                  onChange={handleAddressChange}
                />
              </InputGroup>
            </Form.Group>
          </Row>
        </Form>
      ) : (
        <Form className="px-5 py-3">
          <Row className="g-4 mb-5">
            <Form.Group as={Col} md={4} sm={12} xs={12}>
              <Form.Label className="fw-bold">License Number</Form.Label>
              <InputGroup>
                <Form.Control
                  type="text"
                  name="licenseNo"
                  value={
                    formData.organizationDetails.commercialLicense.licenseNo
                  }
                  onChange={handleCommercialLicenseChange}
                />
              </InputGroup>
            </Form.Group>
            <Form.Group as={Col} md={4} sm={12} xs={12}>
              <Form.Label className="fw-bold">Expiry Date</Form.Label>
              <InputGroup>
                <Form.Control
                  type="date"
                  name="expiryDate"
                  value={
                    formData.organizationDetails.commercialLicense.expiryDate
                  }
                  onChange={handleCommercialLicenseChange}
                />
              </InputGroup>
            </Form.Group>
            <Form.Group as={Col} md={4} sm={12} xs={12}>
              <Form.Label className="fw-bold">Tax Number</Form.Label>
              <InputGroup>
                <Form.Control
                  type="text"
                  name="taxNumber"
                  value={formData.organizationDetails.taxNumber}
                  onChange={(e) => {
                    const { name, value } = e.target;
                    setFormData((prev) => ({
                      ...prev,
                      organizationDetails: {
                        ...prev.organizationDetails,
                        [name]: value,
                      },
                    }));
                  }}
                />
              </InputGroup>
            </Form.Group>
          </Row>
          <Row className="g-4 mb-5">
            <Form.Group as={Col} md={4} sm={12} xs={12}>
              <Form.Label className="fw-bold">
                Organization Profile Photo
              </Form.Label>
              <InputGroup>
                <Form.Control
                  type="file"
                  name="organizationProfilePhoto"
                  onChange={handleFileChange}
                />
              </InputGroup>
            </Form.Group>
            <Form.Group as={Col} md={4} sm={12} xs={12}>
              <Form.Label className="fw-bold">
                Commercial License File
              </Form.Label>
              <InputGroup>
                <Form.Control
                  type="file"
                  name="commercialLicenseFile"
                  onChange={handleFileChange}
                />
              </InputGroup>
            </Form.Group>
            <Form.Group as={Col} md={4} sm={12} xs={12}>
              <Form.Label className="fw-bold">
                Organization Documents
              </Form.Label>
              <InputGroup>
                <Form.Control
                  type="file"
                  name="organisationDocuments"
                  onChange={handleFileChange}
                />
              </InputGroup>
            </Form.Group>
          </Row>
        </Form>
      )}
    </div>
  );
};

export default PersonalDetails;
