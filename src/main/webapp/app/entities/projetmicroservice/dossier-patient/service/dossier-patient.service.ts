import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IDossierPatient, NewDossierPatient } from '../dossier-patient.model';

export type PartialUpdateDossierPatient = Partial<IDossierPatient> & Pick<IDossierPatient, 'id'>;

export type EntityResponseType = HttpResponse<IDossierPatient>;
export type EntityArrayResponseType = HttpResponse<IDossierPatient[]>;

@Injectable({ providedIn: 'root' })
export class DossierPatientService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/dossier-patients', 'projetmicroservice');

  constructor(
    protected http: HttpClient,
    protected applicationConfigService: ApplicationConfigService,
  ) {}

  create(dossierPatient: NewDossierPatient): Observable<EntityResponseType> {
    return this.http.post<IDossierPatient>(this.resourceUrl, dossierPatient, { observe: 'response' });
  }

  update(dossierPatient: IDossierPatient): Observable<EntityResponseType> {
    return this.http.put<IDossierPatient>(`${this.resourceUrl}/${this.getDossierPatientIdentifier(dossierPatient)}`, dossierPatient, {
      observe: 'response',
    });
  }

  partialUpdate(dossierPatient: PartialUpdateDossierPatient): Observable<EntityResponseType> {
    return this.http.patch<IDossierPatient>(`${this.resourceUrl}/${this.getDossierPatientIdentifier(dossierPatient)}`, dossierPatient, {
      observe: 'response',
    });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IDossierPatient>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IDossierPatient[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getDossierPatientIdentifier(dossierPatient: Pick<IDossierPatient, 'id'>): number {
    return dossierPatient.id;
  }

  compareDossierPatient(o1: Pick<IDossierPatient, 'id'> | null, o2: Pick<IDossierPatient, 'id'> | null): boolean {
    return o1 && o2 ? this.getDossierPatientIdentifier(o1) === this.getDossierPatientIdentifier(o2) : o1 === o2;
  }

  addDossierPatientToCollectionIfMissing<Type extends Pick<IDossierPatient, 'id'>>(
    dossierPatientCollection: Type[],
    ...dossierPatientsToCheck: (Type | null | undefined)[]
  ): Type[] {
    const dossierPatients: Type[] = dossierPatientsToCheck.filter(isPresent);
    if (dossierPatients.length > 0) {
      const dossierPatientCollectionIdentifiers = dossierPatientCollection.map(
        dossierPatientItem => this.getDossierPatientIdentifier(dossierPatientItem)!,
      );
      const dossierPatientsToAdd = dossierPatients.filter(dossierPatientItem => {
        const dossierPatientIdentifier = this.getDossierPatientIdentifier(dossierPatientItem);
        if (dossierPatientCollectionIdentifiers.includes(dossierPatientIdentifier)) {
          return false;
        }
        dossierPatientCollectionIdentifiers.push(dossierPatientIdentifier);
        return true;
      });
      return [...dossierPatientsToAdd, ...dossierPatientCollection];
    }
    return dossierPatientCollection;
  }
}
