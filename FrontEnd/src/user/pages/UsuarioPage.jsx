import { useEffect, useState } from "react";
import { format } from 'date-fns';
import { Modal, Button, Card, Form } from 'react-bootstrap';
import { getOwnUser, updateUser, deleteUser } from "../api/ApiUser";
import Swal from 'sweetalert2';
import '../styles/UsuarioPage.css';

export const UsuarioPage = () => {
  const [user, setUser] = useState({});
  const [showModalUpdate, setShowModalUpdate] = useState(false);
  const [showModalDelete, setShowModalDelete] = useState(false);
  const [userData, setUserData] = useState({ user: '', email: '', phoneNumber: '', dateOfBirth: '' });

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const result = await getOwnUser(token);
        setUser(result);
        setUserData({ user: result.user, email: result.email, phoneNumber: result.phoneNumber, dateOfBirth: result.dateOfBirth });
      } catch (error) {
        console.error("Error al obtener el usuario:", error);
      }
    };

    fetchUser();
  }, [token]);

  const handleCloseUpdate = () => setShowModalUpdate(false);
  const handleCloseDelete = () => setShowModalDelete(false);

  const handleUpdateChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedUser = await updateUser(user._id, userData, token);
      if (updatedUser) {
        setUser(updatedUser);
        Swal.fire('Actualizado', 'Tu perfil ha sido actualizado.', 'success');
        handleCloseUpdate();
      }
    } catch (error) {
      console.error("Error al actualizar el usuario:", error);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteUser(user._id, token);
      localStorage.removeItem('token');
      window.location.href = '/';
    } catch (error) {
      console.error("Error al eliminar el usuario:", error);
    }
  };

  return (
    <>
      <Card className="shadow-lg rounded" style={{ maxWidth: '600px', margin: 'auto', marginTop: '20px' }}>
        <Card.Body>
          <div className="text-center">
            <img src="https://xsgames.co/randomusers/avatar.php?g=pixel" alt="User Avatar" className="user-avatar" />
            <h3 className="mt-3">{user.user}</h3>
          </div>
          <Card.Text>
            <div className="mb-2"><strong>Email:</strong> {user.email}</div>
            <div className="mb-2"><strong>Teléfono:</strong> {user.phoneNumber}</div>
            <div className="mb-2"><strong>Fecha de Nacimiento:</strong> {user.dateOfBirth ? format(new Date(user.dateOfBirth), 'MM-dd-yyyy') : 'No disponible'}</div>
          </Card.Text>
          <div className="text-center">
            <Button variant="warning" onClick={() => setShowModalUpdate(true)} className="me-2">Editar Perfil</Button>
            <Button variant="danger" onClick={() => setShowModalDelete(true)}>Eliminar Perfil</Button>
          </div>
        </Card.Body>
      </Card>

      {/* Modal para Actualizar Usuario */}
      <Modal show={showModalUpdate} onHide={handleCloseUpdate}>
        <Modal.Header closeButton>
          <Modal.Title>Actualizar Perfil</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleUpdateSubmit}>
            <Form.Group className="mb-3" controlId="formName">
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                type="text"
                name="user"
                value={userData.user}
                onChange={handleUpdateChange}
                placeholder="Ingrese su nombre"
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={userData.email}
                onChange={handleUpdateChange}
                placeholder="Ingrese su email"
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formPhoneNumber">
              <Form.Label>Teléfono</Form.Label>
              <Form.Control
                type="text"
                name="phoneNumber"
                value={userData.phoneNumber}
                onChange={handleUpdateChange}
                placeholder="Ingrese su número de teléfono"
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formDateOfBirth">
              <Form.Label>Fecha de Nacimiento</Form.Label>
              <Form.Control
                type="date"
                name="dateOfBirth"
                value={userData.dateOfBirth}
                onChange={handleUpdateChange}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formPassword">
              <Form.Label>Contraseña</Form.Label>
              <Form.Control
                type="password"
                name="password"
                value={userData.password}
                onChange={handleUpdateChange}
                placeholder="Ingrese su contraseña (opcional)"
              />
            </Form.Group>

            <Button variant="primary" type="submit">
              Actualizar
            </Button>
          </Form>
        </Modal.Body>
      </Modal>

      {/* Modal para Eliminar Usuario */}
      <Modal show={showModalDelete} onHide={handleCloseDelete}>
        <Modal.Header closeButton>
          <Modal.Title>Eliminar Perfil</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>¿Estás seguro de que deseas eliminar tu perfil? Esta acción no se puede deshacer.</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseDelete}>
            Cancelar
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Eliminar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
