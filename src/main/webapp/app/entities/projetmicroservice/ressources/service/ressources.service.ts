import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IRessources, NewRessources } from '../ressources.model';

export type PartialUpdateRessources = Partial<IRessources> & Pick<IRessources, 'id'>;

export type EntityResponseType = HttpResponse<IRessources>;
export type EntityArrayResponseType = HttpResponse<IRessources[]>;

@Injectable({ providedIn: 'root' })
export class RessourcesService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/ressources', 'projetmicroservice');

  constructor(
    protected http: HttpClient,
    protected applicationConfigService: ApplicationConfigService,
  ) {}

  create(ressources: NewRessources): Observable<EntityResponseType> {
    return this.http.post<IRessources>(this.resourceUrl, ressources, { observe: 'response' });
  }

  update(ressources: IRessources): Observable<EntityResponseType> {
    return this.http.put<IRessources>(`${this.resourceUrl}/${this.getRessourcesIdentifier(ressources)}`, ressources, {
      observe: 'response',
    });
  }

  partialUpdate(ressources: PartialUpdateRessources): Observable<EntityResponseType> {
    return this.http.patch<IRessources>(`${this.resourceUrl}/${this.getRessourcesIdentifier(ressources)}`, ressources, {
      observe: 'response',
    });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IRessources>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IRessources[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getRessourcesIdentifier(ressources: Pick<IRessources, 'id'>): number {
    return ressources.id;
  }

  compareRessources(o1: Pick<IRessources, 'id'> | null, o2: Pick<IRessources, 'id'> | null): boolean {
    return o1 && o2 ? this.getRessourcesIdentifier(o1) === this.getRessourcesIdentifier(o2) : o1 === o2;
  }

  addRessourcesToCollectionIfMissing<Type extends Pick<IRessources, 'id'>>(
    ressourcesCollection: Type[],
    ...ressourcesToCheck: (Type | null | undefined)[]
  ): Type[] {
    const ressources: Type[] = ressourcesToCheck.filter(isPresent);
    if (ressources.length > 0) {
      const ressourcesCollectionIdentifiers = ressourcesCollection.map(ressourcesItem => this.getRessourcesIdentifier(ressourcesItem)!);
      const ressourcesToAdd = ressources.filter(ressourcesItem => {
        const ressourcesIdentifier = this.getRessourcesIdentifier(ressourcesItem);
        if (ressourcesCollectionIdentifiers.includes(ressourcesIdentifier)) {
          return false;
        }
        ressourcesCollectionIdentifiers.push(ressourcesIdentifier);
        return true;
      });
      return [...ressourcesToAdd, ...ressourcesCollection];
    }
    return ressourcesCollection;
  }
}
