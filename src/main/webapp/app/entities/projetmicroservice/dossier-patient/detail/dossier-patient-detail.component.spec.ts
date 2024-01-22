import { TestBed } from '@angular/core/testing';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { RouterTestingHarness, RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { DossierPatientDetailComponent } from './dossier-patient-detail.component';

describe('DossierPatient Management Detail Component', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DossierPatientDetailComponent, RouterTestingModule.withRoutes([], { bindToComponentInputs: true })],
      providers: [
        provideRouter(
          [
            {
              path: '**',
              component: DossierPatientDetailComponent,
              resolve: { dossierPatient: () => of({ id: 123 }) },
            },
          ],
          withComponentInputBinding(),
        ),
      ],
    })
      .overrideTemplate(DossierPatientDetailComponent, '')
      .compileComponents();
  });

  describe('OnInit', () => {
    it('Should load dossierPatient on init', async () => {
      const harness = await RouterTestingHarness.create();
      const instance = await harness.navigateByUrl('/', DossierPatientDetailComponent);

      // THEN
      expect(instance.dossierPatient).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
