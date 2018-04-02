import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule, Routes} from '@angular/router';

import {StoreModule} from '@ngrx/store';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';

import {rootReducer} from './../redux/app.reducer'

import {
  LocationStrategy,
  HashLocationStrategy,
} from '@angular/common';

import { AppComponent } from './app.component';
import { TodoComponent } from './todo/todo.component';
import { TodoListComponent } from './todo-list/todo-list.component';
import { NewTodoComponent } from './new-todo/new-todo.component';
import { FooterComponent } from './footer/footer.component';

const routes: Routes = [
  //routes basicos
  {path: '', component: TodoListComponent, pathMatch: 'full'},
  {path: ':filter', component: TodoListComponent, pathMatch: 'full'}  
]

@NgModule({
  declarations: [
    AppComponent,
    TodoComponent,
    TodoListComponent,
    NewTodoComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes),
    StoreModule.forRoot(rootReducer),
    StoreDevtoolsModule.instrument({
      maxAge: 25//cuantos estados quiero q guarde
    })
  ],
  providers: [ 
    {provide: LocationStrategy, useClass: HashLocationStrategy}
   ],
  bootstrap: [AppComponent]
})
export class AppModule { }
