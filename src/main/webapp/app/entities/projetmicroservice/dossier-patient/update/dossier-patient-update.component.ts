import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import SharedModule from 'app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IDossierPatient } from '../dossier-patient.model';
import { DossierPatientService } from '../service/dossier-patient.service';
import { DossierPatientFormService, DossierPatientFormGroup } from './dossier-patient-form.service';

@Component({
  standalone: true,
  selector: 'jhi-dossier-patient-update',
  templateUrl: './dossier-patient-update.component.html',
  imports: [SharedModule, FormsModule, ReactiveFormsModule],
})
export class DossierPatientUpdateComponent implements OnInit {
  isSaving = false;
  dossierPatient: IDossierPatient | null = null;

  editForm: DossierPatientFormGroup = this.dossierPatientFormService.createDossierPatientFormGroup();

  constructor(
    protected dossierPatientService: DossierPatientService,
    protected dossierPatientFormService: DossierPatientFormService,
    protected activatedRoute: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ dossierPatient }) => {
      this.dossierPatient = dossierPatient;
      if (dossierPatient) {
        this.updateForm(dossierPatient);
      }
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const dossierPatient = this.dossierPatientFormService.getDossierPatient(this.editForm);
    if (dossierPatient.id !== null) {
      this.subscribeToSaveResponse(this.dossierPatientService.update(dossierPatient));
    } else {
      this.subscribeToSaveResponse(this.dossierPatientService.create(dossierPatient));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IDossierPatient>>): void {
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

  protected updateForm(dossierPatient: IDossierPatient): void {
    this.dossierPatient = dossierPatient;
    this.dossierPatientFormService.resetForm(this.editForm, dossierPatient);
  }
}
