import config from "./global";

const URL = config.urlApi;

export const getUserbyUuid = uuid => {
  const headers = {
    "Content-Type": "application/json"
  }

  return fetch(`${URL}/usuario/${uuid}`, {
    headers
  }).then(res => res.json())
    .then(data => data);
}

export const getClients = () => {
  const headers = {
    "Content-Type": "application/json"
  }

  return fetch(`${URL}/usuario/clientes`, {
    headers
  }).then(res => res.json())
    .then(data => data);
}

export const getUsers = () => {
  const headers = {
    "Content-Type": "application/json"
  }

  return fetch(`${URL}/usuario`, {
    headers
  }).then(res => res.json())
    .then(data => data);
}

export const getAdmins = () => {
  const headers = {
    "Content-Type": "application/json"
  }

  return fetch(`${URL}/usuario/admins`, {
    headers
  }).then(res => res.json())
    .then(data => data);
}

export const deleteUser = uuid => {
  const headers = {
    "Content-Type": "application/json"
  }

  return fetch(`${URL}/usuario?uuid=${uuid}`, {
    headers,
    method: "DELETE"
  }).then(res => res.json())
    .then(data => data);
}

export const updateUser = data => {
  const headers = {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${sessionStorage.getItem('token')}`
  }

  return fetch(`${URL}/usuario`, {
    headers,
    method: "PUT",
    body: JSON.stringify(data)
  }).then(res => res.json())
    .then(data => data);
}

export const registerUser = data => {
  const headers = {
    "Content-Type": "application/json"
  }

  return fetch(`${URL}/usuario`, {
    headers,
    method: "POST",
    body: JSON.stringify(data)
  }).then(res => res.json())
    .then(data => data);
}