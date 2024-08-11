import React, { useState } from 'react';
import { CreateUser } from '../api/ApiLogin';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

export const CreateAccount = () => {
  const [user, setUser] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const navigate = useNavigate();

  const handleRegister = async () => {
    await CreateUser(user, email, password, dateOfBirth, phoneNumber);
  };

  return (
    <section className="vh-100" style={{ backgroundColor: '#d6efc0' }}>
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col col-xl-10">
            <div className="card" style={{ borderRadius: '1rem' }}>
              <div className="row g-0">
                <div className="col-md-6 col-lg-5 d-none d-md-block">
                  <img 
                    src="https://i.pinimg.com/736x/99/53/7d/99537de91969cd5bec2142c8979c9ae3.jpg" 
                    alt="register form" 
                    className="img-fluid" 
                    style={{ borderRadius: '1rem 0 0 1rem' }} 
                  />
                </div>
                <div className="col-md-6 col-lg-7 d-flex align-items-center">
                  <div className="card-body p-4 p-lg-5 text-black">

                    <form onSubmit={(e) => e.preventDefault()}>

                      <div className="d-flex align-items-center mb-3 pb-1">
                        <i className="fas fa-user-plus fa-2x me-3" style={{ color: '#ff6219' }}></i>
                        <span className="h1 fw-bold mb-0">Crear cuenta</span>
                      </div>

                      <h5 className="fw-normal mb-3 pb-3" style={{ letterSpacing: '1px' }}>
                        Agrega los datos para crear tu cuenta!
                      </h5>

                      <div className="form-outline mb-4">
                        <input
                          type="text"
                          id="formUserName"
                          className="form-control form-control-lg"
                          value={user}
                          onChange={(e) => setUser(e.target.value)}
                        />
                        <label className="form-label" htmlFor="formUserName">Nombre Completo</label>
                      </div>

                      <div className="form-outline mb-4">
                        <input
                          type="email"
                          id="formEmail"
                          className="form-control form-control-lg"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                        />
                        <label className="form-label" htmlFor="formEmail">Correo</label>
                      </div>

                      <div className="form-outline mb-4">
                        <input
                          type="password"
                          id="formPassword"
                          className="form-control form-control-lg"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                        />
                        <label className="form-label" htmlFor="formPassword">Contraseña</label>
                      </div>

                      <div className="form-outline mb-4">
                        <input
                          type="date"
                          id="formDateOfBirth"
                          className="form-control form-control-lg"
                          value={dateOfBirth}
                          onChange={(e) => setDateOfBirth(e.target.value)}
                        />
                        <label className="form-label" htmlFor="formDateOfBirth">Cumpleaños</label>
                      </div>

                      <div className="form-outline mb-4">
                        <input
                          type="text"
                          id="formPhoneNumber"
                          className="form-control form-control-lg"
                          value={phoneNumber}
                          onChange={(e) => setPhoneNumber(e.target.value)}
                        />
                        <label className="form-label" htmlFor="formPhoneNumber">Numero de telefono</label>
                      </div>

                      <div className="pt-1 mb-4">
                        <button
                          className="btn btn-dark btn-lg btn-block"
                          type="button"
                          onClick={handleRegister}
                        >
                          Register
                        </button>
                      </div>

                      <p className="mb-5 pb-lg-2" style={{ color: '#393f81' }}>
                        ¿Ya tienes una cuenta? <a href="/login" style={{ color: '#393f81' }}>Inicia sesión</a>
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
