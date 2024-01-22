import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import SharedModule from 'app/shared/shared.module';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';
import { ISalleOperation } from '../salle-operation.model';
import { SalleOperationService } from '../service/salle-operation.service';

@Component({
  standalone: true,
  templateUrl: './salle-operation-delete-dialog.component.html',
  imports: [SharedModule, FormsModule],
})
export class SalleOperationDeleteDialogComponent {
  salleOperation?: ISalleOperation;

  constructor(
    protected salleOperationService: SalleOperationService,
    protected activeModal: NgbActiveModal,
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.salleOperationService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
