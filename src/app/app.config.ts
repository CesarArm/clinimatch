import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withFetch } from '@angular/common/http';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideClientHydration(withEventReplay()),
    provideHttpClient(withFetch()), provideFirebaseApp(() => initializeApp({ projectId: "clinimatch-51256", appId: "1:209207710574:web:284dbcb1de778f6660e77f", storageBucket: "clinimatch-51256.firebasestorage.app", apiKey: "AIzaSyAzOflcqKi1qaqmDjKYgOAqGFib9H5raso", authDomain: "clinimatch-51256.firebaseapp.com", messagingSenderId: "209207710574", measurementId: "G-QPPTPQV293" })), provideFirestore(() => getFirestore())
  ]
};
