import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IRessources } from '../ressources.model';
import { sampleWithRequiredData, sampleWithNewData, sampleWithPartialData, sampleWithFullData } from '../ressources.test-samples';

import { RessourcesService } from './ressources.service';

const requireRestSample: IRessources = {
  ...sampleWithRequiredData,
};

describe('Ressources Service', () => {
  let service: RessourcesService;
  let httpMock: HttpTestingController;
  let expectedResult: IRessources | IRessources[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(RessourcesService);
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

    it('should create a Ressources', () => {
      const ressources = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(ressources).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a Ressources', () => {
      const ressources = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(ressources).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a Ressources', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of Ressources', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a Ressources', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addRessourcesToCollectionIfMissing', () => {
      it('should add a Ressources to an empty array', () => {
        const ressources: IRessources = sampleWithRequiredData;
        expectedResult = service.addRessourcesToCollectionIfMissing([], ressources);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(ressources);
      });

      it('should not add a Ressources to an array that contains it', () => {
        const ressources: IRessources = sampleWithRequiredData;
        const ressourcesCollection: IRessources[] = [
          {
            ...ressources,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addRessourcesToCollectionIfMissing(ressourcesCollection, ressources);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a Ressources to an array that doesn't contain it", () => {
        const ressources: IRessources = sampleWithRequiredData;
        const ressourcesCollection: IRessources[] = [sampleWithPartialData];
        expectedResult = service.addRessourcesToCollectionIfMissing(ressourcesCollection, ressources);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(ressources);
      });

      it('should add only unique Ressources to an array', () => {
        const ressourcesArray: IRessources[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const ressourcesCollection: IRessources[] = [sampleWithRequiredData];
        expectedResult = service.addRessourcesToCollectionIfMissing(ressourcesCollection, ...ressourcesArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const ressources: IRessources = sampleWithRequiredData;
        const ressources2: IRessources = sampleWithPartialData;
        expectedResult = service.addRessourcesToCollectionIfMissing([], ressources, ressources2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(ressources);
        expect(expectedResult).toContain(ressources2);
      });

      it('should accept null and undefined values', () => {
        const ressources: IRessources = sampleWithRequiredData;
        expectedResult = service.addRessourcesToCollectionIfMissing([], null, ressources, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(ressources);
      });

      it('should return initial array if no Ressources is added', () => {
        const ressourcesCollection: IRessources[] = [sampleWithRequiredData];
        expectedResult = service.addRessourcesToCollectionIfMissing(ressourcesCollection, undefined, null);
        expect(expectedResult).toEqual(ressourcesCollection);
      });
    });

    describe('compareRessources', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareRessources(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareRessources(entity1, entity2);
        const compareResult2 = service.compareRessources(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareRessources(entity1, entity2);
        const compareResult2 = service.compareRessources(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareRessources(entity1, entity2);
        const compareResult2 = service.compareRessources(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
