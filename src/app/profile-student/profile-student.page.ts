import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import {
  IonHeader, IonToolbar, IonTitle, IonContent,
  IonButtons, IonBackButton, IonList, IonItem,
  IonInput, IonTextarea, IonButton
} from '@ionic/angular/standalone';
import { ProfileService } from '../services/profile';

@Component({
  selector: 'app-profile-student',
  templateUrl: './profile-student.page.html',
  standalone: true,
  imports: [
    CommonModule, FormsModule,
    IonHeader, IonToolbar, IonTitle, IonContent,
    IonButtons, IonBackButton, IonList, IonItem,
    IonInput, IonTextarea, IonButton
  ]
})
export class ProfileStudentPage {
  public studentName: string = '';
  public studentClass: string = '';
  public aboutMe: string = '';

  constructor(private router: Router, private profileService: ProfileService) { }

  public async saveProfile() {
    if (!this.studentName) return;

    const roleString = this.studentClass ? `Schüler - ${this.studentClass}` : 'Schüler';

    await this.profileService.addProfile(this.studentName, roleString, this.aboutMe);

    this.studentName = '';
    this.studentClass = '';
    this.aboutMe = '';

    this.router.navigate(['/home']);
  }
}
