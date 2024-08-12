import { useEffect, useState } from 'react';
import { getProducts, createProduct, updateProduct, deleteProduct } from '../api/ApiProducto'; 
import { Modal, Button, Form } from 'react-bootstrap';

export const ProductosPage = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [productToEdit, setProductToEdit] = useState(null);
  const [productToDelete, setProductToDelete] = useState(null);
  const [newProduct, setNewProduct] = useState({ nameProduct: '', description: '', price: '', image: [], existence: '' });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const result = await getProducts();
        if (Array.isArray(result)) {
          setProducts(result);
        } else {
          console.error('Los datos devueltos no son un array:', result);
        }
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  const handleSearchTermChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleAddProductChange = (event) => {
    setNewProduct({
      ...newProduct,
      [event.target.name]: event.target.value,
    });
  };

  const validateProduct = (product) => {
    const errors = {};
    if (!product.nameProduct) errors.nameProduct = 'Nombre del producto es obligatorio.';
    if (!product.description) errors.description = 'Descripción es obligatoria.';
    if (!product.price || isNaN(product.price)) errors.price = 'Precio debe ser un número válido.';
    if (!product.existence || isNaN(product.existence)) errors.existence = 'Existencia debe ser un número válido.';
    return errors;
  };

  const handleAddProductSubmit = async (event) => {
    event.preventDefault();
    const validationErrors = validateProduct(newProduct);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    try {
      await createProduct(newProduct);
      setShowAddModal(false);
      setNewProduct({ nameProduct: '', description: '', price: '', image: [], existence: '' });
      setErrors({});
      const result = await getProducts();
      setProducts(result);
    } catch (error) {
      console.error('Error al agregar producto:', error);
    }
  };

  const handleEditProductChange = (event) => {
    setProductToEdit({
      ...productToEdit,
      [event.target.name]: event.target.value,
    });
  };

  const handleEditProductSubmit = async (event) => {
    event.preventDefault();
    const validationErrors = validateProduct(productToEdit);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    try {
      await updateProduct(productToEdit._id, productToEdit);
      setShowEditModal(false);
      setProductToEdit(null);
      setErrors({});
      const result = await getProducts();
      setProducts(result);
    } catch (error) {
      console.error('Error al editar producto:', error);
    }
  };

  const handleEditButtonClick = (product) => {
    setProductToEdit(product);
    setShowEditModal(true);
  };

  const handleDeleteButtonClick = (product) => {
    setProductToDelete(product);
    setShowDeleteModal(true);
  };

  const handleDeleteProduct = async () => {
    if (!productToDelete) return;
    try {
      await deleteProduct(productToDelete._id);
      setShowDeleteModal(false);
      setProductToDelete(null);
      const result = await getProducts();
      setProducts(result);
    } catch (error) {
      console.error('Error al eliminar producto:', error);
    }
  };

  const filteredProducts = products.filter((product) => {
    const { nameProduct, description } = product;
    const searchQuery = searchTerm.toLowerCase();
    return nameProduct.toLowerCase().includes(searchQuery) || description.toLowerCase().includes(searchQuery);
  });

  const renderProductCards = () => {
    return filteredProducts.map((product) => (
      <div className="col-md-4 mb-4 animate__animated animate__fadeIn" key={product._id}>
        <div className="card shadow-sm border-light">
          <img
            src={product.image && product.image.length > 0 ? product.image[0] : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSga6yisHc6htna4rQdhlFyffWiWv1a1bsC9g&s'}
            className="card-img-top"
            alt={product.nameProduct || 'Producto'}
          />
          <div className="card-body">
            <h5 className="card-title">{product.nameProduct}</h5>
            <p className="card-text">{product.description}</p>
            <p className="card-text font-weight-bold">{product.price}</p>
            <p className="card-text text-muted">Existencia: {product.existence}</p>
            <div className="d-flex justify-content-between">
              <Button variant="info" onClick={() => handleEditButtonClick(product)}>
                Editar
              </Button>
              <Button variant="danger" onClick={() => handleDeleteButtonClick(product)}>
                Eliminar
              </Button>
            </div>
          </div>
        </div>
      </div>
    ));
  };

  return (
    <>
      <div className="jumbotron jumbotron-fluid bg-light py-5">
        <div className="container text-center">
          <h1 className="display-4">Productos Disponibles</h1>
          <p className="lead">Explora nuestra selección de productos.</p>
        </div>
      </div>

      <div className="container">
        <div className="row mb-4">
          <div className="col-md-12">
            <div className="input-group">
              <input
                type="text"
                className="form-control"
                placeholder="Buscar productos por nombre o descripción"
                value={searchTerm}
                onChange={handleSearchTermChange}
              />
              <div className="input-group-append">
                <button className="btn btn-primary" type="button">
                  Buscar
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="row mb-4">
          <div className="col-md-6 d-flex justify-content-start">
            <Button variant="success" onClick={() => setShowAddModal(true)}>
              Agregar Producto
            </Button>
          </div>
        </div>

        <div className="row mt-4">
          {renderProductCards()}
        </div>
      </div>

      {/* Modal para agregar producto */}
      <Modal show={showAddModal} onHide={() => setShowAddModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Agregar Producto</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleAddProductSubmit}>
            <Form.Group controlId="nameProduct">
              <Form.Label>Nombre del Producto</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ingrese el nombre del producto"
                name="nameProduct"
                value={newProduct.nameProduct}
                onChange={handleAddProductChange}
                isInvalid={!!errors.nameProduct}
              />
              <Form.Control.Feedback type="invalid">
                {errors.nameProduct}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="description">
              <Form.Label>Descripción</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ingrese la descripción del producto"
                name="description"
                value={newProduct.description}
                onChange={handleAddProductChange}
                isInvalid={!!errors.description}
              />
              <Form.Control.Feedback type="invalid">
                {errors.description}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="price">
              <Form.Label>Precio</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ingrese el precio del producto"
                name="price"
                value={newProduct.price}
                onChange={handleAddProductChange}
                isInvalid={!!errors.price}
              />
              <Form.Control.Feedback type="invalid">
                {errors.price}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="existence">
              <Form.Label>Existencia</Form.Label>
              <Form.Control
                type="number"
                placeholder="Ingrese la existencia del producto"
                name="existence"
                value={newProduct.existence}
                onChange={handleAddProductChange}
                isInvalid={!!errors.existence}
              />
              <Form.Control.Feedback type="invalid">
                {errors.existence}
              </Form.Control.Feedback>
            </Form.Group>
            <Button variant="primary" type="submit">
              Agregar Producto
            </Button>
          </Form>
        </Modal.Body>
      </Modal>

      {/* Modal para editar producto */}
      <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Editar Producto</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {productToEdit && (
            <Form onSubmit={handleEditProductSubmit}>
              <Form.Group controlId="nameProduct">
                <Form.Label>Nombre del Producto</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Ingrese el nombre del producto"
                  name="nameProduct"
                  value={productToEdit.nameProduct}
                  onChange={handleEditProductChange}
                  isInvalid={!!errors.nameProduct}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.nameProduct}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group controlId="description">
                <Form.Label>Descripción</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Ingrese la descripción del producto"
                  name="description"
                  value={productToEdit.description}
                  onChange={handleEditProductChange}
                  isInvalid={!!errors.description}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.description}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group controlId="price">
                <Form.Label>Precio</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Ingrese el precio del producto"
                  name="price"
                  value={productToEdit.price}
                  onChange={handleEditProductChange}
                  isInvalid={!!errors.price}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.price}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group controlId="existence">
                <Form.Label>Existencia</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Ingrese la existencia del producto"
                  name="existence"
                  value={productToEdit.existence}
                  onChange={handleEditProductChange}
                  isInvalid={!!errors.existence}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.existence}
                </Form.Control.Feedback>
              </Form.Group>
              <Button variant="primary" type="submit">
                Actualizar Producto
              </Button>
            </Form>
          )}
        </Modal.Body>
      </Modal>

      {/* Modal para eliminar producto */}
      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Eliminar Producto</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {productToDelete && (
            <>
              <p>¿Estás seguro de que deseas eliminar el producto {productToDelete.nameProduct}?</p>
              <Button variant="danger" onClick={handleDeleteProduct}>
                Eliminar
              </Button>
              <Button variant="secondary" onClick={() => setShowDeleteModal(false)} className="ml-2">
                Cancelar
              </Button>
            </>
          )}
        </Modal.Body>
      </Modal>
    </>
  );
};
