import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import SharedModule from 'app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ISalleOperation } from '../salle-operation.model';
import { SalleOperationService } from '../service/salle-operation.service';
import { SalleOperationFormService, SalleOperationFormGroup } from './salle-operation-form.service';

@Component({
  standalone: true,
  selector: 'jhi-salle-operation-update',
  templateUrl: './salle-operation-update.component.html',
  imports: [SharedModule, FormsModule, ReactiveFormsModule],
})
export class SalleOperationUpdateComponent implements OnInit {
  isSaving = false;
  salleOperation: ISalleOperation | null = null;

  editForm: SalleOperationFormGroup = this.salleOperationFormService.createSalleOperationFormGroup();

  constructor(
    protected salleOperationService: SalleOperationService,
    protected salleOperationFormService: SalleOperationFormService,
    protected activatedRoute: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ salleOperation }) => {
      this.salleOperation = salleOperation;
      if (salleOperation) {
        this.updateForm(salleOperation);
      }
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const salleOperation = this.salleOperationFormService.getSalleOperation(this.editForm);
    if (salleOperation.id !== null) {
      this.subscribeToSaveResponse(this.salleOperationService.update(salleOperation));
    } else {
      this.subscribeToSaveResponse(this.salleOperationService.create(salleOperation));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ISalleOperation>>): void {
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

  protected updateForm(salleOperation: ISalleOperation): void {
    this.salleOperation = salleOperation;
    this.salleOperationFormService.resetForm(this.editForm, salleOperation);
  }
}
