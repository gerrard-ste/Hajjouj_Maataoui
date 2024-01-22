import { Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'consentement-informatise',
    data: { pageTitle: 'ConsentementInformatises' },
    loadChildren: () => import('./projetmicroservice/consentement-informatise/consentement-informatise.routes'),
  },
  {
    path: 'dossier-patient',
    data: { pageTitle: 'DossierPatients' },
    loadChildren: () => import('./projetmicroservice/dossier-patient/dossier-patient.routes'),
  },
  {
    path: 'medecin',
    data: { pageTitle: 'Medecins' },
    loadChildren: () => import('./projetmicroservice/medecin/medecin.routes'),
  },
  {
    path: 'operation',
    data: { pageTitle: 'Operations' },
    loadChildren: () => import('./projetmicroservice/operation/operation.routes'),
  },
  {
    path: 'patient',
    data: { pageTitle: 'Patients' },
    loadChildren: () => import('./projetmicroservice/patient/patient.routes'),
  },
  {
    path: 'ressources',
    data: { pageTitle: 'Ressources' },
    loadChildren: () => import('./projetmicroservice/ressources/ressources.routes'),
  },
  {
    path: 'salle-operation',
    data: { pageTitle: 'SalleOperations' },
    loadChildren: () => import('./projetmicroservice/salle-operation/salle-operation.routes'),
  },
  /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
];

export default routes;
