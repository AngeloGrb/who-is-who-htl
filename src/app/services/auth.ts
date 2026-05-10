import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, authState } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public isLoggedIn: boolean = false;

  constructor(private auth: Auth) {
    // Überwacht live, ob der User bei Firebase eingeloggt ist
    authState(this.auth).subscribe((user) => {
      this.isLoggedIn = !!user;
    });
  }

  async register(email: string, passwort: string) {
    return createUserWithEmailAndPassword(this.auth, email, passwort);
  }

  async login(email: string, passwort: string) {
    return signInWithEmailAndPassword(this.auth, email, passwort);
  }

  async logout() {
    return signOut(this.auth);
  }
}
