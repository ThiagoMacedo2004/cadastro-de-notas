import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { NotasService } from '../notas.service';
import { MatTableDataSource } from '@angular/material/table';
import { SharedService } from 'src/app/shared/shared.service';
import { MatDialog } from '@angular/material/dialog';
import { HttpErrorResponse } from '@angular/common/http';
import { ValidaDelecaoNotasComponent } from '../notas-dialog/valida-delecao-notas/valida-delecao-notas.component';
import { DetalhesNotasComponent } from '../notas-dialog/detalhes-notas/detalhes-notas.component';

@Component({
  selector: 'app-lista-notas',
  standalone: true,
  imports: [CommonModule, SharedModule],
  templateUrl: './lista-notas.component.html',
  styleUrls: ['./lista-notas.component.css']
})
export class ListaNotasComponent implements OnInit {

  dataSource = new MatTableDataSource<any>()
  displayedColumns: string[] = ['id', 'data_lote', 'data_entrega_contas', 'data_vencimento', 'valor', 'acao' ]

  constructor(
    private _notasService: NotasService,
    private _sharedService:SharedService,
    private _dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.getLoteNotas()
  }

  getLoteNotas() {
    this._notasService.getLoteNotas().subscribe(
      (result: any) => {
        this.dataSource.data = result
      }
    )
  }

  dialogDeletarNotas(lote: any) {
    this._dialog.open(ValidaDelecaoNotasComponent, {
      data: lote
    }).afterClosed().subscribe(
      (result: boolean) => {
        if(result) {
          this.deletarNota(lote)
        }
      }
    )
  }

  deletarNota(lote: any) {
    this._notasService.deletarNotas(lote.id).subscribe({
      next: (result: any) => {
        console.log(result)
        if(result.sucesso) {
          this._sharedService.snackbar(result.sucesso)
          this.getLoteNotas()
        } else {
          this._sharedService.snackbar(result.error)
        }
      },

      error: (e: HttpErrorResponse) => {
        this._sharedService.snackbar(e.message)
      }

    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  detalhesLote(lote: any) {
    this._dialog.open(DetalhesNotasComponent, {
      width: '50%',
      data: lote
    }).afterClosed().subscribe(
      (result: boolean) => {
        if(result) {
          this.getLoteNotas()
        }
      }
    )
  }

  excel(lote: any) {

    const obj = {
      acao: 'excelLote',
      data: lote
    }

    this._notasService.excel(JSON.stringify(obj)).subscribe({
      next: (result: any) => {
        // console.log(result)
        const file = new Blob([result], {
          type: result.type
        })

        const blob = window.URL.createObjectURL(file)

        const link = document.createElement('a')
        link.href = blob
        link.download = `lote-notinhas.xls`
        link.click()

        window.URL.revokeObjectURL(blob)
        // link.remove()
      },
      error: (e: HttpErrorResponse) => this._sharedService.snackbar(e.message)
    })
  }

  pdf(lote: any) {

    const obj = {
      acao: 'pdfRelatorio',
      data: lote
    }

    this._notasService.excel(JSON.stringify(obj)).subscribe({
      next: (result: any) => {
        // console.log(result)
        const file = new Blob([result], {
          type: result.type
        })

        const blob = window.URL.createObjectURL(file)

        const link = document.createElement('a')
        link.href = blob
        link.target = `relatorio_pdf.xls`
        link.click()

        window.URL.revokeObjectURL(blob)
        link.remove()
      },
      error: (e: HttpErrorResponse) => this._sharedService.snackbar(e.message)
    })
  }

}
