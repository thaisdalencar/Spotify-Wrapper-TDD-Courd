global.fetch = require('node-fetch');

import { weatherMap, searchAlbums } from '../src/search';

const info = weatherMap();
info.then(data => console.log(data.coord));


const album = searchAlbums('Nirvana');
album.then(data => console.log(data.albums.items[0].artists[0].name))//;
album.then(data => data.albums.items.map(i => console.log(i.name)))//;

// albums.then(data => console.log(data));


