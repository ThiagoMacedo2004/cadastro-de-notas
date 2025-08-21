import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirmar-nota-dialog',
  standalone: true,
  imports: [CommonModule, SharedModule],
  templateUrl: './confirmar-nota-dialog.component.html',
  styleUrls: ['./confirmar-nota-dialog.component.css']
})
export class ConfirmarNotaDialogComponent implements OnInit {

  constructor(
    private _dialogRef: MatDialogRef<ConfirmarNotaDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  ngOnInit(): void {
    this._dialogRef.disableClose = true
  }

  notaValidada() {
    this._dialogRef.close(true)
  }

}
