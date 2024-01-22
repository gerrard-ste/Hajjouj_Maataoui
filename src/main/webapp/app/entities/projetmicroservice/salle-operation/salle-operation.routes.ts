import { Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ASC } from 'app/config/navigation.constants';
import { SalleOperationComponent } from './list/salle-operation.component';
import { SalleOperationDetailComponent } from './detail/salle-operation-detail.component';
import { SalleOperationUpdateComponent } from './update/salle-operation-update.component';
import SalleOperationResolve from './route/salle-operation-routing-resolve.service';

const salleOperationRoute: Routes = [
  {
    path: '',
    component: SalleOperationComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: SalleOperationDetailComponent,
    resolve: {
      salleOperation: SalleOperationResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: SalleOperationUpdateComponent,
    resolve: {
      salleOperation: SalleOperationResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: SalleOperationUpdateComponent,
    resolve: {
      salleOperation: SalleOperationResolve,
    },
    canActivate: [UserRouteAccessService],
  },
];

export default salleOperationRoute;
