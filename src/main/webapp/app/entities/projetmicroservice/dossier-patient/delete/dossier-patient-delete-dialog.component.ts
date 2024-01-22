import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import SharedModule from 'app/shared/shared.module';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';
import { IDossierPatient } from '../dossier-patient.model';
import { DossierPatientService } from '../service/dossier-patient.service';

@Component({
  standalone: true,
  templateUrl: './dossier-patient-delete-dialog.component.html',
  imports: [SharedModule, FormsModule],
})
export class DossierPatientDeleteDialogComponent {
  dossierPatient?: IDossierPatient;

  constructor(
    protected dossierPatientService: DossierPatientService,
    protected activeModal: NgbActiveModal,
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.dossierPatientService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
