const {Observable, Subject} = require('rx/dist/rx.all');

export default function createReducer (reducerActions, initialState) {
  var subjects = Object.keys(reducerActions).reduce((map, actionName) => {
    map[actionName] = new Subject();
    return map;
  }, {});

  var intents = Object.keys(reducerActions).reduce((map, actionName) => {
    map[actionName] = subjects[actionName].map(reducerActions[actionName]);
    return map;
  }, {});

  var actions = Object.keys(reducerActions).reduce((map, actionName) => {
    map[actionName] = (...args) => subjects[actionName].onNext(...args);
    return map;
  }, {});

  const store = Observable
    .merge(...Object.keys(intents).map(key => intents[key]))
    .scan((state, reducer) => reducer(state), initialState)
    .startWith(initialState);

  return {actions, store};
}
