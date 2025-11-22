import { useState } from "react";
import { InputGroup, Form } from "react-bootstrap";
import ForgotPasswordLogo from "../../assets/images/forgot-password.svg";
import { useDispatch } from "react-redux";
import { forgotPassword } from "../../redux/Auth/AuthSlice";
import { toast } from "react-toastify";
import Loader from "../../components/Loader";

const ForgotPassword = () => {
  const [emailAddress, setEmailAddress] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false); 
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!emailAddress.trim()) {
      setError(true);
      return;
    }

    try {
      setLoading(true);
      const response = await dispatch(forgotPassword(emailAddress));
      toast.success(response.payload.message);
      setEmailAddress("");
      setError(false);
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
          <img src={ForgotPasswordLogo} alt="OTP" />
        </div>
        <div className="col-md-6 verify-otp-right-card">
          <div className="verify-otp-card">
            <h1>Forgot your password?</h1>
            <p className="mb-5">
              Enter your email to receive a password reset link
            </p>

            <Form.Group className="col-md-10 col-12 mb-3">
              <Form.Label className="fw-bold">Email Address</Form.Label>
              <InputGroup>
                <Form.Control
                  className={`custom-textfield ${error ? "error-border" : ""}`}
                  name="emailAddress"
                  value={emailAddress}
                  onChange={(e) => {
                    setEmailAddress(e.target.value);
                    setError(false); 
                  }}
                  placeholder="Enter your email"
                />
              </InputGroup>
            </Form.Group>

            <div className="verify-otp-btn" onClick={handleSubmit}>
              Send
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
