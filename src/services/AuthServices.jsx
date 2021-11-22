import config from "./global";

const URL = config.urlApi;

export const registerClient = cliente => {
  const headers = {
    "Content-Type": "application/json"
  }

  return fetch(`${URL}/cliente`, {
    headers,
    method: 'POST',
    body: JSON.stringify(cliente)
  }).then(res => res.json())
    .then(data => data);
}

export const signUpClient = (correo, dni) => {
  const data = {
    correo,
    dni
  }
  const headers = {
    "Content-Type": "application/json"
  }

  return fetch(`${URL}/auth/cliente`, {
    headers,
    method: "POST",
    body: JSON.stringify(data)
  }).then(res => res.json())
    .then(data => data);
}