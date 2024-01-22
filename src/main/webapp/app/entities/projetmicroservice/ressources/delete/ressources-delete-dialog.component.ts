import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import SharedModule from 'app/shared/shared.module';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';
import { IRessources } from '../ressources.model';
import { RessourcesService } from '../service/ressources.service';

@Component({
  standalone: true,
  templateUrl: './ressources-delete-dialog.component.html',
  imports: [SharedModule, FormsModule],
})
export class RessourcesDeleteDialogComponent {
  ressources?: IRessources;

  constructor(
    protected ressourcesService: RessourcesService,
    protected activeModal: NgbActiveModal,
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.ressourcesService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
