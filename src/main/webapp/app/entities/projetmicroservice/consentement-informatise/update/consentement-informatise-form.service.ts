import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IConsentementInformatise, NewConsentementInformatise } from '../consentement-informatise.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IConsentementInformatise for edit and NewConsentementInformatiseFormGroupInput for create.
 */
type ConsentementInformatiseFormGroupInput = IConsentementInformatise | PartialWithRequiredKeyOf<NewConsentementInformatise>;

type ConsentementInformatiseFormDefaults = Pick<NewConsentementInformatise, 'id' | 'consentementObtenu'>;

type ConsentementInformatiseFormGroupContent = {
  id: FormControl<IConsentementInformatise['id'] | NewConsentementInformatise['id']>;
  informationsPatient: FormControl<IConsentementInformatise['informationsPatient']>;
  consentementObtenu: FormControl<IConsentementInformatise['consentementObtenu']>;
};

export type ConsentementInformatiseFormGroup = FormGroup<ConsentementInformatiseFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class ConsentementInformatiseFormService {
  createConsentementInformatiseFormGroup(
    consentementInformatise: ConsentementInformatiseFormGroupInput = { id: null },
  ): ConsentementInformatiseFormGroup {
    const consentementInformatiseRawValue = {
      ...this.getFormDefaults(),
      ...consentementInformatise,
    };
    return new FormGroup<ConsentementInformatiseFormGroupContent>({
      id: new FormControl(
        { value: consentementInformatiseRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        },
      ),
      informationsPatient: new FormControl(consentementInformatiseRawValue.informationsPatient),
      consentementObtenu: new FormControl(consentementInformatiseRawValue.consentementObtenu),
    });
  }

  getConsentementInformatise(form: ConsentementInformatiseFormGroup): IConsentementInformatise | NewConsentementInformatise {
    return form.getRawValue() as IConsentementInformatise | NewConsentementInformatise;
  }

  resetForm(form: ConsentementInformatiseFormGroup, consentementInformatise: ConsentementInformatiseFormGroupInput): void {
    const consentementInformatiseRawValue = { ...this.getFormDefaults(), ...consentementInformatise };
    form.reset(
      {
        ...consentementInformatiseRawValue,
        id: { value: consentementInformatiseRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */,
    );
  }

  private getFormDefaults(): ConsentementInformatiseFormDefaults {
    return {
      id: null,
      consentementObtenu: false,
    };
  }
}
