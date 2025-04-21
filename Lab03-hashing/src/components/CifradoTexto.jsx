import React, { useState } from "react";
import CryptoJS from "crypto-js";
import "./CifradoTexto.css";

const encryptionKey = "byz9VFNtbRQM0yBODcCb1lrUtVVH3D3x";
const iv = "X05IGQ5qdBnIqAWD";

const Cifrado = () => {
  const [textoOriginal, setTextoOriginal] = useState("");
  const [textoCifrado, setTextoCifrado] = useState("");
  const [textoDescifrado, setTextoDescifrado] = useState("");

  const cifrarTexto = () => {
    const encrypted = CryptoJS.AES.encrypt(
      textoOriginal,
      CryptoJS.enc.Utf8.parse(encryptionKey),
      {
        iv: CryptoJS.enc.Utf8.parse(iv),
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7,
      }
    );
    setTextoCifrado(encrypted.ciphertext.toString(CryptoJS.enc.Hex));
  };

  const descifrarTexto = () => {
    const decrypted = CryptoJS.AES.decrypt(
      { ciphertext: CryptoJS.enc.Hex.parse(textoCifrado) },
      CryptoJS.enc.Utf8.parse(encryptionKey),
      {
        iv: CryptoJS.enc.Utf8.parse(iv),
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7,
      }
    );
    setTextoDescifrado(decrypted.toString(CryptoJS.enc.Utf8));
  };

  return (
    <div className="encryption-container">
      <h2>Laboratorio 03 - Cifrado</h2>
      <div className="encryption-input-group">
        <label htmlFor="text-input">Texto:</label>
        <input
          id="text-input"
          className="encryption-input"
          type="text"
          value={textoOriginal}
          onChange={(e) => setTextoOriginal(e.target.value)}
          placeholder="Introduce texto"
        />
      </div>
      <div className="encryption-button-group">
        <button
          className="encryption-button encryption-button-primary"
          onClick={cifrarTexto}
        >
          Cifrar
        </button>
        <button
          className="encryption-button encryption-button-secondary"
          onClick={descifrarTexto}
        >
          Descifrar
        </button>
      </div>
      <div className="encryption-output">
        <p>
          <strong>Texto Cifrado:</strong>
        </p>
        <div className="encryption-result-box">{textoCifrado}</div>
        <p>
          <strong>Texto Descifrado:</strong>
        </p>
        <div className="encryption-result-box">{textoDescifrado}</div>
      </div>
    </div>
  );
};

export default Cifrado;
