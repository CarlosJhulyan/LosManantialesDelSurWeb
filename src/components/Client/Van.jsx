import React, { useState, useEffect, useContext } from "react";

import { getAvailableSeats, getSeatPrice } from "../../services/VehiculeServices";

import VanImage from '../../images/van.png';
import { Context } from "../../context";

const Van = ({ salida, ...props }) => {
  const { globalData, setData } = useContext(Context);
  const [ state, setState ] = useState({
    asientos: [],
    asientoSeleccionado: -1,
    asientoPrecios: []
  });

  useEffect(() => {
    
    getAvailableSeats(props.id).then(asientos => {
      getSeatPrice().then(asientoPrecios => {
        setState({
          ...asientos,
          asientoPrecios
        })
      });
    });
  }, [])

  const handleClick = (e, available) => {
    if (!available) {
      const numeroAsiento = Number(e.target.dataset.id);

      if (numeroAsiento === state.asientoSeleccionado) {
        setState({
          ...state,
          asientoSeleccionado: -1
        });
        setData({
          ...globalData,
          total: props.total
        });
      } else {
        setState({
          ...state,
          asientoSeleccionado: numeroAsiento
        });
        const precioAsiento = state.asientoPrecios.find(x => x.numeroAsiento === numeroAsiento);
        const porcentaje = precioAsiento.porcentajeVariacion;
        const total = props.total + (props.total * porcentaje / 100);
        setData({
          ...globalData,
          total
        });
      }
    }
  }
  
  return (
    <div className="van">
      <div className="van__schedule">
        Salida: {salida}
      </div>
      <div className="van-car">
        <img className="van-car__image" src={VanImage} alt="Imagen de la van" />
        <span className="van-car__license">{props.placa}</span>
        <div className="van-car__seat">
          {
            state.asientos.map((a, i) => 
            <i key={i} 
                className="fa fa-compact-disc" 
                data-id={i+1}
                style={{ color: a ? '#EA028C' : '#ccc', cursor: a ? "not-allowed" : "pointer", background: state.asientoSeleccionado === i + 1 && "lime" }}
                onClick={e => handleClick(e, a)} />)
          }
        </div>
      </div>
    </div>
  )
}

export default Van;