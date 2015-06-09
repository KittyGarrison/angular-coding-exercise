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
  dm.series = {};
  dm.chosenHero = {name: "Wolverine",
    id: "1009718"};
  dm.heroes = [
    {name: "Wolverine",
    id: "1009718"},
    {name: "Spider-Man",
    id: "1009610"},
    {name: "Captain America",
    id: "1009220"},
    {name: "Daredevil",
    id: "1009262"},
    {name: "Black Widow",
    id: "1009189"},
    {name: "Luke Cage",
    id: "1009215"},
    {name: "Iron Man",
    id: "1009368"},
    {name: "Thor",
    id: "1009664"},
    {name: "Hulk",
    id: "1009351"},
    {name: "Captain Marvel",
    id: "1010338"}
  ]

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

  dm.getCharacterById = function (charId) {
    MarvelService.getCharacterById(charId)
    .then(function(data) {
      dm.character = data.data.data.results[0];
      console.log(dm.character);
    })
  };

  dm.getSeriesById = function (charId) {
    MarvelService.getSeriesById(charId)
    .then(function(data) {
      dm.series = data.data.data.results;
      console.log("_________the series" + dm.series);
    })
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
