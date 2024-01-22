import { inject } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { of, EMPTY, Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IRessources } from '../ressources.model';
import { RessourcesService } from '../service/ressources.service';

export const ressourcesResolve = (route: ActivatedRouteSnapshot): Observable<null | IRessources> => {
  const id = route.params['id'];
  if (id) {
    return inject(RessourcesService)
      .find(id)
      .pipe(
        mergeMap((ressources: HttpResponse<IRessources>) => {
          if (ressources.body) {
            return of(ressources.body);
          } else {
            inject(Router).navigate(['404']);
            return EMPTY;
          }
        }),
      );
  }
  return of(null);
};

export default ressourcesResolve;
