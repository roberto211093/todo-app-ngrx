import { Todo } from './todo.model';
import * as TodoActions from './todo.actions';

const initialState: Todo[] = [];

export function TodoReducer(state: Todo[] = initialState, action: TodoActions.TodoActionType){
    
    switch (action.type) {
        //action.type tipo de accion
        case TodoActions.ADD_TODO: {
          return [
            ...state, // estos 3 puntos es una concatenacion de ECMAScript 6 y lo q hace es q yo pueda concatenar toda una lista de items a otra sin problemas
            {
              id: action.id,
              text: action.text,
              completed: false
            }
          ];
        }
        case TodoActions.POPULATE_TODOS: {
          return action.todos;
        }
        case TodoActions.TOGGLE_TODO: {
          //map nos devuelve la misma cantidad de tarea pero con una transformacion
          return state.map(todo => {
            if (todo.id === action.id){
                //Esto: todo.completed = !todo.completed; es equivalente a decir lo siguiente
                return {//creamos una nueva tarea
                  ...todo,//copiamos los atributos de la tarea pasada
                  completed: !todo.completed//Cambiamos el valor del completed
                };
            }else{
              return todo;
            }
          });
        }
        case TodoActions.DELETE_TODO: {
          return  state.filter(todo => action.id !== todo.id);
          //filter nos devuelve los item's q cumplan con la condicion enviada en la funcion de filter
        }
        case TodoActions.UPDATE_TODO: {
          //map nos devuelve la misma cantidad de tarea pero con una transformacion
          return state.map(todo => {
            if (todo.id === action.id){
                return {//creamos una nueva tarea
                  ...todo,//copiamos los atributos de la tarea pasada
                  text: action.text//Cambiamos el valor del text
                };
            }else{
              return todo;
            }
          });
        }
        case TodoActions.CLEAR_COMPLETED_TODO: {
          return state.filter(todo => !todo.completed );
        }
        case TodoActions.COMPLETE_ALL_TODO: {
          const areAllMarked = state.every(todo => todo.completed);
          return state.map(todo => {
            return {
              ...todo,
              completed: !areAllMarked
            };
          });
        }
        default:{
          return state;
        }
    }
}   