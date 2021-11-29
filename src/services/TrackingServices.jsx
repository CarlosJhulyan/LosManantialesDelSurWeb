import config from "./global";

const URL = config.urlApi;

export const getPackagesByClient = uuid => {
  const headers = {
    "Content-Type": "application/json"
  }

  return fetch(`${URL}/paquete/${uuid}`, {
    headers
  }).then(res => res.json())
    .then(data => data);
}

export const getTracking = uuid => {
  const headers = {
    "Content-Type": "application/json"
  }

  return fetch(`${URL}/seguimiento/${uuid}`, {
    headers
  }).then(res => res.json())
    .then(data => {
      return fetch(`${URL}/seguimiento/estados/${uuid}`, {
        headers
      }).then(res => res.json())
        .then(estadoSeguimiento => { return { ...data, estadoSeguimiento } });
    });
}