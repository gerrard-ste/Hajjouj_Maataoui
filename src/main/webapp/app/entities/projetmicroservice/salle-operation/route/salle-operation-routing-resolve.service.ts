import { inject } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { of, EMPTY, Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { ISalleOperation } from '../salle-operation.model';
import { SalleOperationService } from '../service/salle-operation.service';

export const salleOperationResolve = (route: ActivatedRouteSnapshot): Observable<null | ISalleOperation> => {
  const id = route.params['id'];
  if (id) {
    return inject(SalleOperationService)
      .find(id)
      .pipe(
        mergeMap((salleOperation: HttpResponse<ISalleOperation>) => {
          if (salleOperation.body) {
            return of(salleOperation.body);
          } else {
            inject(Router).navigate(['404']);
            return EMPTY;
          }
        }),
      );
  }
  return of(null);
};

export default salleOperationResolve;
