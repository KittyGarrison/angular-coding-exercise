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
      .finally(() => dm.state.connection.complete = true);
  };

  dm.getOneCharacter = function (charId) {

    MarvelService.getOne("character", charId)
      .then(() => console.log(MarvelService.getOne))
      .catch(() => dm.state.connection.error = true)
      .finally(() => dm.state.connection.complete = true);
  };

  dm.init();
}

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
