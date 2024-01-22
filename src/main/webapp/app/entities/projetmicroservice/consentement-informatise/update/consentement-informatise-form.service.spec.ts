import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../consentement-informatise.test-samples';

import { ConsentementInformatiseFormService } from './consentement-informatise-form.service';

describe('ConsentementInformatise Form Service', () => {
  let service: ConsentementInformatiseFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConsentementInformatiseFormService);
  });

  describe('Service methods', () => {
    describe('createConsentementInformatiseFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createConsentementInformatiseFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            informationsPatient: expect.any(Object),
            consentementObtenu: expect.any(Object),
          }),
        );
      });

      it('passing IConsentementInformatise should create a new form with FormGroup', () => {
        const formGroup = service.createConsentementInformatiseFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            informationsPatient: expect.any(Object),
            consentementObtenu: expect.any(Object),
          }),
        );
      });
    });

    describe('getConsentementInformatise', () => {
      it('should return NewConsentementInformatise for default ConsentementInformatise initial value', () => {
        const formGroup = service.createConsentementInformatiseFormGroup(sampleWithNewData);

        const consentementInformatise = service.getConsentementInformatise(formGroup) as any;

        expect(consentementInformatise).toMatchObject(sampleWithNewData);
      });

      it('should return NewConsentementInformatise for empty ConsentementInformatise initial value', () => {
        const formGroup = service.createConsentementInformatiseFormGroup();

        const consentementInformatise = service.getConsentementInformatise(formGroup) as any;

        expect(consentementInformatise).toMatchObject({});
      });

      it('should return IConsentementInformatise', () => {
        const formGroup = service.createConsentementInformatiseFormGroup(sampleWithRequiredData);

        const consentementInformatise = service.getConsentementInformatise(formGroup) as any;

        expect(consentementInformatise).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IConsentementInformatise should not enable id FormControl', () => {
        const formGroup = service.createConsentementInformatiseFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewConsentementInformatise should disable id FormControl', () => {
        const formGroup = service.createConsentementInformatiseFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
