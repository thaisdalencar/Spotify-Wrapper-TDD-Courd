import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import sinonStubPromise from 'sinon-stub-promise';
import { search, searchAlbums, searchArticts, searchTracks, searchPlaylist } from '../src/search'

chai.use(sinonChai);
sinonStubPromise(sinon);
global.fetch = require('node-fetch');

describe('Spotify wrapper', () => {

  describe('smoke tests', () => {

    it('should exists the search method', () => {
      expect(search).to.exit;
    });

    it('should exists the searchAlbums method', () => {
      expect(searchAlbums).to.exit;
    });

    it('should exists the searchArticts method', () => {
      expect(searchArticts).to.exit;
    });

    it('should exists the searchTracks method', () => {
      expect(searchTracks).to.exit;
    });

    it('should exists the searchPlaylist method', () => {
      expect(searchPlaylist).to.exit;
    });

  });

  describe('Generic Search', () => {
    let fetchedStub;
    let promise;

    beforeEach(() => {
      fetchedStub = sinon.stub(global, 'fetch');
      promise = fetchedStub.returnsPromise();
    });

    afterEach(() => {
      fetchedStub.restore();
    });

    it('should call fetch function', () => {
      const artists = search();
      expect(fetchedStub).to.have.been.calledOnce;
    });

    it ('should receive the correct url to fetch', () => {
      const artists =  search('Incubus', 'artist');
      expect(fetchedStub).to.have.been
        .calledWith('https://api.spotify.com/v1/search?q=Incubus&type=artist');

      const albums =  search('Incubus', 'album');
      expect(fetchedStub).to.have.been
        .calledWith('https://api.spotify.com/v1/search?q=Incubus&type=album');

      context('passing more than one type', () => {
        const artistsAlbums = search('Incubus', ['artist', 'album']);
        expect(fetchedStub).to.have.been
          .calledWith('https://api.spotify.com/v1/search?q=Incubus&type=artist,album');
      });

      it('should return the json data from the promise', () => {
        promise.resolves({body: 'json'});
        const artist = search('Incubus', 'artist');
        expect(artist.resolveValue).to.be.eql({body: 'json'});

      });
    });
  });

  describe('searchArtist', () => {
    let fetchedStub;
    let promise;

    beforeEach(() => {
      fetchedStub = sinon.stub(global, 'fetch');
      promise = fetchedStub.returnsPromise();
    });

    afterEach(() => {
      fetchedStub.restore();
    });

    it('should call fetch function', () => {
      const artist =  searchArticts('Incubus');
      expect(fetchedStub).to.have.been.calledOnce;
    });

    it('should call fetch if corret url', () => {
      const artist =  searchArticts('Incubus');
      expect(fetchedStub).to.have.been
        .calledWith('https://api.spotify.com/v1/search?q=Incubus&type=artist');

      const artist2 =  searchArticts('Muse');
      expect(fetchedStub).to.have.been
        .calledWith('https://api.spotify.com/v1/search?q=Incubus&type=artist');

    });
  });

  describe('searchAlbum', () => {
    let fetchedStub;
    let promise;

    beforeEach(() => {
      fetchedStub = sinon.stub(global, 'fetch');
      promise = fetchedStub.returnsPromise();
    });

    afterEach(() => {
      fetchedStub.restore();
    });

    it('should call fetch function', () => {
      const artist =  searchAlbums('Incubus');
      expect(fetchedStub).to.have.been.calledOnce;
    });

    it('should call fetch if corret url', () => {
      const album =  searchAlbums('Incubus');
      expect(fetchedStub).to.have.been
        .calledWith('https://api.spotify.com/v1/search?q=Incubus&type=album');

      const album2 =  searchAlbums('Muse');
      expect(fetchedStub).to.have.been
        .calledWith('https://api.spotify.com/v1/search?q=Incubus&type=album');

    });
  });

  describe('searchTracks', () => {
    let fetchedStub;
    let promise;

    beforeEach(() => {
      fetchedStub = sinon.stub(global, 'fetch');
      promise = fetchedStub.returnsPromise();
    });

    afterEach(() => {
      fetchedStub.restore();
    });

    it('should call fetch function', () => {
      const artist =  searchTracks('Incubus');
      expect(fetchedStub).to.have.been.calledOnce;
    });

    it('should call fetch if corret url', () => {
      const track =  searchTracks('Incubus');
      expect(fetchedStub).to.have.been
        .calledWith('https://api.spotify.com/v1/search?q=Incubus&type=tracks');

      const track2 =  searchTracks('Muse');
      expect(fetchedStub).to.have.been
        .calledWith('https://api.spotify.com/v1/search?q=Incubus&type=tracks');

    });
  });

  describe('searchPlaylist', () => {
    let fetchedStub;
    let promise;

    beforeEach(() => {
      fetchedStub = sinon.stub(global, 'fetch');
      promise = fetchedStub.returnsPromise();
    });

    afterEach(() => {
      fetchedStub.restore();
    });

    it('should call fetch function', () => {
      const artist =  searchPlaylist('Incubus');
      expect(fetchedStub).to.have.been.calledOnce;
    });

    it('should call fetch if corret url', () => {
      const plaulist =  searchPlaylist('Incubus');
      expect(fetchedStub).to.have.been
        .calledWith('https://api.spotify.com/v1/search?q=Incubus&type=playlist');

      const playlist =  searchPlaylist('Muse');
      expect(fetchedStub).to.have.been
        .calledWith('https://api.spotify.com/v1/search?q=Incubus&type=playlist');

    });
  });

});
