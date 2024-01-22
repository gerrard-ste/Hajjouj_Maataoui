import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { ConsentementInformatiseService } from '../service/consentement-informatise.service';
import { IConsentementInformatise } from '../consentement-informatise.model';
import { ConsentementInformatiseFormService } from './consentement-informatise-form.service';

import { ConsentementInformatiseUpdateComponent } from './consentement-informatise-update.component';

describe('ConsentementInformatise Management Update Component', () => {
  let comp: ConsentementInformatiseUpdateComponent;
  let fixture: ComponentFixture<ConsentementInformatiseUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let consentementInformatiseFormService: ConsentementInformatiseFormService;
  let consentementInformatiseService: ConsentementInformatiseService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([]), ConsentementInformatiseUpdateComponent],
      providers: [
        FormBuilder,
        {
          provide: ActivatedRoute,
          useValue: {
            params: from([{}]),
          },
        },
      ],
    })
      .overrideTemplate(ConsentementInformatiseUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(ConsentementInformatiseUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    consentementInformatiseFormService = TestBed.inject(ConsentementInformatiseFormService);
    consentementInformatiseService = TestBed.inject(ConsentementInformatiseService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const consentementInformatise: IConsentementInformatise = { id: 456 };

      activatedRoute.data = of({ consentementInformatise });
      comp.ngOnInit();

      expect(comp.consentementInformatise).toEqual(consentementInformatise);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IConsentementInformatise>>();
      const consentementInformatise = { id: 123 };
      jest.spyOn(consentementInformatiseFormService, 'getConsentementInformatise').mockReturnValue(consentementInformatise);
      jest.spyOn(consentementInformatiseService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ consentementInformatise });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: consentementInformatise }));
      saveSubject.complete();

      // THEN
      expect(consentementInformatiseFormService.getConsentementInformatise).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(consentementInformatiseService.update).toHaveBeenCalledWith(expect.objectContaining(consentementInformatise));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IConsentementInformatise>>();
      const consentementInformatise = { id: 123 };
      jest.spyOn(consentementInformatiseFormService, 'getConsentementInformatise').mockReturnValue({ id: null });
      jest.spyOn(consentementInformatiseService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ consentementInformatise: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: consentementInformatise }));
      saveSubject.complete();

      // THEN
      expect(consentementInformatiseFormService.getConsentementInformatise).toHaveBeenCalled();
      expect(consentementInformatiseService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IConsentementInformatise>>();
      const consentementInformatise = { id: 123 };
      jest.spyOn(consentementInformatiseService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ consentementInformatise });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(consentementInformatiseService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
