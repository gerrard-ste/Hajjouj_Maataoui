import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../salle-operation.test-samples';

import { SalleOperationFormService } from './salle-operation-form.service';

describe('SalleOperation Form Service', () => {
  let service: SalleOperationFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SalleOperationFormService);
  });

  describe('Service methods', () => {
    describe('createSalleOperationFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createSalleOperationFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            equipementsDisponibles: expect.any(Object),
            disponibilite: expect.any(Object),
          }),
        );
      });

      it('passing ISalleOperation should create a new form with FormGroup', () => {
        const formGroup = service.createSalleOperationFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            equipementsDisponibles: expect.any(Object),
            disponibilite: expect.any(Object),
          }),
        );
      });
    });

    describe('getSalleOperation', () => {
      it('should return NewSalleOperation for default SalleOperation initial value', () => {
        const formGroup = service.createSalleOperationFormGroup(sampleWithNewData);

        const salleOperation = service.getSalleOperation(formGroup) as any;

        expect(salleOperation).toMatchObject(sampleWithNewData);
      });

      it('should return NewSalleOperation for empty SalleOperation initial value', () => {
        const formGroup = service.createSalleOperationFormGroup();

        const salleOperation = service.getSalleOperation(formGroup) as any;

        expect(salleOperation).toMatchObject({});
      });

      it('should return ISalleOperation', () => {
        const formGroup = service.createSalleOperationFormGroup(sampleWithRequiredData);

        const salleOperation = service.getSalleOperation(formGroup) as any;

        expect(salleOperation).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing ISalleOperation should not enable id FormControl', () => {
        const formGroup = service.createSalleOperationFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewSalleOperation should disable id FormControl', () => {
        const formGroup = service.createSalleOperationFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
