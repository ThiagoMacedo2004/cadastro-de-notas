import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-despesas',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './despesas.component.html',
  styleUrls: ['./despesas.component.css']
})
export class DespesasComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
