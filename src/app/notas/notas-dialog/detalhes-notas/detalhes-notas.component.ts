import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { NotasService } from '../../notas.service';
import { SharedService } from 'src/app/shared/shared.service';
import { MatTableDataSource } from '@angular/material/table';
import { FormBuilder, UntypedFormGroup } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-detalhes-notas',
  standalone: true,
  imports: [CommonModule, SharedModule],
  templateUrl: './detalhes-notas.component.html',
  styleUrls: ['./detalhes-notas.component.css'],
})
export class DetalhesNotasComponent implements OnInit {
  dataSource = new MatTableDataSource<any>();
  dataDigitada = new Date()

  displayedColumns: string[] = [
    'loja',
    'centro_de_custo',
    'despesa',
    'codigo_despesa',
    'data_nota',
    'valor_nota',
  ];

  formGroup!: UntypedFormGroup;

  constructor(
    private _dialogRef: MatDialogRef<DetalhesNotasComponent>,
    private _notasService: NotasService,
    private _sharedService: SharedService,
    private _fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public lote: any
  ) {}

  ngOnInit(): void {
    this.notasLote();
    this.formulario()
    console.log(this.lote)
  }

  formulario() {
    this.formGroup = this._fb.group({
      acao: 'salvarDatas',
      id: [this.lote.id],
      dataEntregueContas: [this.lote.data_entrega_contas ? this.lote.data_entrega_contas : ''],
      dataVencimento: [this.lote.data_vencimento ? this.lote.data_vencimento : ''],
    });
  }

  salvarDatas() {
    this._notasService.salvarDatas(JSON.stringify(this.formGroup.value)).subscribe({
      next: (result: any) => {
        if(result.sucesso) {
          this._sharedService.snackbar(result.sucesso)
          this._dialogRef.close(true)
        } else {
          this._sharedService.snackbar(result.error)
        }
      },
      error: (e: HttpErrorResponse) => this._sharedService.snackbar(e.message)
    })
  }

  notasLote() {
    this._notasService.detalhesLote(this.lote.id).subscribe({
      next: (result: any) => {
        if (result.error) {
          this._sharedService.snackbar(result.error);
        } else {
          this.dataSource.data = result;
        }
      },
    });
  }

  getErrorMessage() {
    return 'Informe uma data.';
  }

  eventoData(formControlName: string) {
    // let dataNf = (document.querySelector('#data-nf') as HTMLInputElement).value;

    if (!this.formGroup.get(formControlName) || this.formGroup.get(formControlName)?.value.length < 10) {
      return;
    }
    let arrayData = this.formGroup.get(formControlName)?.value.split('/');

    let dia = Number(arrayData[0]);
    let mes = Number(arrayData[1]) - 1;
    let ano = Number(arrayData[2]);
    let dataFormatada = new Date();

    dataFormatada.setFullYear(ano, mes, dia);
    this.dataDigitada = dataFormatada;
    this.formGroup.get(formControlName)?.reset(this.dataDigitada.valueOf);
  }
}
