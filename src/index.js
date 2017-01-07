import React from 'react';
import ReactDom from 'react-dom';
import StoreProvider from './store/provider';
import TodoList from './containers/list';
import createTodoStore from './store/todos';
const {actions, store} = createTodoStore();

class App extends React.Component {
  render () {
    return (
      <StoreProvider
        actions={actions}
        store={store}
      >
        <TodoList />
      </StoreProvider>
    );
  }
}

ReactDom.render(
  <App />,
  document.getElementById('root')
);
