import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { InfoDialogComponent } from 'ng-frontend/src/app/shared/components/info-dialog/info-dialog.component';
import { map, switchMap, take, of } from 'rxjs';
import { db } from '../../../db';
import { Router } from '@angular/router';
import { CardPortfolioEditComponent } from '../card-portfolio-edit/card-portfolio-edit.component';

@Component({
  standalone: true,
  imports: [MatCardModule, MatButtonModule, CardPortfolioEditComponent],
  selector: 'app-card-portfolio-info',
  template: ` @if (!editInfo) {
    <mat-card appearance="outlined">
      <mat-card-header>
        <mat-card-title>{{ name }}</mat-card-title>
      </mat-card-header>
      <mat-card-content>
        <p>{{ description }}</p>
      </mat-card-content>
      <mat-card-actions>
        <button mat-button color="primary" (click)="toggeleEditInfo()">
          EDIT
        </button>
        <button mat-button color="warn" (click)="deletePortfolio()">
          DELETE
        </button>
      </mat-card-actions>
    </mat-card>
    } @else if(editInfo) {
    <app-card-portfolio-edit
      (updateComplete)="toggeleEditInfo()"
    ></app-card-portfolio-edit>
    }`,
})
export class CardPortfolioInfoComponent {
  @Input() portfolioId!: string;
  @Input() name!: string;
  @Input() description!: string;
  editInfo = false;

  constructor(public dialog: MatDialog, private router: Router) {}

  deletePortfolio(): void {
    const dialogRef = this.dialog.open(InfoDialogComponent, {
      data: {
        title: 'Delete Portfolio',
        message: 'Are you sure you want to delete this portfolio?',
        buttonText: 'Delete',
      },
    });

    dialogRef
      .afterClosed()
      .pipe(
        take(1),
        map((result) => {
          console.log('Dialog result:', result);
          if (result) {
            console.log('Deleting portfolio...');
            return result;
          }
          return of(false);
        }),
        switchMap((result) => {
          if (result === true) {
            console.log('Portfolio deleted');
            this.router.navigate(['/portfolio']);
            return db.deletePortfolio(this.portfolioId);
          }
          return of(false);
        })
      )
      .subscribe();
  }

  toggeleEditInfo(): void {
    console.log('Toggling edit info');
    this.editInfo = !this.editInfo;
  }
}
