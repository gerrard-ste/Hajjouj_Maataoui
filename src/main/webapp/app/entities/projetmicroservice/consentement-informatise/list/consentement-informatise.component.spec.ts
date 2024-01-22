import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { ConsentementInformatiseService } from '../service/consentement-informatise.service';

import { ConsentementInformatiseComponent } from './consentement-informatise.component';

describe('ConsentementInformatise Management Component', () => {
  let comp: ConsentementInformatiseComponent;
  let fixture: ComponentFixture<ConsentementInformatiseComponent>;
  let service: ConsentementInformatiseService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([
          { path: 'projetmicroservice/consentement-informatise', component: ConsentementInformatiseComponent },
        ]),
        HttpClientTestingModule,
        ConsentementInformatiseComponent,
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
      .overrideTemplate(ConsentementInformatiseComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(ConsentementInformatiseComponent);
    comp = fixture.componentInstance;
    service = TestBed.inject(ConsentementInformatiseService);

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
    expect(comp.consentementInformatises?.[0]).toEqual(expect.objectContaining({ id: 123 }));
  });

  describe('trackId', () => {
    it('Should forward to consentementInformatiseService', () => {
      const entity = { id: 123 };
      jest.spyOn(service, 'getConsentementInformatiseIdentifier');
      const id = comp.trackId(0, entity);
      expect(service.getConsentementInformatiseIdentifier).toHaveBeenCalledWith(entity);
      expect(id).toBe(entity.id);
    });
  });
});
