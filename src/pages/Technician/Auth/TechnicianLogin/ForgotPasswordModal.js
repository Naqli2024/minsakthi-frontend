import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Slide,
} from "@mui/material";
import { Button, Form, InputGroup } from "react-bootstrap";
import { MdOutlineCancel } from "react-icons/md";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import {
  forgetPassword,
  resetPassword,
} from "../../../../redux/Technician/AuthSlice";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

const ForgotPasswordDialog = ({
  openForgotPasswordModal,
  setOpenForgotPasswordModal,
}) => {
  const [openSetNewPassword, setOpenSetNewPassword] = useState(false);
  const [forgotPasswordEmailOrMobile, setForgotPasswordEmailOrMobile] =
    useState();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const dispatch = useDispatch();
  const [errors, setErrors] = useState({});
  const [otp, setOtp] = useState(new Array(4).fill(""));

  const [formData, setFormData] = useState({
    emailOrMobile: "",
    newPassword: "",
    confirmNewPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setErrors((prev) => ({ ...prev, [name]: false }));
  };

  const handleOTPChange = (element, index) => {
    const value = element.value.replace(/\D/, "");
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (element.nextSibling && value) {
      element.nextSibling.focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && e.target.previousSibling) {
      e.target.previousSibling.focus();
    }
  };

  const handleForgetPasswordSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        emailOrMobile: forgotPasswordEmailOrMobile,
      };
      const response = await dispatch(forgetPassword(payload)).unwrap();
      toast.success(response.message);
      setOpenSetNewPassword(true);
    } catch (error) {
      toast.error(error);
    }
  };

  const handleResetPasswordSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        emailOrMobile: forgotPasswordEmailOrMobile,
        otpCode: otp,
        newPassword: formData.newPassword,
        confirmPassword: formData.confirmNewPassword,
      };
      const response = await dispatch(resetPassword(payload)).unwrap();
      toast.success(response.message);
      setOpenForgotPasswordModal(false);
    } catch (error) {
      toast.error(error);
    }
  };

  return (
    <Dialog
      open={openForgotPasswordModal}
      TransitionComponent={Transition}
      keepMounted
      onClose={() => setOpenForgotPasswordModal(false)}
      sx={{
        "& .MuiDialog-paper": {
          width: "600px",
          maxWidth: "100vw",
          borderRadius: "10px",
        },
      }}
    >
      <DialogTitle sx={{ padding: 0 }}>
        <div className="new-booking-dialog-header py-3 px-4">
          <p className="m-0 fw-bold text-center">
            {openSetNewPassword ? "Reset Password" : "Forgot Password"}
          </p>
          <MdOutlineCancel
            cursor="pointer"
            color="white"
            size={25}
            onClick={() => setOpenForgotPasswordModal(false)}
          />
        </div>
      </DialogTitle>

      <DialogContent sx={{ mt: 2, padding: '30px'  }}>
        {!openSetNewPassword ? (
          <Form.Group className="col-12">
            <Form.Label className="fw-bold">Email / Mobile Number</Form.Label>
            <InputGroup>
              <Form.Control
                className="form-control"
                type="text"
                placeholder="Enter your email"
                name="emailOrMobile"
                value={forgotPasswordEmailOrMobile}
                onChange={(e) => setForgotPasswordEmailOrMobile(e.target.value)}
              />
            </InputGroup>
          </Form.Group>
        ) : (
          <div className="col-12">
            <p className="mb-2 text-center fw-bold text-muted">
              Enter a New Password below
            </p>
            <div className="mt-3">
              <p className="mb-2 text-center fw-bold">OTP</p>
              <div className="d-flex align-items-center justify-content-center gap-3">
                {otp.map((data, i) => (
                  <input
                    key={i}
                    type="text"
                    maxLength="1"
                    value={data}
                    onChange={(e) => handleOTPChange(e.target, i)}
                    onKeyDown={(e) => handleKeyDown(e, i)}
                    className="otp-input"
                  />
                ))}
              </div>
            </div>
            <Form.Group className="col-12 mb-3">
              <Form.Label className="mt-4 fw-bold">
                Create New Password
              </Form.Label>
              <InputGroup>
                <Form.Control
                  className={`custom-textfield ${
                    errors.newPassword ? "error-border" : ""
                  }`}
                  placeholder="Password"
                  name="newPassword"
                  value={formData.newPassword}
                  onChange={handleChange}
                  type={showPassword ? "text" : "password"}
                />
                <InputGroup.Text
                  className={`${errors.newPassword ? "error-border" : ""}`}
                  onClick={() => setShowPassword(!showPassword)}
                  style={{ cursor: "pointer", background: "none" }}
                >
                  {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                </InputGroup.Text>
              </InputGroup>

              <Form.Label className="mt-4 fw-bold">Confirm Password</Form.Label>
              <InputGroup>
                <Form.Control
                  className={`custom-textfield ${
                    errors.confirmNewPassword ? "error-border" : ""
                  }`}
                  placeholder="Confirm Password"
                  name="confirmNewPassword"
                  value={formData.confirmNewPassword}
                  onChange={handleChange}
                  type={showConfirmPassword ? "text" : "password"}
                />
                <InputGroup.Text
                  className={`${
                    errors.confirmNewPassword ? "error-border" : ""
                  }`}
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  style={{ cursor: "pointer", background: "none" }}
                >
                  {showConfirmPassword ? (
                    <VisibilityOffIcon />
                  ) : (
                    <VisibilityIcon />
                  )}
                </InputGroup.Text>
              </InputGroup>
            </Form.Group>
          </div>
        )}
      </DialogContent>

      <DialogActions className="d-md-flex align-items-center justify-content-center m-3">
        <Button
          className="bg-danger border-0 px-5 py-2"
          onClick={() => setOpenForgotPasswordModal(false)}
        >
          Cancel
        </Button>

        <Button
          className="address-modal-btn px-5 py-2"
          onClick={
            !openSetNewPassword
              ? handleForgetPasswordSubmit
              : handleResetPasswordSubmit
          }
        >
          {!openSetNewPassword ? "Send" : "Reset Password"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ForgotPasswordDialog;
