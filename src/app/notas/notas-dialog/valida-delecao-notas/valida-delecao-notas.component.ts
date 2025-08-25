import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-valida-delecao-notas',
  standalone: true,
  imports: [CommonModule, SharedModule],
  templateUrl: './valida-delecao-notas.component.html',
  styleUrls: ['./valida-delecao-notas.component.css'],
})
export class ValidaDelecaoNotasComponent implements OnInit {
  constructor(
    private _dialogRef: MatDialogRef<ValidaDelecaoNotasComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    this._dialogRef.disableClose = true;
  }

  confirmaDelecaoNotas() {
    this._dialogRef.close(true);
  }
}
