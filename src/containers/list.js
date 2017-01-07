import React from 'react';
import {Button} from 'react-bootstrap';
import {createConnector} from '../store/provider';

class TodoListContainer extends React.Component {
  render () {
    return (
      <div>
        {/* Add an item to the Todo List store */}
        <Button onClick={() => this.props.add('foo')}>
          Add Todo
        </Button>

        {/* Render items from the Todo List store */}
        {this.props.todos.map((item, i) => (
          <div key={i}>{item}</div>
        ))}
      </div>
    );
  }
}

const selector = state => ({
  todos: state.todos
});

const actions = todoActions => ({
  add: todoActions.add,
  remove: todoActions.remove
});

const connect = createConnector(selector, actions);

export default connect(TodoListContainer);
