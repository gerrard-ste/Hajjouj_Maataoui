export interface IConsentementInformatise {
  id: number;
  informationsPatient?: string | null;
  consentementObtenu?: boolean | null;
}

export type NewConsentementInformatise = Omit<IConsentementInformatise, 'id'> & { id: null };
