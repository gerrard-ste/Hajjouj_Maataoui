import { IMedecin, NewMedecin } from './medecin.model';

export const sampleWithRequiredData: IMedecin = {
  id: 25052,
};

export const sampleWithPartialData: IMedecin = {
  id: 16405,
  disponibilite: true,
};

export const sampleWithFullData: IMedecin = {
  id: 26721,
  nom: 'pschitt avex à condition que',
  prenom: 'tic-tac conseil municipal',
  role: 'ha ha',
  disponibilite: true,
};

export const sampleWithNewData: NewMedecin = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
