import { API_URL, HEADERS } from './config';
import { toJSON } from './utils';

export const search = (query, type) => {
  const url = `${API_URL}/search?q=${query}&type=${type}`;

  return fetch(url, HEADERS)
    .then(toJSON);
};

export const weatherMap = () =>
  fetch('http://samples.openweathermap.org/data/2.5/weather?q=London,uk&appid=b6907d289e10d714a6e88b30761fae22')
    .then(response => response.json());

export const searchArticts = query =>
  search(query, 'artist');

export const searchAlbums = query =>
  search(query, 'album');

export const searchTracks = query =>
  search(query, 'tracks');

export const searchPlaylist = query =>
  search(query, 'playlist');

