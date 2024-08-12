import { useState } from 'react';
import { ApiLogin } from '../api/ApiLogin';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import '../styles/LoginPage.css';  

export const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    const token = await ApiLogin(email, password);
    if (token) {
      Swal.fire({
        icon: "success",
        title: "¡Inicio de sesión exitoso!",
        showConfirmButton: false,
        timer: 1500
      }).then(() => {
        navigate('/productos');
      });
    }
  };

  return (
    <section className="vh-100 login-section">
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col col-xl-10">
            <div className="card login-card">
              <div className="row g-0">
                <div className="col-md-6 col-lg-5 d-none d-md-block">
                  <img 
                    src="https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0" 
                    alt="login form" 
                    className="img-fluid login-image" 
                  />
                </div>
                <div className="col-md-6 col-lg-7 d-flex align-items-center">
                  <div className="card-body p-4 p-lg-5 text-white">

                    <form onSubmit={(e) => e.preventDefault()}>

                      <div className="d-flex align-items-center mb-3 pb-1">
                        <i className="fas fa-cubes fa-2x me-3" style={{ color: '#ff6219' }}></i>
                        <span className="h1 fw-bold mb-0">AlChilazo</span>
                      </div>

                      <h5 className="fw-normal mb-3 pb-3" style={{ letterSpacing: '1px' }}>
                        Inicia sesión con tu cuenta
                      </h5>

                      <div className="form-outline mb-4">
                        <input
                          type="email"
                          id="form2Example17"
                          className="form-control form-control-lg login-input"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                        />
                        <label className="form-label login-label" htmlFor="form2Example17">Correo eléctronico</label>
                      </div>

                      <div className="form-outline mb-4">
                        <input
                          type="password"
                          id="form2Example27"
                          className="form-control form-control-lg login-input"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          required
                        />
                        <label className="form-label login-label" htmlFor="form2Example27">Contraseña</label>
                      </div>

                      <div className="pt-1 mb-4">
                        <button
                          className="btn btn-lg btn-block login-button"
                          type="button"
                          onClick={handleLogin}
                        >
                          Iniciar Sesión
                        </button>
                      </div>

                      <p className="mb-5 pb-lg-2" style={{ color: '#d1d1e0' }}>
                        ¿No tienes una cuenta? <a href="/createAccount" className="login-link">Registrate aquí</a>
                      </p>
                    </form>

                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
