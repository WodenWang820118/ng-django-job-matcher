import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-sidenav-list',
  standalone: true,
  imports: [
    MatIconModule,
    MatListModule,
    MatButtonModule,
    RouterLink,
    MatIconModule,
  ],
  template: `
    <mat-nav-list class="nav-list">
      <mat-list-item>
        <mat-icon matListItemIcon>receipt</mat-icon>
        <div matListItemTitle [routerLink]="['/']">Resume</div>
      </mat-list-item>
      <mat-list-item>
        <mat-icon matListItemIcon>cloud_upload</mat-icon>
        <div matListItemTitle [routerLink]="['/', 'upload']">Company Data</div>
      </mat-list-item>
      <mat-list-item>
        <mat-icon matListItemIcon>table_chart</mat-icon>
        <div matListItemTitle [routerLink]="['/', 'table']">
          Column Selection
        </div>
      </mat-list-item>
      <mat-list-item>
        <mat-icon matListItemIcon>dashboard</mat-icon>
        <div matListItemTitle [routerLink]="['/', 'score-board']">
          Matching Scores
        </div>
      </mat-list-item>
    </mat-nav-list>
  `,
  styles: [
    `
      .nav-list {
        padding-right: 2rem;
      }
    `,
  ],
})
export class SidenavListComponent {}
