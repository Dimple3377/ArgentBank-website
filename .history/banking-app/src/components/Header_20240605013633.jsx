import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../store/userSlice";
import logo from "../assets/img/argentBankLogo.webp";
import "font-awesome/css/font-awesome.min.css";
import "../components/Header";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);
  const location = useLocation();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/"); // vers la page d'accueil après la déconnexion
  };

  const isEditUserPage = location.pathname === "/edit-user";
  const navClass = isEditUserPage ? "main-nav edit-user-nav" : "main-nav";
  return (
    <nav className={navClass}>
      <Link className="main-nav-logo" to="/">
        <img
          className="main-nav-logo-image"
          src={logo}
          alt="Argent Bank Logo"
        />
        <h1 className="sr-only">Argent Bank</h1>
      </Link>
      <div>
        {location.pathname === "/edit-user" ? (
          <>
            {/* icônes spécifiques à EditUserPage */}
            <span>{user?.userName}</span>
            <i className="fa fa-user-circle"></i>
            <i className="fa fa-cog"></i>
            <i className="fa fa-power-off" onClick={handleLogout}></i>
          </>
        ) : user ? (
          <>
            <Link className="main-nav-item" to="/user">
              <i className="fa fa-user-circle"></i>
              {user.userName}
            </Link>
            <Link className="main-nav-item" to="/" onClick={handleLogout}>
              <i className="fa fa-sign-out"></i>
              Sign Out
            </Link>
          </>
        ) : (
          <Link className="main-nav-item" to="/sign-in">
            <i className="fa fa-user-circle"></i>
            Sign In
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Header;
