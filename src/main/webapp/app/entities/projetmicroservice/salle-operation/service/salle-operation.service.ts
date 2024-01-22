import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { ISalleOperation, NewSalleOperation } from '../salle-operation.model';

export type PartialUpdateSalleOperation = Partial<ISalleOperation> & Pick<ISalleOperation, 'id'>;

export type EntityResponseType = HttpResponse<ISalleOperation>;
export type EntityArrayResponseType = HttpResponse<ISalleOperation[]>;

@Injectable({ providedIn: 'root' })
export class SalleOperationService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/salle-operations', 'projetmicroservice');

  constructor(
    protected http: HttpClient,
    protected applicationConfigService: ApplicationConfigService,
  ) {}

  create(salleOperation: NewSalleOperation): Observable<EntityResponseType> {
    return this.http.post<ISalleOperation>(this.resourceUrl, salleOperation, { observe: 'response' });
  }

  update(salleOperation: ISalleOperation): Observable<EntityResponseType> {
    return this.http.put<ISalleOperation>(`${this.resourceUrl}/${this.getSalleOperationIdentifier(salleOperation)}`, salleOperation, {
      observe: 'response',
    });
  }

  partialUpdate(salleOperation: PartialUpdateSalleOperation): Observable<EntityResponseType> {
    return this.http.patch<ISalleOperation>(`${this.resourceUrl}/${this.getSalleOperationIdentifier(salleOperation)}`, salleOperation, {
      observe: 'response',
    });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ISalleOperation>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ISalleOperation[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getSalleOperationIdentifier(salleOperation: Pick<ISalleOperation, 'id'>): number {
    return salleOperation.id;
  }

  compareSalleOperation(o1: Pick<ISalleOperation, 'id'> | null, o2: Pick<ISalleOperation, 'id'> | null): boolean {
    return o1 && o2 ? this.getSalleOperationIdentifier(o1) === this.getSalleOperationIdentifier(o2) : o1 === o2;
  }

  addSalleOperationToCollectionIfMissing<Type extends Pick<ISalleOperation, 'id'>>(
    salleOperationCollection: Type[],
    ...salleOperationsToCheck: (Type | null | undefined)[]
  ): Type[] {
    const salleOperations: Type[] = salleOperationsToCheck.filter(isPresent);
    if (salleOperations.length > 0) {
      const salleOperationCollectionIdentifiers = salleOperationCollection.map(
        salleOperationItem => this.getSalleOperationIdentifier(salleOperationItem)!,
      );
      const salleOperationsToAdd = salleOperations.filter(salleOperationItem => {
        const salleOperationIdentifier = this.getSalleOperationIdentifier(salleOperationItem);
        if (salleOperationCollectionIdentifiers.includes(salleOperationIdentifier)) {
          return false;
        }
        salleOperationCollectionIdentifiers.push(salleOperationIdentifier);
        return true;
      });
      return [...salleOperationsToAdd, ...salleOperationCollection];
    }
    return salleOperationCollection;
  }
}
