import { IPatient, NewPatient } from './patient.model';

export const sampleWithRequiredData: IPatient = {
  id: 20976,
};

export const sampleWithPartialData: IPatient = {
  id: 13782,
  nom: "aujourd'hui",
  prenom: 'trop hé siffler',
};

export const sampleWithFullData: IPatient = {
  id: 6067,
  nom: 'depuis ha sans doute',
  prenom: 'succéder',
  historiqueMedical: 'parmi fabriquer',
};

export const sampleWithNewData: NewPatient = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
