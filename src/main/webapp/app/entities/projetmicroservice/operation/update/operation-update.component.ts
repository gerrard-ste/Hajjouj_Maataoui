import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import SharedModule from 'app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IRessources } from 'app/entities/projetmicroservice/ressources/ressources.model';
import { RessourcesService } from 'app/entities/projetmicroservice/ressources/service/ressources.service';
import { ISalleOperation } from 'app/entities/projetmicroservice/salle-operation/salle-operation.model';
import { SalleOperationService } from 'app/entities/projetmicroservice/salle-operation/service/salle-operation.service';
import { IMedecin } from 'app/entities/projetmicroservice/medecin/medecin.model';
import { MedecinService } from 'app/entities/projetmicroservice/medecin/service/medecin.service';
import { IDossierPatient } from 'app/entities/projetmicroservice/dossier-patient/dossier-patient.model';
import { DossierPatientService } from 'app/entities/projetmicroservice/dossier-patient/service/dossier-patient.service';
import { OperationService } from '../service/operation.service';
import { IOperation } from '../operation.model';
import { OperationFormService, OperationFormGroup } from './operation-form.service';

@Component({
  standalone: true,
  selector: 'jhi-operation-update',
  templateUrl: './operation-update.component.html',
  imports: [SharedModule, FormsModule, ReactiveFormsModule],
})
export class OperationUpdateComponent implements OnInit {
  isSaving = false;
  operation: IOperation | null = null;

  ressourcesSharedCollection: IRessources[] = [];
  salleOperationsSharedCollection: ISalleOperation[] = [];
  medecinsSharedCollection: IMedecin[] = [];
  dossierPatientsSharedCollection: IDossierPatient[] = [];

  editForm: OperationFormGroup = this.operationFormService.createOperationFormGroup();

  constructor(
    protected operationService: OperationService,
    protected operationFormService: OperationFormService,
    protected ressourcesService: RessourcesService,
    protected salleOperationService: SalleOperationService,
    protected medecinService: MedecinService,
    protected dossierPatientService: DossierPatientService,
    protected activatedRoute: ActivatedRoute,
  ) {}

  compareRessources = (o1: IRessources | null, o2: IRessources | null): boolean => this.ressourcesService.compareRessources(o1, o2);

  compareSalleOperation = (o1: ISalleOperation | null, o2: ISalleOperation | null): boolean =>
    this.salleOperationService.compareSalleOperation(o1, o2);

  compareMedecin = (o1: IMedecin | null, o2: IMedecin | null): boolean => this.medecinService.compareMedecin(o1, o2);

  compareDossierPatient = (o1: IDossierPatient | null, o2: IDossierPatient | null): boolean =>
    this.dossierPatientService.compareDossierPatient(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ operation }) => {
      this.operation = operation;
      if (operation) {
        this.updateForm(operation);
      }

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const operation = this.operationFormService.getOperation(this.editForm);
    if (operation.id !== null) {
      this.subscribeToSaveResponse(this.operationService.update(operation));
    } else {
      this.subscribeToSaveResponse(this.operationService.create(operation));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IOperation>>): void {
    result.pipe(finalize(() => this.onSaveFinalize())).subscribe({
      next: () => this.onSaveSuccess(),
      error: () => this.onSaveError(),
    });
  }

  protected onSaveSuccess(): void {
    this.previousState();
  }

  protected onSaveError(): void {
    // Api for inheritance.
  }

  protected onSaveFinalize(): void {
    this.isSaving = false;
  }

  protected updateForm(operation: IOperation): void {
    this.operation = operation;
    this.operationFormService.resetForm(this.editForm, operation);

    this.ressourcesSharedCollection = this.ressourcesService.addRessourcesToCollectionIfMissing<IRessources>(
      this.ressourcesSharedCollection,
      operation.ressources,
    );
    this.salleOperationsSharedCollection = this.salleOperationService.addSalleOperationToCollectionIfMissing<ISalleOperation>(
      this.salleOperationsSharedCollection,
      operation.salleOperation,
    );
    this.medecinsSharedCollection = this.medecinService.addMedecinToCollectionIfMissing<IMedecin>(
      this.medecinsSharedCollection,
      operation.personnel,
    );
    this.dossierPatientsSharedCollection = this.dossierPatientService.addDossierPatientToCollectionIfMissing<IDossierPatient>(
      this.dossierPatientsSharedCollection,
      operation.dossierPatient,
    );
  }

  protected loadRelationshipsOptions(): void {
    this.ressourcesService
      .query()
      .pipe(map((res: HttpResponse<IRessources[]>) => res.body ?? []))
      .pipe(
        map((ressources: IRessources[]) =>
          this.ressourcesService.addRessourcesToCollectionIfMissing<IRessources>(ressources, this.operation?.ressources),
        ),
      )
      .subscribe((ressources: IRessources[]) => (this.ressourcesSharedCollection = ressources));

    this.salleOperationService
      .query()
      .pipe(map((res: HttpResponse<ISalleOperation[]>) => res.body ?? []))
      .pipe(
        map((salleOperations: ISalleOperation[]) =>
          this.salleOperationService.addSalleOperationToCollectionIfMissing<ISalleOperation>(
            salleOperations,
            this.operation?.salleOperation,
          ),
        ),
      )
      .subscribe((salleOperations: ISalleOperation[]) => (this.salleOperationsSharedCollection = salleOperations));

    this.medecinService
      .query()
      .pipe(map((res: HttpResponse<IMedecin[]>) => res.body ?? []))
      .pipe(
        map((medecins: IMedecin[]) => this.medecinService.addMedecinToCollectionIfMissing<IMedecin>(medecins, this.operation?.personnel)),
      )
      .subscribe((medecins: IMedecin[]) => (this.medecinsSharedCollection = medecins));

    this.dossierPatientService
      .query()
      .pipe(map((res: HttpResponse<IDossierPatient[]>) => res.body ?? []))
      .pipe(
        map((dossierPatients: IDossierPatient[]) =>
          this.dossierPatientService.addDossierPatientToCollectionIfMissing<IDossierPatient>(
            dossierPatients,
            this.operation?.dossierPatient,
          ),
        ),
      )
      .subscribe((dossierPatients: IDossierPatient[]) => (this.dossierPatientsSharedCollection = dossierPatients));
  }
}
