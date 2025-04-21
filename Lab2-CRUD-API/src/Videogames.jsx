import React, { useEffect, useState } from "react";
import {
  Container,
  Button,
  Table,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  FormGroup,
} from "reactstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import './index.css';

const Videogames = () => {
  const [games, setGames] = useState([]);
  const [modalActualizar, setModalActualizar] = useState(false);
  const [modalInsertar, setModalInsertar] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [form, setForm] = useState({
    id: 0,
    titulo: "",
    anioLanzamiento: 0,
    desarrollador: "",
    genero: ""
  });

  // Función para obtener los videojuegos desde la API
  const fetchGames = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('http://127.0.0.1:8000/videojuegos'); 
      if (!response.ok) {
        throw new Error('Error al obtener los datos');
      }
      const data = await response.json();
      setGames(data);
      setError(null);
    } catch (error) {
      setError('Error al cargar los videojuegos: ' + error.message);
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Cargar los videojuegos al montar el componente
  useEffect(() => {
    fetchGames();
  }, []);

  const mostrarModalActualizar = (game) => {
    setForm(game);
    setModalActualizar(true);
  };

  const cerrarModalActualizar = () => {
    setModalActualizar(false);
  };

  const mostrarModalInsertar = () => {
    setForm({
      id: 0,
      titulo: "",
      anioLanzamiento: 0,
      desarrollador: "",
      genero: ""
    });
    setModalInsertar(true);
  };

  const cerrarModalInsertar = () => {
    setModalInsertar(false);
  };

  const editar = async () => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/videojuegos/${form.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      });

      if (!response.ok) {
        throw new Error('Error al actualizar el videojuego');
      }

      // Actualizar el estado local con los datos actualizados
      const updatedGames = games.map(game => 
        game.id === form.id ? form : game
      );
      
      setGames(updatedGames);
      setModalActualizar(false);
    } catch (error) {
      console.error('Error al editar:', error);
      setError('Error al actualizar el videojuego: ' + error.message);
    }
  };

  const eliminar = async (game) => {
    const opcion = window.confirm(
      `¿Estás seguro que deseas eliminar el videojuego "${game.titulo}"?`
    );
    
    if (opcion) {
      try {
        const response = await fetch(`http://127.0.0.1:8000/videojuegos/${game.id}`, {
          method: 'DELETE',
        });

        if (!response.ok) {
          throw new Error('Error al eliminar el videojuego');
        }

        // Actualizar el estado local eliminando el juego
        const filteredGames = games.filter(item => item.id !== game.id);
        setGames(filteredGames);
      } catch (error) {
        console.error('Error al eliminar:', error);
        setError('Error al eliminar el videojuego: ' + error.message);
      }
    }
  };

  const insertar = async () => {
    try {
      const newGame = { ...form };
      delete newGame.id; 
      console.log(newGame)

      const response = await fetch('http://127.0.0.1:8000/videojuegos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newGame),
      });

      if (!response.ok) {
        throw new Error('Error al crear el videojuego');
      }

      const createdGame = await response.json();
      
      // Actualizar el estado local añadiendo el nuevo juego
      setGames([...games, createdGame]);
      setModalInsertar(false);
    } catch (error) {
      console.error('Error al insertar:', error);
      setError('Error al crear el videojuego: ' + error.message);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: name === "anioLanzamiento" ? parseInt(value, 10) : value,
    });
  };

  if (isLoading) {
    return (
      <Container className="loading-container">
        <div className="loading-spinner"></div>
        <p>Cargando videojuegos...</p>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="error-container">
        <div className="error-message">
          <h3>¡Ha ocurrido un error!</h3>
          <p>{error}</p>
          <Button color="primary" onClick={fetchGames}>
            Reintentar
          </Button>
        </div>
      </Container>
    );
  }

  return (
    <>
      <Container className="games-container">
        <h1 className="games-title">Biblioteca de Videojuegos</h1>
        <Button color="success" className="create-button" onClick={mostrarModalInsertar}>
          <i className="fa fa-plus"></i> Añadir Videojuego
        </Button>
        <Table className="games-table" responsive>
          <thead>
            <tr>
              <th>#</th>
              <th>Título</th>
              <th>Año</th>
              <th>Desarrollador</th>
              <th>Género</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {games.map((game) => (
              <tr key={game.id}>
                <td>{game.id}</td>
                <td>{game.titulo}</td>
                <td>{game.anioLanzamiento}</td>
                <td>{game.desarrollador}</td>
                <td>{game.genero}</td>
                <td>
                  <Button
                    color="primary"
                    className="edit-button"
                    onClick={() => mostrarModalActualizar(game)}
                  >
                    <i className="fa fa-edit"></i> Editar
                  </Button>{" "}
                  <Button 
                    color="danger" 
                    className="delete-button"
                    onClick={() => eliminar(game)}
                  >
                    <i className="fa fa-trash"></i> Eliminar
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>

      {/* Modal para insertar nuevo videojuego */}
      <Modal isOpen={modalInsertar} className="game-modal">
        <ModalHeader className="modal-header">
          <div>
            <h3>Añadir Nuevo Videojuego</h3>
          </div>
        </ModalHeader>
        <ModalBody>
          <FormGroup>
            <label>Título: </label>
            <input
              className="form-control"
              name="titulo"
              type="text"
              onChange={handleChange}
              placeholder="Nombre del videojuego"
            />
          </FormGroup>
          <FormGroup>
            <label>Año de Lanzamiento: </label>
            <input
              className="form-control"
              name="anioLanzamiento"
              type="number"
              onChange={handleChange}
              placeholder="YYYY"
            />
          </FormGroup>
          <FormGroup>
            <label>Desarrollador: </label>
            <input
              className="form-control"
              name="desarrollador"
              type="text"
              onChange={handleChange}
              placeholder="Compañía desarrolladora"
            />
          </FormGroup>
          <FormGroup>
            <label>Género: </label>
            <select
              className="form-control"
              name="genero"
              onChange={handleChange}
            >
              <option value="">Seleccionar género</option>
              <option value="Acción">Acción</option>
              <option value="Aventura">Aventura</option>
              <option value="RPG">RPG</option>
              <option value="Estrategia">Estrategia</option>
              <option value="Deportes">Deportes</option>
              <option value="Simulación">Simulación</option>
              <option value="FPS">FPS</option>
              <option value="Plataformas">Plataformas</option>
              <option value="MMORPG">MMORPG</option>
              <option value="Otro">Otro</option>
            </select>
          </FormGroup>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" className="insert-button" onClick={insertar}>
            Añadir
          </Button>
          <Button
            className="btn btn-danger cancel-button"
            onClick={cerrarModalInsertar}
          >
            Cancelar
          </Button>
        </ModalFooter>
      </Modal>

      {/* Modal para editar videojuego */}
      <Modal isOpen={modalActualizar} className="game-modal">
        <ModalHeader className="modal-header">
          <div>
            <h3>Editar Videojuego</h3>
          </div>
        </ModalHeader>
        <ModalBody>
          <FormGroup>
            <label>ID:</label>
            <input
              className="form-control"
              readOnly
              type="text"
              value={form.id}
            />
          </FormGroup>
          <FormGroup>
            <label>Título:</label>
            <input
              className="form-control"
              name="titulo"
              type="text"
              onChange={handleChange}
              value={form.titulo}
            />
          </FormGroup>
          <FormGroup>
            <label>Año de Lanzamiento:</label>
            <input
              className="form-control"
              name="anioLanzamiento"
              type="number"
              onChange={handleChange}
              value={form.anioLanzamiento}
            />
          </FormGroup>
          <FormGroup>
            <label>Desarrollador:</label>
            <input
              className="form-control"
              name="desarrollador"
              type="text"
              onChange={handleChange}
              value={form.desarrollador}
            />
          </FormGroup>
          <FormGroup>
            <label>Género:</label>
            <select
              className="form-control"
              name="genero"
              onChange={handleChange}
              value={form.genero}
            >
              <option value="">Seleccionar género</option>
              <option value="Acción">Acción</option>
              <option value="Aventura">Aventura</option>
              <option value="RPG">RPG</option>
              <option value="Estrategia">Estrategia</option>
              <option value="Deportes">Deportes</option>
              <option value="Simulación">Simulación</option>
              <option value="FPS">FPS</option>
              <option value="Plataformas">Plataformas</option>
              <option value="MMORPG">MMORPG</option>
              <option value="Otro">Otro</option>
            </select>
          </FormGroup>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" className="edit-confirm-button" onClick={editar}>
            Actualizar
          </Button>
          <Button color="danger" className="cancel-button" onClick={cerrarModalActualizar}>
            Cancelar
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default Videogames;