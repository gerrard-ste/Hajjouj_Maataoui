import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IConsentementInformatise } from '../consentement-informatise.model';
import {
  sampleWithRequiredData,
  sampleWithNewData,
  sampleWithPartialData,
  sampleWithFullData,
} from '../consentement-informatise.test-samples';

import { ConsentementInformatiseService } from './consentement-informatise.service';

const requireRestSample: IConsentementInformatise = {
  ...sampleWithRequiredData,
};

describe('ConsentementInformatise Service', () => {
  let service: ConsentementInformatiseService;
  let httpMock: HttpTestingController;
  let expectedResult: IConsentementInformatise | IConsentementInformatise[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(ConsentementInformatiseService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  describe('Service methods', () => {
    it('should find an element', () => {
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.find(123).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should create a ConsentementInformatise', () => {
      const consentementInformatise = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(consentementInformatise).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a ConsentementInformatise', () => {
      const consentementInformatise = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(consentementInformatise).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a ConsentementInformatise', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of ConsentementInformatise', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a ConsentementInformatise', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addConsentementInformatiseToCollectionIfMissing', () => {
      it('should add a ConsentementInformatise to an empty array', () => {
        const consentementInformatise: IConsentementInformatise = sampleWithRequiredData;
        expectedResult = service.addConsentementInformatiseToCollectionIfMissing([], consentementInformatise);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(consentementInformatise);
      });

      it('should not add a ConsentementInformatise to an array that contains it', () => {
        const consentementInformatise: IConsentementInformatise = sampleWithRequiredData;
        const consentementInformatiseCollection: IConsentementInformatise[] = [
          {
            ...consentementInformatise,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addConsentementInformatiseToCollectionIfMissing(
          consentementInformatiseCollection,
          consentementInformatise,
        );
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a ConsentementInformatise to an array that doesn't contain it", () => {
        const consentementInformatise: IConsentementInformatise = sampleWithRequiredData;
        const consentementInformatiseCollection: IConsentementInformatise[] = [sampleWithPartialData];
        expectedResult = service.addConsentementInformatiseToCollectionIfMissing(
          consentementInformatiseCollection,
          consentementInformatise,
        );
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(consentementInformatise);
      });

      it('should add only unique ConsentementInformatise to an array', () => {
        const consentementInformatiseArray: IConsentementInformatise[] = [
          sampleWithRequiredData,
          sampleWithPartialData,
          sampleWithFullData,
        ];
        const consentementInformatiseCollection: IConsentementInformatise[] = [sampleWithRequiredData];
        expectedResult = service.addConsentementInformatiseToCollectionIfMissing(
          consentementInformatiseCollection,
          ...consentementInformatiseArray,
        );
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const consentementInformatise: IConsentementInformatise = sampleWithRequiredData;
        const consentementInformatise2: IConsentementInformatise = sampleWithPartialData;
        expectedResult = service.addConsentementInformatiseToCollectionIfMissing([], consentementInformatise, consentementInformatise2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(consentementInformatise);
        expect(expectedResult).toContain(consentementInformatise2);
      });

      it('should accept null and undefined values', () => {
        const consentementInformatise: IConsentementInformatise = sampleWithRequiredData;
        expectedResult = service.addConsentementInformatiseToCollectionIfMissing([], null, consentementInformatise, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(consentementInformatise);
      });

      it('should return initial array if no ConsentementInformatise is added', () => {
        const consentementInformatiseCollection: IConsentementInformatise[] = [sampleWithRequiredData];
        expectedResult = service.addConsentementInformatiseToCollectionIfMissing(consentementInformatiseCollection, undefined, null);
        expect(expectedResult).toEqual(consentementInformatiseCollection);
      });
    });

    describe('compareConsentementInformatise', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareConsentementInformatise(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareConsentementInformatise(entity1, entity2);
        const compareResult2 = service.compareConsentementInformatise(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareConsentementInformatise(entity1, entity2);
        const compareResult2 = service.compareConsentementInformatise(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareConsentementInformatise(entity1, entity2);
        const compareResult2 = service.compareConsentementInformatise(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
