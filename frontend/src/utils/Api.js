class Api {
  constructor({ url, headers }) {
    this._url = url;
    this._authorizationHeaders = headers;
  }

  changeLikeCardStatus(id, isLiked) {
    if (isLiked) {
      return this.addLike(id);
    } else {
      return this.removeLike(id);
    }
  }

  _validateResponse(res) {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
  }

  _request(url, options) {
    return fetch(url, options).then(this._validateResponse);
  }

  getUser() {
    return this._request(`${this._url}/users/me`, {
      method: 'GET',
      headers: this._authorizationHeaders,
    });
  }

  editUser({ name, about }) {
    return this._request(`${this._url}/users/me`, {
      method: 'PATCH',
      headers: this._authorizationHeaders,
      body: JSON.stringify({ name, about }),
    });
  }

  editAvatar({ avatar }) {
    return this._request(`${this._url}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._authorizationHeaders,
      body: JSON.stringify({ avatar }),
    });
  }

  getInitialCards() {
    return this._request(`${this._url}/cards`, {
      method: 'GET',
      headers: this._authorizationHeaders,
    });
  }

  addCard({ name, link }) {
    return this._request(`${this._url}/cards`, {
      method: 'POST',
      headers: this._authorizationHeaders,
      body: JSON.stringify({ name, link }),
    });
  }

  removeCard(id) {
    return this._request(`${this._url}/cards/${id}`, {
      method: 'DELETE',
      headers: this._authorizationHeaders,
    });
  }

  addLike(id) {
    return this._request(`${this._url}/cards/${id}/likes`, {
      method: 'PUT',
      headers: this._authorizationHeaders,
    });
  }

  removeLike(id) {
    return this._request(`${this._url}/cards/${id}/likes`, {
      method: 'DELETE',
      headers: this._authorizationHeaders,
    });
  }
}

export const api = new Api({
  url: 'https://mesto.nomoreparties.co/v1/cohort-58',
  headers: {
    authorization: 'ce555337-e7fa-4374-b614-ff5e8503e49e',
    'Content-Type': 'application/json',
  },
});
