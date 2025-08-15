import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';

@Component({
  selector: 'app-cadastrar-notas',
  standalone: true,
  imports: [CommonModule, SharedModule],
  templateUrl: './cadastrar-notas.component.html',
  styleUrls: ['./cadastrar-notas.component.css']
})
export class CadastrarNotasComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
