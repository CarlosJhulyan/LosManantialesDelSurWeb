import config from "./global";

const URL = config.urlApi;

export const getVehicules = (origen, destino) => {
  const headers = {
    "Content-Type": "application/json"
  }

  return fetch(`${URL}/vehiculo?origen=${origen}&destino=${destino}`, {
    headers
  }).then(res => res.json())
    .then(data => data);
}

export const getAvailableSeats = (id) => {
  const headers = {
    "Content-Type": "application/json"
  }

  return fetch(`${URL}/vehiculo/asientos/${id}`, {
    headers
  }).then(res => res.json())
    .then(data => data);
}

export const getSeatPrice = () => {
  const headers = {
    "Content-Type": "application/json"
  }

  return fetch(`${URL}/precio-asiento/`, {
    headers
  }).then(res => res.json())
    .then(data => data);
}