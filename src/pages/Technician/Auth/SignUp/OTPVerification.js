import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import Loader from "../../../../components/Loader";
import Congrats from "../../../../assets/images/congrats.svg";
import { IoMdClose } from "react-icons/io";
import { Button } from "react-bootstrap";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { resendOTP, verifyOTP } from "../../../../redux/Technician/AuthSlice";

const OTPVerification = ({ formData, setFormData, technicianType }) => {
  const navigateTo = useNavigate();
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [errors, setErrors] = useState([false, false, false, false]);
  const [timer, setTimer] = useState(30);
  const [openSuccessModal, setOpenSuccessModal] = useState(false);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [timer]);

  const handleChange = (e, index) => {
    const value = e.target.value;
    if (/^[0-9]?$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      setFormData((prev) => ({
        ...prev,
        otp: newOtp.join(""),
      }));

      const newErrors = [...errors];
      newErrors[index] = false;
      setErrors(newErrors);

      if (value && index < otp.length - 1) {
        document.getElementById(`otp-${index + 1}`).focus();
      }
    }
  };

  const handleResend = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        emailOrMobile: technicianType === "Organization"? formData.organizationDetails.mobileNumber :formData.mobileNumber,
      }
      setOtp(["", "", "", ""]);
      setErrors([false, false, false, false]);
      setTimer(30);
      setLoading(true);
        const response = await dispatch(resendOTP(payload));
        toast.success(response.payload.message);
    } catch (error) {
      toast.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = otp.map((digit) => digit.trim() === "");
    setErrors(newErrors);

    if (newErrors.includes(true)) return;

    try {
      const payload = {
        mobileNumber: technicianType === "Organization"? formData.organizationDetails.mobileNumber :formData.mobileNumber,
        otpCode: otp.join(""),
      }
      setLoading(true);
      const response = await dispatch(verifyOTP(payload)).unwrap();
      toast.success(response?.message);
      setLoading(false);
      setOpenSuccessModal(true);
    } catch (error) {
      toast.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {loading && <Loader isLoading={loading} />}
      <div className="d-flex justify-content-center">
        <div className="tech-verify-otp">
          <h1>Verify OTP</h1>
          <p>Enter the code sent to your mobile number</p>

          <div className="tech-otp-container">
            <div className="tech-otp-boxes">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  id={`otp-${index}`}
                  type="text"
                  maxLength="1"
                  value={digit}
                  onChange={(e) => handleChange(e, index)}
                  className={`tech-otp-input ${
                    errors[index] ? "error-border" : ""
                  }`}
                />
              ))}
            </div>

            <div className="tech-otp-timer">
              <span>00:{timer < 10 ? `0${timer}` : timer}</span>
            </div>
          </div>

          <div className="tech-verify-otp-btn" onClick={handleSubmit}>
            Verify OTP
          </div>

          {timer === 0 && (
            <p className="tech-new-user-text">
              Didn't receive OTP?{" "}
              <span onClick={handleResend} className="tech-resend-btn">
                Resend
              </span>
            </p>
          )}
        </div>
      </div>

      <Dialog
        open={openSuccessModal}
        onClose={() => navigateTo("/technician")}
        sx={{ "& .MuiDialog-paper": { width: "400px", maxWidth: "100vw" } }}
      >
        <DialogTitle sx={{ padding: 0 }}>
          <div className="d-flex justify-content-end p-3">
            <IoMdClose
              cursor="pointer"
              size={20}
              onClick={() => navigateTo("/technician")}
            />
          </div>
        </DialogTitle>
        <DialogContent>
          <div className="congrats-logo">
            <img src={Congrats} alt="congrats" />
          </div>
          <div className="d-flex justify-content-center m-3 fw-bold">
            OTP Verified Successfully
          </div>
          <div className="new-user-text">
            <p className="text-success mb-0">Please wait until the admin approves your account</p>
            <br/>
            <p className="text-success mb-0">Once Approved you'll receive an SMS</p>
            <br/>
            <p className="fw-bold text-dark">Thank you for your patience</p>
          </div>
        </DialogContent>
        <DialogActions sx={{ marginBottom: "20px", justifyContent: "center" }}>
          <Button
            className="congrats-modal-btn px-5"
            onClick={() => navigateTo("/technician")}
          >
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default OTPVerification;
