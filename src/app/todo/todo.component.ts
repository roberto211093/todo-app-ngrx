import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Todo } from './../../redux/todo/todo.model';
import * as TodoActions from './../../redux/todo/todo.actions';
import { Store } from '@ngrx/store';
import { AppState } from '../../redux/app.reducer';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html'
})
export class TodoComponent implements OnInit {

  @Input() todo: Todo;
  checkField: FormControl;
  textField: FormControl;
  editing: boolean;
  @ViewChild('textInput') textInput: ElementRef;

  constructor(
    private store: Store<AppState>
  ) {
    this.checkField = new FormControl(false);
    this.textField = new FormControl('', [Validators.required]);
    this.checkField.valueChanges.subscribe(state =>{
      const id = this.todo.id;
      const action = new TodoActions.ToggleAction(this.todo.id);
      this.store.dispatch(action);
    })
   }

  ngOnInit() {
    this.textField.setValue(this.todo.text);
    this.checkField.setValue(this.todo.completed, {emitEvent:false});
    //Cuando queramos modificar algun valor pero q no emita ningun subscribe decimos emitEvent:false
  }

  deleteTodo(){
    const id = this.todo.id;
    const action = new TodoActions.DeleteTodoAction(id);
    this.store.dispatch(action); 
  }

  activeEditMode(){
    this.editing = true;
    setTimeout(() => {
      this.textInput.nativeElement.focus();
    });
  }

  updateText(){
    if(this.textField.valid && this.editing){
      const id = this.todo.id;
      const newtext: string = this.textField.value;
      const action = new TodoActions.UpdateAction(id, newtext.trim());
      this.store.dispatch(action);
      this.editing = false; 
    }
  }
}
