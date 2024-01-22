import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../dossier-patient.test-samples';

import { DossierPatientFormService } from './dossier-patient-form.service';

describe('DossierPatient Form Service', () => {
  let service: DossierPatientFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DossierPatientFormService);
  });

  describe('Service methods', () => {
    describe('createDossierPatientFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createDossierPatientFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            informationsPatient: expect.any(Object),
            operationsPrevues: expect.any(Object),
          }),
        );
      });

      it('passing IDossierPatient should create a new form with FormGroup', () => {
        const formGroup = service.createDossierPatientFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            informationsPatient: expect.any(Object),
            operationsPrevues: expect.any(Object),
          }),
        );
      });
    });

    describe('getDossierPatient', () => {
      it('should return NewDossierPatient for default DossierPatient initial value', () => {
        const formGroup = service.createDossierPatientFormGroup(sampleWithNewData);

        const dossierPatient = service.getDossierPatient(formGroup) as any;

        expect(dossierPatient).toMatchObject(sampleWithNewData);
      });

      it('should return NewDossierPatient for empty DossierPatient initial value', () => {
        const formGroup = service.createDossierPatientFormGroup();

        const dossierPatient = service.getDossierPatient(formGroup) as any;

        expect(dossierPatient).toMatchObject({});
      });

      it('should return IDossierPatient', () => {
        const formGroup = service.createDossierPatientFormGroup(sampleWithRequiredData);

        const dossierPatient = service.getDossierPatient(formGroup) as any;

        expect(dossierPatient).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IDossierPatient should not enable id FormControl', () => {
        const formGroup = service.createDossierPatientFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewDossierPatient should disable id FormControl', () => {
        const formGroup = service.createDossierPatientFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
