import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';

import { AppState } from './../../redux/app.reducer';
import * as TodoActions from './../../redux/todo/todo.actions';

@Component({
  selector: 'app-new-todo',
  templateUrl: './new-todo.component.html'
})
export class NewTodoComponent implements OnInit {
  textField: FormControl;
  constructor(
    private store: Store<AppState>
  ) { 
    this.textField = new FormControl("", [Validators.required]);
  }

  ngOnInit() {
  }
  
  saveTodo(){
    if(this.textField.valid){
      const text: string = this.textField.value;
      const action = new TodoActions.AddTodoAction(text);
      this.store.dispatch(action);
      this.textField.setValue('');//Para que se limpie el input luego de agregar una tarea
    }
  }
}
