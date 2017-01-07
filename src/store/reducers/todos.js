import {Observable, Subject} from 'rx/dist/rx.all';
import createReducer from '../reducer';

const Actions = {
  add: newItem => items => items.concat(newItem),
  remove: oldItem => items => items.filter(item => item !== oldItem)
};

export default function createTodoReducer (initialState = []) {
  return createReducer(Actions, initialState);
}
