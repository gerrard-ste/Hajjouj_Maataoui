import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import SharedModule from 'app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IConsentementInformatise } from '../consentement-informatise.model';
import { ConsentementInformatiseService } from '../service/consentement-informatise.service';
import { ConsentementInformatiseFormService, ConsentementInformatiseFormGroup } from './consentement-informatise-form.service';

@Component({
  standalone: true,
  selector: 'jhi-consentement-informatise-update',
  templateUrl: './consentement-informatise-update.component.html',
  imports: [SharedModule, FormsModule, ReactiveFormsModule],
})
export class ConsentementInformatiseUpdateComponent implements OnInit {
  isSaving = false;
  consentementInformatise: IConsentementInformatise | null = null;

  editForm: ConsentementInformatiseFormGroup = this.consentementInformatiseFormService.createConsentementInformatiseFormGroup();

  constructor(
    protected consentementInformatiseService: ConsentementInformatiseService,
    protected consentementInformatiseFormService: ConsentementInformatiseFormService,
    protected activatedRoute: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ consentementInformatise }) => {
      this.consentementInformatise = consentementInformatise;
      if (consentementInformatise) {
        this.updateForm(consentementInformatise);
      }
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const consentementInformatise = this.consentementInformatiseFormService.getConsentementInformatise(this.editForm);
    if (consentementInformatise.id !== null) {
      this.subscribeToSaveResponse(this.consentementInformatiseService.update(consentementInformatise));
    } else {
      this.subscribeToSaveResponse(this.consentementInformatiseService.create(consentementInformatise));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IConsentementInformatise>>): void {
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

  protected updateForm(consentementInformatise: IConsentementInformatise): void {
    this.consentementInformatise = consentementInformatise;
    this.consentementInformatiseFormService.resetForm(this.editForm, consentementInformatise);
  }
}
