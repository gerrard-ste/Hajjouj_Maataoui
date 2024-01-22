import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { IRessources } from 'app/entities/projetmicroservice/ressources/ressources.model';
import { RessourcesService } from 'app/entities/projetmicroservice/ressources/service/ressources.service';
import { ISalleOperation } from 'app/entities/projetmicroservice/salle-operation/salle-operation.model';
import { SalleOperationService } from 'app/entities/projetmicroservice/salle-operation/service/salle-operation.service';
import { IMedecin } from 'app/entities/projetmicroservice/medecin/medecin.model';
import { MedecinService } from 'app/entities/projetmicroservice/medecin/service/medecin.service';
import { IDossierPatient } from 'app/entities/projetmicroservice/dossier-patient/dossier-patient.model';
import { DossierPatientService } from 'app/entities/projetmicroservice/dossier-patient/service/dossier-patient.service';
import { IOperation } from '../operation.model';
import { OperationService } from '../service/operation.service';
import { OperationFormService } from './operation-form.service';

import { OperationUpdateComponent } from './operation-update.component';

describe('Operation Management Update Component', () => {
  let comp: OperationUpdateComponent;
  let fixture: ComponentFixture<OperationUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let operationFormService: OperationFormService;
  let operationService: OperationService;
  let ressourcesService: RessourcesService;
  let salleOperationService: SalleOperationService;
  let medecinService: MedecinService;
  let dossierPatientService: DossierPatientService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([]), OperationUpdateComponent],
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
      .overrideTemplate(OperationUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(OperationUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    operationFormService = TestBed.inject(OperationFormService);
    operationService = TestBed.inject(OperationService);
    ressourcesService = TestBed.inject(RessourcesService);
    salleOperationService = TestBed.inject(SalleOperationService);
    medecinService = TestBed.inject(MedecinService);
    dossierPatientService = TestBed.inject(DossierPatientService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call Ressources query and add missing value', () => {
      const operation: IOperation = { id: 456 };
      const ressources: IRessources = { id: 18843 };
      operation.ressources = ressources;

      const ressourcesCollection: IRessources[] = [{ id: 13539 }];
      jest.spyOn(ressourcesService, 'query').mockReturnValue(of(new HttpResponse({ body: ressourcesCollection })));
      const additionalRessources = [ressources];
      const expectedCollection: IRessources[] = [...additionalRessources, ...ressourcesCollection];
      jest.spyOn(ressourcesService, 'addRessourcesToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ operation });
      comp.ngOnInit();

      expect(ressourcesService.query).toHaveBeenCalled();
      expect(ressourcesService.addRessourcesToCollectionIfMissing).toHaveBeenCalledWith(
        ressourcesCollection,
        ...additionalRessources.map(expect.objectContaining),
      );
      expect(comp.ressourcesSharedCollection).toEqual(expectedCollection);
    });

    it('Should call SalleOperation query and add missing value', () => {
      const operation: IOperation = { id: 456 };
      const salleOperation: ISalleOperation = { id: 16935 };
      operation.salleOperation = salleOperation;

      const salleOperationCollection: ISalleOperation[] = [{ id: 10463 }];
      jest.spyOn(salleOperationService, 'query').mockReturnValue(of(new HttpResponse({ body: salleOperationCollection })));
      const additionalSalleOperations = [salleOperation];
      const expectedCollection: ISalleOperation[] = [...additionalSalleOperations, ...salleOperationCollection];
      jest.spyOn(salleOperationService, 'addSalleOperationToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ operation });
      comp.ngOnInit();

      expect(salleOperationService.query).toHaveBeenCalled();
      expect(salleOperationService.addSalleOperationToCollectionIfMissing).toHaveBeenCalledWith(
        salleOperationCollection,
        ...additionalSalleOperations.map(expect.objectContaining),
      );
      expect(comp.salleOperationsSharedCollection).toEqual(expectedCollection);
    });

    it('Should call Medecin query and add missing value', () => {
      const operation: IOperation = { id: 456 };
      const personnel: IMedecin = { id: 14801 };
      operation.personnel = personnel;

      const medecinCollection: IMedecin[] = [{ id: 32601 }];
      jest.spyOn(medecinService, 'query').mockReturnValue(of(new HttpResponse({ body: medecinCollection })));
      const additionalMedecins = [personnel];
      const expectedCollection: IMedecin[] = [...additionalMedecins, ...medecinCollection];
      jest.spyOn(medecinService, 'addMedecinToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ operation });
      comp.ngOnInit();

      expect(medecinService.query).toHaveBeenCalled();
      expect(medecinService.addMedecinToCollectionIfMissing).toHaveBeenCalledWith(
        medecinCollection,
        ...additionalMedecins.map(expect.objectContaining),
      );
      expect(comp.medecinsSharedCollection).toEqual(expectedCollection);
    });

    it('Should call DossierPatient query and add missing value', () => {
      const operation: IOperation = { id: 456 };
      const dossierPatient: IDossierPatient = { id: 9679 };
      operation.dossierPatient = dossierPatient;

      const dossierPatientCollection: IDossierPatient[] = [{ id: 5583 }];
      jest.spyOn(dossierPatientService, 'query').mockReturnValue(of(new HttpResponse({ body: dossierPatientCollection })));
      const additionalDossierPatients = [dossierPatient];
      const expectedCollection: IDossierPatient[] = [...additionalDossierPatients, ...dossierPatientCollection];
      jest.spyOn(dossierPatientService, 'addDossierPatientToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ operation });
      comp.ngOnInit();

      expect(dossierPatientService.query).toHaveBeenCalled();
      expect(dossierPatientService.addDossierPatientToCollectionIfMissing).toHaveBeenCalledWith(
        dossierPatientCollection,
        ...additionalDossierPatients.map(expect.objectContaining),
      );
      expect(comp.dossierPatientsSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const operation: IOperation = { id: 456 };
      const ressources: IRessources = { id: 5743 };
      operation.ressources = ressources;
      const salleOperation: ISalleOperation = { id: 14071 };
      operation.salleOperation = salleOperation;
      const personnel: IMedecin = { id: 24142 };
      operation.personnel = personnel;
      const dossierPatient: IDossierPatient = { id: 417 };
      operation.dossierPatient = dossierPatient;

      activatedRoute.data = of({ operation });
      comp.ngOnInit();

      expect(comp.ressourcesSharedCollection).toContain(ressources);
      expect(comp.salleOperationsSharedCollection).toContain(salleOperation);
      expect(comp.medecinsSharedCollection).toContain(personnel);
      expect(comp.dossierPatientsSharedCollection).toContain(dossierPatient);
      expect(comp.operation).toEqual(operation);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IOperation>>();
      const operation = { id: 123 };
      jest.spyOn(operationFormService, 'getOperation').mockReturnValue(operation);
      jest.spyOn(operationService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ operation });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: operation }));
      saveSubject.complete();

      // THEN
      expect(operationFormService.getOperation).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(operationService.update).toHaveBeenCalledWith(expect.objectContaining(operation));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IOperation>>();
      const operation = { id: 123 };
      jest.spyOn(operationFormService, 'getOperation').mockReturnValue({ id: null });
      jest.spyOn(operationService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ operation: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: operation }));
      saveSubject.complete();

      // THEN
      expect(operationFormService.getOperation).toHaveBeenCalled();
      expect(operationService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IOperation>>();
      const operation = { id: 123 };
      jest.spyOn(operationService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ operation });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(operationService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Compare relationships', () => {
    describe('compareRessources', () => {
      it('Should forward to ressourcesService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(ressourcesService, 'compareRessources');
        comp.compareRessources(entity, entity2);
        expect(ressourcesService.compareRessources).toHaveBeenCalledWith(entity, entity2);
      });
    });

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

    describe('compareDossierPatient', () => {
      it('Should forward to dossierPatientService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(dossierPatientService, 'compareDossierPatient');
        comp.compareDossierPatient(entity, entity2);
        expect(dossierPatientService.compareDossierPatient).toHaveBeenCalledWith(entity, entity2);
      });
    });
  });
});
