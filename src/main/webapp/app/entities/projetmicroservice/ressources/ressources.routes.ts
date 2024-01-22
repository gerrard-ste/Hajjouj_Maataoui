import { Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ASC } from 'app/config/navigation.constants';
import { RessourcesComponent } from './list/ressources.component';
import { RessourcesDetailComponent } from './detail/ressources-detail.component';
import { RessourcesUpdateComponent } from './update/ressources-update.component';
import RessourcesResolve from './route/ressources-routing-resolve.service';

const ressourcesRoute: Routes = [
  {
    path: '',
    component: RessourcesComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: RessourcesDetailComponent,
    resolve: {
      ressources: RessourcesResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: RessourcesUpdateComponent,
    resolve: {
      ressources: RessourcesResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: RessourcesUpdateComponent,
    resolve: {
      ressources: RessourcesResolve,
    },
    canActivate: [UserRouteAccessService],
  },
];

export default ressourcesRoute;
