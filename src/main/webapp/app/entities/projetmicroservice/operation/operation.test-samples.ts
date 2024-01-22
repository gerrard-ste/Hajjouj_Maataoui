import dayjs from 'dayjs/esm';

import { IOperation, NewOperation } from './operation.model';

export const sampleWithRequiredData: IOperation = {
  id: 13812,
};

export const sampleWithPartialData: IOperation = {
  id: 2321,
  date: dayjs('2024-01-18'),
  urgence: false,
};

export const sampleWithFullData: IOperation = {
  id: 22740,
  date: dayjs('2024-01-18'),
  heure: dayjs('2024-01-18T02:03'),
  urgence: true,
};

export const sampleWithNewData: NewOperation = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
