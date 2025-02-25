import { useEffect, useState } from "react";
import { Message } from "./Message";

export const SimpleForm = () => {
  const [formState, setFormState] = useState({
    matricula: "",
    nombre: "",
    apellidos: "",
    edad: "",
    universidad: "",
    carrera: ""
  });
  //desestructurar el usestate
  const { matricula, nombre, apellidos, edad, universidad, carrera } = formState;

  const onInputChange = ({ target }) => {
    const { name, value } = target;
    setFormState({ ...formState, [name]: value });
  };

  useEffect(() => {
    // console.log("useEffect called!");
  }, []);

  useEffect(() => {
    // console.log("formState changed!");
  }, [formState]);

  const handleSubmit = () => {
    alert(
      `Matrícula: ${formState.matricula}\nNombre: ${formState.nombre}\nApellidos: ${formState.apellidos}\nEdad: ${formState.edad}\nUniversidad: ${formState.universidad}\nCarrera: ${formState.carrera}`
    );
  };
  return (
    <>
      <div className="login-box">
        <h2>Formulario</h2>
        <form className="form">
            <div className="user-box">
                <input
                type="text"
                className="form-control"
                placeholder="Matricula"
                name="matricula"
                value={matricula}
                onChange={onInputChange}
                />
                <label>Matricula</label>
            </div>
            <div className="user-box">
                <input
                type="text"
                className="form-control mt-2"
                placeholder="Nombre"
                name="nombre"
                value={nombre}
                onChange={onInputChange}
                />
                <label>Nombre</label>
            </div>
            <div className="user-box">
                <input
                type="text"
                className="form-control mt-2"
                placeholder="Apellidos"
                name="apellidos"
                value={apellidos}
                onChange={onInputChange}
                />
                <label>Apellidos</label>
            </div>
            <div className="user-box">
                <input
                type="text"
                className="form-control mt-2"
                placeholder="Edad"
                name="edad"
                value={edad}
                onChange={onInputChange}
                />
                <label>Edad</label>
            </div>
            <div className="user-box">
                <input
                type="text"
                className="form-control mt-2"
                placeholder="Universidad"
                name="universidad"
                value={universidad}
                onChange={onInputChange}
                />
                <label>Universidad</label>
            </div>
            <div className="user-box">
                <input
                type="text"
                className="form-control mt-2"
                placeholder="Carrera"
                name="carrera"
                value={carrera}
                onChange={onInputChange}
                />
                <label>Carrera</label>
            </div>
            <button type= "submit" className="button-64" role="button" onClick={()=> handleSubmit()}><span className="text">Enviar</span></button>
        </form>
        
      </div>
    </>
  );
};
