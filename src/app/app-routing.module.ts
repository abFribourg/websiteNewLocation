import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SnakeComponent } from './snake/snake.component';
import { HomeComponent } from './home/home.component';
import { AppComponent } from './app.component';


const routes: Routes = [
  { path: 'snake', component: SnakeComponent },
  { path: 'home' , component: HomeComponent },
  { path: '' , component: HomeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
