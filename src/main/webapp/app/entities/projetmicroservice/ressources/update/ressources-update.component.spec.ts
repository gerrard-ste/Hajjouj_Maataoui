import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { ISalleOperation } from 'app/entities/projetmicroservice/salle-operation/salle-operation.model';
import { SalleOperationService } from 'app/entities/projetmicroservice/salle-operation/service/salle-operation.service';
import { IMedecin } from 'app/entities/projetmicroservice/medecin/medecin.model';
import { MedecinService } from 'app/entities/projetmicroservice/medecin/service/medecin.service';
import { IRessources } from '../ressources.model';
import { RessourcesService } from '../service/ressources.service';
import { RessourcesFormService } from './ressources-form.service';

import { RessourcesUpdateComponent } from './ressources-update.component';

describe('Ressources Management Update Component', () => {
  let comp: RessourcesUpdateComponent;
  let fixture: ComponentFixture<RessourcesUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let ressourcesFormService: RessourcesFormService;
  let ressourcesService: RessourcesService;
  let salleOperationService: SalleOperationService;
  let medecinService: MedecinService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([]), RessourcesUpdateComponent],
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
      .overrideTemplate(RessourcesUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(RessourcesUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    ressourcesFormService = TestBed.inject(RessourcesFormService);
    ressourcesService = TestBed.inject(RessourcesService);
    salleOperationService = TestBed.inject(SalleOperationService);
    medecinService = TestBed.inject(MedecinService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call SalleOperation query and add missing value', () => {
      const ressources: IRessources = { id: 456 };
      const salleOperation: ISalleOperation = { id: 6834 };
      ressources.salleOperation = salleOperation;

      const salleOperationCollection: ISalleOperation[] = [{ id: 13134 }];
      jest.spyOn(salleOperationService, 'query').mockReturnValue(of(new HttpResponse({ body: salleOperationCollection })));
      const additionalSalleOperations = [salleOperation];
      const expectedCollection: ISalleOperation[] = [...additionalSalleOperations, ...salleOperationCollection];
      jest.spyOn(salleOperationService, 'addSalleOperationToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ ressources });
      comp.ngOnInit();

      expect(salleOperationService.query).toHaveBeenCalled();
      expect(salleOperationService.addSalleOperationToCollectionIfMissing).toHaveBeenCalledWith(
        salleOperationCollection,
        ...additionalSalleOperations.map(expect.objectContaining),
      );
      expect(comp.salleOperationsSharedCollection).toEqual(expectedCollection);
    });

    it('Should call Medecin query and add missing value', () => {
      const ressources: IRessources = { id: 456 };
      const personnel: IMedecin = { id: 23336 };
      ressources.personnel = personnel;

      const medecinCollection: IMedecin[] = [{ id: 16746 }];
      jest.spyOn(medecinService, 'query').mockReturnValue(of(new HttpResponse({ body: medecinCollection })));
      const additionalMedecins = [personnel];
      const expectedCollection: IMedecin[] = [...additionalMedecins, ...medecinCollection];
      jest.spyOn(medecinService, 'addMedecinToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ ressources });
      comp.ngOnInit();

      expect(medecinService.query).toHaveBeenCalled();
      expect(medecinService.addMedecinToCollectionIfMissing).toHaveBeenCalledWith(
        medecinCollection,
        ...additionalMedecins.map(expect.objectContaining),
      );
      expect(comp.medecinsSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const ressources: IRessources = { id: 456 };
      const salleOperation: ISalleOperation = { id: 25273 };
      ressources.salleOperation = salleOperation;
      const personnel: IMedecin = { id: 26022 };
      ressources.personnel = personnel;

      activatedRoute.data = of({ ressources });
      comp.ngOnInit();

      expect(comp.salleOperationsSharedCollection).toContain(salleOperation);
      expect(comp.medecinsSharedCollection).toContain(personnel);
      expect(comp.ressources).toEqual(ressources);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IRessources>>();
      const ressources = { id: 123 };
      jest.spyOn(ressourcesFormService, 'getRessources').mockReturnValue(ressources);
      jest.spyOn(ressourcesService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ ressources });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: ressources }));
      saveSubject.complete();

      // THEN
      expect(ressourcesFormService.getRessources).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(ressourcesService.update).toHaveBeenCalledWith(expect.objectContaining(ressources));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IRessources>>();
      const ressources = { id: 123 };
      jest.spyOn(ressourcesFormService, 'getRessources').mockReturnValue({ id: null });
      jest.spyOn(ressourcesService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ ressources: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: ressources }));
      saveSubject.complete();

      // THEN
      expect(ressourcesFormService.getRessources).toHaveBeenCalled();
      expect(ressourcesService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IRessources>>();
      const ressources = { id: 123 };
      jest.spyOn(ressourcesService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ ressources });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(ressourcesService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Compare relationships', () => {
    describe('compareSalleOperation', () => {
      it('Should forward to salleOperationService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(salleOperationService, 'compareSalleOperation');
        comp.compareSalleOperation(entity, entity2);
        expect(salleOperationService.compareSalleOperation).toHaveBeenCalledWith(entity, entity2);
      });
    });

    describe('compareMedecin', () => {
      it('Should forward to medecinService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(medecinService, 'compareMedecin');
        comp.compareMedecin(entity, entity2);
        expect(medecinService.compareMedecin).toHaveBeenCalledWith(entity, entity2);
      });
    });
  });
});
