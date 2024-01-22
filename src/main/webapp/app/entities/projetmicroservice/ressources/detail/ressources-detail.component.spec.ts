import { TestBed } from '@angular/core/testing';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { RouterTestingHarness, RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { RessourcesDetailComponent } from './ressources-detail.component';

describe('Ressources Management Detail Component', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RessourcesDetailComponent, RouterTestingModule.withRoutes([], { bindToComponentInputs: true })],
      providers: [
        provideRouter(
          [
            {
              path: '**',
              component: RessourcesDetailComponent,
              resolve: { ressources: () => of({ id: 123 }) },
            },
          ],
          withComponentInputBinding(),
        ),
      ],
    })
      .overrideTemplate(RessourcesDetailComponent, '')
      .compileComponents();
  });

  describe('OnInit', () => {
    it('Should load ressources on init', async () => {
      const harness = await RouterTestingHarness.create();
      const instance = await harness.navigateByUrl('/', RessourcesDetailComponent);

      // THEN
      expect(instance.ressources).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
