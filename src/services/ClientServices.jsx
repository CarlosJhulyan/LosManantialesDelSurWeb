import config from "./global";

const URL = config.urlApi;

export const getClientbyUuid = uuid => {
  const headers = {
    "Content-Type": "application/json"
  }

  return fetch(`${URL}/cliente/${uuid}`, {
    headers
  }).then(res => res.json())
    .then(data => data);
}

export const getClients = () => {
  const headers = {
    "Content-Type": "application/json"
  }

  return fetch(`${URL}/cliente`, {
    headers
  }).then(res => res.json())
    .then(data => data);
}

export const deleteClient = uuid => {
  const headers = {
    "Content-Type": "application/json"
  }

  return fetch(`${URL}/cliente?uuid=${uuid}`, {
    headers,
    method: "DELETE"
  }).then(res => res.json())
    .then(data => data);
}

export const updateClient = (data) => {
  const headers = {
    "Content-Type": "application/json"
  }

  return fetch(`${URL}/cliente`, {
    headers,
    method: "DELETE",
    body: JSON.stringify(data)
  }).then(res => res.json())
    .then(data => data);
}