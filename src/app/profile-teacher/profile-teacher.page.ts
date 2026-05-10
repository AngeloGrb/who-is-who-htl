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
  selector: 'app-profile-teacher',
  templateUrl: './profile-teacher.page.html',
  standalone: true,
  imports: [
    CommonModule, FormsModule,
    IonHeader, IonToolbar, IonTitle, IonContent,
    IonButtons, IonBackButton, IonList, IonItem,
    IonInput, IonTextarea, IonButton
  ]
})
export class ProfileTeacherPage {
  public teacherName: string = '';
  public teacherSubjects: string = '';
  public teacherRoom: string = '';
  public teacherInfo: string = '';

  constructor(private router: Router, private profileService: ProfileService) { }

  public saveProfile() {
    if (!this.teacherName) return;

    const roleString = this.teacherSubjects ? `Lehrkraft - ${this.teacherSubjects}` : 'Lehrkraft';
    this.profileService.addProfile(this.teacherName, roleString);

    this.teacherName = '';
    this.teacherSubjects = '';
    this.teacherRoom = '';
    this.teacherInfo = '';

    this.router.navigate(['/home']);
  }
}
