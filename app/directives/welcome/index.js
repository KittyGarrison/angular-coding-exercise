// ------------------------------------
// Developer Note
// ------------------------------------
// Hey again, just a quick note about this directive...
// the whole point of this is to give you some sort of
// indication that the boilerplate application is working
// as expected. Don't hesitate to completely rip this
// apart or discard it as necessary, it exists only
// as a startup splash screen.
// ------------------------------------
import angular from 'angular';
import template from './welcome.jade';
import { name as MarvelServiceModule } from 'services/marvel';
import { name as StatusBarModule } from 'directives/status-bar';
import './welcome.scss';

/* @ngInject */
function gsWelcomeController (MarvelService) {
  const dm = this;
  dm.state = {};
  dm.character = {};

  dm.init = function () {
    setTimeout(dm.makeSampleRequest, 1000); // for dramatic effect
  };

  dm.makeSampleRequest = function () {
    dm.state.connection = {};

    // ping a known-good endpoint
    MarvelService.getCharacters()
      .then(() => dm.state.connection.success = true)
      .catch(() => dm.state.connection.error = true)
      .finally(() => dm.state.connection.complete = true)
  };

  dm.getOneCharacter = function (charId) {
    MarvelService.getCharacterById(charId)
    .then(function(value) {
      console.log(value); // Success!
    }, function(reason) {
      console.log(reason); // Error!
    });
  };
  
  // dm.getOneCharacter = function (charId) {

  //   MarvelService.getCharacterById(charId).success(function(data){
  //    console.log("-----------here is the data" + data.data.results);
  //   })

  // };

  // dm.getOneCharacter = function (charId) {

  //   MarvelService.getCharacterById(charId).success(function(data){
  //    dm.character = data.data.results;
  //    console.log("-----------here is the data" + data);
  //   })
  // };

  dm.init();
}

// _function from Taresa________________________________

// dm.getComicsByTitleStartsWith = function(title){
//    MarvelService.getComicsByTitleStartsWith(title).success(function(data){
//      dm.dataLoad = true;
//      console.log(data);
//      console.log(dm.dataLoad);
//      dm.results = data.data.results;
//    })
//  }

// _________________________________


function gsWelcome () {
  return {
    scope : {
      title : '@'
    },
    template : template,
    controller : gsWelcomeController,
    controllerAs : 'dm',
    bindToController : true
  };
}

export default angular.module('gstv.directives.welcome', [
  MarvelServiceModule,
  StatusBarModule
])
  .directive('gsWelcome', gsWelcome);
