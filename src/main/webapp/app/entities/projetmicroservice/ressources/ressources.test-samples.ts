import { IRessources, NewRessources } from './ressources.model';

export const sampleWithRequiredData: IRessources = {
  id: 10323,
};

export const sampleWithPartialData: IRessources = {
  id: 1715,
  type: 'de manière à',
};

export const sampleWithFullData: IRessources = {
  id: 28445,
  type: 'quelquefois depuis',
  disponibilite: false,
};

export const sampleWithNewData: NewRessources = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
