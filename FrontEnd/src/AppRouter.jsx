import { Route, Routes, Navigate } from 'react-router-dom';
import 
{ 
  LoginPage,
  CreateAccount,
  isUserAuthenticated,   
  ProductosPage,
  Navbar,  
  UsuarioPage, 
  AllUsers,
} from './index'


export const AppRouter = () => {
  const authenticated = isUserAuthenticated();

  return (
    <>
      {authenticated && <Navbar />} {/* Muestra el Navbar si el usuario está autenticado */}
      <Routes>
        {/* */}
        <Route
          path="/"
          element={authenticated ? <Navigate to="/productos" /> : <LoginPage />}
        />

        {/* Ruta para el inicio de sesión */}
        <Route
          path="/login"
          element={
            authenticated ? (
              <Navigate to="/productos" />
            ) : (
              <LoginPage />
            )
          }
        />

        {/* Ruta para crear una cuenta */}
        <Route
          path="/createAccount"
          element={
            authenticated ? (
              <Navigate to="/productos" />
            ) : (
              <CreateAccount />
            )
          }
        />

        {/*  */}
        <Route
          path="/productos"
          element={
            authenticated ? (
              <ProductosPage />
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        {/* Ruta para la página de usuario específico */}
        <Route
          path="/user"
          element={
            authenticated ? (
              <UsuarioPage />
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        {/* Ruta para la lista de todos los usuarios */}
        <Route
          path="/usuarios"
          element={
            authenticated ? (
              <AllUsers />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
      </Routes>
    </>
  );
};
