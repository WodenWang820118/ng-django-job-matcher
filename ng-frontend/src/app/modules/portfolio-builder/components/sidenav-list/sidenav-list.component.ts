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
      <mat-list-item [routerLink]="['/', 'portfolio']">
        <mat-icon matListItemIcon>keyboard_backspace</mat-icon>
        <div matListItemTitle>Back to Portfolio</div>
      </mat-list-item>
      <mat-list-item [routerLink]="['./']">
        <mat-icon matListItemIcon>receipt</mat-icon>
        <div matListItemTitle>Resume</div>
      </mat-list-item>
      <mat-list-item [routerLink]="['./', 'upload']">
        <mat-icon matListItemIcon>cloud_upload</mat-icon>
        <div matListItemTitle>Company Data</div>
      </mat-list-item>
      <mat-list-item [routerLink]="['./', 'xlsx-table']">
        <mat-icon matListItemIcon>table_chart</mat-icon>
        <div matListItemTitle>Column Selection</div>
      </mat-list-item>
      <mat-list-item [routerLink]="['./', 'validation']">
        <mat-icon matListItemIcon>dashboard</mat-icon>
        <div matListItemTitle>Validation</div>
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
