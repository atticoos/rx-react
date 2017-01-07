import {Observable} from 'rx/dist/rx.all';
import createTodoStore from './todos';
import createNewTodoStore from './newTodo';

export default function createStore () {
  const todos = createTodoStore();
  const newTodo = createNewTodoStore();

  const store = combineStores({
    todos: todos.store,
    newTodo: newTodo.store
  });

  const actions = {
    todos: todos.actions,
    newTodo: newTodo.actions
  };

  return {store, actions};
}

/**
 * Create an output stream mirror the same structure of nodes in the provided tree.
 *
 * The following store tree structure:
 * {
 *   todos: todoStore,
 *   newTodo: newTodoStore
 * }
 *
 * Becomes the following output in the stream:
 * {
 *   todos: ['a', 'b'],
 *   newTodo: 'c'
 * }
 */
function combineStores (tree) {
  // Update each store to output the same structure as the store's node in the tree.
  // Eg: {todos: storeTodo} becomes {todos: ['a', 'b']}
  const stores = Object.keys(tree)
    .map(node => (
      tree[node].map(state => ({[node]: state}))
    ));

  // Merge each individual store's output into a single tree
  // Eg:
  // {todos: ['a', 'b']}
  // {newTodo: 'c'}
  //
  // Becomes:
  // {todos: ['a', 'b'], newTodo: 'c'}
  return Observable
    .merge(...stores)
    .scan((lastState, currentState) => ({
      ...lastState,
      ...currentState
    }), {});
}
