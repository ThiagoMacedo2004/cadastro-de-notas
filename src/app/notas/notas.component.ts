import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared/shared.module';
import { Router } from '@angular/router';

@Component({
  selector: 'app-notas',
  standalone: true,
  imports: [CommonModule, SharedModule],
  templateUrl: './notas.component.html',
  styleUrls: ['./notas.component.css']
})
export class NotasComponent implements OnInit {

  menu: any = [
    {titulo: 'Resumo Lançamentos', rota: '/notas/lista-notas', icon: 'list'},
    {titulo: 'Cadastrar Notas', rota: '/notas/cadastrar-notas', icon: 'add_list'},
    {titulo: 'Lista de Notas', rota: '#', icon: 'add_list'},
  ]

  constructor(private _router: Router) { }

  ngOnInit(): void {
  }

  navegarMenus() {
    this._router.navigate(['/notas/cadastrar-notas'])
  }

}
