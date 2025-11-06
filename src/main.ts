import { bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { RegisterComponent } from './app/register/register';
import { HomeComponent } from './app/home/home';
import { LoginComponent } from './app/login/login';
import { CRUDBooksComponent } from './app/crud-books/crud-books';

const routes = [
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'books', component: CRUDBooksComponent },  // Nueva ruta CRUD
  
];

bootstrapApplication(HomeComponent, {
  providers: [
    provideHttpClient(),
    provideRouter(routes)
  ]
});