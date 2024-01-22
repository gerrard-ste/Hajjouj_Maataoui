import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { ISalleOperation, NewSalleOperation } from '../salle-operation.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts ISalleOperation for edit and NewSalleOperationFormGroupInput for create.
 */
type SalleOperationFormGroupInput = ISalleOperation | PartialWithRequiredKeyOf<NewSalleOperation>;

type SalleOperationFormDefaults = Pick<NewSalleOperation, 'id' | 'disponibilite'>;

type SalleOperationFormGroupContent = {
  id: FormControl<ISalleOperation['id'] | NewSalleOperation['id']>;
  equipementsDisponibles: FormControl<ISalleOperation['equipementsDisponibles']>;
  disponibilite: FormControl<ISalleOperation['disponibilite']>;
};

export type SalleOperationFormGroup = FormGroup<SalleOperationFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class SalleOperationFormService {
  createSalleOperationFormGroup(salleOperation: SalleOperationFormGroupInput = { id: null }): SalleOperationFormGroup {
    const salleOperationRawValue = {
      ...this.getFormDefaults(),
      ...salleOperation,
    };
    return new FormGroup<SalleOperationFormGroupContent>({
      id: new FormControl(
        { value: salleOperationRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        },
      ),
      equipementsDisponibles: new FormControl(salleOperationRawValue.equipementsDisponibles),
      disponibilite: new FormControl(salleOperationRawValue.disponibilite),
    });
  }

  getSalleOperation(form: SalleOperationFormGroup): ISalleOperation | NewSalleOperation {
    return form.getRawValue() as ISalleOperation | NewSalleOperation;
  }

  resetForm(form: SalleOperationFormGroup, salleOperation: SalleOperationFormGroupInput): void {
    const salleOperationRawValue = { ...this.getFormDefaults(), ...salleOperation };
    form.reset(
      {
        ...salleOperationRawValue,
        id: { value: salleOperationRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */,
    );
  }

  private getFormDefaults(): SalleOperationFormDefaults {
    return {
      id: null,
      disponibilite: false,
    };
  }
}
