import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { MedecinService } from '../service/medecin.service';

import { MedecinComponent } from './medecin.component';

describe('Medecin Management Component', () => {
  let comp: MedecinComponent;
  let fixture: ComponentFixture<MedecinComponent>;
  let service: MedecinService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([{ path: 'projetmicroservice/medecin', component: MedecinComponent }]),
        HttpClientTestingModule,
        MedecinComponent,
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
      .overrideTemplate(MedecinComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(MedecinComponent);
    comp = fixture.componentInstance;
    service = TestBed.inject(MedecinService);

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
    expect(comp.medecins?.[0]).toEqual(expect.objectContaining({ id: 123 }));
  });

  describe('trackId', () => {
    it('Should forward to medecinService', () => {
      const entity = { id: 123 };
      jest.spyOn(service, 'getMedecinIdentifier');
      const id = comp.trackId(0, entity);
      expect(service.getMedecinIdentifier).toHaveBeenCalledWith(entity);
      expect(id).toBe(entity.id);
    });
  });
});
