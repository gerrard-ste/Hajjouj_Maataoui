import { Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ASC } from 'app/config/navigation.constants';
import { ConsentementInformatiseComponent } from './list/consentement-informatise.component';
import { ConsentementInformatiseDetailComponent } from './detail/consentement-informatise-detail.component';
import { ConsentementInformatiseUpdateComponent } from './update/consentement-informatise-update.component';
import ConsentementInformatiseResolve from './route/consentement-informatise-routing-resolve.service';

const consentementInformatiseRoute: Routes = [
  {
    path: '',
    component: ConsentementInformatiseComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: ConsentementInformatiseDetailComponent,
    resolve: {
      consentementInformatise: ConsentementInformatiseResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: ConsentementInformatiseUpdateComponent,
    resolve: {
      consentementInformatise: ConsentementInformatiseResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: ConsentementInformatiseUpdateComponent,
    resolve: {
      consentementInformatise: ConsentementInformatiseResolve,
    },
    canActivate: [UserRouteAccessService],
  },
];

export default consentementInformatiseRoute;
