// ------------------------------------
// Developer Note
// ------------------------------------
// This is a basic Angular Service designed to help get
// you up and running with the Marvel API. It configures
// the application with a request interceptor to
// automatically add your API key as a parameter, so you
// only have to worry about what endpoint(s) to hit.

// This service is written using ES6's new Class sugar which,
// if you're not familiar with, is worth checking out at
// http://www.2ality.com/2015/02/es6-classes-final.html.
// The webpack build process supports both ES6 and ES5 code,
// so use whichever is more comfortable - though ES6 does
// offer some pretty cool features...
// http://babeljs.io/docs/learn-es6/
// ------------------------------------
import angular from 'angular';
import MarvelApiInterceptor from './interceptor';
const MARVEL_API = 'http://gateway.marvel.com/v1/public';

// ------------------------------------
// Marvel Service Definition
// ------------------------------------
class MarvelService {
  constructor ($http) {
    this._$http = $http;
  }

  // [String] Resource - the API resource to be accessed.
  // (Optional) [Object] Config - Additional request configuration.
  // Returns -> Promise -> (Response, Error)
  get (resource, config) {
    return this.dispatch('GET', resource, config);
  }

  // [String] Resource - the API resource to be accessed.
  // [Number] Id - the id of the resource to be accessed.
  // (Optional) [Object] Config - Additional request configuration.
  // Returns -> Promise -> (Response, Error)
  getOne (resource, id, config) {
    return this.get(`${resource}/${id}`, config);
  }

  // (Optional) [Object] Config - Additional request configuration.
  // Returns -> Promise -> (Response, Error)
  getCharacters (config) {
    return this.get('characters', config);
  }

  // [Number] Id - the id of the character to be retrieved.
  // (Optional) [Object] Config - Additional request configuration.
  // Returns -> Promise -> (Response, Error)
  getCharacterById (id, config) {
    return this.getOne('characters', id, config);
  }

  getSeriesById (id) {
    return this.getOne('characters',`/${id}/series`);
  }

  
  // Handles the actual process of making the API request, all methods
  // should route through this.
  // [String] RequestType - HTTP Verb (GET/POST/etc.)
  // [String] Resource - The API resource to be accessed.
  // (Optional) [Object] Config - Additional request configuration.
  // Returns -> Promise -> (Response, Error)
  dispatch (requestType, resource, config) {
    const endpoint = [MARVEL_API, resource].join('/');
    console.log(endpoint)

    return this._$http[requestType.toLowerCase()](endpoint, config);
  }
}
MarvelService.$inject = ['$http'];

// ------------------------------------
/* @ngInject */
function config ($httpProvider) {
  $httpProvider.interceptors.push(MarvelApiInterceptor);
}

export default angular.module('gstv.services.marvel', [])
  .service('MarvelService', MarvelService)
  .config(config);
