import { useEffect, useState } from "react";
import { Modal, Button, Card, Form } from 'react-bootstrap';
import { getOwnUser,updateUser, deleteUser } from "../api/ApiUser";
import axios from 'axios';
import Swal from 'sweetalert2';

export const UsuarioPage = () => {
  const [user, setUser] = useState({});
  const [showModalUpdate, setShowModalUpdate] = useState(false);
  const [showModalDelete, setShowModalDelete] = useState(false);
  const [userData, setUserData] = useState({ user: '', email: '', password: '' });

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const result = await getOwnUser(token);
        setUser(result);
        setUserData({ user: result.user, email: result.email, phoneNumber: result.phoneNumber });
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
      await updateUser(user._id, userData, token);
      handleCloseUpdate();
      setUser({ ...user, ...userData });
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
      <Card className="shadow" style={{ maxWidth: '600px', margin: 'auto', marginTop: '20px' }}>
        <Card.Img variant="top" src="https://xsgames.co/randomusers/avatar.php?g=pixel" style={{ width: '150px', height: '150px', borderRadius: '50%', margin: 'auto', marginTop: '20px' }} />
        <Card.Body>
          <Card.Title className="text-center">Datos de tu cuenta</Card.Title>
          <Card.Text>
            <div className="mb-2"><strong>Nombre:</strong> {user.user}</div>
            <div className="mb-2"><strong>Email:</strong> {user.email}</div>
            <div className="mb-2"><strong>Numero de Telefono:</strong> {user.phoneNumber}</div>
          </Card.Text>
          <div className="text-center">
            <Button variant="warning" onClick={() => setShowModalUpdate(true)} className="me-2">Editar mi perfil</Button>
            <Button variant="danger" onClick={() => setShowModalDelete(true)}>Eliminar mi perfil</Button>
          </div>
        </Card.Body>
      </Card>

      {/* Modal para Actualizar Usuario */}
      <Modal show={showModalUpdate} onHide={handleCloseUpdate}>
        <Modal.Header closeButton>
          <Modal.Title>Actualizar Usuario</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleUpdateSubmit}>
            <Form.Group className="mb-3" controlId="formName">
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={userData.name}
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
          <Modal.Title>Eliminar Usuario</Modal.Title>
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
