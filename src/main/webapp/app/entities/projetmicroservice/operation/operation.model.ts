import dayjs from 'dayjs/esm';
import { IRessources } from 'app/entities/projetmicroservice/ressources/ressources.model';
import { ISalleOperation } from 'app/entities/projetmicroservice/salle-operation/salle-operation.model';
import { IMedecin } from 'app/entities/projetmicroservice/medecin/medecin.model';
import { IDossierPatient } from 'app/entities/projetmicroservice/dossier-patient/dossier-patient.model';

export interface IOperation {
  id: number;
  date?: dayjs.Dayjs | null;
  heure?: dayjs.Dayjs | null;
  urgence?: boolean | null;
  ressources?: IRessources | null;
  salleOperation?: ISalleOperation | null;
  personnel?: IMedecin | null;
  dossierPatient?: IDossierPatient | null;
}

export type NewOperation = Omit<IOperation, 'id'> & { id: null };
