import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Subject, takeUntil, tap } from 'rxjs';
import { PortfolioStorageService } from '../../../../shared/services/portfolio-storage/portfolio-storage.service';

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
  ],
  selector: 'app-resume-form',
  template: `
    <form
      [formGroup]="resumeForm"
      class="resume-form"
      (ngSubmit)="onSaveResume()"
    >
      <mat-form-field class="resume-form__field">
        <mat-label>Input the resume</mat-label>
        <textarea
          matInput
          formControlName="resume"
          placeholder="Ex. I joined the Kaggle competition and won the first prize."
          rows="20"
        ></textarea>
      </mat-form-field>
      <div class="resume-form__actions">
        <button mat-raised-button color="primary" type="submit">Save</button>
      </div>
    </form>
  `,
  styles: [
    `
      .resume-form {
        width: 100%;
        height: auto;

        &__field {
          width: 100%;
        }

        &__actions {
          display: flex;
          justify-content: flex-end;
        }
      }
    `,
  ],
})
export class ResumeFormComponent implements OnInit, OnDestroy {
  resumeForm = this.fb.group({
    resume: ['', Validators.required],
  });
  destroyed$ = new Subject<void>();

  constructor(
    private fb: FormBuilder,
    public portfolioStorageService: PortfolioStorageService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.portfolioStorageService
      .getCurrentResume()
      .pipe(
        takeUntil(this.destroyed$),
        tap((resume) => {
          if (resume) {
            this.resumeForm.patchValue({ resume });
          }
        })
      )
      .subscribe();
  }

  onSaveResume() {
    const resumeValue = this.resumeForm.controls.resume.value;
    if (!resumeValue) return;

    this.portfolioStorageService.setCurrentResume(resumeValue);
    this.router.navigate(['upload'], { relativeTo: this.route });
  }

  ngOnDestroy() {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
}
