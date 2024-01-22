import { TestBed } from '@angular/core/testing';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { RouterTestingHarness, RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { SalleOperationDetailComponent } from './salle-operation-detail.component';

describe('SalleOperation Management Detail Component', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SalleOperationDetailComponent, RouterTestingModule.withRoutes([], { bindToComponentInputs: true })],
      providers: [
        provideRouter(
          [
            {
              path: '**',
              component: SalleOperationDetailComponent,
              resolve: { salleOperation: () => of({ id: 123 }) },
            },
          ],
          withComponentInputBinding(),
        ),
      ],
    })
      .overrideTemplate(SalleOperationDetailComponent, '')
      .compileComponents();
  });

  describe('OnInit', () => {
    it('Should load salleOperation on init', async () => {
      const harness = await RouterTestingHarness.create();
      const instance = await harness.navigateByUrl('/', SalleOperationDetailComponent);

      // THEN
      expect(instance.salleOperation).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
