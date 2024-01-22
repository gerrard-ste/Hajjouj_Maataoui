import { IDossierPatient } from 'app/entities/projetmicroservice/dossier-patient/dossier-patient.model';
import { IConsentementInformatise } from 'app/entities/projetmicroservice/consentement-informatise/consentement-informatise.model';

export interface IPatient {
  id: number;
  nom?: string | null;
  prenom?: string | null;
  historiqueMedical?: string | null;
  dossierPatient?: IDossierPatient | null;
  consentementInformatise?: IConsentementInformatise | null;
}

export type NewPatient = Omit<IPatient, 'id'> & { id: null };
