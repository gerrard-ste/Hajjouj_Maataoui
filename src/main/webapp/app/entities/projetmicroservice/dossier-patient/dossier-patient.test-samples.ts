import { IDossierPatient, NewDossierPatient } from './dossier-patient.model';

export const sampleWithRequiredData: IDossierPatient = {
  id: 21395,
};

export const sampleWithPartialData: IDossierPatient = {
  id: 30786,
  informationsPatient: 'drôlement apparemment',
  operationsPrevues: 'après que',
};

export const sampleWithFullData: IDossierPatient = {
  id: 11000,
  informationsPatient: 'souffrir',
  operationsPrevues: 'entre coin-coin',
};

export const sampleWithNewData: NewDossierPatient = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
