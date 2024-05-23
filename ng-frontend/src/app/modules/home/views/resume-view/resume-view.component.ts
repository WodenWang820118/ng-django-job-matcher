import { Component } from '@angular/core';
import { ResumeComponent } from '../../components/resume/resume.component';

@Component({
  standalone: true,
  imports: [ResumeComponent],
  selector: 'app-resume-view',
  template: `
    <div class="resume-view">
      <app-resume></app-resume>
    </div>
  `,
  styles: [
    `
      .resume-view {
        width: 900px;
      }
    `,
  ],
})
export class ResumeViewComponent {}
