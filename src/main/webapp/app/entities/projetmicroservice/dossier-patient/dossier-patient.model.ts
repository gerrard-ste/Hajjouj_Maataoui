export interface IDossierPatient {
  id: number;
  informationsPatient?: string | null;
  operationsPrevues?: string | null;
}

export type NewDossierPatient = Omit<IDossierPatient, 'id'> & { id: null };
