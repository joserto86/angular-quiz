import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {

  constructor() { }

  error(code: string):string {
    switch (code) {
      case 'auth/email-already-in-use':
        return 'El Correo ya está registrado'
      case 'auth/invalid-email':
        return 'El Correo es inválido';
      case 'auth/weak-password': 
        return 'La contraseña es muy débil';
      case 'auth/user-not-found':
      case 'auth/wrong-password':
        return 'Usuario inválido';
      default:
        return 'Error desconocido';
    }
  }
}
