import config from "./global";

const URL = config.urlApi;

export const signIn = data => {
  const headers = {
    "Content-Type": "application/json"
  }

  return fetch(`${URL}/auth/signin`, {
    headers,
    method: "POST",
    body: JSON.stringify(data)
  }).then(res => res.json())
    .then(data => data);
}

export const signUp = data => {
  const headers = {
    "Content-Type": "application/json"
  }

  return fetch(`${URL}/auth/signup`, {
    headers,
    method: "POST",
    body: JSON.stringify(data)
  }).then(res => res.json())
    .then(data => data);
}