import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [],
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent {
  constructor(private router: Router) {}

  // Navigate to a specified URL
  navigateTo(url: string) {
    this.router.navigate([url]);
  }
}
