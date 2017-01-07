import React from 'react';
import {Button, FormControl} from 'react-bootstrap';
import {createConnector} from '../store/provider';

class TodoListContainer extends React.Component {
  render () {
    return (
      <div>
        {/* Create a new Todo item */}
        <FormControl
          type="text"
          value={this.props.newTodo}
          onChange={e => this.props.newTodoActions.updateText(e.target.value)}
        />

        {/* Add an item to the Todo List store */}
        <Button onClick={() => {
          this.props.todoActions.add(this.props.newTodo)
          this.props.newTodoActions.clearText();
        }}>
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
  todos: state.todos,
  newTodo: state.newTodo
});

const actions = storeActions => ({
  todoActions: storeActions.todos,
  newTodoActions: storeActions.newTodo
});

const connect = createConnector(selector, actions);

export default connect(TodoListContainer);
