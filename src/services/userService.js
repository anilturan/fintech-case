import { http } from './api';
import {
  USER_LOGIN_URL,
  USER_LOGOUT_URL,
  USER_PROFILE_URL,
  USER_REGISTER_URL
} from './urls';

export async function registerUser(payload) {
  const url = USER_REGISTER_URL;
  return new Promise((resolve, reject) => {
    http
      .post(url, payload)
      .then((response) => {
        resolve(response.data.data);
      })
      .catch((err) => reject(err));
  });
}

export async function loginUser(payload) {
  const url = USER_LOGIN_URL;
  return new Promise((resolve, reject) => {
    http
      .post(url, payload)
      .then((response) => {
        resolve(response.data.data);
      })
      .catch((err) => reject(err));
  });
}

export async function logoutUser() {
  const url = USER_LOGOUT_URL;
  return new Promise((resolve, reject) => {
    http
      .post(url)
      .then((response) => {
        resolve(response.data.data);
      })
      .catch((err) => reject(err));
  });
}

export async function fetchProfile() {
  const url = USER_PROFILE_URL;
  return new Promise((resolve, reject) => {
    http
      .get(url)
      .then((response) => {
        resolve(response.data.data);
      })
      .catch((err) => reject(err));
  });
}
