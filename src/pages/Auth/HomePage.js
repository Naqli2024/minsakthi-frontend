import { useLocation } from "react-router-dom";
import People from "../../assets/images/people.svg";
import HomeBookingCard from "../../components/HomeCard/HomeBookingCard";
import HomeCard from "../../components/HomeCard/HomeCard";

const HomePage = () => {
  const location = useLocation();
  return (
    <div>
      <div className="home-overall-content">
      <div className="col-md-12 home-content">
        <div className="col-md-6 home-left-content">
          <h1>
            MinSakthi<span className="text-24h">24h</span> <span className="highlight-text">Trusted</span><br/>
            <span className="highlight-text">Maintenance</span> For Home &
            Industry
          </h1>
          <div className="home-left-sub-content">
            <p>Trusted home and industry maintenance done right<br/> instant bookings real time tracking and expert
            <br/> technicians.</p>
          </div>
        </div>
        <div className="col-md-6 home-right-image">
          <img src={People} alt="Logo" class="logo" />
        </div>
      </div>
      {location.pathname === "/user/new-bookings"?(<HomeBookingCard/>):(<HomeCard/>)}
      </div>
    </div>
  );
};

export default HomePage;
