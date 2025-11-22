import React, { useEffect, useState } from "react";
import { Form, Row, Col, Button, InputGroup } from "react-bootstrap";
import { IoEyeOutline } from "react-icons/io5";
import { MdOutlineEdit } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { IoArrowBackOutline } from "react-icons/io5";
import Cookies from "js-cookie"
import { getTechnicianById } from "../../../redux/Technician/TechnicianSlice";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { MdOutlineSave } from "react-icons/md";

const TechEditProfile = () => {
  const navigate = useNavigate();
  const technicianId = Cookies.get("technicianId");
  const dispatch = useDispatch();
  const [technicianData, setTechnicianData] = useState([]);
  const [editTech, setEditTech] = useState(false);

    useEffect(() => {
      dispatch(getTechnicianById(technicianId))
        .unwrap()
        .then((response) => {
          setTechnicianData(response.data || []);
        })
        .catch((error) => toast.error(error));
    }, [dispatch]);

  const handleOpenIdDoc = () =>
    window.open(technicianData.idProofDocument, "_blank");
  const handleOpenCertificateFileDoc = (cert) =>
    window.open(cert.certificateFile, "_blank");
  const handleOpenLicenseFileDoc = () =>
    window.open(technicianData.licenseDetails?.documentFile, "_blank");
  const handleOpenCommercialLicenseDoc = () =>
    window.open(
      technicianData.organizationDetails?.commercialLicense?.documentFile,
      "_blank"
    );
  const handleOpenOrganizationDoc = (orgDoc) =>
    window.open(orgDoc.docFile, "_blank");

  return (
    <div>
      {technicianData.technicianType === "Individual" ? (
        <div className="tech-profile-container">
            <div className="tech-profile-info">
              <img
                src={technicianData.profilePhoto}
                alt={technicianData.firstName}
                className="tech-profile-img"
              />
              <div className="d-flex align-items-center flex-column">
                <h3>
                  <b>
                    {technicianData.firstName || "N/A"}{" "}
                    {technicianData.lastName}
                  </b>{" "}
                  ({technicianData.technicianType})
                </h3>
                <p>Technician ID: {technicianData._id}</p>
                <span className="tech-profile-status active">
                  {technicianData.status}
                </span>
              </div>
            </div>
            <div className="d-flex justify-content-end mt-3">
              <div className="tech-edit-profile-btn" onClick={()=>setEditTech(!editTech)}>
                {!editTech
                ? (<span><MdOutlineEdit color="white" size={15}/> Edit Profile</span>)
                : (<span><MdOutlineSave color="white" size={15}/> Save</span>)}
              </div>
            </div>
          <div className="tech-profile-info-grid">
            <div className="tech-profile-card">
              <h5>Personal Information</h5>
              <div className="tech-profile-info-grid-2col">
                <p>
                  <b>Name:</b><br/>
                  {editTech 
                  ? (<Form.Group className="col-md-10">
                  <InputGroup>
                    <Form.Control
                      type="text"
                    />
                  </InputGroup>
                </Form.Group>)
                : (<p>{technicianData.firstName || "N/A"}{" "}
                  {technicianData.lastName}</p>)}
                </p>
                <p>
                  <b>Email:</b><br/>
                  {editTech 
                  ? (<Form.Group className="col-md-10">
                  <InputGroup>
                    <Form.Control
                      type="text"
                    />
                  </InputGroup>
                </Form.Group>)
                : (<p>{technicianData.email || "N/A"}</p>)}
                </p>
                <p>
                  <b>Mobile Number:</b><br/>
                  {editTech 
                  ? (<Form.Group className="col-md-10">
                  <InputGroup>
                    <Form.Control
                      type="text"
                    />
                  </InputGroup>
                </Form.Group>)
                : (<p>{technicianData.mobileNumber || "N/A"}</p>)}
                </p>
                <p>
                  <b>Gender:</b><br/>
                  {editTech 
                  ? (<Form.Group className="col-md-10">
                  <InputGroup>
                    <Form.Control
                      type="text"
                    />
                  </InputGroup>
                </Form.Group>)
                : (<p>{technicianData.gender || "N/A"}</p>)}
                </p>
                <p>
                  <b>DOB:</b><br/>
                  {editTech 
                  ? (<Form.Group className="col-md-10">
                  <InputGroup>
                    <Form.Control
                      type="text"
                    />
                  </InputGroup>
                </Form.Group>)
                : (<p>{technicianData?.dateOfBirth
                    ? new Date(
                        technicianData?.dateOfBirth
                      ).toLocaleDateString()
                    : "N/A"}</p>)}
                </p>
                <p>
                  <b>Experience (Years):</b><br/>
                  {editTech 
                  ? (<Form.Group className="col-md-10">
                  <InputGroup>
                    <Form.Control
                      type="text"
                    />
                  </InputGroup>
                </Form.Group>)
                : (<p>{technicianData.experienceYears || "N/A"}</p>)}
                </p>
                <p>
                  <b>Specialization:</b><br/>
                  {editTech 
                  ? (<Form.Group className="col-md-10">
                  <InputGroup>
                    <Form.Control
                      type="text"
                    />
                  </InputGroup>
                </Form.Group>)
                : (<p>{technicianData.specialization.join(",") || "N/A"}</p>)}
                </p>
                <p>
                  <b>Skills:</b><br/>
                  {editTech 
                  ? (<Form.Group className="col-md-10">
                  <InputGroup>
                    <Form.Control
                      type="text"
                    />
                  </InputGroup>
                </Form.Group>)
                : (<p>{technicianData.skills.join(",") || "N/A"}</p>)}
                </p>
                <p>
                  <b>Address:</b><br /> 
                  {editTech 
                  ? (<Form.Group className="tech-profile-info-grid-2col">
                  <InputGroup >
                    <Form.Control
                      type="text"
                      placeholder="Street"
                    />
                  </InputGroup>
                  <InputGroup>
                    <Form.Control
                      type="text"
                      placeholder="City"
                    />
                  </InputGroup>
                  <InputGroup >
                    <Form.Control
                      type="text"
                      placeholder="Region"
                    />
                  </InputGroup>
                  <InputGroup >
                    <Form.Control
                      type="text"
                      placeholder="Country"
                    />
                  </InputGroup>
                </Form.Group>)
                : (<p>{technicianData.address?.street || "N/A"}
                  {","}
                  {technicianData.address?.city}
                  {","}
                  {technicianData.address?.region}
                  {","}
                  {technicianData.address?.country}</p>)}
                </p>
              </div>
            </div>
            <div className="tech-profile-card">
              <h5>Bank Details</h5>
              <div className="tech-profile-info-grid-2col">
                <p>
                  <b>Account Holder Name:</b><br/>
                  {editTech 
                  ? (<Form.Group className="col-md-10">
                  <InputGroup>
                    <Form.Control
                      type="text"
                    />
                  </InputGroup>
                </Form.Group>)
                : (<p>{technicianData.bankDetails?.accountHolderName || "N/A"}</p>)}
                </p>
                <p>
                  <b>Bank Name:</b><br/>
                  {editTech 
                  ? (<Form.Group className="col-md-10">
                  <InputGroup>
                    <Form.Control
                      type="text"
                    />
                  </InputGroup>
                </Form.Group>)
                : (<p>{technicianData.bankDetails?.bankName || "N/A"}</p>)}
                </p>
                <p>
                  <b>Account Number:</b><br/>
                  {editTech 
                  ? (<Form.Group className="col-md-10">
                  <InputGroup>
                    <Form.Control
                      type="text"
                    />
                  </InputGroup>
                </Form.Group>)
                : (<p>{technicianData.bankDetails?.accountNumber || "N/A"}</p>)}
                </p>
                <p>
                  <b>IFSC Code:</b><br/>
                  {editTech 
                  ? (<Form.Group className="col-md-10">
                  <InputGroup>
                    <Form.Control
                      type="text"
                    />
                  </InputGroup>
                </Form.Group>)
                : (<p>{technicianData.bankDetails?.ifscOrSwiftCode || "N/A"}</p>)}
                </p>
              </div>
            </div>
            <div className="tech-profile-card">
              <h5>Documents & Certifications</h5>
              <div className="d-flex align-items-center justify-content-between">
                <span>Id Proof Document</span>
                <div className="tech-profile-doc-view-btn" onClick={handleOpenIdDoc}>
                  <IoEyeOutline className="me-2" /> View
                </div>
              </div>
              <div className="documents-section mt-3">
                {technicianData?.certifications?.length > 0 ? (
                  technicianData.certifications.map((cert, index) => (
                    <div
                      key={index}
                      className="certificate-item d-flex align-items-center justify-content-between mb-2"
                    >
                      <div>
                        <strong>Certificate {index + 1}</strong> <br />
                        <small>Issued By: {cert.issuedBy}</small>
                        <br />
                        <small>
                          Issue Date:{" "}
                          {new Date(cert.issueDate).toLocaleDateString()}
                        </small>
                      </div>
                      <div className="d-flex gap-2">
                        <div
                          className="tech-profile-doc-view-btn"
                          onClick={() => handleOpenCertificateFileDoc(cert)}
                        >
                          <IoEyeOutline className="me-2" /> View
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <p>No certificates found</p>
                )}
              </div>
              <div className="d-flex align-items-center justify-content-between mt-3">
                <div>
                  <strong>License Details</strong> <br />
                  <small>
                    Expiry Date:{" "}
                    {new Date(
                      technicianData.licenseDetails?.expiryDate
                    ).toLocaleDateString()}
                  </small>
                </div>
                <div
                  className="tech-profile-doc-view-btn"
                  onClick={handleOpenLicenseFileDoc}
                >
                  <IoEyeOutline className="me-2" /> View
                </div>
              </div>
            </div>
          </div>
        </div>
      ) 
      : (<div className="tech-profile-container">
          <div className="d-flex align-items-center">
            <IoArrowBackOutline
              size={25}
              cursor={"Pointer"}
            />
            <span className="fw-bold ms-3">View Technician Details</span>
          </div>
          <div className="tech-profile-header mt-5">
            <div>
              <p>
                <b>Organization Name:</b>{" "}
                {technicianData.organizationDetails?.organizationName ||
                  "N/A"}{" "}
                ({technicianData.technicianType})
              </p>
              <p>
                <b>Owner Name:</b>{" "}
                {technicianData.organizationDetails?.ownerName || "N/A"}
              </p>
              <p>
                <b>Technician ID:</b> {technicianData._id}
              </p>
              <span className="tech-profile-status active">
                {technicianData.status}
              </span>
            </div>
          </div>
          <div className="tech-profile-info-grid">
            <div className="tech-profile-card">
              <h5>Organization Details</h5>
              <div className="tech-profile-info-grid-2col">
                <p>
                  <b>Organization Name:</b><br/>
                  {technicianData.organizationDetails?.organizationName ||
                    "N/A"}
                </p>
                <p>
                  <b>Owner Name:</b><br/>
                  {technicianData.organizationDetails?.ownerName || "N/A"}
                </p>
                <p>
                  <b>Mobile Number:</b><br/>
                  {technicianData.organizationDetails?.mobileNumber ||
                    "N/A"}
                </p>
                <p>
                  <b>Email:</b><br/>
                  {technicianData.organizationDetails?.email || "N/A"}
                </p>
                <p>
                  <b>Address:</b><br />
                  {technicianData.organizationDetails?.officeAddress
                    ?.street || "N/A"}
                  {","}
                  {technicianData.organizationDetails?.officeAddress?.city}
                  {","}
                  {
                    technicianData.organizationDetails?.officeAddress
                      ?.region
                  }
                  {","}
                  {
                    technicianData.organizationDetails?.officeAddress
                      ?.country
                  }
                </p>
              </div>
            </div>
            <div className="tech-profile-card">
              <h5>Bank Details</h5>
              <div className="tech-profile-info-grid-2col">
                <p>
                  <b>Account Holder Name:</b><br/>
                  {technicianData.organizationDetails?.bankDetails
                    ?.accountHolderName || "N/A"}
                </p>
                <p>
                  <b>Bank Name:</b><br/>
                  {technicianData.organizationDetails?.bankDetails
                    ?.bankName || "N/A"}
                </p>
                <p>
                  <b>Account Number:</b><br/>
                  {technicianData.organizationDetails?.bankDetails
                    ?.accountNumber || "N/A"}
                </p>
                <p>
                  <b>IFSC Code:</b><br/>
                  {technicianData.organizationDetails?.bankDetails
                    ?.ifscOrSwiftCode || "N/A"}
                </p>
              </div>
            </div>
            <div className="tech-profile-card">
              <h5>Technician Details</h5>
              {technicianData.organizationDetails?.technicians?.length > 0 ? (
                technicianData.organizationDetails?.technicians?.map((techData, index) => (
                  <div>
                    <div className="tech-profile-info-grid-2col" key={index}>
                    <p>
                      <b>Technician Name:</b><br/> {techData.firstName || "N/A"}{" "}
                      {techData.lastName || "N/A"}
                    </p>
                    <p>
                      <b>Mobile Number:</b><br/> {techData.mobileNumber || "N/A"}
                    </p>
                    <p>
                      <b>Email:</b><br/> {techData.email || "N/A"}
                    </p>
                    <p>
                      <b>Specialization:</b><br/>
                      {techData.specialization.join(",") || "N/A"}
                    </p>
                    <p>
                      <b>Skills:</b><br/>{techData.skills.join(",") || "N/A"}
                    </p>
                    <p>
                      <b>Experience (Years):</b><br/>
                      {techData.experienceYears || "N/A"}
                    </p>
                    <p>
                      <b>License Details:</b><br/>
                      License Number:{techData.licenseDetails.licenseNo || "N/A"}<br/>
                      Expiry Date:{new Date(techData.licenseDetails.expiryDate).toLocaleDateString() || "N/A"}
                    </p>
                  </div>
                  {index !== technicianData.organizationDetails?.technicians?.length - 1 && <hr />}
                  </div>
                ))
              ) : (
                <div>No Technician Found</div>
              )}
            </div>

            <div className="tech-profile-card">
              <h5>Documents & Certifications</h5>
              <div className="d-flex align-items-center justify-content-between">
                <div className="d-flex flex-column">
                  <span className="fw-bold mb-2">Commercial License</span>
                  <span>
                    License Number:{" "}
                    {
                      technicianData.organizationDetails?.commercialLicense
                        ?.licenseNo
                    }
                  </span>
                  <span>
                    Expiry Date:{" "}
                    {new Date(
                      technicianData.organizationDetails?.commercialLicense?.expiryDate
                    ).toLocaleDateString() || "N/A"}
                  </span>
                </div>
                <div
                  className="tech-profile-doc-view-btn"
                  onClick={handleOpenCommercialLicenseDoc}
                >
                  <IoEyeOutline className="me-2" /> View
                </div>
              </div>
              <div className="documents-section mt-3">
                <div>
                  <strong>Organization Documents</strong>
                </div>
                {technicianData?.organizationDetails?.organisationDocuments
                  ?.length > 0 ? (
                  technicianData.organizationDetails?.organisationDocuments.map(
                    (orgDoc, index) => (
                      <div
                        key={index}
                        className="certificate-item d-flex align-items-center justify-content-between mb-2"
                      >
                        <div>
                          <small>Document: {index + 1}</small>
                        </div>
                        <div className="d-flex gap-2">
                          <div
                            className="admin-doc-view-btn"
                            onClick={() => handleOpenOrganizationDoc(orgDoc)}
                          >
                            <IoEyeOutline className="me-2" /> View
                          </div>
                        </div>
                      </div>
                    )
                  )
                ) : (
                  <p>No Organization Documents found</p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TechEditProfile;
