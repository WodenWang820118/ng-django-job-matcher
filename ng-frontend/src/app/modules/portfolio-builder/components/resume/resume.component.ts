import { Component, OnDestroy, ViewChild } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { RouterLink } from '@angular/router';
import { Subject } from 'rxjs';
import { PortfolioStorageService } from '../../../../shared/services/portfolio-storage/portfolio-storage.service';
import { ResumeFormComponent } from '../resume-form/resume-form.component';

@Component({
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    RouterLink,
    ResumeFormComponent,
  ],
  selector: 'app-resume',
  template: `
    <div class="resume">
      <app-resume-form></app-resume-form>
      <div class="resume__actions">
        <button
          mat-raised-button
          color="primary"
          (click)="onSaveResume()"
          [routerLink]="['./', 'upload']"
        >
          Save
        </button>
      </div>
    </div>
  `,
  styles: [
    `
      .resume {
        width: 100%;

        &__actions {
          display: flex;
          justify-content: flex-end;
        }
      }
    `,
  ],
})
export class ResumeComponent implements OnDestroy {
  destroyed$ = new Subject<void>();
  @ViewChild(ResumeFormComponent) resumeFormComponent!: ResumeFormComponent;

  constructor(public portfolioStorageService: PortfolioStorageService) {}

  onSaveResume() {
    const resumeValue =
      this.resumeFormComponent.resumeForm.controls.resume.value;
    if (!resumeValue) return;

    this.portfolioStorageService.setCurrentResume(resumeValue);
  }

  ngOnDestroy() {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
}
