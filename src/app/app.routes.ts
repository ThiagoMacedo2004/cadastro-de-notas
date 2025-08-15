import { Routes } from "@angular/router";

export const APP_ROUTES: Routes = [
  {
    path: '', redirectTo: 'notas', pathMatch: 'full'
  },

  {
    path: 'notas',
    loadChildren: () => import('./notas/notas.routes').then(r => r.NOTAS_ROUTES)
  }


]
