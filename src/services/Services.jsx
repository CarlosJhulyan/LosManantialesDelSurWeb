import config from "./global";

const URL = config.urlApi;

export const getSucursal = () => {
  const headers = {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${sessionStorage.getItem('token')}`
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

export const updateTravelPrice = data => {
  const headers = {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${sessionStorage.getItem('token')}`
  }

  return fetch(`${URL}/precio-distancia`, {
    headers,
    method: "PUT",
    body: JSON.stringify(data)
  }).then(res => res.json())
    .then(data => data);
}

export const getCodes = () => {
  const headers = {
    "Content-Type": "application/json"
  }

  return fetch(`${URL}/codigo`, {
    headers
  }).then(res => res.json())
    .then(data => data);
}

export const updateCode = codigo => {
  const headers = {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${sessionStorage.getItem('token')}`
  }

  return fetch(`${URL}/codigo?codigo=${codigo}`, {
    headers,
    method: "PUT"
  }).then(res => res.json())
    .then(data => data);
}

export const createCode = data => {
  const headers = {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${sessionStorage.getItem('token')}`
  }

  return fetch(`${URL}/codigo`, {
    headers,
    method: "POST",
    body: JSON.stringify(data)
  }).then(res => res.json())
    .then(data => data);
}

export const getPricesPercent = () => {
  const headers = {
    "Content-Type": "application/json"
  }

  return fetch(`${URL}/precio-asiento`, {
    headers
  }).then(res => res.json())
    .then(data => data);
}

export const updatePricePercent = data => {
  const headers = {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${sessionStorage.getItem('token')}`
  }

  return fetch(`${URL}/precio-asiento`, {
    headers,
    method: "PUT",
    body: JSON.stringify(data)
  }).then(res => res.json())
    .then(data => data);
}

export const createDestinatario = data => {
  const headers = {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${sessionStorage.getItem('token')}`
  }

  return fetch(`${URL}/destinatario`, {
    headers,
    method: "POST",
    body: JSON.stringify(data)
  }).then(res => res.json())
    .then(data => data);
}

export const createPassage = data => {
  const headers = {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${sessionStorage.getItem('token')}`
  }

  return fetch(`${URL}/pasaje`, {
    headers,
    method: "POST",
    body: JSON.stringify(data)
  }).then(res => res.json())
    .then(data => data);
}

export const getPassagesByIdVehicule = id => {
  const headers = {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${sessionStorage.getItem('token')}`
  }

  return fetch(`${URL}/pasaje?id=${id}`, {
    headers
  }).then(res => res.json())
    .then(data => data);
}

export const updateIdVehiculePassage = data => {
  const headers = {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${sessionStorage.getItem('token')}`
  }

  return fetch(`${URL}/pasaje`, {
    headers,
    method: "PUT",
    body: JSON.stringify(data)
  }).then(res => res.json())
    .then(data => data);
}