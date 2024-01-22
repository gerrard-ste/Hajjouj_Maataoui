import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IRessources, NewRessources } from '../ressources.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IRessources for edit and NewRessourcesFormGroupInput for create.
 */
type RessourcesFormGroupInput = IRessources | PartialWithRequiredKeyOf<NewRessources>;

type RessourcesFormDefaults = Pick<NewRessources, 'id' | 'disponibilite'>;

type RessourcesFormGroupContent = {
  id: FormControl<IRessources['id'] | NewRessources['id']>;
  type: FormControl<IRessources['type']>;
  disponibilite: FormControl<IRessources['disponibilite']>;
  salleOperation: FormControl<IRessources['salleOperation']>;
  personnel: FormControl<IRessources['personnel']>;
};

export type RessourcesFormGroup = FormGroup<RessourcesFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class RessourcesFormService {
  createRessourcesFormGroup(ressources: RessourcesFormGroupInput = { id: null }): RessourcesFormGroup {
    const ressourcesRawValue = {
      ...this.getFormDefaults(),
      ...ressources,
    };
    return new FormGroup<RessourcesFormGroupContent>({
      id: new FormControl(
        { value: ressourcesRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        },
      ),
      type: new FormControl(ressourcesRawValue.type),
      disponibilite: new FormControl(ressourcesRawValue.disponibilite),
      salleOperation: new FormControl(ressourcesRawValue.salleOperation),
      personnel: new FormControl(ressourcesRawValue.personnel),
    });
  }

  getRessources(form: RessourcesFormGroup): IRessources | NewRessources {
    return form.getRawValue() as IRessources | NewRessources;
  }

  resetForm(form: RessourcesFormGroup, ressources: RessourcesFormGroupInput): void {
    const ressourcesRawValue = { ...this.getFormDefaults(), ...ressources };
    form.reset(
      {
        ...ressourcesRawValue,
        id: { value: ressourcesRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */,
    );
  }

  private getFormDefaults(): RessourcesFormDefaults {
    return {
      id: null,
      disponibilite: false,
    };
  }
}
