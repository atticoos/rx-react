import {Observable, Subject} from 'rx/dist/rx.all';
import createReducer from '../reducer';

const Actions = {
  updateText: text => () => text,
  clearText: () => () => ''
};

export default function createNewTodoReducer (initialState = '') {
  return createReducer(Actions, initialState);
}
