import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidenavContainerComponent } from '../../../../shared/components/sidnav-container/sidenav-container.component';
import { SidenavListComponent } from '../../components/sidenav-list/sidenav-list.component';

@Component({
  standalone: true,
  imports: [RouterOutlet, SidenavContainerComponent, SidenavListComponent],
  selector: 'app-home-view',
  template: `
    <app-sidenav-container>
      <app-sidenav-list></app-sidenav-list>
      <div class="home-view">
        <router-outlet></router-outlet>
      </div>
    </app-sidenav-container>
  `,
  styles: [
    `
      .home-view {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        padding: 3rem 5rem;
      }
    `,
  ],
})
export class HomeViewComponent {}
