import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faUserCircle, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import './Navbar.css'; 
import image from '../assets/images/logo1.png'

// Se cierra sesión eliminando el token y redirigiendo al login
export const Navbar = () => {
  const cerrarSesion = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-dark shadow-sm">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/productos">
          <img
            src={image} 
            height="40"
            alt="Logo"
            loading="lazy"
            className="logo"
          />
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link" to="/productos">
                <FontAwesomeIcon icon={faHome} /> Productos
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/usuarios">
                <FontAwesomeIcon icon={faUserCircle} /> Usuarios
              </Link>
            </li>
          </ul>
        </div>
        <div className="d-flex align-items-center">
          <Link className="nav-link text-light me-3" to="/user">
            <FontAwesomeIcon icon={faUserCircle} /> Perfil
          </Link>
          <button
            className="btn btn-outline-light"
            type="button"
            onClick={cerrarSesion}
          >
            <FontAwesomeIcon icon={faSignOutAlt} /> Salir
          </button>
        </div>
      </div>
    </nav>
  );
};
