import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-info-dialog',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule],
  template: `<div class="info-dialog">
    <h1 mat-dialog-title>{{ data.title }}</h1>
    <div mat-dialog-content>
      <p>{{ data.message }}</p>
      <button mat-raised-button color="warn" [mat-dialog-close]="true">
        {{ data.buttonText }}
      </button>
    </div>
  </div>`,
  styles: [``],
})
export class InfoDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}
}
