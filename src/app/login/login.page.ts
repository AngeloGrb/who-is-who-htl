import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import {
  IonHeader, IonToolbar, IonTitle, IonContent,
  IonList, IonItem, IonInput, IonButton, IonText
} from '@ionic/angular/standalone';
import { AuthService } from '../services/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  standalone: true,
  imports: [
    CommonModule, FormsModule, RouterModule,
    IonHeader, IonToolbar, IonTitle, IonContent,
    IonList, IonItem, IonInput, IonButton, IonText
  ]
})
export class LoginPage {
  public email: string = '';
  public passwort: string = '';
  public errorMessage: string = '';

  constructor(private router: Router, private authService: AuthService) { }

  private validateEmail(email: string): boolean {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }

  private validatePassword(pass: string): boolean {
    return pass.length >= 8 && /\d/.test(pass);
  }

  public async login() {
    this.errorMessage = '';

    if (!this.validateEmail(this.email) || !this.validatePassword(this.passwort)) {
      this.errorMessage = 'Bitte gültige E-Mail und Passwort (min. 8 Zeichen, 1 Zahl) eingeben.';
      return;
    }

    try {
      await this.authService.login(this.email, this.passwort);
      this.router.navigate(['/home']);
    } catch (error: any) {
      this.errorMessage = 'Login fehlgeschlagen. Falsches Passwort oder Benutzer existiert nicht.';
    }
  }
}
