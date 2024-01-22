export interface ISalleOperation {
  id: number;
  equipementsDisponibles?: string | null;
  disponibilite?: boolean | null;
}

export type NewSalleOperation = Omit<ISalleOperation, 'id'> & { id: null };
