import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { SalleOperationService } from '../service/salle-operation.service';
import { ISalleOperation } from '../salle-operation.model';
import { SalleOperationFormService } from './salle-operation-form.service';

import { SalleOperationUpdateComponent } from './salle-operation-update.component';

describe('SalleOperation Management Update Component', () => {
  let comp: SalleOperationUpdateComponent;
  let fixture: ComponentFixture<SalleOperationUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let salleOperationFormService: SalleOperationFormService;
  let salleOperationService: SalleOperationService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([]), SalleOperationUpdateComponent],
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
      .overrideTemplate(SalleOperationUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(SalleOperationUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    salleOperationFormService = TestBed.inject(SalleOperationFormService);
    salleOperationService = TestBed.inject(SalleOperationService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const salleOperation: ISalleOperation = { id: 456 };

      activatedRoute.data = of({ salleOperation });
      comp.ngOnInit();

      expect(comp.salleOperation).toEqual(salleOperation);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ISalleOperation>>();
      const salleOperation = { id: 123 };
      jest.spyOn(salleOperationFormService, 'getSalleOperation').mockReturnValue(salleOperation);
      jest.spyOn(salleOperationService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ salleOperation });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: salleOperation }));
      saveSubject.complete();

      // THEN
      expect(salleOperationFormService.getSalleOperation).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(salleOperationService.update).toHaveBeenCalledWith(expect.objectContaining(salleOperation));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ISalleOperation>>();
      const salleOperation = { id: 123 };
      jest.spyOn(salleOperationFormService, 'getSalleOperation').mockReturnValue({ id: null });
      jest.spyOn(salleOperationService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ salleOperation: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: salleOperation }));
      saveSubject.complete();

      // THEN
      expect(salleOperationFormService.getSalleOperation).toHaveBeenCalled();
      expect(salleOperationService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ISalleOperation>>();
      const salleOperation = { id: 123 };
      jest.spyOn(salleOperationService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ salleOperation });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(salleOperationService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
