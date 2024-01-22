export interface IMedecin {
  id: number;
  nom?: string | null;
  prenom?: string | null;
  role?: string | null;
  disponibilite?: boolean | null;
}

export type NewMedecin = Omit<IMedecin, 'id'> & { id: null };
