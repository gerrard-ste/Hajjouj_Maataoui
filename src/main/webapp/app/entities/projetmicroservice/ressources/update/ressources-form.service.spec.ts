import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../ressources.test-samples';

import { RessourcesFormService } from './ressources-form.service';

describe('Ressources Form Service', () => {
  let service: RessourcesFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RessourcesFormService);
  });

  describe('Service methods', () => {
    describe('createRessourcesFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createRessourcesFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            type: expect.any(Object),
            disponibilite: expect.any(Object),
            salleOperation: expect.any(Object),
            personnel: expect.any(Object),
          }),
        );
      });

      it('passing IRessources should create a new form with FormGroup', () => {
        const formGroup = service.createRessourcesFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            type: expect.any(Object),
            disponibilite: expect.any(Object),
            salleOperation: expect.any(Object),
            personnel: expect.any(Object),
          }),
        );
      });
    });

    describe('getRessources', () => {
      it('should return NewRessources for default Ressources initial value', () => {
        const formGroup = service.createRessourcesFormGroup(sampleWithNewData);

        const ressources = service.getRessources(formGroup) as any;

        expect(ressources).toMatchObject(sampleWithNewData);
      });

      it('should return NewRessources for empty Ressources initial value', () => {
        const formGroup = service.createRessourcesFormGroup();

        const ressources = service.getRessources(formGroup) as any;

        expect(ressources).toMatchObject({});
      });

      it('should return IRessources', () => {
        const formGroup = service.createRessourcesFormGroup(sampleWithRequiredData);

        const ressources = service.getRessources(formGroup) as any;

        expect(ressources).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IRessources should not enable id FormControl', () => {
        const formGroup = service.createRessourcesFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewRessources should disable id FormControl', () => {
        const formGroup = service.createRessourcesFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
