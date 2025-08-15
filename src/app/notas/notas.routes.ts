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
    path: '**', loadComponent: () => import('./lista-notas/lista-notas.component').then(c => c.ListaNotasComponent)
  }

]
