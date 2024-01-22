import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import SharedModule from 'app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IDossierPatient } from 'app/entities/projetmicroservice/dossier-patient/dossier-patient.model';
import { DossierPatientService } from 'app/entities/projetmicroservice/dossier-patient/service/dossier-patient.service';
import { IConsentementInformatise } from 'app/entities/projetmicroservice/consentement-informatise/consentement-informatise.model';
import { ConsentementInformatiseService } from 'app/entities/projetmicroservice/consentement-informatise/service/consentement-informatise.service';
import { PatientService } from '../service/patient.service';
import { IPatient } from '../patient.model';
import { PatientFormService, PatientFormGroup } from './patient-form.service';

@Component({
  standalone: true,
  selector: 'jhi-patient-update',
  templateUrl: './patient-update.component.html',
  imports: [SharedModule, FormsModule, ReactiveFormsModule],
})
export class PatientUpdateComponent implements OnInit {
  isSaving = false;
  patient: IPatient | null = null;

  dossierPatientsSharedCollection: IDossierPatient[] = [];
  consentementInformatisesSharedCollection: IConsentementInformatise[] = [];

  editForm: PatientFormGroup = this.patientFormService.createPatientFormGroup();

  constructor(
    protected patientService: PatientService,
    protected patientFormService: PatientFormService,
    protected dossierPatientService: DossierPatientService,
    protected consentementInformatiseService: ConsentementInformatiseService,
    protected activatedRoute: ActivatedRoute,
  ) {}

  compareDossierPatient = (o1: IDossierPatient | null, o2: IDossierPatient | null): boolean =>
    this.dossierPatientService.compareDossierPatient(o1, o2);

  compareConsentementInformatise = (o1: IConsentementInformatise | null, o2: IConsentementInformatise | null): boolean =>
    this.consentementInformatiseService.compareConsentementInformatise(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ patient }) => {
      this.patient = patient;
      if (patient) {
        this.updateForm(patient);
      }

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const patient = this.patientFormService.getPatient(this.editForm);
    if (patient.id !== null) {
      this.subscribeToSaveResponse(this.patientService.update(patient));
    } else {
      this.subscribeToSaveResponse(this.patientService.create(patient));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IPatient>>): void {
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

  protected updateForm(patient: IPatient): void {
    this.patient = patient;
    this.patientFormService.resetForm(this.editForm, patient);

    this.dossierPatientsSharedCollection = this.dossierPatientService.addDossierPatientToCollectionIfMissing<IDossierPatient>(
      this.dossierPatientsSharedCollection,
      patient.dossierPatient,
    );
    this.consentementInformatisesSharedCollection =
      this.consentementInformatiseService.addConsentementInformatiseToCollectionIfMissing<IConsentementInformatise>(
        this.consentementInformatisesSharedCollection,
        patient.consentementInformatise,
      );
  }

  protected loadRelationshipsOptions(): void {
    this.dossierPatientService
      .query()
      .pipe(map((res: HttpResponse<IDossierPatient[]>) => res.body ?? []))
      .pipe(
        map((dossierPatients: IDossierPatient[]) =>
          this.dossierPatientService.addDossierPatientToCollectionIfMissing<IDossierPatient>(dossierPatients, this.patient?.dossierPatient),
        ),
      )
      .subscribe((dossierPatients: IDossierPatient[]) => (this.dossierPatientsSharedCollection = dossierPatients));

    this.consentementInformatiseService
      .query()
      .pipe(map((res: HttpResponse<IConsentementInformatise[]>) => res.body ?? []))
      .pipe(
        map((consentementInformatises: IConsentementInformatise[]) =>
          this.consentementInformatiseService.addConsentementInformatiseToCollectionIfMissing<IConsentementInformatise>(
            consentementInformatises,
            this.patient?.consentementInformatise,
          ),
        ),
      )
      .subscribe(
        (consentementInformatises: IConsentementInformatise[]) =>
          (this.consentementInformatisesSharedCollection = consentementInformatises),
      );
  }
}
