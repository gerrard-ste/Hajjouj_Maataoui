import { inject } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { of, EMPTY, Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IConsentementInformatise } from '../consentement-informatise.model';
import { ConsentementInformatiseService } from '../service/consentement-informatise.service';

export const consentementInformatiseResolve = (route: ActivatedRouteSnapshot): Observable<null | IConsentementInformatise> => {
  const id = route.params['id'];
  if (id) {
    return inject(ConsentementInformatiseService)
      .find(id)
      .pipe(
        mergeMap((consentementInformatise: HttpResponse<IConsentementInformatise>) => {
          if (consentementInformatise.body) {
            return of(consentementInformatise.body);
          } else {
            inject(Router).navigate(['404']);
            return EMPTY;
          }
        }),
      );
  }
  return of(null);
};

export default consentementInformatiseResolve;
