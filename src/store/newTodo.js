import {Observable, Subject} from 'rx/dist/rx.all';

const Reducers = {
  updateText: text => () => text
};

function createActions (updateTextSubject, clearTextSubject) {
  return {
    updateText: text => updateTextSubject.onNext(text),
    clearText: () => clearTextSubject.onNext()
  };
}

export default function createNewTodoStore (initialState = '') {
  const updateTextSubject = new Subject();
  const removeTextSubject = new Subject();

  const actions = createActions(updateTextSubject, removeTextSubject);

  const updateTextIntent = updateTextSubject
    .map(text => Reducers.updateText(text));

  const clearTextIntent = removeTextSubject
    .map(() => Reducers.updateText(''));

  const store = Observable.merge(updateTextIntent, clearTextIntent)
    .scan((state, reducer) => reducer(state), initialState)
    .startWith(initialState);

    return {actions, store};
}
