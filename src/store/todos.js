import {Observable, Subject} from 'rx/dist/rx.all';

/**
 * State transition reducers
 */
const Reducers = {
  addItem: newItem => items => items.concat(newItem),
  removeItem: oldItem => items => items
    .filter(item => item !== oldItem)
};

/**
 * UI action bindings to invoke state transitions
 */
function createActions (addSubject, removeSubject) {
  return {
    add: item => addSubject.onNext(item),
    remove: item => removeSubject.onNext(item)
  };
}

/**
 * The Todo List store
 */
export default function createTodoStore () {
  // Observable action subjects
  const addSubject = new Subject();
  const removeSubject = new Subject();

  // Subject bound actions
  const actions = createActions(addSubject, removeSubject);

  // Subject bound intents
  const addIntent = addSubject
    .map(item => Reducers.addItem(item));

  const removeIntent = removeSubject
    .map(item => Reducers.removeItem(item));

  // Observable store
  const store = Observable.merge(addIntent, removeIntent)
    .scan((state, reducer) => reducer(state), [])
    .map(nextState => ({
      todos: nextState
    }))
    .startWith({todos: []});

  return {
    actions,
    store
  };
}
