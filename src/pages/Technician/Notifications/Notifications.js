import React from "react";
import { Container, Row, Col, Card, Button, Image } from "react-bootstrap";
import { FaCheckCircle, FaStar, FaArrowLeft, FaDownload, FaUser } from "react-icons/fa";

const Notifications = () => {
  return (
     <div className="py-4 job-management mx-3">
      <div className="d-flex  align-items-center flex-wrap mb-4">
        <h4 className="fw-bold mb-1 me-3 job-head">Jobs Management</h4>
        <div className="badge bg-success-subtle job-complete px-3 py-2 border border-success">
          Completed
        </div>
      </div>
      <p className="text-muted mb-4">Completed on 2025-10-28, 04:15 PM</p>

      <Card className="mb-4 shadow-sm border-0">
        <Card.Body>
          <h6 className="fw-bold mb-3 d-flex align-items-center gap-2">
            <FaUser /> Client Information
          </h6>
          <Row>
            <Col md={6} lg={4}>
              <p className="mb-1 text-muted">Name</p>
              <p className="fw-semibold">Grace Lee</p>
            </Col>
            <Col md={6} lg={4}>
              <p className="mb-1 text-muted">Service Name</p>
              <p className="fw-semibold">AC Installation</p>
            </Col>
            <Col md={6} lg={4}>
              <p className="mb-1 text-muted">Completed Time</p>
              <p className="fw-semibold">2025-10-28, 04:15 PM</p>
            </Col>
            <Col md={6} lg={4}>
              <p className="mb-1 text-muted">Service Category</p>
              <p className="fw-semibold">Repair & Maintenance</p>
            </Col>
            <Col md={6} lg={4}>
              <p className="mb-1 text-muted">Address</p>
              <p className="fw-semibold">789 North St, suite 300</p>
            </Col>
            <Col md={6} lg={4}>
              <p className="mb-1 text-muted">Technician</p>
              <p className="fw-semibold">Alex Thomson</p>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      {/* Service Summary */}
      <Card className="mb-4 shadow-sm border-0">
        <Card.Body>
          <h6 className="fw-bold mb-4">Service Summary</h6>

          <div className="d-flex justify-content-between align-items-center bg-success-subtle p-2 px-3 rounded mb-3">
            <div className="d-flex align-items-center gap-2">
              <FaCheckCircle color="green" />
              <span>Step 1: Site Visit</span>
            </div>
            <span className="badge job-complete">Completed</span>
          </div>

          <div className="d-flex justify-content-between align-items-center bg-success-subtle p-2 px-3 rounded mb-3">
            <div className="d-flex align-items-center gap-2">
              <FaCheckCircle color="green" />
              <span>Step 2: Technician Allocation</span>
            </div>
            <span className="badge job-complete">Completed</span>
          </div>

          <div className="d-flex justify-content-between align-items-center bg-success-subtle p-2 px-3 rounded mb-3">
            <div className="d-flex align-items-center gap-2">
              <FaCheckCircle color="green" />
              <span>Step 3: Task Execution</span>
            </div>
            <span className="badge job-complete">Completed</span>
          </div>
        </Card.Body>
      </Card>

      <Card className="mb-4 shadow-sm border-0">
        <Card.Body>
          <h6 className="fw-bold mb-3">Materials Used</h6>
          <div className="d-flex justify-content-between border-bottom py-2">
            <span>Refrigerant Gas</span>
            <span className="text-muted">1 unit</span>
          </div>
          <div className="d-flex justify-content-between border-bottom py-2">
            <span>Sealant</span>
            <span className="text-muted">2 tubes</span>
          </div>
          <div className="d-flex justify-content-between py-2">
            <span>Gloves</span>
            <span className="text-muted">1 Pair</span>
          </div>
        </Card.Body>
      </Card>

      <Card className="mb-4 shadow-sm border-0">
        <Card.Body>
          <h6 className="fw-bold mb-3">Photos Uploaded</h6>
          <Row>
            <Col md={6}>
              <p className="fw-semibold">Before Service</p>
              <div className="d-flex flex-wrap gap-3">
                <Image src="/before1.jpg" alt="Before" rounded fluid className="photo-thumb" />
                <Image src="/before2.jpg" alt="Before" rounded fluid className="photo-thumb" />
              </div>
            </Col>
            <Col md={6}>
              <p className="fw-semibold">After Service</p>
              <div className="d-flex flex-wrap gap-3">
                <Image src="/after1.jpg" alt="After" rounded fluid className="photo-thumb" />
                <Image src="/after2.jpg" alt="After" rounded fluid className="photo-thumb" />
              </div>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      <Card className="mb-4 shadow-sm border-0">
        <Card.Body>
          <h6 className="fw-bold mb-3 d-flex align-items-center gap-2">
            <FaUser /> Customer Ratings
          </h6>
          <div className="d-flex align-items-center gap-2 mb-2">
            <p className="fw-semibold mb-0">Ramesh</p>
            <p className="text-warning mb-0">
              <FaStar color="gold" />
              <FaStar color="gold" />
              <FaStar color="gold" />
              <FaStar color="gold" />
              <FaStar color="lightgray" />
              <span className="ms-1 text-dark">4.8</span>
            </p>
          </div>
          <p className="text-muted mb-0">
            Good service overall. The electrician was skilled and friendly, though the work took a bit
            longer than expected. Still, happy with the result.
          </p>
        </Card.Body>
      </Card>

      {/* Footer Buttons */}
      <div className="d-flex justify-content-end gap-3 flex-wrap">
        <Button variant="outline-success" className="d-flex align-items-center gap-2">
          <FaArrowLeft /> Back to Jobs
        </Button>
        <Button variant="success" className="d-flex align-items-center gap-2">
          <FaDownload /> Download PDF
        </Button>
      </div>
    </div>
  )
}

export default Notifications  