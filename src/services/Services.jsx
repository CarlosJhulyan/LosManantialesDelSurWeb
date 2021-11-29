import config from "./global";

const URL = config.urlApi;

export const getSucursal = () => {
  const headers = {
    "Content-Type": "application/json"
  }

  return fetch(`${URL}/sucursal`, {
    headers
  }).then(res => res.json())
    .then(data => data);
}

export const getTravelPrice = () => {
  const headers = {
    "Content-Type": "application/json"
  }

  return fetch(`${URL}/precio-distancia`, {
    headers
  }).then(res => res.json())
    .then(data => data);
}