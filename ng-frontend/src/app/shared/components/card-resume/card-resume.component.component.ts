import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MarkdownModule } from 'ngx-markdown';

@Component({
  standalone: true,
  imports: [MatCardModule, MarkdownModule],
  selector: 'app-card-resume',
  template: `<mat-card appearance="outlined">
    <mat-card-header>
      <mat-card-title>Resume</mat-card-title>
    </mat-card-header>
    <mat-card-content>
      <markdown [data]="resume"></markdown>
    </mat-card-content>
  </mat-card>`,
})
export class CardResumeComponent {
  @Input() resume!: string;
}
