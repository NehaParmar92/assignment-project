import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private router: Router) {}

  navigateToEvents(): void {
    this.router.navigate(['/events']);
  }

  isLinkActive(path: string): boolean {
    return this.router.url.startsWith(path);
  }
}
