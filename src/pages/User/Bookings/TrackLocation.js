import { BsFillArrowLeftCircleFill } from "react-icons/bs";

const TrackLocation = ({ backToItems }) => {
  return (
    <div className="track-technician-container">
      <div className="d-flex">
        <BsFillArrowLeftCircleFill
                size={30}
                className="back-icon me-3"
                onClick={backToItems}
              /><div>
                <p className="mb-1 fw-bold">Track Technician</p>
                <p className="text-muted">Order ID: 12345</p>
                </div>
      </div>
      <div className="row justify-content-between mt-5 gap-5">
        <div className="col-12 col-lg-5 track-location-map">Google Map</div>
        <div className="col-12 col-lg-6 track-location-info">
          <h3>Technical Information</h3>
          <div className="d-flex flex-wrap align-items-start gap-4 mt-4">
            <div className="technician-avatar"></div>
            <div className="technician-information">
              <p className="mb-4">
                <strong>Name:</strong> Senthil
              </p>
              <p className="mb-4">
                <strong>Phone No:</strong> 9876543211
              </p>
              <p className="mb-4">
                <strong>Service Type:</strong> Electrical
              </p>
              <p className="mb-4">
                <strong>Sub Service:</strong> Switch box & Installation
              </p>
              <p className="mb-4">
                <strong>Current Status:</strong> On the way
              </p>
              <p className="mb-4">
                <strong>Estimated Arriving Time:</strong> 15 Minutes
              </p>
            </div>
          </div>
          <div className="d-flex justify-content-end ">
            <div className="location-back-btn" onClick={backToItems}>
              Back
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrackLocation;
