import { ISalleOperation } from 'app/entities/projetmicroservice/salle-operation/salle-operation.model';
import { IMedecin } from 'app/entities/projetmicroservice/medecin/medecin.model';

export interface IRessources {
  id: number;
  type?: string | null;
  disponibilite?: boolean | null;
  salleOperation?: ISalleOperation | null;
  personnel?: IMedecin | null;
}

export type NewRessources = Omit<IRessources, 'id'> & { id: null };
