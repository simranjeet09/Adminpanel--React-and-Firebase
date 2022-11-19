import React from 'react';
import ReactDOM from 'react-dom';
import Typography from '@material-ui/core/Typography';
import TodoForm from './TodoForm';
import TodoList from './TodoList';
import useTodoState from './useTodoState';
import './styles.css';
import Header from '../../components/Header';
import { Box } from '@material-ui/core';

const  TodoApp = () => {
  const { todos, addTodo, deleteTodo } = useTodoState([]);

  return (
          <div className="App">
            <Box sx={{ m: 2 }} >
                            <Header title="Todo's" />

             </Box>
     <h3>Type and press enter to add to the list</h3>

      <TodoForm
        saveTodo={todoText => {
          const trimmedText = todoText.trim();

          if (trimmedText.length > 0) {
            addTodo(trimmedText);
          }
        }}
      />

      <TodoList todos={todos} deleteTodo={deleteTodo} />
    </div>
  );
};

export default TodoApp;
