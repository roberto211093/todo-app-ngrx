import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { AppState } from './../../redux/app.reducer';
import * as TodoActions from './../../redux/todo/todo.actions';


@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html'
})
export class FooterComponent implements OnInit {

  countTodos: number;
  currentFilter: string;
  showFooter: boolean;

  constructor(
    private store: Store<AppState>
  ) { 
    this.readTodosState();
    this.readFilterState();
  }

  ngOnInit() {
  }

  private readTodosState() {
    this.store.select('todos')
    .subscribe(todos => {
      this.countTodos = todos.filter(t => !t.completed).length;
      this.showFooter = todos.length > 0;
    });
  }

  private readFilterState(){
    this.store.select('filter').subscribe(filter => {
      this.currentFilter = filter;
    })
  }
  
  clearCompleted() {
    const action = new TodoActions.ClearCompletedAction();
    this.store.dispatch(action);
  }

  completedAll() {
    const action = new TodoActions.CompletedAllAction();
    this.store.dispatch(action);
  }
}
