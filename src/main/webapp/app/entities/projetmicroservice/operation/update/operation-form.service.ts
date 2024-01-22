import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import dayjs from 'dayjs/esm';
import { DATE_TIME_FORMAT } from 'app/config/input.constants';
import { IOperation, NewOperation } from '../operation.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IOperation for edit and NewOperationFormGroupInput for create.
 */
type OperationFormGroupInput = IOperation | PartialWithRequiredKeyOf<NewOperation>;

/**
 * Type that converts some properties for forms.
 */
type FormValueOf<T extends IOperation | NewOperation> = Omit<T, 'heure'> & {
  heure?: string | null;
};

type OperationFormRawValue = FormValueOf<IOperation>;

type NewOperationFormRawValue = FormValueOf<NewOperation>;

type OperationFormDefaults = Pick<NewOperation, 'id' | 'heure' | 'urgence'>;

type OperationFormGroupContent = {
  id: FormControl<OperationFormRawValue['id'] | NewOperation['id']>;
  date: FormControl<OperationFormRawValue['date']>;
  heure: FormControl<OperationFormRawValue['heure']>;
  urgence: FormControl<OperationFormRawValue['urgence']>;
  ressources: FormControl<OperationFormRawValue['ressources']>;
  salleOperation: FormControl<OperationFormRawValue['salleOperation']>;
  personnel: FormControl<OperationFormRawValue['personnel']>;
  dossierPatient: FormControl<OperationFormRawValue['dossierPatient']>;
};

export type OperationFormGroup = FormGroup<OperationFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class OperationFormService {
  createOperationFormGroup(operation: OperationFormGroupInput = { id: null }): OperationFormGroup {
    const operationRawValue = this.convertOperationToOperationRawValue({
      ...this.getFormDefaults(),
      ...operation,
    });
    return new FormGroup<OperationFormGroupContent>({
      id: new FormControl(
        { value: operationRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        },
      ),
      date: new FormControl(operationRawValue.date),
      heure: new FormControl(operationRawValue.heure),
      urgence: new FormControl(operationRawValue.urgence),
      ressources: new FormControl(operationRawValue.ressources),
      salleOperation: new FormControl(operationRawValue.salleOperation),
      personnel: new FormControl(operationRawValue.personnel),
      dossierPatient: new FormControl(operationRawValue.dossierPatient),
    });
  }

  getOperation(form: OperationFormGroup): IOperation | NewOperation {
    return this.convertOperationRawValueToOperation(form.getRawValue() as OperationFormRawValue | NewOperationFormRawValue);
  }

  resetForm(form: OperationFormGroup, operation: OperationFormGroupInput): void {
    const operationRawValue = this.convertOperationToOperationRawValue({ ...this.getFormDefaults(), ...operation });
    form.reset(
      {
        ...operationRawValue,
        id: { value: operationRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */,
    );
  }

  private getFormDefaults(): OperationFormDefaults {
    const currentTime = dayjs();

    return {
      id: null,
      heure: currentTime,
      urgence: false,
    };
  }

  private convertOperationRawValueToOperation(rawOperation: OperationFormRawValue | NewOperationFormRawValue): IOperation | NewOperation {
    return {
      ...rawOperation,
      heure: dayjs(rawOperation.heure, DATE_TIME_FORMAT),
    };
  }

  private convertOperationToOperationRawValue(
    operation: IOperation | (Partial<NewOperation> & OperationFormDefaults),
  ): OperationFormRawValue | PartialWithRequiredKeyOf<NewOperationFormRawValue> {
    return {
      ...operation,
      heure: operation.heure ? operation.heure.format(DATE_TIME_FORMAT) : undefined,
    };
  }
}
