import { IConsentementInformatise, NewConsentementInformatise } from './consentement-informatise.model';

export const sampleWithRequiredData: IConsentementInformatise = {
  id: 7142,
};

export const sampleWithPartialData: IConsentementInformatise = {
  id: 4929,
};

export const sampleWithFullData: IConsentementInformatise = {
  id: 18456,
  informationsPatient: 'hors de',
  consentementObtenu: false,
};

export const sampleWithNewData: NewConsentementInformatise = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
