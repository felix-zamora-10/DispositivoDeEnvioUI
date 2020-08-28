import React from "react";
import "./Styles/MessageArea.css";

class MessageArea extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      mensajeRecibidoDT1: "Log de mensajes:\n",
      mensajeRecibidoDT2: "Log de mensajes:\n",
      rbndispositivo: "DTest03",
      txtMensaje: "",
    };
  }

  manejaCambios = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  pintaMensajeEnLasDosVentanas = (separacionesDepuradas) => {
    if (separacionesDepuradas[0].includes("Validador 1")) {
      this.setState({
        mensajeRecibidoDT1:
          this.state.mensajeRecibidoDT1 + separacionesDepuradas[0],
        mensajeRecibidoDT2:
          this.state.mensajeRecibidoDT2 + separacionesDepuradas[1],
      });
    } else {
      this.setState({
        mensajeRecibidoDT1:
          this.state.mensajeRecibidoDT1 + separacionesDepuradas[1],
        mensajeRecibidoDT2:
          this.state.mensajeRecibidoDT2 + separacionesDepuradas[0],
      });
    }
  };

  pintaMensajeEnUnaVentana = (separacionesDepuradas) => {
    if (separacionesDepuradas[0].includes("Validador 1")) {
      this.setState({
        mensajeRecibidoDT1:
          this.state.mensajeRecibidoDT1 + separacionesDepuradas[0],
      });
    } else {
      this.setState({
        mensajeRecibidoDT2:
          this.state.mensajeRecibidoDT2 + separacionesDepuradas[0],
      });
    }
  };

  manejaMostrarMensaje = (respuesta) => {
    let separaciones = respuesta.split("|");
    let separacionesDepuradas = separaciones.filter(function (sd) {
      return sd !== "";
    });

    if (separacionesDepuradas.length === 1) {
      this.pintaMensajeEnUnaVentana(separacionesDepuradas);
    } else {
      this.pintaMensajeEnLasDosVentanas(separacionesDepuradas);
    }
  };

  enviaMensaje = async (e) => {
    e.preventDefault();

    if (this.state.txtMensaje === "" || this.state.txtMensaje === undefined) {
      alert("Especifique el mensaje");

      return;
    }

    try {
      let mensaje = this.state.txtMensaje;
      let dispositivo = this.state.rbndispositivo;
      let config = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      };
      let respuesta = await fetch(
        `http://localhost:3288/api/DispositivoDeEnvio/EnviarMensajeAsync?mensaje=${encodeURIComponent(
          mensaje
        )}&dispositivo=${encodeURIComponent(dispositivo)}`,
        config
      );

      let resp = await respuesta.text();

      this.manejaMostrarMensaje(resp);
    } catch (error) {}
  };

  recibeMensajesDT1 = async (e) => {
    e.preventDefault();

    let config = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };
    let respuesta = await fetch(
      "http://localhost:3288/api/DispositivoDeEnvio/RecibirMensajeAsync?dispositivo=DTest01",
      config
    );

    console.log(respuesta);
    let resp = await respuesta.text();

    this.setState({
      mensajeRecibidoDT1: this.state.mensajeRecibidoDT1 + resp,
    });
  };

  recibeMensajesDT2 = async (e) => {
    e.preventDefault();

    let config = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };
    let respuesta = await fetch(
      "http://localhost:3288/api/DispositivoDeEnvio/RecibirMensajeAsync?dispositivo=DTest02",
      config
    );

    let resp = await respuesta.text();

    this.setState({
      mensajeRecibidoDT2: this.state.mensajeRecibidoDT2 + resp,
    });
  };

  limpiaTextosDeMensajes = (e) => {
    e.preventDefault();

    this.setState({
      mensajeRecibidoDT1: "Log de mensajes:\n",
      mensajeRecibidoDT2: "Log de mensajes:\n",
    });
  };

  render() {
    return (
      <div className="div-content">
        <h4 className="label-sub-header">Envío de mensajes</h4>
        <label className="etiqueta">Dispositivo emisor</label>
        <div className="radio-area">
          <input
            type="radio"
            name="rbndispositivo"
            value="DTest03"
            onChange={this.manejaCambios}
            defaultChecked
          />
          <label>BackOffice</label>
        </div>
        <br />
        <label className="etiqueta" htmlFor="txtMensaje">
          Mensaje por enviar
        </label>
        <input
          type="text"
          id="txtMensaje"
          name="txtMensaje"
          placeholder="Mensaje..."
          onChange={this.manejaCambios}
          value={this.state.txtMensaje}
        />
        <button className="boton" onClick={this.enviaMensaje}>
          Enviar
        </button>
        <br />
        <br />
        <h4 className="label-sub-header">Mensajes recibidos</h4>
        <table className="tabla-mensajes">
          <thead>
            <tr>
              <th className="encabezado-tabla">Validador 1</th>
              <th className="encabezado-tabla">Validador 2</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <textarea
                  className="txt-mensajes"
                  id="mensajesRecibidosDT1"
                  name="mensajesRecibidosDT1"
                  disabled
                  value={this.state.mensajeRecibidoDT1}
                />
              </td>
              <td>
                <textarea
                  className="txt-mensajes"
                  id="mensajesRecibidosDT2"
                  name="mensajesRecibidosDT2"
                  disabled
                  value={this.state.mensajeRecibidoDT2}
                />
              </td>
            </tr>
            <tr>
              <td>
                <button className="boton" onClick={this.recibeMensajesDT1}>
                  Recibir
                </button>
              </td>
              <td>
                <button className="boton" onClick={this.recibeMensajesDT2}>
                  Recibir
                </button>
              </td>
            </tr>
          </tbody>
        </table>
        <button className="boton" onClick={this.limpiaTextosDeMensajes}>
          Limpiar
        </button>
      </div>
    );
  }
}

export default MessageArea;
