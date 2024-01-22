import { TestBed } from '@angular/core/testing';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { RouterTestingHarness, RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { ConsentementInformatiseDetailComponent } from './consentement-informatise-detail.component';

describe('ConsentementInformatise Management Detail Component', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConsentementInformatiseDetailComponent, RouterTestingModule.withRoutes([], { bindToComponentInputs: true })],
      providers: [
        provideRouter(
          [
            {
              path: '**',
              component: ConsentementInformatiseDetailComponent,
              resolve: { consentementInformatise: () => of({ id: 123 }) },
            },
          ],
          withComponentInputBinding(),
        ),
      ],
    })
      .overrideTemplate(ConsentementInformatiseDetailComponent, '')
      .compileComponents();
  });

  describe('OnInit', () => {
    it('Should load consentementInformatise on init', async () => {
      const harness = await RouterTestingHarness.create();
      const instance = await harness.navigateByUrl('/', ConsentementInformatiseDetailComponent);

      // THEN
      expect(instance.consentementInformatise).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
