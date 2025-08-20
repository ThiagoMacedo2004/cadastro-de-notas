import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-lojas',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './lojas.component.html',
  styleUrls: ['./lojas.component.css']
})
export class LojasComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
