import { inject } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { of, EMPTY, Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IDossierPatient } from '../dossier-patient.model';
import { DossierPatientService } from '../service/dossier-patient.service';

export const dossierPatientResolve = (route: ActivatedRouteSnapshot): Observable<null | IDossierPatient> => {
  const id = route.params['id'];
  if (id) {
    return inject(DossierPatientService)
      .find(id)
      .pipe(
        mergeMap((dossierPatient: HttpResponse<IDossierPatient>) => {
          if (dossierPatient.body) {
            return of(dossierPatient.body);
          } else {
            inject(Router).navigate(['404']);
            return EMPTY;
          }
        }),
      );
  }
  return of(null);
};

export default dossierPatientResolve;
