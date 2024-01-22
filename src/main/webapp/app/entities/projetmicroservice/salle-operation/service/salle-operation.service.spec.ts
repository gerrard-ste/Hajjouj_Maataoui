import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { ISalleOperation } from '../salle-operation.model';
import { sampleWithRequiredData, sampleWithNewData, sampleWithPartialData, sampleWithFullData } from '../salle-operation.test-samples';

import { SalleOperationService } from './salle-operation.service';

const requireRestSample: ISalleOperation = {
  ...sampleWithRequiredData,
};

describe('SalleOperation Service', () => {
  let service: SalleOperationService;
  let httpMock: HttpTestingController;
  let expectedResult: ISalleOperation | ISalleOperation[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(SalleOperationService);
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

    it('should create a SalleOperation', () => {
      const salleOperation = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(salleOperation).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a SalleOperation', () => {
      const salleOperation = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(salleOperation).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a SalleOperation', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of SalleOperation', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a SalleOperation', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addSalleOperationToCollectionIfMissing', () => {
      it('should add a SalleOperation to an empty array', () => {
        const salleOperation: ISalleOperation = sampleWithRequiredData;
        expectedResult = service.addSalleOperationToCollectionIfMissing([], salleOperation);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(salleOperation);
      });

      it('should not add a SalleOperation to an array that contains it', () => {
        const salleOperation: ISalleOperation = sampleWithRequiredData;
        const salleOperationCollection: ISalleOperation[] = [
          {
            ...salleOperation,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addSalleOperationToCollectionIfMissing(salleOperationCollection, salleOperation);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a SalleOperation to an array that doesn't contain it", () => {
        const salleOperation: ISalleOperation = sampleWithRequiredData;
        const salleOperationCollection: ISalleOperation[] = [sampleWithPartialData];
        expectedResult = service.addSalleOperationToCollectionIfMissing(salleOperationCollection, salleOperation);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(salleOperation);
      });

      it('should add only unique SalleOperation to an array', () => {
        const salleOperationArray: ISalleOperation[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const salleOperationCollection: ISalleOperation[] = [sampleWithRequiredData];
        expectedResult = service.addSalleOperationToCollectionIfMissing(salleOperationCollection, ...salleOperationArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const salleOperation: ISalleOperation = sampleWithRequiredData;
        const salleOperation2: ISalleOperation = sampleWithPartialData;
        expectedResult = service.addSalleOperationToCollectionIfMissing([], salleOperation, salleOperation2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(salleOperation);
        expect(expectedResult).toContain(salleOperation2);
      });

      it('should accept null and undefined values', () => {
        const salleOperation: ISalleOperation = sampleWithRequiredData;
        expectedResult = service.addSalleOperationToCollectionIfMissing([], null, salleOperation, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(salleOperation);
      });

      it('should return initial array if no SalleOperation is added', () => {
        const salleOperationCollection: ISalleOperation[] = [sampleWithRequiredData];
        expectedResult = service.addSalleOperationToCollectionIfMissing(salleOperationCollection, undefined, null);
        expect(expectedResult).toEqual(salleOperationCollection);
      });
    });

    describe('compareSalleOperation', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareSalleOperation(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareSalleOperation(entity1, entity2);
        const compareResult2 = service.compareSalleOperation(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareSalleOperation(entity1, entity2);
        const compareResult2 = service.compareSalleOperation(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareSalleOperation(entity1, entity2);
        const compareResult2 = service.compareSalleOperation(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
