import { Component } from '@angular/core';
import { Router } from '@angular/router'; // Importer Router
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'] // Correction ici
})
export class AppComponent {
  title = 'ngrx_test';

}
