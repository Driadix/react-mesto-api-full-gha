class Auth {
  constructor({ url, headers }) {
    this._url = url;
    this._authorizationHeaders = headers;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
  }

  _request(url, options) {
    return fetch(url, options).then(this._checkResponse);
  }

  signUp({ email, password }) {
    return this._request(`${this._url}/signup`, {
      method: 'POST',
      headers: this._authorizationHeaders,
      body: JSON.stringify({ email, password }),
    });
  }

  signIn({ email, password }) {
    return this._request(`${this._url}/signin`, {
      method: 'POST',
      headers: this._authorizationHeaders,
      body: JSON.stringify({ email, password }),
    });
  }

  checkToken(token) {
    return this._request(`${this._url}/users/me`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
  }
}

export const authApi = new Auth({
  url: 'https://auth.nomoreparties.co',
  headers: {
    'Content-Type': 'application/json',
  },
});
