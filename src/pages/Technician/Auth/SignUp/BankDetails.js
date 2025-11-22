import { Form, Row, Col, InputGroup } from "react-bootstrap";

const BankDetails = ({ formData, setFormData, technicianType }) => {
    const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

    const handleBankDetailsChange = (e) => {
  const { name, value } = e.target;
  setFormData((prev) => ({
    ...prev,
    bankDetails: {
      ...prev.bankDetails,
      [name]: value,
    },
  }));
};

  const handleOrganizationBankDetailsChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      organizationDetails: {
        ...prev.organizationDetails,
        bankDetails: {
          ...prev.organizationDetails.bankDetails,
          [name]: value,
        },
      },
    }));
  };


  return (
    <div>
      {technicianType === "Individual" ? (
      <Form className="px-5 py-3">
          <Row className="g-4 mb-4">
            <Form.Group as={Col} md={6} sm={12} xs={12}>
              <Form.Label className="fw-bold">Account Holder Name</Form.Label>
               <InputGroup>
                <Form.Control
                  type="text"
                  name="accountHolderName"
                  value={formData.bankDetails.accountHolderName}
                  onChange={handleBankDetailsChange}
                />
              </InputGroup>
            </Form.Group>
            <Form.Group as={Col} md={6} sm={12} xs={12}>
              <Form.Label className="fw-bold">Bank Name</Form.Label>
              <InputGroup>
                <Form.Control
                  type="text"
                  name="bankName"
                  lue={formData.bankDetails.bankName}
                  onChange={handleBankDetailsChange}
                />
              </InputGroup>
            </Form.Group>
          </Row>
          <Row className="g-4">
            <Form.Group as={Col} md={6} sm={12} xs={12}>
              <Form.Label className="fw-bold">Account Number</Form.Label>
              <InputGroup>
                <Form.Control
                  type="number"
                  name="accountNumber"
                  value={formData.bankDetails.accountNumber}
                  onChange={handleBankDetailsChange}
                />
              </InputGroup>
            </Form.Group>
            <Form.Group as={Col} md={6} sm={12} xs={12}>
              <Form.Label className="fw-bold">IFSC Or SwiftCode</Form.Label>
              <InputGroup>
                <Form.Control
                  type="text"
                  name="ifscOrSwiftCode"
                  value={formData.bankDetails.ifscOrSwiftCode}
                  onChange={handleBankDetailsChange}
                />
              </InputGroup>
            </Form.Group>
          </Row>
    </Form>)
    : (<Form className="px-5 py-3">
                <Row className="g-4 mb-4">
            <Form.Group as={Col} md={6} sm={12} xs={12}>
              <Form.Label className="fw-bold">Account Holder Name</Form.Label>
               <InputGroup>
                <Form.Control
                  type="text"
                  name="accountHolderName"
                  value={formData.organizationDetails.bankDetails.accountHolderName}
                  onChange={handleOrganizationBankDetailsChange}
                />
              </InputGroup>
            </Form.Group>
            <Form.Group as={Col} md={6} sm={12} xs={12}>
              <Form.Label className="fw-bold">Bank Name</Form.Label>
              <InputGroup>
                <Form.Control
                  type="text"
                  name="bankName"
                  lue={formData.organizationDetails.bankDetails.bankName}
                  onChange={handleOrganizationBankDetailsChange}
                />
              </InputGroup>
            </Form.Group>
          </Row>
          <Row className="g-4 mb-4">
            <Form.Group as={Col} md={6} sm={12} xs={12}>
              <Form.Label className="fw-bold">Account Number</Form.Label>
              <InputGroup>
                <Form.Control
                  type="number"
                  name="accountNumber"
                  value={formData.organizationDetails.bankDetails.accountNumber}
                  onChange={handleOrganizationBankDetailsChange}
                />
              </InputGroup>
            </Form.Group>
            <Form.Group as={Col} md={6} sm={12} xs={12}>
              <Form.Label className="fw-bold">IFSC Or SwiftCode</Form.Label>
              <InputGroup>
                <Form.Control
                  type="text"
                  name="ifscOrSwiftCode"
                  value={formData.organizationDetails.bankDetails.ifscOrSwiftCode}
                  onChange={handleOrganizationBankDetailsChange}
                />
              </InputGroup>
            </Form.Group>
          </Row>
    </Form>)}
    </div>
  )
}

export default BankDetails