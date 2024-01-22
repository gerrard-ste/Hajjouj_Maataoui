import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import SharedModule from 'app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ISalleOperation } from 'app/entities/projetmicroservice/salle-operation/salle-operation.model';
import { SalleOperationService } from 'app/entities/projetmicroservice/salle-operation/service/salle-operation.service';
import { IMedecin } from 'app/entities/projetmicroservice/medecin/medecin.model';
import { MedecinService } from 'app/entities/projetmicroservice/medecin/service/medecin.service';
import { RessourcesService } from '../service/ressources.service';
import { IRessources } from '../ressources.model';
import { RessourcesFormService, RessourcesFormGroup } from './ressources-form.service';

@Component({
  standalone: true,
  selector: 'jhi-ressources-update',
  templateUrl: './ressources-update.component.html',
  imports: [SharedModule, FormsModule, ReactiveFormsModule],
})
export class RessourcesUpdateComponent implements OnInit {
  isSaving = false;
  ressources: IRessources | null = null;

  salleOperationsSharedCollection: ISalleOperation[] = [];
  medecinsSharedCollection: IMedecin[] = [];

  editForm: RessourcesFormGroup = this.ressourcesFormService.createRessourcesFormGroup();

  constructor(
    protected ressourcesService: RessourcesService,
    protected ressourcesFormService: RessourcesFormService,
    protected salleOperationService: SalleOperationService,
    protected medecinService: MedecinService,
    protected activatedRoute: ActivatedRoute,
  ) {}

  compareSalleOperation = (o1: ISalleOperation | null, o2: ISalleOperation | null): boolean =>
    this.salleOperationService.compareSalleOperation(o1, o2);

  compareMedecin = (o1: IMedecin | null, o2: IMedecin | null): boolean => this.medecinService.compareMedecin(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ ressources }) => {
      this.ressources = ressources;
      if (ressources) {
        this.updateForm(ressources);
      }

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const ressources = this.ressourcesFormService.getRessources(this.editForm);
    if (ressources.id !== null) {
      this.subscribeToSaveResponse(this.ressourcesService.update(ressources));
    } else {
      this.subscribeToSaveResponse(this.ressourcesService.create(ressources));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IRessources>>): void {
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

  protected updateForm(ressources: IRessources): void {
    this.ressources = ressources;
    this.ressourcesFormService.resetForm(this.editForm, ressources);

    this.salleOperationsSharedCollection = this.salleOperationService.addSalleOperationToCollectionIfMissing<ISalleOperation>(
      this.salleOperationsSharedCollection,
      ressources.salleOperation,
    );
    this.medecinsSharedCollection = this.medecinService.addMedecinToCollectionIfMissing<IMedecin>(
      this.medecinsSharedCollection,
      ressources.personnel,
    );
  }

  protected loadRelationshipsOptions(): void {
    this.salleOperationService
      .query()
      .pipe(map((res: HttpResponse<ISalleOperation[]>) => res.body ?? []))
      .pipe(
        map((salleOperations: ISalleOperation[]) =>
          this.salleOperationService.addSalleOperationToCollectionIfMissing<ISalleOperation>(
            salleOperations,
            this.ressources?.salleOperation,
          ),
        ),
      )
      .subscribe((salleOperations: ISalleOperation[]) => (this.salleOperationsSharedCollection = salleOperations));

    this.medecinService
      .query()
      .pipe(map((res: HttpResponse<IMedecin[]>) => res.body ?? []))
      .pipe(
        map((medecins: IMedecin[]) => this.medecinService.addMedecinToCollectionIfMissing<IMedecin>(medecins, this.ressources?.personnel)),
      )
      .subscribe((medecins: IMedecin[]) => (this.medecinsSharedCollection = medecins));
  }
}
