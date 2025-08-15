import { Component } from '@angular/core';
import { NotasComponent } from './notas/notas.component';
import { RouterModule } from "@angular/router";

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports: [RouterModule, NotasComponent]
})
export class AppComponent {
  title = 'caixinha-infra';
}
