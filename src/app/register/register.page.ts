import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import {
  IonHeader, IonToolbar, IonTitle, IonContent,
  IonList, IonItem, IonInput, IonButton, IonSelect, IonSelectOption, IonText
} from '@ionic/angular/standalone';
import { AuthService } from '../services/auth';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  standalone: true,
  imports: [
    CommonModule, FormsModule, RouterModule,
    IonHeader, IonToolbar, IonTitle, IonContent,
    IonList, IonItem, IonInput, IonButton, IonSelect, IonSelectOption, IonText
  ]
})
export class RegisterPage {
  public email: string = '';
  public passwort: string = '';
  public rolle: string = '';
  public errorMessage: string = '';

  constructor(private router: Router, private authService: AuthService) { }

  private validateEmail(email: string): boolean {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }

  private validatePassword(pass: string): boolean {
    return pass.length >= 8 && /\d/.test(pass);
  }

  public async register() {
    this.errorMessage = '';

    if (!this.validateEmail(this.email) || !this.validatePassword(this.passwort) || !this.rolle) {
      this.errorMessage = 'Bitte alle Felder korrekt ausfüllen (Passwort min. 8 Zeichen, 1 Zahl).';
      return;
    }

    try {
      console.log("Sende Daten an Firebase...");
      await this.authService.register(this.email, this.passwort);
      console.log("Firebase hat geantwortet: ERFOLG!");
      const target = this.rolle === 'schueler' ? '/profile-student' : '/profile-teacher';
      this.router.navigate([target]);
    } catch (error: any) {
      console.error("🔥 FIREBASE FEHLER 🔥:", error);
      this.errorMessage = 'Fehler! Schau in die Konsole (F12).';
    }
  }
}
