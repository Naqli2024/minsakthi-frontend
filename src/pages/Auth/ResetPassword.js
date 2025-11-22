import React, { useState } from "react";
import { InputGroup, Form } from "react-bootstrap";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { useLocation, useNavigate } from "react-router-dom";
import ResetPasswordLogo from "../../assets/images/reset-password.svg";
import { useDispatch } from "react-redux";
import { resetPassword } from "../../redux/Auth/AuthSlice";
import { toast } from "react-toastify";
import Loader from "../../components/Loader";

const ResetPassword = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigateTo = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const token = searchParams.get("token");
  const emailAddress = searchParams.get("emailAddress");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const [errors, setErrors] = useState({}); 

  const [formData, setFormData] = useState({
    token: token,
    emailAddress: emailAddress,
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {};

    // Check for empty fields
    Object.keys(formData).forEach((key) => {
      if (!formData[key]?.trim()) {
        newErrors[key] = true;
      }
    });

    if (formData.newPassword !== formData.confirmNewPassword) {
      newErrors.newPassword = true;
      newErrors.confirmNewPassword = true;
    }

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    try {
      setLoading(true);
      const response = await dispatch(resetPassword(formData)).unwrap();
      toast.success(response.message);
      navigateTo("/login");
    } catch (error) {
      toast.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {loading && <Loader isLoading={loading} />}
      <div className="d-flex col-md-12 verify-otp-content">
        <div className="col-md-6 verify-otp-left-image">
          <img src={ResetPasswordLogo} alt="OTP" />
        </div>

        <div className="col-md-6 verify-otp-right-card">
          <div className="verify-otp-card">
            <h1>Reset your password?</h1>
            <p className="mb-5">Enter a new password below</p>

            <Form.Group className="col-md-10 col-12 mb-3">
              <Form.Label className="mt-4 fw-bold">Create New Password</Form.Label>
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
                 className={`${
                    errors.newPassword ? "error-border" : ""
                  }`}
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
                  onClick={() =>
                    setShowConfirmPassword(!showConfirmPassword)
                  }
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

            <div className="verify-otp-btn" onClick={handleSubmit}>
              Reset Password
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
