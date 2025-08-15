import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from "@angular/material/toolbar";
import { SharedModule } from '../shared/shared.module';

@Component({
  selector: 'app-notas',
  standalone: true,
  imports: [CommonModule, SharedModule],
  templateUrl: './notas.component.html',
  styleUrls: ['./notas.component.css']
})
export class NotasComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
