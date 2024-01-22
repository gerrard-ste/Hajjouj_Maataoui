import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { IDossierPatient } from 'app/entities/projetmicroservice/dossier-patient/dossier-patient.model';
import { DossierPatientService } from 'app/entities/projetmicroservice/dossier-patient/service/dossier-patient.service';
import { IConsentementInformatise } from 'app/entities/projetmicroservice/consentement-informatise/consentement-informatise.model';
import { ConsentementInformatiseService } from 'app/entities/projetmicroservice/consentement-informatise/service/consentement-informatise.service';
import { IPatient } from '../patient.model';
import { PatientService } from '../service/patient.service';
import { PatientFormService } from './patient-form.service';

import { PatientUpdateComponent } from './patient-update.component';

describe('Patient Management Update Component', () => {
  let comp: PatientUpdateComponent;
  let fixture: ComponentFixture<PatientUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let patientFormService: PatientFormService;
  let patientService: PatientService;
  let dossierPatientService: DossierPatientService;
  let consentementInformatiseService: ConsentementInformatiseService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([]), PatientUpdateComponent],
      providers: [
        FormBuilder,
        {
          provide: ActivatedRoute,
          useValue: {
            params: from([{}]),
          },
        },
      ],
    })
      .overrideTemplate(PatientUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(PatientUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    patientFormService = TestBed.inject(PatientFormService);
    patientService = TestBed.inject(PatientService);
    dossierPatientService = TestBed.inject(DossierPatientService);
    consentementInformatiseService = TestBed.inject(ConsentementInformatiseService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call DossierPatient query and add missing value', () => {
      const patient: IPatient = { id: 456 };
      const dossierPatient: IDossierPatient = { id: 8834 };
      patient.dossierPatient = dossierPatient;

      const dossierPatientCollection: IDossierPatient[] = [{ id: 31474 }];
      jest.spyOn(dossierPatientService, 'query').mockReturnValue(of(new HttpResponse({ body: dossierPatientCollection })));
      const additionalDossierPatients = [dossierPatient];
      const expectedCollection: IDossierPatient[] = [...additionalDossierPatients, ...dossierPatientCollection];
      jest.spyOn(dossierPatientService, 'addDossierPatientToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ patient });
      comp.ngOnInit();

      expect(dossierPatientService.query).toHaveBeenCalled();
      expect(dossierPatientService.addDossierPatientToCollectionIfMissing).toHaveBeenCalledWith(
        dossierPatientCollection,
        ...additionalDossierPatients.map(expect.objectContaining),
      );
      expect(comp.dossierPatientsSharedCollection).toEqual(expectedCollection);
    });

    it('Should call ConsentementInformatise query and add missing value', () => {
      const patient: IPatient = { id: 456 };
      const consentementInformatise: IConsentementInformatise = { id: 25783 };
      patient.consentementInformatise = consentementInformatise;

      const consentementInformatiseCollection: IConsentementInformatise[] = [{ id: 24892 }];
      jest
        .spyOn(consentementInformatiseService, 'query')
        .mockReturnValue(of(new HttpResponse({ body: consentementInformatiseCollection })));
      const additionalConsentementInformatises = [consentementInformatise];
      const expectedCollection: IConsentementInformatise[] = [...additionalConsentementInformatises, ...consentementInformatiseCollection];
      jest.spyOn(consentementInformatiseService, 'addConsentementInformatiseToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ patient });
      comp.ngOnInit();

      expect(consentementInformatiseService.query).toHaveBeenCalled();
      expect(consentementInformatiseService.addConsentementInformatiseToCollectionIfMissing).toHaveBeenCalledWith(
        consentementInformatiseCollection,
        ...additionalConsentementInformatises.map(expect.objectContaining),
      );
      expect(comp.consentementInformatisesSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const patient: IPatient = { id: 456 };
      const dossierPatient: IDossierPatient = { id: 11957 };
      patient.dossierPatient = dossierPatient;
      const consentementInformatise: IConsentementInformatise = { id: 1746 };
      patient.consentementInformatise = consentementInformatise;

      activatedRoute.data = of({ patient });
      comp.ngOnInit();

      expect(comp.dossierPatientsSharedCollection).toContain(dossierPatient);
      expect(comp.consentementInformatisesSharedCollection).toContain(consentementInformatise);
      expect(comp.patient).toEqual(patient);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IPatient>>();
      const patient = { id: 123 };
      jest.spyOn(patientFormService, 'getPatient').mockReturnValue(patient);
      jest.spyOn(patientService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ patient });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: patient }));
      saveSubject.complete();

      // THEN
      expect(patientFormService.getPatient).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(patientService.update).toHaveBeenCalledWith(expect.objectContaining(patient));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IPatient>>();
      const patient = { id: 123 };
      jest.spyOn(patientFormService, 'getPatient').mockReturnValue({ id: null });
      jest.spyOn(patientService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ patient: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: patient }));
      saveSubject.complete();

      // THEN
      expect(patientFormService.getPatient).toHaveBeenCalled();
      expect(patientService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IPatient>>();
      const patient = { id: 123 };
      jest.spyOn(patientService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ patient });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(patientService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Compare relationships', () => {
    describe('compareDossierPatient', () => {
      it('Should forward to dossierPatientService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(dossierPatientService, 'compareDossierPatient');
        comp.compareDossierPatient(entity, entity2);
        expect(dossierPatientService.compareDossierPatient).toHaveBeenCalledWith(entity, entity2);
      });
    });

    describe('compareConsentementInformatise', () => {
      it('Should forward to consentementInformatiseService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(consentementInformatiseService, 'compareConsentementInformatise');
        comp.compareConsentementInformatise(entity, entity2);
        expect(consentementInformatiseService.compareConsentementInformatise).toHaveBeenCalledWith(entity, entity2);
      });
    });
  });
});
