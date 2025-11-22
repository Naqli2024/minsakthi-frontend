import { useState } from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import Loader from "../../../../components/Loader";
import { toast } from "react-toastify";
import { setTechnicianPassword } from "../../../../redux/Technician/AuthSlice";
import { Form, Row, Col, Button, InputGroup } from "react-bootstrap";

const UpdatePassword = ({openUpdatePassword, setOpenUpdatePassword}) => {
  const navigateTo = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [formData, setFormData] = useState({
    emailOrMobile: "",
    createPassword: "",
    confirmPassword: "",
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
    try {
      setLoading(true);
      const response = await dispatch(setTechnicianPassword(formData)).unwrap();
      toast.success(response.message);
      setLoading(false);
      setOpenUpdatePassword(false)
    } catch (error) {
      toast.error(error);
      setLoading(false);
    }
  };

  return (
    <div>
      {loading && <Loader isLoading={loading} />}
      <div className="tech-login-form-card p-3">
            <h1>Set New Password</h1>
            <p>Please enter your New Password below to login</p>
            <Form.Group className="col-md-10 col-12">
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
              <Form.Label className="mt-4 fw-bold">
                Create New Password
              </Form.Label>
              <InputGroup>
                <Form.Control
                  className={`custom-textfield ${
                    errors.createPassword ? "error-border" : ""
                  }`}
                  placeholder="Password"
                  name="createPassword"
                  value={formData.createPassword}
                  onChange={handleChange}
                  type={showPassword ? "text" : "password"}
                />
                <InputGroup.Text
                  className={`${errors.createPassword ? "error-border" : ""}`}
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
                    errors.confirmPassword ? "error-border" : ""
                  }`}
                  placeholder="Confirm Password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  type={showConfirmPassword ? "text" : "password"}
                />
                <InputGroup.Text
                  className={`${
                    errors.confirmPassword ? "error-border" : ""
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
            <div className="tech-overall-btn-container mt-3 mb-3">
              <div
                className="tech-login-screen-btn bg-danger"
                onClick={()=> setOpenUpdatePassword(false)}
              >
                Cancel
              </div>
              <div
                className="tech-login-screen-btn"
                onClick={handleSubmit}
              >
                Set New Password
              </div>
            </div>
          </div>
    </div>
  )
}

export default UpdatePassword