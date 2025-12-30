import Technician from "../../../../assets/images/technician-login.svg";
import { useState } from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import Loader from "../../../../components/Loader";
import { toast } from "react-toastify";
import { technicianLogin } from "../../../../redux/Technician/AuthSlice";
import { MdOutlineCancel } from "react-icons/md";
import { Form, Row, Col, Button, InputGroup } from "react-bootstrap";
import ForgotPasswordModal from "./ForgotPasswordModal";
import UpdatePassword from "./UpdatePassword";

const TechnicianLogin = () => {
  const [openForgotPasswordModal, setOpenForgotPasswordModal] = useState(false);
  const [openUpdatePassword, setOpenUpdatePassword] = useState(false);
  const navigateTo = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [formData, setFormData] = useState({
    emailOrMobile: "",
    password: "",
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

    Object.keys(formData).forEach((key) => {
      if (!formData[key]?.trim()) {
        newErrors[key] = true;
      }
    });

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;
    try {
      setLoading(true);
      const response = await dispatch(technicianLogin(formData)).unwrap();
      toast.success(response.message);
      setLoading(false);
      navigateTo("/technician/dashboard");
    } catch (error) {
      toast.error(error);
      setLoading(false);
    }
  };

  return (
    <div>
      {loading && <Loader isLoading={loading} />}
      <div className="tech-login-overall-container">
        <div className="tech-login-img">
          <img src={Technician} alt="technician-login" />
        </div>
        <div
          className={`tech-login-flip-card ${
            openUpdatePassword ? "flipped" : ""
          }`}
        >
          <div className="tech-login-flip-inner">
            <div className="tech-login-flip-front">
              <div className="tech-login-form-card">
                <h1>Welcome Back</h1>
                <p>Please enter your details to login</p>

                <Form.Group className="col-md-10 col-12 mt-3">
                  <Form.Label className="fw-bold">Email Id / Mobile</Form.Label>
                  <InputGroup>
                    <Form.Control
                      className={`custom-textfield ${
                        errors.emailOrMobile ? "error-border" : ""
                      }`}
                      placeholder="Enter your email"
                      name="emailOrMobile"
                      value={formData.emailOrMobile}
                      onChange={handleChange}
                    />
                  </InputGroup>
                  <Form.Label className="mt-4 fw-bold">Password</Form.Label>
                  <InputGroup>
                    <Form.Control
                      className={`custom-textfield ${
                        errors.password ? "error-border" : ""
                      }`}
                      placeholder="Password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      type={showPassword ? "text" : "password"}
                    />
                    <InputGroup.Text
                      onClick={() => setShowPassword(!showPassword)}
                      style={{ cursor: "pointer", background: "none" }}
                    >
                      {showPassword ? (
                        <VisibilityOffIcon />
                      ) : (
                        <VisibilityIcon />
                      )}
                    </InputGroup.Text>
                  </InputGroup>
                </Form.Group>

                <p
                  className="forgot-pwd-text text-end mt-2"
                  onClick={() => setOpenForgotPasswordModal(true)}
                >
                  Forgot Password?
                </p>

                <div className="tech-overall-btn-container">
                  <div
                    className="tech-login-new-pwd-btn"
                    onClick={() => setOpenUpdatePassword(true)}
                  >
                    Set New Password
                  </div>
                  <div className="tech-login-screen-btn" onClick={handleSubmit}>
                    Login
                  </div>
                </div>
                <p className="new-user-text">
                  New to{" "}
                  <span onClick={() => navigateTo("/technician/sign-up")}>
                    MinSakthi24h
                  </span>
                  ?{" "}
                  <span onClick={() => navigateTo("/technician/sign-up")}>
                    Create an account
                  </span>
                </p>
              </div>
            </div>
            <div className="tech-login-flip-back">
              <UpdatePassword
                openUpdatePassword={openUpdatePassword}
                setOpenUpdatePassword={setOpenUpdatePassword}
              />
            </div>
          </div>
        </div>
      </div>

      {openForgotPasswordModal && (
        <ForgotPasswordModal
          openForgotPasswordModal={openForgotPasswordModal}
          setOpenForgotPasswordModal={setOpenForgotPasswordModal}
        />
      )}
    </div>
  );
};

export default TechnicianLogin;
