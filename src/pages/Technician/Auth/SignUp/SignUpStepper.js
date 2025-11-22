import { useState } from "react";
import { Form, Row, Col, InputGroup } from "react-bootstrap";
import { styled } from "@mui/material/styles";
import {
  Stepper,
  Step,
  StepLabel,
  StepConnector,
  stepConnectorClasses,
  Stack,
  Pagination,
} from "@mui/material";
import { FaHandshakeAngle } from "react-icons/fa6";
import { MdPerson } from "react-icons/md";
import { IoMdBuild } from "react-icons/io";
import { RiBankFill } from "react-icons/ri";
import { RiVerifiedBadgeFill } from "react-icons/ri";
import JoinUs from "./JoinUs";
import PersonalDetails from "./PersonalDetails";
import ProfessionalDetails from "./ProfessionalDetails";
import BankDetails from "./BankDetails";
import { useNavigate } from "react-router-dom";
import Loader from "../../../../components/Loader";
import { createAccount } from "../../../../redux/Technician/AuthSlice";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { AxiosError } from "axios";
import OTPVerification from "./OTPVerification";

const SignUpStepper = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
    [`&.${stepConnectorClasses.alternativeLabel}`]: {
      top: 25,
    },
    [`& .${stepConnectorClasses.line}`]: {
      height: 2,
      border: 0,
      backgroundColor: "#EFEFEF",
      borderRadius: 1,
    },
  }));

  const ColorlibStepIconRoot = styled("div")(({ theme, ownerState }) => ({
    backgroundColor: ownerState.active
      ? "#2FB972"
      : ownerState.completed
      ? "#2FB972"
      : "#EFEFEF",
    zIndex: 1,
    color: ownerState.active || ownerState.completed ? "white" : "#323232",
    width: 50,
    height: 50,
    display: "flex",
    borderRadius: "50%",
    justifyContent: "center",
    alignItems: "center",
    transition: "all 0.3s ease",
  }));

  function ColorlibStepIcon(props) {
    const { active, completed, className, icon } = props;
    const icons = {
      1: <FaHandshakeAngle size={25} />,
      2: <MdPerson size={25} />,
      3: <IoMdBuild size={25} />,
      4: <RiBankFill size={25} />,
      5: <RiVerifiedBadgeFill size={25} />,
    };

    return (
      <ColorlibStepIconRoot
        ownerState={{ completed, active }}
        className={className}
      >
        {icons[String(icon)]}
      </ColorlibStepIconRoot>
    );
  }

  const steps = [
    "Join Us",
    "Personal Details",
    "Professional Details",
    "Bank Details",
    "OTP Verification",
  ];

  const organizationSteps = [
    "Join Us",
    "Organization Details",
    "Technician Details",
    "Bank Details",
    "OTP Verification",
  ];

  const handlePageChange = (event, value) => {
    setActiveStep(value - 1);
  };

  const individualForm = {
    technicianType: "Individual",
    firstName: "",
    lastName: "",
    mobileNumber: "",
    email: "",
    gender: "",
    dateOfBirth: "",
    experienceYears: "",
    specialization: [],
    skills: [],
    address: {
      street: "",
      city: "",
      region: "",
      country: "",
      zipCode: "",
    },
    licenseDetails: {
      licenseNumber: "",
      issuedBy: "",
      issueDate: "",
      expiryDate: "",
    },
    certificationDetails: [
      {
        certificationName: "",
        issuedBy: "",
        issueDate: "",
      },
    ],
    profilePhoto: null,
    idProofDocument: null,
    licenseFile: null,
    certifications: null,
    bankDetails: {
      accountHolderName: "",
      bankName: "",
      accountNumber: "",
      ifscOrSwiftCode: "",
    },
  };

  const organizationForm = {
    technicianType: "Organization",
    organizationDetails: {
      organizationName: "",
      ownerName: "",
      email: "",
      mobileNumber: "",
      officeAddress: {
        street: "",
        city: "",
        region: "",
        country: "",
        pincode: "",
      },
      commercialLicense: {
        licenseNo: "",
        expiryDate: "",
      },
      taxNumber: "",
      bankDetails: {
        accountHolderName: "",
        bankName: "",
        accountNumber: "",
        ifscOrSwiftCode: "",
      },
      technicians: [
        {
          firstName: "",
          lastname: "",
          mobileNumber: "",
          email: "",
          specialization: [],
          skills: [],
          experienceYears: "",
          licenseDetails: {
            licenseNo: "",
            expiryDate: "",
          },
        },
      ],
    },
    organizationProfilePhoto: null,
    commercialLicenseFile: null,
    organisationDocuments: null,
    technicianProfilePhotos: null,
  };

  const [formData, setFormData] = useState(individualForm);

  const renderStepContent = () => {
    const type = formData.technicianType;
    switch (activeStep) {
      case 0:
        return (
          <JoinUs
            formData={formData}
            setFormData={setFormData}
            technicianType={type}
            individualForm={individualForm}
            organizationForm={organizationForm}
          />
        );
      case 1:
        return (
          <PersonalDetails
            formData={formData}
            setFormData={setFormData}
            technicianType={type}
          />
        );
      case 2:
        return (
          <ProfessionalDetails
            formData={formData}
            setFormData={setFormData}
            technicianType={type}
          />
        );
      case 3:
        return (
          <BankDetails
            formData={formData}
            setFormData={setFormData}
            technicianType={type}
          />
        );
      case 4:
        return (
          <OTPVerification
            formData={formData}
            setFormData={setFormData}
            technicianType={type}
          />
        );
      default:
        return null;
    }
  };

  const handleSubmit = async () => {
    try {
      const payload = new FormData();

      payload.append("technicianType", formData.technicianType);

      if (formData.technicianType === "Individual") {
        payload.append("firstName", formData.firstName);
        payload.append("lastName", formData.lastName);
        payload.append("mobileNumber", formData.mobileNumber);
        payload.append("email", formData.email);
        payload.append("gender", formData.gender);
        payload.append("dateOfBirth", formData.dateOfBirth);
        payload.append("experienceYears", formData.experienceYears);

        payload.append("address", JSON.stringify(formData.address));
        payload.append(
          "licenseDetails",
          JSON.stringify(formData.licenseDetails)
        );
        payload.append("bankDetails", JSON.stringify(formData.bankDetails));
        payload.append(
          "certificationDetails",
          JSON.stringify(formData.certificationDetails)
        );

        if (formData.profilePhoto)
          payload.append("profilePhoto", formData.profilePhoto);
        if (formData.idProofDocument)
          payload.append("idProofDocument", formData.idProofDocument);
        if (formData.licenseFile)
          payload.append("licenseFile", formData.licenseFile);
        if (formData.certifications)
          payload.append("certifications", formData.certifications);

        formData.skills.forEach((s, i) => payload.append(`skills[${i}]`, s));
        formData.specialization.forEach((s, i) =>
          payload.append(`specialization[${i}]`, s)
        );
      } else if (formData.technicianType === "Organization") {
        const org = formData.organizationDetails;

        payload.append(
          "organizationDetails",
          JSON.stringify({
            organizationName: org.organizationName,
            ownerName: org.ownerName,
            email: org.email,
            mobileNumber: org.mobileNumber,
            officeAddress: org.officeAddress,
            commercialLicense: org.commercialLicense,
            taxNumber: org.taxNumber,
            bankDetails: org.bankDetails,
            technicians: org.technicians,
          })
        );

        if (formData.organizationProfilePhoto)
          payload.append(
            "organizationProfilePhoto",
            formData.organizationProfilePhoto
          );
        if (formData.commercialLicenseFile)
          payload.append(
            "commercialLicenseFile",
            formData.commercialLicenseFile
          );
        if (formData.organisationDocuments)
          payload.append(
            "organisationDocuments",
            formData.organisationDocuments
          );
        if (formData.technicianProfilePhotos)
          payload.append(
            "technicianProfilePhotos",
            formData.technicianProfilePhotos
          );
      }
      setLoading(true);
      const response = await dispatch(createAccount(payload)).unwrap();
      toast.success(response.message);
      setActiveStep(4);
    } catch (error) {
      toast.error(error);
      setActiveStep(3);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {loading && <Loader isLoading={loading} />}
      <div className="tech-join-us-top-content"></div>
      <div className="d-flex justify-content-center">
        <div className="tech-join-us-card">
          <Stack sx={{ width: "100%" }} spacing={4} className="mt-5">
            {formData.technicianType === "Individual" ? (
              <Stepper
                alternativeLabel
                activeStep={activeStep}
                connector={<ColorlibConnector />}
              >
                {steps.map((label) => (
                  <Step key={label}>
                    <StepLabel StepIconComponent={ColorlibStepIcon}>
                      {label}
                    </StepLabel>
                  </Step>
                ))}
              </Stepper>
            ) : (
              <Stepper
                alternativeLabel
                activeStep={activeStep}
                connector={<ColorlibConnector />}
              >
                {organizationSteps.map((label) => (
                  <Step key={label}>
                    <StepLabel StepIconComponent={ColorlibStepIcon}>
                      {label}
                    </StepLabel>
                  </Step>
                ))}
              </Stepper>
            )}
            <div className="mt-3 render-signup-step-content">
              {renderStepContent()}
            </div>
            {activeStep === 3 && (
              <div className="d-flex justify-content-center">
                <div className="tech-signup-btns" onClick={handleSubmit}>
                  Create Account
                </div>
              </div>
            )}
            <div className="mt-4">
              <Pagination
                className="d-flex justify-content-center"
                count={activeStep === 4 || activeStep === 5 ? 5 : 4}
                page={activeStep + 1}
                onChange={handlePageChange}
                sx={{
                  "& .MuiPaginationItem-root": {
                    borderColor: "#2FB972",
                  },
                  "& .MuiPaginationItem-root.Mui-selected": {
                    backgroundColor: "#2FB972",
                    color: "white",
                  },
                  "& .MuiPaginationItem-root.Mui-selected:hover": {
                    backgroundColor: "#27a665",
                  },
                }}
              />
            </div>
          </Stack>
        </div>
      </div>
    </div>
  );
};

export default SignUpStepper;
