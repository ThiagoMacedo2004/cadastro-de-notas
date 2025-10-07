import { Routes } from "@angular/router";

export const NOTAS_ROUTES: Routes = [
  {path: '', redirectTo:"lista-notas", pathMatch: 'full'},

  {
    path: 'lista-notas',
    loadComponent: () => import('./lista-notas/lista-notas.component').then(c => c.ListaNotasComponent)
  },

  {
    path: 'cadastrar-notas',
    loadComponent: () => import('./cadastrar-notas/cadastrar-notas.component').then(c => c.CadastrarNotasComponent)
  },

  {
    path: 'notinhas',
    loadComponent: () => import('./notinhas/notinhas.component').then(c => c.NotinhasComponent)
  },

  {
    path: '**', loadComponent: () => import('./lista-notas/lista-notas.component').then(c => c.ListaNotasComponent)
  }

]
