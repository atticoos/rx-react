import React from 'react';
import ReactDom from 'react-dom';
import StoreProvider from './store/provider';
import TodoList from './containers/list';
import createStore from './store';
const {actions, store} = createStore();

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
