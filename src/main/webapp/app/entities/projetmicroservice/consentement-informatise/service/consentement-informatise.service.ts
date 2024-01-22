import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IConsentementInformatise, NewConsentementInformatise } from '../consentement-informatise.model';

export type PartialUpdateConsentementInformatise = Partial<IConsentementInformatise> & Pick<IConsentementInformatise, 'id'>;

export type EntityResponseType = HttpResponse<IConsentementInformatise>;
export type EntityArrayResponseType = HttpResponse<IConsentementInformatise[]>;

@Injectable({ providedIn: 'root' })
export class ConsentementInformatiseService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/consentement-informatises', 'projetmicroservice');

  constructor(
    protected http: HttpClient,
    protected applicationConfigService: ApplicationConfigService,
  ) {}

  create(consentementInformatise: NewConsentementInformatise): Observable<EntityResponseType> {
    return this.http.post<IConsentementInformatise>(this.resourceUrl, consentementInformatise, { observe: 'response' });
  }

  update(consentementInformatise: IConsentementInformatise): Observable<EntityResponseType> {
    return this.http.put<IConsentementInformatise>(
      `${this.resourceUrl}/${this.getConsentementInformatiseIdentifier(consentementInformatise)}`,
      consentementInformatise,
      { observe: 'response' },
    );
  }

  partialUpdate(consentementInformatise: PartialUpdateConsentementInformatise): Observable<EntityResponseType> {
    return this.http.patch<IConsentementInformatise>(
      `${this.resourceUrl}/${this.getConsentementInformatiseIdentifier(consentementInformatise)}`,
      consentementInformatise,
      { observe: 'response' },
    );
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IConsentementInformatise>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IConsentementInformatise[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getConsentementInformatiseIdentifier(consentementInformatise: Pick<IConsentementInformatise, 'id'>): number {
    return consentementInformatise.id;
  }

  compareConsentementInformatise(
    o1: Pick<IConsentementInformatise, 'id'> | null,
    o2: Pick<IConsentementInformatise, 'id'> | null,
  ): boolean {
    return o1 && o2 ? this.getConsentementInformatiseIdentifier(o1) === this.getConsentementInformatiseIdentifier(o2) : o1 === o2;
  }

  addConsentementInformatiseToCollectionIfMissing<Type extends Pick<IConsentementInformatise, 'id'>>(
    consentementInformatiseCollection: Type[],
    ...consentementInformatisesToCheck: (Type | null | undefined)[]
  ): Type[] {
    const consentementInformatises: Type[] = consentementInformatisesToCheck.filter(isPresent);
    if (consentementInformatises.length > 0) {
      const consentementInformatiseCollectionIdentifiers = consentementInformatiseCollection.map(
        consentementInformatiseItem => this.getConsentementInformatiseIdentifier(consentementInformatiseItem)!,
      );
      const consentementInformatisesToAdd = consentementInformatises.filter(consentementInformatiseItem => {
        const consentementInformatiseIdentifier = this.getConsentementInformatiseIdentifier(consentementInformatiseItem);
        if (consentementInformatiseCollectionIdentifiers.includes(consentementInformatiseIdentifier)) {
          return false;
        }
        consentementInformatiseCollectionIdentifiers.push(consentementInformatiseIdentifier);
        return true;
      });
      return [...consentementInformatisesToAdd, ...consentementInformatiseCollection];
    }
    return consentementInformatiseCollection;
  }
}
