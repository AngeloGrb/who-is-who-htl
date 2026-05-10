import { Injectable } from '@angular/core';
import {
  Auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  authState,
  User
} from '@angular/fire/auth';
import { ReplaySubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public isLoggedIn: boolean = false;
  // ReplaySubject speichert den letzten Status für sofortige Verfügbarkeit
  public authState$ = new ReplaySubject<User | null>(1);

  constructor(private auth: Auth) {
    authState(this.auth).subscribe((user) => {
      this.isLoggedIn = !!user;
      this.authState$.next(user);
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
