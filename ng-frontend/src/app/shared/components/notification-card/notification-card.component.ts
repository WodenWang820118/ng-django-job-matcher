import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-notification-card',
  standalone: true,
  imports: [MatCardModule],
  template: `
    <mat-card class="notification-card">
      <mat-card-header class="notification-card__header">
        <mat-card-title>Notification</mat-card-title>
      </mat-card-header>
      <mat-card-content class="notification-card__content">
        <ng-content></ng-content>
      </mat-card-content>
    </mat-card>
  `,
  styles: [
    `
      .notification-card {
        width: 400px;
        height: 200px;

        &__header {
          display: flex;
          justify-content: center;
          font-size: 1.5rem;
        }

        &__content {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100%;
        }
      }
    `,
  ],
})
export class NotificationCardComponent {}
