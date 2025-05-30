import React from "react";
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
import './Manager.css'

const data = [
  { id: 1, nombre: "Jorge Carranza", edad: 50, empresa: "Tec", nivel: "5" },
  { id: 2, nombre: "Ramon Velez", edad: 45, empresa: "Banorte", nivel: "4" },
  { id: 3, nombre: "Hugo Sanchez", edad: 65, empresa: "Real Madrid", nivel: "6" },
  { id: 4, nombre: "Rafael Marquez", edad: 44, empresa: "Barcelona", nivel: "5" },
  { id: 5, nombre: "Sergio Perez", edad: 34, empresa: "Oracle Red Bull Racing", nivel: "3" },
  { id: 6, nombre: "Max Verstappen", edad: 26, empresa: "Oracle Red Bull Racing", nivel: "3" },
  { id: 7, nombre: "Carlos Sainz", edad: 29, empresa: "Williams Racing", nivel: "3" },
];

class Manager extends React.Component {
  state = {
    data: data,
    modalActualizar: false,
    modalInsertar: false,
    form: {
      id: "",
      nombre: "",
      edad: "",
      empresa: "",
      nivel: ""
    },
  };

  mostrarModalActualizar = (dato) => {
    this.setState({
      form: dato,
      modalActualizar: true,
    });
  };

  cerrarModalActualizar = () => {
    this.setState({ modalActualizar: false });
  };

  mostrarModalInsertar = () => {
    this.setState({
      modalInsertar: true,
    });
  };

  cerrarModalInsertar = () => {
    this.setState({ modalInsertar: false });
  };

  editar = (dato) => {
    var arreglo = this.state.data;
    arreglo.map((registro) => {
      if (dato.id === registro.id) {
        registro.nombre = dato.nombre;
        registro.empresa = dato.empresa;
        registro.edad = dato.edad;
        registro.nivel = dato.nivel;
        
      }
    });
    this.setState({ data: arreglo, modalActualizar: false });
  };

  eliminar = (dato) => {
    var opcion = window.confirm(
      "Estás Seguro que deseas Eliminar el elemento " + dato.id
    );
    if (opcion === true) {
      var contador = 0;
      var arreglo = this.state.data;
      arreglo.map((registro) => {
        if (dato.id === registro.id) {
          arreglo.splice(contador, 1);
        }
      });
      contador++;
      this.setState({ data: arreglo, modalActualizar: false });
    }
  };

  insertar = () => {
    var valorNuevo = { ...this.state.form };
    valorNuevo.id = this.state.data.length + 1;
    var lista = this.state.data;
    lista.push(valorNuevo);
    this.setState({ modalInsertar: false, data: lista });
  };
  handleChange = (e) => {
    this.setState({
      form: { ...this.state.form, [e.target.name]: e.target.value },
    });
  };


  render(){
  return (
    <>
      <Container>
        <br />
        <Button color="success" onClick={() => this.mostrarModalInsertar()}>
          Crear
        </Button>
        <br />
        <br />
        <Table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Edad</th>
              <th>Empresa</th>
              <th>Nivel</th>
              <th>Acción</th>
            </tr>
          </thead>
          <tbody>
            {this.state.data.map((dato) => (
              <tr key={dato.id}>
                <td>{dato.id}</td>
                <td>{dato.nombre}</td>
                <td>{dato.edad}</td>
                <td>{dato.empresa}</td>
                <td>{dato.nivel}</td>
                <td>
                  <Button
                    color="primary"
                    onClick={() => this.mostrarModalActualizar(dato)}
                  >
                    Editar
                  </Button>{" "}
                  <Button color="danger" onClick={() => this.eliminar(dato)}>
                    Eliminar
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>

      <Modal isOpen={this.state.modalInsertar}>
        <ModalHeader>
          <div>
            <h3>Insertar nombre</h3>
          </div>
        </ModalHeader>
        <ModalBody>
          <FormGroup>
            <label>Id: </label>
            <input
              className="form-control"
              readOnly
              type="text"
              value={this.state.data.length + 1}
            />
          </FormGroup>
          <FormGroup>
            <label>Nombre: </label>
            <input
              className="form-control"
              name="nombre"
              type="text"
              onChange={this.handleChange}
            />
          </FormGroup>
          <FormGroup>
            <label>Edad: </label>
            <input
              className="form-control"
              name="edad"
              type="text"
              onChange={this.handleChange}
            />
          </FormGroup>
          <FormGroup>
            <label>Empresa: </label>
            <input
              className="form-control"
              name="empresa"
              type="text"
              onChange={this.handleChange}
            />
          </FormGroup>
          <FormGroup>
            <label>Nivel: </label>
            <input
              className="form-control"
              name="nivel"
              type="text"
              onChange={this.handleChange}
            />
          </FormGroup>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={() => this.insertar()}>
            Insertar{" "}
          </Button>
          <Button
            className="btn btn-danger"
            onClick={() => this.cerrarModalInsertar()}
          >
            Cancelar
          </Button>
        </ModalFooter>
      </Modal>

      <Modal isOpen={this.state.modalActualizar}>
        <ModalHeader>
          <div>
            <h3>Editar Registro</h3>
          </div>
        </ModalHeader>
        <ModalBody>
          <FormGroup>
            <label> Id:</label>
            <input
              className="form-control"
              readOnly
              type="text"
              value={this.state.form.id}
            />
          </FormGroup>
          <FormGroup>
            <label>Nombre:</label>
            <input
              className="form-control"
              name="nombre"
              type="text"
              onChange={this.handleChange}
              value={this.state.form.nombre}
            />
          </FormGroup>
          <FormGroup>
            <label>Edad:</label>
            <input
              className="form-control"
              name="edad"
              type="text"
              onChange={this.handleChange}
              value={this.state.form.edad}
            />
          </FormGroup>
          <FormGroup>
            <label>Empresa:</label>
            <input
              className="form-control"
              name="empresa"
              type="text"
              onChange={this.handleChange}
              value={this.state.form.empresa}
            />
          </FormGroup>
          <FormGroup>
            <label>Nivel:</label>
            <input
              className="form-control"
              name="nivel"
              type="text"
              onChange={this.handleChange}
              value={this.state.form.nivel}
            />
          </FormGroup>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={() => this.editar(this.state.form)}>
            Editar
          </Button>
          <Button color="danger" onClick={() => this.cerrarModalActualizar()}>
            Cancelar
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
}
}
export default Manager;
