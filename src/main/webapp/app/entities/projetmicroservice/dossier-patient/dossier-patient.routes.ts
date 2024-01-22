import { Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ASC } from 'app/config/navigation.constants';
import { DossierPatientComponent } from './list/dossier-patient.component';
import { DossierPatientDetailComponent } from './detail/dossier-patient-detail.component';
import { DossierPatientUpdateComponent } from './update/dossier-patient-update.component';
import DossierPatientResolve from './route/dossier-patient-routing-resolve.service';

const dossierPatientRoute: Routes = [
  {
    path: '',
    component: DossierPatientComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: DossierPatientDetailComponent,
    resolve: {
      dossierPatient: DossierPatientResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: DossierPatientUpdateComponent,
    resolve: {
      dossierPatient: DossierPatientResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: DossierPatientUpdateComponent,
    resolve: {
      dossierPatient: DossierPatientResolve,
    },
    canActivate: [UserRouteAccessService],
  },
];

export default dossierPatientRoute;
