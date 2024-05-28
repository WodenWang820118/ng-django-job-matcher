import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialog } from '@angular/material/dialog';
import { catchError, take, tap } from 'rxjs';
import { RouterLink } from '@angular/router';
import { FileDropDirective } from './../../../../shared/directives/filedrop.directive';
import { InfoDialogComponent } from '../../../../shared/components/info-dialog/info-dialog.component';
import { FileService } from '../../../../shared/services/file/file.service';
import { XlsxPubSubService } from '../../../../shared/services/xlsx-pub-sub/xlsx-pub-sub.service';

@Component({
  standalone: true,
  imports: [
    MatCardModule,
    MatButtonModule,
    InfoDialogComponent,
    FileDropDirective,
    RouterLink,
  ],
  selector: 'app-upload-card',
  templateUrl: './upload-card.component.html',
  styleUrls: ['./upload-card.component.scss'],
})
export class UploadCardComponent {
  files: File[] = [];

  constructor(
    public dialog: MatDialog,
    private fileService: FileService,
    private xlsxPubSubService: XlsxPubSubService
  ) {}

  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    if (file) {
      const fileExtension = file.name.split('.').pop();
      const fileType = file.type;

      if (fileExtension === 'json' && fileType === 'application/json') {
        this.handleJsonFile(file);
      } else if (
        fileExtension === 'xlsx' &&
        fileType ===
          'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
      ) {
        this.files.push(file);
        this.xlsxPubSubService.loadXlsxFile(file).subscribe();
      } else {
        this.dialog.open(InfoDialogComponent, {
          data: {
            title: 'Invalid file',
            message: 'Please upload a valid JSON file.',
            buttonText: 'OK',
          },
        });
      }
    }
  }

  handleJsonFile(file: File): void {
    this.fileService
      .loadJsonFileAsObservable(file)
      .pipe(
        take(1),
        tap((arrayBuffer) => {
          try {
            const text = new TextDecoder().decode(arrayBuffer);
            const json = JSON.parse(text);
            console.log('Parsed JSON: ', json);
          } catch (error) {
            this.dialog.open(InfoDialogComponent, {
              data: {
                title: 'Invalid file',
                message: 'Please upload a valid JSON file.',
                buttonText: 'OK',
              },
            });
          }
        }),
        catchError((error) => {
          this.dialog.open(InfoDialogComponent, {
            data: {
              title: 'Invalid file',
              message: 'Please upload a valid JSON file.',
              buttonText: 'OK',
            },
          });
          return error;
        })
      )
      .subscribe();
  }

  onFileDropped(file: File) {
    this.files.push(file);
  }

  onFilesHovered(isHovered: boolean) {
    // Handle hover state if needed
  }
}
