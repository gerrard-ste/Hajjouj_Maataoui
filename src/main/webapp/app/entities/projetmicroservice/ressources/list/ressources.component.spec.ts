import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { RessourcesService } from '../service/ressources.service';

import { RessourcesComponent } from './ressources.component';

describe('Ressources Management Component', () => {
  let comp: RessourcesComponent;
  let fixture: ComponentFixture<RessourcesComponent>;
  let service: RessourcesService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([{ path: 'projetmicroservice/ressources', component: RessourcesComponent }]),
        HttpClientTestingModule,
        RessourcesComponent,
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
      .overrideTemplate(RessourcesComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(RessourcesComponent);
    comp = fixture.componentInstance;
    service = TestBed.inject(RessourcesService);

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
    expect(comp.ressources?.[0]).toEqual(expect.objectContaining({ id: 123 }));
  });

  describe('trackId', () => {
    it('Should forward to ressourcesService', () => {
      const entity = { id: 123 };
      jest.spyOn(service, 'getRessourcesIdentifier');
      const id = comp.trackId(0, entity);
      expect(service.getRessourcesIdentifier).toHaveBeenCalledWith(entity);
      expect(id).toBe(entity.id);
    });
  });
});
