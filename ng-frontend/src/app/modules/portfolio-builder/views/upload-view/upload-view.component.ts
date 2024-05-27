import { Component } from '@angular/core';
import { UploadCardComponent } from '../../components/upload-card/upload-card.component';
@Component({
  standalone: true,
  imports: [UploadCardComponent],
  selector: 'app-upload-view',
  template: `
    <div class="upload-view">
      <app-upload-card></app-upload-card>
    </div>
  `,
  styles: [
    `
      .upload-view {
        width: 700px;
      }
    `,
  ],
})
export class UploadViewComponent {}
