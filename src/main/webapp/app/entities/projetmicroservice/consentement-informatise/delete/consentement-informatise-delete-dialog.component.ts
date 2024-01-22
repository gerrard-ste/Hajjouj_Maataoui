import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import SharedModule from 'app/shared/shared.module';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';
import { IConsentementInformatise } from '../consentement-informatise.model';
import { ConsentementInformatiseService } from '../service/consentement-informatise.service';

@Component({
  standalone: true,
  templateUrl: './consentement-informatise-delete-dialog.component.html',
  imports: [SharedModule, FormsModule],
})
export class ConsentementInformatiseDeleteDialogComponent {
  consentementInformatise?: IConsentementInformatise;

  constructor(
    protected consentementInformatiseService: ConsentementInformatiseService,
    protected activeModal: NgbActiveModal,
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.consentementInformatiseService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
