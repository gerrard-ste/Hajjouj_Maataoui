import { Component, Input } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';

import SharedModule from 'app/shared/shared.module';
import { DurationPipe, FormatMediumDatetimePipe, FormatMediumDatePipe } from 'app/shared/date';
import { IConsentementInformatise } from '../consentement-informatise.model';

@Component({
  standalone: true,
  selector: 'jhi-consentement-informatise-detail',
  templateUrl: './consentement-informatise-detail.component.html',
  imports: [SharedModule, RouterModule, DurationPipe, FormatMediumDatetimePipe, FormatMediumDatePipe],
})
export class ConsentementInformatiseDetailComponent {
  @Input() consentementInformatise: IConsentementInformatise | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  previousState(): void {
    window.history.back();
  }
}
