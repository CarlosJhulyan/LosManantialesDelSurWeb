import config from "./global";

const URL = config.urlApi;

export const getPackagesByClient = uuid => {
  const headers = {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${sessionStorage.getItem('token')}`
  }

  return fetch(`${URL}/paquete/${uuid}`, {
    headers
  }).then(res => res.json())
    .then(data => data);
}

export const createPackage = data => {
  const headers = {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${sessionStorage.getItem('token')}`
  }

  return fetch(`${URL}/paquete`, {
    headers,
    method: "POST",
    body: JSON.stringify(data)
  }).then(res => res.json())
    .then(data => data);
}

export const getTrackings = () => {
  const headers = {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${sessionStorage.getItem('token')}`
  }

  return fetch(`${URL}/seguimiento`, {
    headers
  }).then(res => res.json())
    .then(data => data);
}

export const getTracking = uuid => {
  const headers = {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${sessionStorage.getItem('token')}`
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

export const updateTracking = data => {
  const headers = {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${sessionStorage.getItem('token')}`
  }

  return fetch(`${URL}/seguimiento`, {
    headers,
    method: "PUT",
    body: JSON.stringify(data)
  }).then(res => res.json())
    .then(data => data);
}

export const createStatusTracking = data => {
  const headers = {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${sessionStorage.getItem('token')}`
  }

  return fetch(`${URL}/seguimiento/estados`, {
    headers,
    method: "POST",
    body: JSON.stringify(data)
  }).then(res => res.json())
    .then(data => data);
}

export const createTracking = data => {
  const headers = {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${sessionStorage.getItem('token')}`
  }

  return fetch(`${URL}/seguimiento`, {
    headers,
    method: "POST",
    body: JSON.stringify(data)
  }).then(res => res.json())
    .then(data => data);
}