'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.searchPlaylist = exports.searchTracks = exports.searchAlbums = exports.searchArticts = exports.weatherMap = exports.search = undefined;

var _config = require('./config');

var _utils = require('./utils');

var search = exports.search = function search(query, type) {
  var url = _config.API_URL + '/search?q=' + query + '&type=' + type;

  return fetch(url, _config.HEADERS).then(_utils.toJSON);
};

var weatherMap = exports.weatherMap = function weatherMap() {
  return fetch('http://samples.openweathermap.org/data/2.5/weather?q=London,uk&appid=b6907d289e10d714a6e88b30761fae22').then(function (response) {
    return response.json();
  });
};

var searchArticts = exports.searchArticts = function searchArticts(query) {
  return search(query, 'artist');
};

var searchAlbums = exports.searchAlbums = function searchAlbums(query) {
  return search(query, 'album');
};

var searchTracks = exports.searchTracks = function searchTracks(query) {
  return search(query, 'tracks');
};

var searchPlaylist = exports.searchPlaylist = function searchPlaylist(query) {
  return search(query, 'playlist');
};