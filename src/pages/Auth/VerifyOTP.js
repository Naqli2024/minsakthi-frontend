import React, { useEffect, useState } from "react";
import OTP from "../../assets/images/otp.svg";
import { useLocation, useNavigate } from "react-router-dom";
import { IoMdClose } from "react-icons/io";
import { Button } from "react-bootstrap";
import Congrats from "../../assets/images/congrats.svg";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { resendOTP, verifyEmail, verifyOTP } from "../../redux/Auth/AuthSlice";
import { toast } from "react-toastify";
import Loader from "../../components/Loader";

const VerifyOTP = () => {
  const navigateTo = useNavigate();
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [errors, setErrors] = useState([false, false, false, false]); 
  const [timer, setTimer] = useState(30);
  const [openSuccessModal, setOpenSuccessModal] = useState(false);
  const dispatch = useDispatch();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const token = searchParams.get("token");
  const emailAddress = searchParams.get("email");
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    emailAddress: emailAddress || "",
    otp: "",
  });

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
      setOtp(["", "", "", ""]);
      setErrors([false, false, false, false]);
      setTimer(30);
      setLoading(true);
      const response = await dispatch(resendOTP(emailAddress));
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
      setLoading(true);
      const response = await dispatch(verifyOTP(formData)).unwrap();
      toast.success(response?.message);
      setOpenSuccessModal(true);
    } catch (error) {
      toast.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!token || !emailAddress) {
      toast.error("Verification token or email is missing.");
      return;
    }

    dispatch(verifyEmail({ token, emailAddress }))
      .unwrap()
      .then((response) => {
        if (response.success) toast.success(response.message);
        else toast.error(response.message);
      })
      .catch((err) => toast.error(err));
  }, [dispatch, token, emailAddress]);

  return (
    <div>
      {loading && <Loader isLoading={loading} />}
      <div className="d-flex col-md-12 verify-otp-content">
        <div className="col-md-6 verify-otp-left-image">
          <img src={OTP} alt="OTP" />
        </div>
        <div className="col-md-6 verify-otp-right-card">
          <div className="verify-otp-card">
            <h1>Verify OTP</h1>
            <p>Enter the code sent to your mobile number</p>

            <div className="otp-container">
              <div className="otp-boxes">
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    id={`otp-${index}`}
                    type="text"
                    maxLength="1"
                    value={digit}
                    onChange={(e) => handleChange(e, index)}
                    className={`otp-input ${errors[index] ? "error-border" : ""}`}
                  />
                ))}
              </div>

              <div className="otp-timer">
                <span>00:{timer < 10 ? `0${timer}` : timer}</span>
              </div>
            </div>

            <div className="verify-otp-btn" onClick={handleSubmit}>
              Verify OTP
            </div>

            {timer === 0 && (
              <p className="new-user-text">
                Didn't receive OTP? <span onClick={handleResend}>Resend</span>
              </p>
            )}
          </div>
        </div>
      </div>

      <Dialog
        open={openSuccessModal}
        onClose={() => navigateTo("/login")}
        sx={{ "& .MuiDialog-paper": { width: "400px", maxWidth: "100vw" } }}
      >
        <DialogTitle sx={{ padding: 0 }}>
          <div className="d-flex justify-content-end p-3">
            <IoMdClose
              cursor="pointer"
              size={20}
              onClick={() => navigateTo("/login")}
            />
          </div>
        </DialogTitle>
        <DialogContent>
          <div className="congrats-logo">
            <img src={Congrats} alt="congrats" />
          </div>
          <div className="d-flex justify-content-center m-3 fw-bold">
            Congratulations
          </div>
          <div className="new-user-text">
            Your Account has been created successfully
            <br />
            Please Login to continue
          </div>
        </DialogContent>
        <DialogActions sx={{ marginBottom: "20px", justifyContent: "center" }}>
          <Button
            className="congrats-modal-btn px-5"
            onClick={() => navigateTo("/login")}
          >
            Continue
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default VerifyOTP;
