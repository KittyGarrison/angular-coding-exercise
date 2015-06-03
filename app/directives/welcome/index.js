import angular from 'angular';
import template from './template.jade';
import MarvelService from '../../services/marvel';
import './style.scss';

/* @ngInject */
function gsWelcomeController (MarvelService) {
  const dm = this;

  dm.init = function () {
    console.info(`Welcome to the ${dm.title}!`);
    setTimeout(dm.makeSampleRequest, 1000); // for dramatic effect
  };

  dm.makeSampleRequest = function () {
    dm.connection = {};

    // ping a known-good endpoint
    MarvelService.getCharacters()
      .then(() => dm.connection.success = true)
      .catch(() => dm.connection.error = true)
      .finally(() => dm.connection.complete = true);
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
  MarvelService.name
])
  .directive('gsWelcome', gsWelcome);
