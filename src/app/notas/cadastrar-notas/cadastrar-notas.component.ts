import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { LojasService } from 'src/app/lojas/lojas.service';
import { HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { map, Observable, startWith } from 'rxjs';
import { DespesasService } from 'src/app/despesas/despesas.service';
import { MyErrorStateMatcher } from 'src/app/shared/validade-form';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort, Sort } from '@angular/material/sort';
import { LiveAnnouncer } from '@angular/cdk/a11y';

@Component({
  selector: 'app-cadastrar-notas',
  standalone: true,
  imports: [CommonModule, SharedModule],
  templateUrl: './cadastrar-notas.component.html',
  styleUrls: ['./cadastrar-notas.component.css']
})
export class CadastrarNotasComponent implements OnInit {

  filtroLojas: Loja[] = []
  lojas: Loja[] = []

  filtroDespesa: Despesa[] = []
  despesas: Despesa[] = []

  valorDigitado: any = []
  dataDigitada = new Date()

  formGroup!: UntypedFormGroup
  matcher = new MyErrorStateMatcher();
  notas: Nota [] = []
  valorTotalNotas: any = 'R$0,00'


  dataSource = new MatTableDataSource<Nota>()
  columnsToDisplay = ['#', 'loja', 'dataNota', 'despesa', 'valor', 'ACAO'];


  constructor(
    private _lojasService: LojasService,
    private _despesaService: DespesasService,
    private _fb: FormBuilder,
    private _liveAnnouncer: LiveAnnouncer
  ) { }

  @ViewChild(MatSort, {static: false}) set content(sort: MatSort) {
    this.dataSource.sort = sort;
  }

  ngOnInit(): void {
    this.formularioNota()
    this.getLojas()
    this.getDespesas()
    this.dataSource.data = this.notas

    this.formGroup.get('loja')?.valueChanges.subscribe(
      (value: string) => {
        this.filtroLojas = this.filtrandoLojas(value)
      }
    )

    this.formGroup.get('despesa')?.valueChanges.subscribe(
      (value: string) => {
        this.filtroDespesa = this.filtrandoDespesas(value)
      }
    )
  }



  formularioNota() {
    this.formGroup = this._fb.group({
      idLoja   : [''],
      loja     : ['', Validators.required],
      dataNota : ['', [Validators.required]],
      idDespesa: [''],
      despesa  : ['', [Validators.required]],
      valor    : ['', Validators.required]
    })
  }

  salvarNota() {
    if(!this.formGroup.valid) {
      return
    }

    let nf = this.formGroup.value

    // verificando os ids de loja e despesa
    let loja: Loja = this.lojas.filter((l) => l.loja === nf.loja)[0]
    let despesa: Despesa = this.despesas.filter((d) => d.despesa === nf.despesa)[0]

    if(!loja || !despesa) {
      return
    }

    // setando no formulario os ids de loja e despesa salvas
    this.formGroup.get('idLoja')?.reset(loja.id)
    this.formGroup.get('idDespesa')?.reset(despesa.id)

    this.formGroup.get('dataNota')?.reset(this.dataDigitada, Validators.required)

    // add nota no array de notas
    this.notas.push(this.formGroup.value)
    this.dataSource.data = this.notas


    // resetando formulario para gravar uma nova nota
    this.resetarFormulario()

    this.calcularValorTotal()

  }

  calcularValorTotal() {
    let valorTotal: number = this.notas.reduce((a: any, b:Nota) => a + parseFloat(b.valor), 0)
    let valorTotalFormatado: string = valorTotal.toFixed(2).toString()

    this.valorTotalNotas = parseFloat(valorTotalFormatado).toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    })
  }

  getLojas() {
    this._lojasService.getLojas().subscribe(
      (result: Loja[]) => {
        this.lojas = result
        this.filtroLojas = result
      }
    )
  }

  getDespesas() {
    this._despesaService.getDespesas().subscribe(
      (data: Despesa[]) => {
        this.despesas = data
        this.filtroDespesa = data

      }
    )
  }

  deletarNotaLista(nota: Nota) {
    let index = this.notas.indexOf(nota)
    this.notas.splice(index, 1)
    this.dataSource.data = this.notas

    this.calcularValorTotal()
  }

  filtrandoLojas(value: string): Loja[] {
    const filterLoja = value.toLowerCase()

    return this.lojas.filter(loja => loja.loja.toLowerCase().includes(filterLoja))
  }

   filtrandoDespesas(value: string): Despesa[] {
    const filterDespesa = value.toLowerCase()

    return this.despesas.filter(v => v.despesa.toLowerCase().includes(filterDespesa))
  }

  formatarValor(event: Event) {
    const regex = /\D/g;
    let valor = (event.target as HTMLInputElement).value.replace(regex, '')
    this.valorDigitado = valor

    if(!this.valorDigitado) {
      return
    }

    let x = this.valorDigitado.replace('.', '')
    let y = parseFloat(x) / 100
    x = y.toFixed(2).toString()
    this.valorDigitado = x
    // console.log(`R$ ${parseFloat(this.valorDigitado).toLocaleString('pt-BR')}`)

  }

  eventoData() {
    let dataNf = (document.querySelector('#data-nf') as HTMLInputElement).value

    if(!dataNf || dataNf.length < 10) {

      return
    }
    let arrayData = dataNf.split('/')

    let dia = Number(arrayData[0])
    let mes = Number(arrayData[1]) - 1
    let ano = Number(arrayData[2])
    let dataFormatada = new Date()

    dataFormatada.setFullYear(ano, mes, dia )
    this.dataDigitada = dataFormatada
    this.formGroup.get('dataNota')?.reset(this.dataDigitada, Validators.required)
  }

  getErrorMessage() {
    if (this.formGroup.get('dataNota')?.hasError('required')) {
      return 'Informe uma data.';
    }

    return this.formGroup.get('dataNota')?.errors ? 'Data Inválida.' : '';
    // return this.formGroup.get('dataNota')?.hasError('required') ? 'Data invalida.' : ''
  }

  resetarFormulario() {
    this.formGroup.get('idLoja')?.reset('')
    this.formGroup.get('loja')?.reset('')
    this.formGroup.get('dataNota')?.reset('')
    this.formGroup.get('idDespesa')?.reset('')
    this.formGroup.get('despesa')?.reset('')
    this.formGroup.get('valor')?.reset('')

    this.focoInputLoja()
  }

  focoInputLoja() {
    (document.querySelector('#input-loja') as HTMLInputElement).focus()
  }

  announceSortChange(sortState: Sort) {
    console.log(sortState)
    // This example uses English messages. If your application supports
    // multiple language, you would internationalize these strings.
    // Furthermore, you can customize the message to add additional
    // details about the values being sorted.
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

}

export interface Nota {
  idLoja: string,
  loja: string,
  dataNota: string,
  idDespesa: string,
  despesa: string,
  valor: string
}

export interface Loja {
  id: string,
  loja: string,
  centro_de_custo: string
}

export interface Despesa {
  id: string,
  codigo_despesa: string,
  despesa: string
}
