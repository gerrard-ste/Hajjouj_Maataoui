import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { DossierPatientService } from '../service/dossier-patient.service';
import { IDossierPatient } from '../dossier-patient.model';
import { DossierPatientFormService } from './dossier-patient-form.service';

import { DossierPatientUpdateComponent } from './dossier-patient-update.component';

describe('DossierPatient Management Update Component', () => {
  let comp: DossierPatientUpdateComponent;
  let fixture: ComponentFixture<DossierPatientUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let dossierPatientFormService: DossierPatientFormService;
  let dossierPatientService: DossierPatientService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([]), DossierPatientUpdateComponent],
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
      .overrideTemplate(DossierPatientUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(DossierPatientUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    dossierPatientFormService = TestBed.inject(DossierPatientFormService);
    dossierPatientService = TestBed.inject(DossierPatientService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const dossierPatient: IDossierPatient = { id: 456 };

      activatedRoute.data = of({ dossierPatient });
      comp.ngOnInit();

      expect(comp.dossierPatient).toEqual(dossierPatient);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IDossierPatient>>();
      const dossierPatient = { id: 123 };
      jest.spyOn(dossierPatientFormService, 'getDossierPatient').mockReturnValue(dossierPatient);
      jest.spyOn(dossierPatientService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ dossierPatient });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: dossierPatient }));
      saveSubject.complete();

      // THEN
      expect(dossierPatientFormService.getDossierPatient).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(dossierPatientService.update).toHaveBeenCalledWith(expect.objectContaining(dossierPatient));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IDossierPatient>>();
      const dossierPatient = { id: 123 };
      jest.spyOn(dossierPatientFormService, 'getDossierPatient').mockReturnValue({ id: null });
      jest.spyOn(dossierPatientService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ dossierPatient: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: dossierPatient }));
      saveSubject.complete();

      // THEN
      expect(dossierPatientFormService.getDossierPatient).toHaveBeenCalled();
      expect(dossierPatientService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IDossierPatient>>();
      const dossierPatient = { id: 123 };
      jest.spyOn(dossierPatientService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ dossierPatient });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(dossierPatientService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
