import { Component } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-sidenav-container',
  standalone: true,
  imports: [
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatListModule,
    MatButtonModule,
    RouterLink,
  ],
  template: `
    <div class="sidenav-container">
      <mat-toolbar color="primary" class="sidenav-container__toolbar">
        @if (router.url.includes('/portfolio-builder')) {
        <button mat-icon-button (click)="snav.toggle()">
          <mat-icon>menu</mat-icon>
        </button>
        }
        <h1 class="sidenav-container__title" [routerLink]="['/']">
          Job Matcher
        </h1>
      </mat-toolbar>
      <mat-sidenav-container class="sidenav-container__content-container">
        <mat-sidenav #snav>
          <ng-content select="app-sidenav-list"></ng-content>
        </mat-sidenav>
        <mat-sidenav-content class="sidenav-container__content">
          <ng-content></ng-content>
        </mat-sidenav-content>
      </mat-sidenav-container>
    </div>
  `,
  styles: [
    `
      .sidenav-container {
        display: flex;
        flex-direction: column;
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;

        &___toolbar {
          position: fixed;
          z-index: 2;
        }

        &__title {
          cursor: pointer;
        }

        &__content-container {
          flex: 1;
        }
      }
    `,
  ],
})
export class SidenavContainerComponent {
  constructor(public router: Router) {}
}
