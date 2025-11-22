import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import BookingConfirmed from "../../../assets/images/booking-confirmed.svg";
import Typography from "@mui/material/Typography";
import { InputGroup, Form } from "react-bootstrap";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { IoSearchOutline } from "react-icons/io5";
import { MdOutlineCancel } from "react-icons/md";
import Drawer from "@mui/material/Drawer";
import { useRef, useState } from "react";
import Box from "@mui/material/Box";
import { IoMdCloudUpload } from "react-icons/io";
import { Button } from "react-bootstrap";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";

const Help = () => {
  const [searchTerms, setSearchTerms] = useState("");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedPriority, setSelectedPriority] = useState(null);
  const [openReportSuccessModal, setOpenReportSuccessModal] = useState(false);
  const photoInputRef = useRef(null);
  const [photoFiles, setPhotoFiles] = useState([]);
  const closeDrawer = () => setDrawerOpen(false);

  const questionAndAnswer = [
    {
      question: "Login & Account Issues",
      answers: [
        {
          description:
            "1. Forgot Password: Click ‘Forgot Password’ on the login page, enter your email, and follow the instructions in the email to reset your password.",
        },
        {
          description:
            "2. Account Locked: If your account is locked, please contact support with your account details to unlock it. This may happen after several failed login attempts.",
        },
        {
          description:
            "3. Update Profile: To update your personal information, navigation to ‘Account Settings’ after logging in. There you can update your name, email, and contact details.",
        },
      ],
    },
    {
      question: "Service & Booking",
      answers: [
        {
          description: "Service &Booking",
        },
      ],
    },
    {
      question: "Payment & Billing",
      answers: [
        {
          description: "Payment & Billing",
        },
      ],
    },
    {
      question: "Technical Problems",
      answers: [
        {
          description: "Payment & Billing",
        },
      ],
    },
  ];

  const filteredQuestions = questionAndAnswer.filter((ques) =>
    ques.question.toLowerCase().includes(searchTerms.toLowerCase())
  );

  const handlePhotoFileChange = (e) => {
    const selected = Array.from(e.target.files);
    setPhotoFiles(selected);
  };

  const handlePhotoDrop = (e) => {
    e.preventDefault();
    const dropped = Array.from(e.dataTransfer.files);
    setPhotoFiles(dropped);
  };

  return (
    <div>
      <div className="help-support-container container">
        <div className="d-md-flex align-items-center justify-content-between">
          <div></div>
          <div>
            <h3 className="fw-bold">Help & Support</h3>
            <p>
              Find answers to common questions or contact us for further
              assistance.
            </p>
          </div>
          <div>
            <div className="submit-btn" onClick={() => setDrawerOpen(true)}>
              Report
            </div>
          </div>
        </div>
        <InputGroup className="mb-3 mt-3">
          <InputGroup.Text
            style={{
              background: "none",
              borderRight: "none",
              padding: "0",
            }}
          >
            <IoSearchOutline className="ms-3" />
          </InputGroup.Text>
          <Form.Control
            type="text"
            placeholder="Search for help topic, e.g. 'Password reset'"
            style={{ borderLeft: "none", height: "40px", boxShadow: "none" }}
            onFocus={(e) => {
              e.target.style.border = "1px solid #DBDBDB";
              e.target.style.borderLeft = "none";
            }}
            value={searchTerms}
            onChange={(e) => setSearchTerms(e.target.value)}
          />
        </InputGroup>
        {filteredQuestions.map((helpQuestion, index) => (
          <Accordion
            key={index}
            sx={{
              mt: 2,
              boxShadow: "none",
              border: "1px solid #DBDBDB",
              borderRadius: "6px",
              "&:before": { display: "none" },
            }}
          >
            <AccordionSummary
              expandIcon={
                <ArrowDropDownIcon sx={{ fontSize: "16px !important" }} />
              }
              aria-controls={`panel${index}-content`}
              id={`panel${index}-header`}
            >
              <Typography
                component="span"
                sx={{ fontWeight: "bold", color: "#3E3E3E" }}
              >
                {helpQuestion.question}
              </Typography>
            </AccordionSummary>
            <AccordionDetails
              className="text-start"
              sx={{
                borderTop: "1px solid #DBDBDB",
                borderBottom: "none",
                pb: 0,
              }}
            >
              {helpQuestion.answers.map((helpAnswer, i) => (
                <Typography className="py-3" key={i}>
                  {helpAnswer?.description}
                </Typography>
              ))}
            </AccordionDetails>
          </Accordion>
        ))}
      </div>

      <Drawer
        anchor="bottom"
        open={drawerOpen}
        onClose={closeDrawer}
        PaperProps={{
          sx: {
            borderTopLeftRadius: "10px",
            borderTopRightRadius: "10px",
            width: "800px",
            mx: "auto",
          },
        }}
      >
        <Box className="drawer-report">
          <div className="d-flex justify-content-between px-5 pt-4">
            <h3 className="fw-bold">Report an Issue</h3>
            <MdOutlineCancel
              color="black"
              cursor="pointer"
              size={25}
              onClick={closeDrawer}
            />
          </div>
          <div className="d-flex flex-column px-5">
            <p>Booking ID: #123456</p>
            <Form.Group className="mt-3">
              <Form.Label>Issue Type</Form.Label>
              <Form.Select name="issueType" className="drop-control">
                <option>Select Issue Type</option>
                <option>Repair & Maintenance - Electrical, Appliance</option>
                <option>EB - Complaints</option>
                <option>Solar Services</option>
                <option>Contract Services</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mt-4">
              <Form.Label>Problem Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={4}
                className="problem-field"
                placeholder="Describe your issue in detail"
                autoFocus
                onClick={(e) => e.stopPropagation()}
              />
            </Form.Group>
            <div className="mt-4 mb-1">Attachments</div>
            <div
              className="report-upload-card"
              onDrop={handlePhotoDrop}
              onDragOver={(e) => e.preventDefault()}
            >
              <IoMdCloudUpload color="#2fb972" size={30} />
              <div>
                {photoFiles.length > 0 ? (
                  <div className="mt-3">
                    {photoFiles.map((file, idx) => (
                      <p key={idx}>{file.name}</p>
                    ))}
                  </div>
                ) : (
                  <div>
                    <p className="mt-3 mb-0">Upload Photos</p>
                    <p>Click to upload or drag and drop</p>
                  </div>
                )}
              </div>

              <div
                className="browse-file-btn"
                onClick={() => photoInputRef.current.click()}
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
            <div className="mt-4 mb-1">Priority</div>
            <div className="d-flex gap-3">
              <div
                className={`report-priority-btn ${
                  selectedPriority === "normal" ? "active" : ""
                }`}
                onClick={() => setSelectedPriority("normal")}
              >
                Normal
              </div>

              <div
                className={`report-priority-btn ${
                  selectedPriority === "high" ? "active" : ""
                }`}
                onClick={() => setSelectedPriority("high")}
              >
                High
              </div>
            </div>
            <div className="d-flex justify-content-end m-4">
              <div className="submit-btn" onClick={()=>{
                setOpenReportSuccessModal(true)
                setDrawerOpen(false)
                }}>
                Submit
              </div>
          </div>
          </div>
        </Box>
      </Drawer>

          <Dialog
        open={openReportSuccessModal}
        onClose={() => setOpenReportSuccessModal(false)}
        sx={{
          "& .MuiDialog-paper": { width: "500px", maxWidth: "100vw" },
        }}
      >
        <DialogTitle sx={{ padding: 0 }}>
          <div className="d-flex justify-content-end p-3">
            <MdOutlineCancel
              color="#3F3F3F"
              cursor="pointer"
              size={25}
              onClick={() => setOpenReportSuccessModal(false)}
            />
          </div>
        </DialogTitle>
        <DialogContent>
          <div className="booking-confirm-modal">
            <img src={BookingConfirmed} />
            <p className="fw-bold confirm-text">Report Successfully Created!</p>
          </div>
        </DialogContent>
        <DialogActions className="d-flex justify-content-center mb-4">
          <Button
            className="address-modal-btn px-5"
            onClick={() => setOpenReportSuccessModal(false)}
          >
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Help;
