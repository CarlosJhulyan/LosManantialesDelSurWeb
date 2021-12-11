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

export const signIn = data => {
  const headers = {
    "Content-Type": "application/json"
  }

  return fetch(`${URL}/auth`, {
    headers,
    method: "POST",
    body: JSON.stringify(data)
  }).then(res => res.json())
    .then(data => data);
}