import { useEffect, useState } from 'react';
import { listUsers, deleteUser } from '../api/apiuser';
import Swal from 'sweetalert2';
import '../styles/AllUsers.css';

export const AllUsers = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const _users = await listUsers();
                if (_users) {
                    setUsers(_users);
                }
            } catch (error) {
                console.error('Error al obtener los usuarios:', error);
            }
        };

        fetchUsers();
    }, []);

    const handleDelete = async (id) => {
        try {
            await Swal.fire({
                title: '¿Estás seguro?',
                text: "No podrás revertir esto",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Sí, eliminar',
            }).then(async (result) => {
                if (result.isConfirmed) {
                    await deleteUser(id);
                    setUsers(users.filter(user => user._id !== id));
                    Swal.fire(
                        'Eliminado',
                        'El usuario ha sido eliminado.',
                        'success'
                    );
                }
            });
        } catch (error) {
            console.error('Error al eliminar el usuario:', error);
            Swal.fire('Error', 'No se pudo eliminar el usuario.', 'error');
        }
    };

    return (
        <div className="all-users-container">
            <h2 className="text-center">Lista de Usuarios</h2>
            <div className="cards-container">
                {users.map(user => (
                    <div className="card" key={user._id}>
                        <img className="card-img" src="https://cdn-icons-png.flaticon.com/512/709/709722.png" alt="User Icon" />
                        <div className="card-body">
                            <h5 className="card-title">{user.name}</h5>
                            <p className="card-text"><strong>Email:</strong> {user.email}</p>
                            <p className="card-text"><strong>Teléfono:</strong> {user.phoneNumber}</p>
                            <button className="btn btn-danger" onClick={() => handleDelete(user._id)}>Eliminar</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
