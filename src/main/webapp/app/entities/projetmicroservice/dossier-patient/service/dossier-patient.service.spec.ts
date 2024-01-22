import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IDossierPatient } from '../dossier-patient.model';
import { sampleWithRequiredData, sampleWithNewData, sampleWithPartialData, sampleWithFullData } from '../dossier-patient.test-samples';

import { DossierPatientService } from './dossier-patient.service';

const requireRestSample: IDossierPatient = {
  ...sampleWithRequiredData,
};

describe('DossierPatient Service', () => {
  let service: DossierPatientService;
  let httpMock: HttpTestingController;
  let expectedResult: IDossierPatient | IDossierPatient[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(DossierPatientService);
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

    it('should create a DossierPatient', () => {
      const dossierPatient = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(dossierPatient).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a DossierPatient', () => {
      const dossierPatient = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(dossierPatient).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a DossierPatient', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of DossierPatient', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a DossierPatient', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addDossierPatientToCollectionIfMissing', () => {
      it('should add a DossierPatient to an empty array', () => {
        const dossierPatient: IDossierPatient = sampleWithRequiredData;
        expectedResult = service.addDossierPatientToCollectionIfMissing([], dossierPatient);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(dossierPatient);
      });

      it('should not add a DossierPatient to an array that contains it', () => {
        const dossierPatient: IDossierPatient = sampleWithRequiredData;
        const dossierPatientCollection: IDossierPatient[] = [
          {
            ...dossierPatient,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addDossierPatientToCollectionIfMissing(dossierPatientCollection, dossierPatient);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a DossierPatient to an array that doesn't contain it", () => {
        const dossierPatient: IDossierPatient = sampleWithRequiredData;
        const dossierPatientCollection: IDossierPatient[] = [sampleWithPartialData];
        expectedResult = service.addDossierPatientToCollectionIfMissing(dossierPatientCollection, dossierPatient);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(dossierPatient);
      });

      it('should add only unique DossierPatient to an array', () => {
        const dossierPatientArray: IDossierPatient[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const dossierPatientCollection: IDossierPatient[] = [sampleWithRequiredData];
        expectedResult = service.addDossierPatientToCollectionIfMissing(dossierPatientCollection, ...dossierPatientArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const dossierPatient: IDossierPatient = sampleWithRequiredData;
        const dossierPatient2: IDossierPatient = sampleWithPartialData;
        expectedResult = service.addDossierPatientToCollectionIfMissing([], dossierPatient, dossierPatient2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(dossierPatient);
        expect(expectedResult).toContain(dossierPatient2);
      });

      it('should accept null and undefined values', () => {
        const dossierPatient: IDossierPatient = sampleWithRequiredData;
        expectedResult = service.addDossierPatientToCollectionIfMissing([], null, dossierPatient, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(dossierPatient);
      });

      it('should return initial array if no DossierPatient is added', () => {
        const dossierPatientCollection: IDossierPatient[] = [sampleWithRequiredData];
        expectedResult = service.addDossierPatientToCollectionIfMissing(dossierPatientCollection, undefined, null);
        expect(expectedResult).toEqual(dossierPatientCollection);
      });
    });

    describe('compareDossierPatient', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareDossierPatient(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareDossierPatient(entity1, entity2);
        const compareResult2 = service.compareDossierPatient(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareDossierPatient(entity1, entity2);
        const compareResult2 = service.compareDossierPatient(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareDossierPatient(entity1, entity2);
        const compareResult2 = service.compareDossierPatient(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
