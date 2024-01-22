import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { DossierPatientService } from '../service/dossier-patient.service';

import { DossierPatientComponent } from './dossier-patient.component';

describe('DossierPatient Management Component', () => {
  let comp: DossierPatientComponent;
  let fixture: ComponentFixture<DossierPatientComponent>;
  let service: DossierPatientService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([{ path: 'projetmicroservice/dossier-patient', component: DossierPatientComponent }]),
        HttpClientTestingModule,
        DossierPatientComponent,
      ],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            data: of({
              defaultSort: 'id,asc',
            }),
            queryParamMap: of(
              jest.requireActual('@angular/router').convertToParamMap({
                page: '1',
                size: '1',
                sort: 'id,desc',
              }),
            ),
            snapshot: { queryParams: {} },
          },
        },
      ],
    })
      .overrideTemplate(DossierPatientComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(DossierPatientComponent);
    comp = fixture.componentInstance;
    service = TestBed.inject(DossierPatientService);

    const headers = new HttpHeaders();
    jest.spyOn(service, 'query').mockReturnValue(
      of(
        new HttpResponse({
          body: [{ id: 123 }],
          headers,
        }),
      ),
    );
  });

  it('Should call load all on init', () => {
    // WHEN
    comp.ngOnInit();

    // THEN
    expect(service.query).toHaveBeenCalled();
    expect(comp.dossierPatients?.[0]).toEqual(expect.objectContaining({ id: 123 }));
  });

  describe('trackId', () => {
    it('Should forward to dossierPatientService', () => {
      const entity = { id: 123 };
      jest.spyOn(service, 'getDossierPatientIdentifier');
      const id = comp.trackId(0, entity);
      expect(service.getDossierPatientIdentifier).toHaveBeenCalledWith(entity);
      expect(id).toBe(entity.id);
    });
  });
});
