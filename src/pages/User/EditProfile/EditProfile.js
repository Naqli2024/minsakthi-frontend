import React, { useEffect, useState } from "react";
import EditProfileBanner from "../../../assets/images/editprofile-banner.svg";
import { IoMdPerson } from "react-icons/io";
import { MdEdit } from "react-icons/md";
import { InputGroup, Form } from "react-bootstrap";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { editUser, getUserById } from "../../../redux/User/UserSlice";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import Loader from "../../../components/Loader";
import Cookies from "js-cookie";

const EditProfile = () => {
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const userId = Cookies.get("userId");

  const [formData, setFormData] = useState({
    profile: "",
    fullName: "",
    password: "",
    dob: "",
    address: "",
    alternateNumber: "",
  });

  useEffect(() => {
    if (!userId) return;
    dispatch(getUserById(userId))
      .unwrap()
      .then((response) => {
        const userData = response.data;
        setFormData({
          profile: userData.profile?.imageUrl || "",
          fullName: userData.fullName || "",
          emailAddress: userData.emailAddress || "",
          phoneNumber: userData.phoneNumber || "",
          dob: userData.dob ? userData.dob.slice(0, 10) : "",
          address: userData.address || "",
          alternateNumber: userData.alternateNumber || "",
        });
      })
      .catch((error) => {
        toast.error(error);
      });
  }, [dispatch, userId]);

  const handleChange = (e) => {
    const { name, type, files, value } = e.target;

    if (type === "file") {
      setFormData((prev) => ({
        ...prev,
        [name]: files[0],
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handlePhotoChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const previewURL = URL.createObjectURL(file);
    setFormData((prev) => ({
      ...prev,
      profile: previewURL,
      profileFile: file,
    }));

    try {
      const formDataObj = new FormData();
      formDataObj.append("profile", file);
    } catch (error) {
      toast.error(error);
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const payload = new FormData();

      if (formData.profileFile) {
        payload.append("profile", formData.profileFile);
        console.log("Appending profile file:", formData.profileFile);
      }

      payload.append("fullName", formData.fullName);
      payload.append("dob", formData.dob);
      payload.append("address", formData.address);
      payload.append("alternateNumber", formData.alternateNumber);

      const response = await dispatch(editUser({ userId, payload })).unwrap();
      setFormData((prev) => ({
        ...prev,
        profile: response.data.profile?.imageUrl || prev.profile,
        fullName: response.data.fullName || prev.fullName,
        dob: response.data.dob ? response.data.dob.slice(0, 10) : prev.dob,
        address: response.data.address || prev.address,
        alternateNumber: response.data.alternateNumber || prev.alternateNumber,
      }));
      toast.success(response.message);
      window.location.reload()
    } catch (error) {
      toast.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {loading && <Loader isLoading={loading} />}
      <div className="edit-profile-container">
        <img src={EditProfileBanner} alt="Edit Profile Banner" />
        <div className="edit-profile-avatar">
          {formData.profile ? (
            <img
              src={formData.profile}
              alt="Profile"
              className="rounded-circle"
            />
          ) : (
            <IoMdPerson size={60} color="#6b7280" />
          )}
          <div className="edit-icon">
            <label htmlFor="upload-photo" style={{ cursor: "pointer" }}>
              <MdEdit color="#2FB972" />
            </label>
            <input
              type="file"
              id="upload-photo"
              accept="image/*"
              style={{ display: "none" }}
              onChange={handlePhotoChange}
            />
          </div>
        </div>
      </div>
      <div className="edit-profile-form">
        <div className="d-flex justify-content-between mt-5 px-5">
          <Form.Group className="col-md-4 col-12">
            <Form.Label className="fw-bold">Full Name</Form.Label>
            <InputGroup>
              <Form.Control
                className="form-control"
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
              />
            </InputGroup>
          </Form.Group>

          <Form.Group className="col-md-4 col-12">
            <Form.Label className="fw-bold">Date of Birth</Form.Label>
            <InputGroup>
              <Form.Control
                className="form-control"
                type="date"
                name="dob"
                value={formData.dob}
                onChange={handleChange}
              />
            </InputGroup>
          </Form.Group>
        </div>

        <div className="d-flex justify-content-between mt-5 px-5">
          <Form.Group className="col-md-4 col-12">
            <Form.Label className="fw-bold">Email Address</Form.Label>
            <InputGroup>
              <Form.Control
                className="form-control"
                type="text"
                name="emailAddress"
                value={formData.emailAddress}
                readOnly
              />
            </InputGroup>
          </Form.Group>

          <Form.Group className="col-md-4 col-12">
            <Form.Label className="fw-bold">Phone Number</Form.Label>
            <InputGroup>
              <Form.Control
                className="form-control"
                type="number"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                readOnly
              />
            </InputGroup>
          </Form.Group>
        </div>

        <div className="d-flex justify-content-between mt-5 px-5">
          <Form.Group className="col-md-4 col-12">
            <Form.Label className="fw-bold">Password</Form.Label>
            <InputGroup>
              <Form.Control
                className="form-control"
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
              />
              <InputGroup.Text
                onClick={() => setShowPassword(!showPassword)}
                style={{ cursor: "pointer", background: "none" }}
              >
                {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
              </InputGroup.Text>
            </InputGroup>
          </Form.Group>

          <Form.Group className="col-md-4 col-12">
            <Form.Label className="fw-bold">Address</Form.Label>
            <InputGroup>
              <Form.Control
                className="form-control"
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
              />
            </InputGroup>
          </Form.Group>
        </div>

        <div className="d-flex justify-content-between mt-5 px-5">
          <Form.Group className="col-md-4 col-12">
            <Form.Label className="fw-bold">Alternate Number</Form.Label>
            <InputGroup>
              <Form.Control
                className="form-control"
                type="number"
                name="alternateNumber"
                value={formData.alternateNumber}
                onChange={handleChange}
              />
            </InputGroup>
          </Form.Group>
        </div>

        <div className="d-flex justify-content-center mt-5">
          <button className="btn rebook px-5 py-2" onClick={handleSubmit}>
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
