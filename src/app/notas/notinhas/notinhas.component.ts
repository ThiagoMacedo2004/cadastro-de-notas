import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatTableDataSource } from '@angular/material/table';
import { NotasService } from '../notas.service';
import { SharedService } from 'src/app/shared/shared.service';
import { HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, FormGroup, UntypedFormGroup } from '@angular/forms';
import { MatSort, Sort } from '@angular/material/sort';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatRadioChange } from '@angular/material/radio';

@Component({
  selector: 'app-notinhas',
  standalone: true,
  imports: [CommonModule, SharedModule],
  templateUrl: './notinhas.component.html',
  styleUrls: ['./notinhas.component.css'],
})
export class NotinhasComponent implements OnInit {
  dataSource = new MatTableDataSource<any>();
  displayedColumns: string[] = [
    'loja',
    'centro_de_custo',
    'despesa',
    'codigo_despesa',
    'data_nota',
    'valor_nota',
    'lote'
  ];

  lotes: any[] = []

  anos: number[] = [
    2025, 2026, 2027, 2028, 2029, 2030, 2031, 2032, 2033, 2034, 2035,
  ];
  meses: string[] = [
    '01',
    '02',
    '03',
    '04',
    '05',
    '06',
    '07',
    '08',
    '09',
    '10',
    '11',
    '12',
  ];

  totalNotas: any = 0
  qtNotas: number = 0
  formGroup!: UntypedFormGroup;
  periodo: boolean = true

  textFiltro: string = ''

  constructor(
    private _notaService: NotasService,
    private _sharedService: SharedService,
    private _fb: FormBuilder,
    private _liveAnnouncer: LiveAnnouncer
  ) {}

  @ViewChild(MatSort, { static: false }) set content(sort: MatSort) {
    this.dataSource.sort = sort;
  }

  ngOnInit(): void {
    this.formulario();
    this.getNotas();
    this.getLotes()
    // this.formGroup.valueChanges.subscribe(() => this.getNotas())
  }

  getNotas() {
    this.textFiltro = ''
    this.dataSource.filter = ''
    this._notaService.getNotinhas(JSON.stringify(this.formGroup.value))
      .subscribe({
        next: (result: any) => {
          if (result.error) {
            this._sharedService.snackbar(result.error);
          } else {
            this.dataSource.data = result;
            this.resumoNotas(this.dataSource.data)
            if (this.dataSource.data.length === 0) {
              this._sharedService.snackbar(
                'Nenhuma nota lançada para o periodo informado !'
              );
            }
          }
        },
        error: (e: HttpErrorResponse) =>
          this._sharedService.snackbar(e.message),
      });
  }

  getLotes() {
    this._notaService.getLoteNotas().subscribe({
      next: (result: any) => {
        this.lotes = result
      },
      error: (e: HttpErrorResponse) => this._sharedService.snackbar(e.error)
    })
  }

  resumoNotas(notas: any[]) {
    this.totalNotas = parseFloat(notas.reduce((t, v) => t + parseFloat(v.valor_nota), 0)).toFixed(2).toString()

    this.totalNotas = parseFloat(this.totalNotas).toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    })

    this.qtNotas = notas.length
  }

  formulario() {
    const classAno = new Date();
    const ano = classAno.getFullYear();
    const mes = (classAno.getMonth() +1).toString().length === 1 ? `0${classAno.getMonth() + 1}` : (classAno.getMonth() + 1).toString()

    this.formGroup = this._fb.group({
      acao: 'getNotinhas',
      ano: [ano],
      mes: [''],
      lote:['']
    });
  }

  radioChange(event: MatRadioChange) {

    this.periodo = !this.periodo
    this.dataSource.data = []
    this.textFiltro = ''
    this.resumoNotas(this.dataSource.data)

    this.formGroup.reset()
    this.formulario()
    this.formGroup.enable()

    if(!this.periodo) {
      this.formGroup.get('ano')?.disable()
      this.formGroup.get('mes')?.disable()
    } else {
      this.formGroup.get('lote')?.disable()
    }

  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    this.resumoNotas(this.dataSource.filteredData)

  }

  announceSortChange(sortState: Sort) {

    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }
}
