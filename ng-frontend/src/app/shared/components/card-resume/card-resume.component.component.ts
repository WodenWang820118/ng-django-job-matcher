import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';

@Component({
  standalone: true,
  imports: [MatCardModule],
  selector: 'app-card-resume',
  template: `<mat-card appearance="outlined">
    <mat-card-header>
      <mat-card-title>Resume</mat-card-title>
    </mat-card-header>
    <mat-card-content>
      <p>{{ resume }}</p>
    </mat-card-content>
  </mat-card>`,
})
export class CardResumeComponent {
  @Input() resume!: string;
}
