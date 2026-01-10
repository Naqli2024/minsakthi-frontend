import { Link, useLocation } from "react-router-dom";
import Logo from "../../assets/images/logo.svg";
import { useTranslation } from "react-i18next";
import { changeLanguage } from "i18next";

const Header = () => {
  const location = useLocation();
    const publicPaths = [
    "/",
    "/signup",
    "/verify-otp",
    "/forgot-password",
    "/reset-password",
    "/login"
  ];
  const showUserActiveTextHeader = publicPaths.includes(location.pathname);
  const { i18n } = useTranslation();
  const { t } = useTranslation();

  return (
    <div class="top-content">
      <div class="container-fluid home">
        <nav class="navbar navbar-expand-lg">
          <Link class="navbar-brand" to="/">
            <img src={Logo} alt="Logo" class="logo" />
          </Link>
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav center-links fw-bold">
              <li class="nav-item">
                <Link class={`${showUserActiveTextHeader && "active nav-link"} nav-link`} aria-current="page" to="/">
                  {t("user")}
                </Link>
              </li>
              <div className="vr mt-2 mb-2 vertical-divider"></div>
              <li class="nav-item">
                <Link class={`${location.pathname.startsWith(`/technician`) && "active nav-link"} nav-link`}  aria-current="page" to="/technician">
                {t("technician")}
                </Link>
              </li>
            </ul>
            {location.pathname === `/` && (
              <div class="d-flex ms-auto flex-wrap align-items-center fw-bold button-group">
                <select
                  value={i18n.language}
                  onChange={(e) => changeLanguage(e.target.value)}
                >
                  <option value="en">English</option>
                  <option value="ta">தமிழ்</option>
                </select>
                <div class="nav-item home-signup-btn ms-4">
                  <Link class="nav-link" to="/signup">
                    {t("signup")}
                  </Link>
                </div>
                <div class="nav-item login-btn">
                  <Link class="nav-link" to="/login">
                    {t("login")}
                  </Link>
                </div>
              </div>
            )}
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Header;
