// src/app/services/firebase-data.service.ts
import { Injectable } from '@angular/core';
// CAMBIO IMPORTANTE: Importa Firestore de la versión modular
import { Firestore, collection, addDoc } from '@angular/fire/firestore';
import { Observable, from } from 'rxjs'; // Necesario para observables
import { map } from 'rxjs/operators'; // Si usas valueChanges o snapshotChanges

// Opcional: Define una interfaz para los datos de tu consulta
export interface ConsultaData {
  nombres: string;
  apellidos: string;
  edad: number;
  tipoConsulta: string;
  descripcion?: string; // Opcional
  fechaRegistro: string;
  horaRegistro: string;
  timestamp: number;
}

@Injectable({
  providedIn: 'root'
})
export class FirebaseDataService {

  // Inyecta Firestore (la versión modular)
  constructor(private firestore: Firestore) { }

  /**
   * Guarda una nueva consulta en la colección 'consultas' de Firestore.
   * @param data Los datos de la consulta a guardar.
   * @returns Una Promise que resuelve cuando los datos se han guardado.
   */
  async saveConsulta(data: ConsultaData): Promise<void> {
    // Usa la función 'collection' y 'addDoc' del SDK modular
    const collectionRef = collection(this.firestore, 'consultas');
    await addDoc(collectionRef, data);
  }

  // --- Opcional: Métodos para leer datos (actualizados para la versión modular) ---

  /**
   * Obtiene todas las consultas de la colección 'consultas'.
   * @returns Un Observable de un array de ConsultaData.
   */
  getConsultas(): Observable<ConsultaData[]> {
    // Aquí, para obtener datos en tiempo real, puedes usar 'collectionData'
    // Necesitarás importar { collectionData } from '@angular/fire/firestore';
    // Por simplicidad, si solo necesitas un snapshot:
    // return from(getDocs(collection(this.firestore, 'consultas'))).pipe(
    //   map(snapshot => snapshot.docs.map(doc => doc.data() as ConsultaData))
    // );
    // Para suscripciones en tiempo real:
    // return collectionData(collection(this.firestore, 'consultas')) as Observable<ConsultaData[]>;
    console.warn('Método getConsultas no implementado completamente con el enfoque modular aquí. Usar collectionData de @angular/fire/firestore para lecturas en tiempo real.');
    return new Observable<ConsultaData[]>(); // Devolver un observable vacío por ahora
  }
}
