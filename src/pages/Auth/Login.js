import { useState } from "react";
import LoginLogo from "../../assets/images/login.svg";
import { InputGroup, Form } from "react-bootstrap";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginUser } from "../../redux/Auth/AuthSlice";
import { toast } from "react-toastify";
import Loader from "../../components/Loader";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigateTo = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false); 
  const [errors, setErrors] = useState({}); 
  const [formData, setFormData] = useState({
    emailAddress: "",
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
      const response = await dispatch(loginUser(formData)).unwrap();
      toast.success(response.message);
      setLoading(false);
      if(response.user?.isAdmin === true) {
        navigateTo('/admin/home')
      } else {
        navigateTo('/user/dashboard');
      }
    } catch (error) {
      toast.error(error);
      setLoading(false);
    }
  };

  return (
    <div>
      {loading && <Loader isLoading={loading} />}
      <div className="d-flex col-md-12 login-content">
        <div className="col-md-6 login-left-image">
          <img src={LoginLogo} alt="Login" />
        </div>
        <div className="col-md-6 login-right-card">
          <div className="login-card">
            <h1>Welcome Back</h1>
            <p>Please enter your details to login</p>
            <Form.Group className="col-md-10 col-12 mt-3">
              <Form.Label className="fw-bold">Email Id</Form.Label>
              <InputGroup>
                <Form.Control
                  className={`custom-textfield ${
                    errors.emailAddress ? "error-border" : ""
                  }`}
                  placeholder="Enter your email"
                  name="emailAddress"
                  value={formData.emailAddress}
                  onChange={handleChange}
                />
              </InputGroup>
              <Form.Label className="fw-bold mt-4">Password</Form.Label>
              <InputGroup>
                <Form.Control
                  className={`custom-textfield ${
                    errors.password ? "error-border" : ""
                  }`}
                  placeholder="Enter your password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  type={showPassword ? "text" : "password"}
                />
                <InputGroup.Text
                className={`custom-textfield ${
                    errors.password ? "error-border" : ""
                  }`}
                  onClick={() => setShowPassword(!showPassword)}
                  style={{ cursor: "pointer", background: "none" }}
                >
                  {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                </InputGroup.Text>
              </InputGroup>
            </Form.Group>
            <p
              className="forgot-pwd-text text-end mt-2"
              onClick={() => navigateTo("/forgot-password")}
            >
              Forgot Password?
            </p>
            <div className="login-btn" onClick={handleSubmit}>
              Login
            </div>
            <p className="text-muted m-3">Or</p>
            <div className="google-signup-btn">
              <FcGoogle className="me-2" size={20} />
              Continue with Google
            </div>
            <p className="new-user-text">
              New to{" "}
              <span onClick={() => navigateTo("/signup")}>MinSakthi24h</span>?{" "}
              <span onClick={() => navigateTo("/signup")}>
                Create an account
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
