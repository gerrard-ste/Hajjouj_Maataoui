import { ISalleOperation, NewSalleOperation } from './salle-operation.model';

export const sampleWithRequiredData: ISalleOperation = {
  id: 7523,
};

export const sampleWithPartialData: ISalleOperation = {
  id: 32394,
  equipementsDisponibles: 'antagoniste miam novice',
  disponibilite: true,
};

export const sampleWithFullData: ISalleOperation = {
  id: 28914,
  equipementsDisponibles: 'coupable rouler presque',
  disponibilite: false,
};

export const sampleWithNewData: NewSalleOperation = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
