import { useState } from "react";
import SignUpLogo from "../../assets/images/signup.svg";
import { InputGroup, Form } from "react-bootstrap";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { registerUser } from "../../redux/Auth/AuthSlice";
import { toast } from "react-toastify";
import Loader from "../../components/Loader";

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigateTo = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const [formData, setFormData] = useState({
    fullName: "",
    emailAddress: "",
    password: "",
    confirmPassword: "",
    phoneNumber: "",
    dob: "",
    address: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (value.trim() !== "") {
      setErrors((prev) => ({ ...prev, [name]: false }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {};
    Object.keys(formData).forEach((key) => {
      if (!formData[key].trim()) {
        newErrors[key] = true;
      }
    });

    if (formData.password !== formData.confirmPassword) {
      newErrors.password = true;
      newErrors.confirmPassword = true;
    }

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    try {
      setLoading(true);
      const response = await dispatch(registerUser(formData)).unwrap();
      toast.success(response?.message);
    } catch (error) {
      toast.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {loading && <Loader isLoading={loading} />}
      <div className="d-flex col-md-12 signup-content">
        <div className="col-md-6 signup-left-image">
          <img src={SignUpLogo} alt="SignUp" />
        </div>
        <div className="col-md-6 signup-right-card">
          <div className="signup-card">
            <h1>Create Your Account</h1>
            <p>Join Our Community Of Users and Service Providers</p>
            <Form.Group className="col-md-10 col-12 mt-4">
              <InputGroup>
                <Form.Control
                  className={`custom-textfield ${errors.fullName ? "error-border" : ""}`}
                  placeholder="Full Name"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                />
              </InputGroup>
              <InputGroup className="mt-4">
                <Form.Control
                  className={`custom-textfield ${errors.emailAddress ? "error-border" : ""}`}
                  placeholder="Email Address"
                  name="emailAddress"
                  value={formData.emailAddress}
                  onChange={handleChange}
                />
              </InputGroup>
              <InputGroup className="mt-4">
                <Form.Control
                  className={`custom-textfield ${errors.password ? "error-border" : ""}`}
                  placeholder="Password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  type={showPassword ? "text" : "password"}
                />
                <InputGroup.Text
                  className={`${errors.password ? "error-border" : ""}`}
                  onClick={() => setShowPassword(!showPassword)}
                  style={{ cursor: "pointer", background: "none" }}
                >
                  {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                </InputGroup.Text>
              </InputGroup>
              <InputGroup className="mt-4">
                <Form.Control
                  className={`custom-textfield ${errors.confirmPassword ? "error-border" : ""}`}
                  placeholder="Confirm Password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  type={showConfirmPassword ? "text" : "password"}
                />
                <InputGroup.Text
                 className={`${errors.confirmPassword ? "error-border" : ""}`}
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  style={{ cursor: "pointer", background: "none" }}
                >
                  {showConfirmPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                </InputGroup.Text>
              </InputGroup>
              <InputGroup className="mt-4">
                <Form.Control
                  className={`custom-textfield ${errors.dob ? "error-border" : ""}`}
                  placeholder="Date Of Birth"
                  name="dob"
                  value={formData.dob}
                  type="date"
                  onChange={handleChange}
                />
              </InputGroup>
              <InputGroup className="mt-4">
                <Form.Control
                  className={`custom-textfield ${errors.address ? "error-border" : ""}`}
                  placeholder="Address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  type="text"
                />
              </InputGroup>
              <InputGroup className="mt-4">
                <Form.Control
                  className={`custom-textfield ${errors.phoneNumber ? "error-border" : ""}`}
                  placeholder="Phone Number"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  type="number"
                />
              </InputGroup>
            </Form.Group>

            <div className="signup-btn" onClick={handleSubmit}>
              Register
            </div>

            <p className="new-user-text">
              Already have an account?{" "}
              <span onClick={() => navigateTo("/login")}>Sign in</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
