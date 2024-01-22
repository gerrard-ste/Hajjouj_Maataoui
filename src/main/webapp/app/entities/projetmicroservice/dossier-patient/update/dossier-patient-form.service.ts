import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IDossierPatient, NewDossierPatient } from '../dossier-patient.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IDossierPatient for edit and NewDossierPatientFormGroupInput for create.
 */
type DossierPatientFormGroupInput = IDossierPatient | PartialWithRequiredKeyOf<NewDossierPatient>;

type DossierPatientFormDefaults = Pick<NewDossierPatient, 'id'>;

type DossierPatientFormGroupContent = {
  id: FormControl<IDossierPatient['id'] | NewDossierPatient['id']>;
  informationsPatient: FormControl<IDossierPatient['informationsPatient']>;
  operationsPrevues: FormControl<IDossierPatient['operationsPrevues']>;
};

export type DossierPatientFormGroup = FormGroup<DossierPatientFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class DossierPatientFormService {
  createDossierPatientFormGroup(dossierPatient: DossierPatientFormGroupInput = { id: null }): DossierPatientFormGroup {
    const dossierPatientRawValue = {
      ...this.getFormDefaults(),
      ...dossierPatient,
    };
    return new FormGroup<DossierPatientFormGroupContent>({
      id: new FormControl(
        { value: dossierPatientRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        },
      ),
      informationsPatient: new FormControl(dossierPatientRawValue.informationsPatient),
      operationsPrevues: new FormControl(dossierPatientRawValue.operationsPrevues),
    });
  }

  getDossierPatient(form: DossierPatientFormGroup): IDossierPatient | NewDossierPatient {
    return form.getRawValue() as IDossierPatient | NewDossierPatient;
  }

  resetForm(form: DossierPatientFormGroup, dossierPatient: DossierPatientFormGroupInput): void {
    const dossierPatientRawValue = { ...this.getFormDefaults(), ...dossierPatient };
    form.reset(
      {
        ...dossierPatientRawValue,
        id: { value: dossierPatientRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */,
    );
  }

  private getFormDefaults(): DossierPatientFormDefaults {
    return {
      id: null,
    };
  }
}
