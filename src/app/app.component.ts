import { Component } from '@angular/core';
import { NotasComponent } from './notas/notas.component';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports: [NotasComponent]
})
export class AppComponent {
  title = 'caixinha-infra';
}
