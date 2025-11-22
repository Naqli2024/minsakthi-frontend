import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { IoEyeOutline } from "react-icons/io5";
import { MdOutlineDownload } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { IoArrowBackOutline } from "react-icons/io5";

const ViewTechnicianDetails = ({ selectedTechnician, backToItems }) => {
  const navigate = useNavigate();
  const [openDocModal, setOpenDocModal] = useState(false);

  const handleOpenIdDoc = () =>
    window.open(selectedTechnician.idProofDocument, "_blank");
  const handleOpenCertificateFileDoc = (cert) =>
    window.open(cert.certificateFile, "_blank");
  const handleOpenLicenseFileDoc = () =>
    window.open(selectedTechnician.licenseDetails?.documentFile, "_blank");
  const handleOpenCommercialLicenseDoc = () =>
    window.open(
      selectedTechnician.organizationDetails?.commercialLicense?.documentFile,
      "_blank"
    );
  const handleOpenOrganizationDoc = (orgDoc) =>
    window.open(orgDoc.docFile, "_blank");

  return (
    <div>
      {selectedTechnician.technicianType === "Individual" ? (
        <div className="admin-technician-profile-container">
          <div className="d-flex align-items-center">
            <IoArrowBackOutline
              size={25}
              cursor={"Pointer"}
              onClick={backToItems}
            />
            <span className="fw-bold ms-3">View Technician Details</span>
          </div>
          <div className="admin-technician-profile-header mt-5">
            <div className="admin-tech-profile-info">
              <img
                src={selectedTechnician.profilePhoto}
                alt={selectedTechnician.firstName}
                className="admin-tech-profile-img"
              />
              <div>
                <h3>
                  <b>
                    {selectedTechnician.firstName || "N/A"}{" "}
                    {selectedTechnician.lastName}
                  </b>{" "}
                  ({selectedTechnician.technicianType})
                </h3>
                <p>Technician ID: {selectedTechnician._id}</p>
                <span className="admin-tech-status active">
                  {selectedTechnician.status}
                </span>
              </div>
            </div>
          </div>

          <div className="admin-tech-info-grid">
            <div className="admin-tech-card">
              <h5>Personal Information</h5>
              <div className="admin-tech-info-grid-2col">
                <p>
                  <b>Name:</b><br/>{selectedTechnician.firstName || "N/A"}{" "}
                  {selectedTechnician.lastName}
                </p>
                <p>
                  <b>Email:</b><br/>{selectedTechnician.email || "N/A"}
                </p>
                <p>
                  <b>Mobile Number:</b><br/>
                  {selectedTechnician.mobileNumber || "N/A"}
                </p>
                <p>
                  <b>Gender:</b><br/>{selectedTechnician.gender || "N/A"}
                </p>
                <p>
                  <b>DOB:</b><br/>
                  {selectedTechnician?.dateOfBirth
                    ? new Date(
                        selectedTechnician?.dateOfBirth
                      ).toLocaleDateString()
                    : "N/A"}
                </p>
                <p>
                  <b>Experience (Years):</b><br/>
                  {selectedTechnician.experienceYears || "N/A"}
                </p>
                <p>
                  <b>Specialization:</b><br/>
                  {selectedTechnician.specialization.join(",") || "N/A"}
                </p>
                <p>
                  <b>Skills:</b><br/>{selectedTechnician.skills.join(",") || "N/A"}
                </p>
                <p>
                  <b>Address:</b>
                  <br /> {selectedTechnician.address?.street || "N/A"}
                  {","}
                  {selectedTechnician.address?.city}
                  {","}
                  {selectedTechnician.address?.region}
                  {","}
                  {selectedTechnician.address?.country}
                </p>
              </div>
            </div>
            <div className="admin-tech-card">
              <h5>Bank Details</h5>
              <div className="admin-tech-info-grid-2col">
                <p>
                  <b>Account Holder Name:</b><br/>
                  {selectedTechnician.bankDetails?.accountHolderName || "N/A"}
                </p>
                <p>
                  <b>Bank Name:</b><br/>
                  {selectedTechnician.bankDetails?.bankName || "N/A"}
                </p>
                <p>
                  <b>Account Number:</b><br/>
                  {selectedTechnician.bankDetails?.accountNumber || "N/A"}
                </p>
                <p>
                  <b>IFSC Code:</b><br/>
                  {selectedTechnician.bankDetails?.ifscOrSwiftCode || "N/A"}
                </p>
              </div>
            </div>
            <div className="admin-tech-card">
              <h5>Documents & Certifications</h5>
              <div className="d-flex align-items-center justify-content-between">
                <span>Id Proof Document</span>
                <div className="admin-doc-view-btn" onClick={handleOpenIdDoc}>
                  <IoEyeOutline className="me-2" /> View
                </div>
              </div>
              <div className="documents-section mt-3">
                {selectedTechnician?.certifications?.length > 0 ? (
                  selectedTechnician.certifications.map((cert, index) => (
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
                          className="admin-doc-view-btn"
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
                      selectedTechnician.licenseDetails?.expiryDate
                    ).toLocaleDateString()}
                  </small>
                </div>
                <div
                  className="admin-doc-view-btn"
                  onClick={handleOpenLicenseFileDoc}
                >
                  <IoEyeOutline className="me-2" /> View
                </div>
              </div>
            </div>

            <div className="admin-tech-card">
              <h5>Complaints / Feedback</h5>
              <p>No Complaints recorded.</p>
            </div>
          </div>
        </div>
      ) : (
        <div className="admin-technician-profile-container">
          <div className="d-flex align-items-center">
            <IoArrowBackOutline
              size={25}
              cursor={"Pointer"}
              onClick={backToItems}
            />
            <span className="fw-bold ms-3">View Technician Details</span>
          </div>
          <div className="admin-technician-profile-header mt-5">
            <div>
              <p>
                <b>Organization Name:</b>{" "}
                {selectedTechnician.organizationDetails?.organizationName ||
                  "N/A"}{" "}
                ({selectedTechnician.technicianType})
              </p>
              <p>
                <b>Owner Name:</b>{" "}
                {selectedTechnician.organizationDetails?.ownerName || "N/A"}
              </p>
              <p>
                <b>Technician ID:</b> {selectedTechnician._id}
              </p>
              <span className="admin-tech-status active">
                {selectedTechnician.status}
              </span>
            </div>
          </div>
          <div className="admin-tech-info-grid">
            <div className="admin-tech-card">
              <h5>Organization Details</h5>
              <div className="admin-tech-info-grid-2col">
                <p>
                  <b>Organization Name:</b><br/>
                  {selectedTechnician.organizationDetails?.organizationName ||
                    "N/A"}
                </p>
                <p>
                  <b>Owner Name:</b><br/>
                  {selectedTechnician.organizationDetails?.ownerName || "N/A"}
                </p>
                <p>
                  <b>Mobile Number:</b><br/>
                  {selectedTechnician.organizationDetails?.mobileNumber ||
                    "N/A"}
                </p>
                <p>
                  <b>Email:</b><br/>
                  {selectedTechnician.organizationDetails?.email || "N/A"}
                </p>
                <p>
                  <b>Address:</b><br />
                  {selectedTechnician.organizationDetails?.officeAddress
                    ?.street || "N/A"}
                  {","}
                  {selectedTechnician.organizationDetails?.officeAddress?.city}
                  {","}
                  {
                    selectedTechnician.organizationDetails?.officeAddress
                      ?.region
                  }
                  {","}
                  {
                    selectedTechnician.organizationDetails?.officeAddress
                      ?.country
                  }
                </p>
              </div>
            </div>
            <div className="admin-tech-card">
              <h5>Bank Details</h5>
              <div className="admin-tech-info-grid-2col">
                <p>
                  <b>Account Holder Name:</b><br/>
                  {selectedTechnician.organizationDetails?.bankDetails
                    ?.accountHolderName || "N/A"}
                </p>
                <p>
                  <b>Bank Name:</b><br/>
                  {selectedTechnician.organizationDetails?.bankDetails
                    ?.bankName || "N/A"}
                </p>
                <p>
                  <b>Account Number:</b><br/>
                  {selectedTechnician.organizationDetails?.bankDetails
                    ?.accountNumber || "N/A"}
                </p>
                <p>
                  <b>IFSC Code:</b><br/>
                  {selectedTechnician.organizationDetails?.bankDetails
                    ?.ifscOrSwiftCode || "N/A"}
                </p>
              </div>
            </div>
            <div className="admin-tech-card">
              <h5>Technician Details</h5>
              {selectedTechnician.organizationDetails?.technicians?.length > 0 ? (
                selectedTechnician.organizationDetails?.technicians?.map((techData, index) => (
                  <div>
                    <div className="admin-tech-info-grid-2col" key={index}>
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
                  {index !== selectedTechnician.organizationDetails?.technicians?.length - 1 && <hr />}
                  </div>
                ))
              ) : (
                <div>No Technician Found</div>
              )}
            </div>

            <div className="admin-tech-card">
              <h5>Documents & Certifications</h5>
              <div className="d-flex align-items-center justify-content-between">
                <div className="d-flex flex-column">
                  <span className="fw-bold mb-2">Commercial License</span>
                  <span>
                    License Number:{" "}
                    {
                      selectedTechnician.organizationDetails?.commercialLicense
                        ?.licenseNo
                    }
                  </span>
                  <span>
                    Expiry Date:{" "}
                    {new Date(
                      selectedTechnician.organizationDetails?.commercialLicense?.expiryDate
                    ).toLocaleDateString() || "N/A"}
                  </span>
                </div>
                <div
                  className="admin-doc-view-btn"
                  onClick={handleOpenCommercialLicenseDoc}
                >
                  <IoEyeOutline className="me-2" /> View
                </div>
              </div>
              <div className="documents-section mt-3">
                <div>
                  <strong>Organization Documents</strong>
                </div>
                {selectedTechnician?.organizationDetails?.organisationDocuments
                  ?.length > 0 ? (
                  selectedTechnician.organizationDetails?.organisationDocuments.map(
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

            <div className="admin-tech-card">
              <h5>Complaints / Feedback</h5>
              <p>No Complaints recorded.</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewTechnicianDetails;
