import { useState } from 'react';
import { CreateUser } from '../api/ApiLogin';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import '../styles/RegisterPage.css';  

export const CreateAccount = () => {
  const [user, setUser] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const navigate = useNavigate();

  const handleRegister = async () => {
    const response = await CreateUser(user, email, password, dateOfBirth, phoneNumber);
    if (response) {
      Swal.fire({
        icon: "success",
        title: "¡Registro exitoso!",
        showConfirmButton: false,
        timer: 1500
      }).then(() => {
        navigate('/login');
      });
    }
  };

  return (
    <section className="vh-100 register-section">
      <div className="container h-100 d-flex align-items-center justify-content-center">
        <div className="row justify-content-center w-100">
          <div className="col-lg-10"> {/* Aumenté el ancho aquí */}
            <div className="card register-card">
              <div className="row g-0">
                <div className="col-md-6 col-lg-5 d-none d-md-block">
                  <img 
                    src="https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0" 
                    alt="register form" 
                    className="img-fluid register-image" 
                  />
                </div>
                <div className="col-md-6 col-lg-7 d-flex align-items-center">
                  <div className="card-body p-4 p-lg-5 text-white">

                    <form onSubmit={(e) => e.preventDefault()}>

                      <div className="d-flex align-items-center mb-3 pb-1">
                        <i className="fas fa-user-plus fa-2x me-3" style={{ color: '#ff6219' }}></i>
                        <span className="h3 fw-bold mb-0">Crear cuenta</span> 
                      </div>

                      <h5 className="fw-normal mb-3 pb-3" style={{ letterSpacing: '1px' }}>
                        Ingresa tus datos para registrarte
                      </h5>

                      <div className="row">
                        <div className="col-md-6 mb-2">
                          <div className="form-outline">
                            <input
                              type="text"
                              id="formUserName"
                              className="form-control form-control-lg register-input"
                              value={user}
                              onChange={(e) => setUser(e.target.value)}
                              required
                            />
                            <label className="form-label register-label" htmlFor="formUserName">Nombre Completo</label>
                          </div>
                        </div>
                        <div className="col-md-6 mb-2">
                          <div className="form-outline">
                            <input
                              type="email"
                              id="formEmail"
                              className="form-control form-control-lg register-input"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              required
                            />
                            <label className="form-label register-label" htmlFor="formEmail">Correo Electrónico</label>
                          </div>
                        </div>
                      </div>

                      <div className="row">
                        <div className="col-md-6 mb-2">
                          <div className="form-outline">
                            <input
                              type="password"
                              id="formPassword"
                              className="form-control form-control-lg register-input"
                              value={password}
                              onChange={(e) => setPassword(e.target.value)}
                              required
                            />
                            <label className="form-label register-label" htmlFor="formPassword">Contraseña</label>
                          </div>
                        </div>
                        <div className="col-md-6 mb-2">
                          <div className="form-outline">
                            <input
                              type="date"
                              id="formDateOfBirth"
                              className="form-control form-control-lg register-input"
                              value={dateOfBirth}
                              onChange={(e) => setDateOfBirth(e.target.value)}
                              required
                            />
                            <label className="form-label register-label" htmlFor="formDateOfBirth">Cumpleaños</label>
                          </div>
                        </div>
                      </div>

                      <div className="row">
                        <div className="col-md-6 mb-2">
                          <div className="form-outline">
                            <input
                              type="text"
                              id="formPhoneNumber"
                              className="form-control form-control-lg register-input"
                              value={phoneNumber}
                              onChange={(e) => setPhoneNumber(e.target.value)}
                              required
                            />
                            <label className="form-label register-label" htmlFor="formPhoneNumber">Número de Teléfono</label>
                          </div>
                        </div>
                      </div>

                      <div className="pt-1 mb-3">
                        <button
                          className="btn btn-lg btn-block register-button"
                          type="button"
                          onClick={handleRegister}
                        >
                          Registrar
                        </button>
                      </div>
                      <p className="mb-2 pb-lg-2" style={{ color: '#d1d1e0' }}>
                        ¿Ya tienes una cuenta? <a href="/login" className="register-link">Inicia sesión</a>
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
