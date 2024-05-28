import { Component } from '@angular/core';
import { ResumeFormComponent } from '../../components/resume-form/resume-form.component';

@Component({
  standalone: true,
  imports: [ResumeFormComponent],
  selector: 'app-resume-view',
  template: `
    <div class="resume-view">
      <app-resume-form></app-resume-form>
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
