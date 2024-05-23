import { Component } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';

@Component({
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
  ],
  selector: 'app-resume',
  template: `
    <div class="resume">
      <form
        [formGroup]="resumeForm"
        class="resume__form"
        (ngSubmit)="onCacheInfo()"
      >
        <mat-form-field class="resume__form__field">
          <mat-label>Input the resume</mat-label>
          <textarea
            matInput
            placeholder="Ex. I joined the Kaggle competition and won the first prize."
            rows="20"
          ></textarea>
        </mat-form-field>
      </form>
      <div class="resume__actions">
        <button mat-raised-button color="primary">Save</button>
      </div>
    </div>
  `,
  styles: [
    `
      .resume {
        width: 100%;

        &__form {
          width: 100%;

          &__field {
            width: 100%;
          }
        }

        &__actions {
          display: flex;
          justify-content: flex-end;
        }
      }
    `,
  ],
})
export class ResumeComponent {
  resumeForm = this.fb.group({
    resume: [''],
  });
  constructor(private fb: FormBuilder, private router: Router) {}

  onCacheInfo() {
    // TODO: cache the resume info into the IndexedDB and navigate to the next page
    console.log(this.resumeForm.value);
    this.router.navigate(['/upload']);
  }
}
