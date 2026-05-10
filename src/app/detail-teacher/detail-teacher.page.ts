import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import {
  IonHeader, IonToolbar, IonTitle, IonContent,
  IonButtons, IonBackButton, IonCard, IonCardHeader,
  IonCardTitle, IonCardSubtitle, IonCardContent, IonIcon, IonItem, IonLabel
} from '@ionic/angular/standalone';
import { ProfileService } from '../services/profile';
import { addIcons } from 'ionicons';
import { personCircleOutline, briefcaseOutline } from 'ionicons/icons';

@Component({
  selector: 'app-detail-teacher',
  templateUrl: './detail-teacher.page.html',
  standalone: true,
  imports: [
    CommonModule, IonHeader, IonToolbar, IonTitle, IonContent,
    IonButtons, IonBackButton, IonCard, IonCardHeader,
    IonCardTitle, IonCardSubtitle, IonCardContent, IonIcon, IonItem, IonLabel
  ]
})
export class DetailTeacherPage implements OnInit {
  public profile: any;

  constructor(private route: ActivatedRoute, private profileService: ProfileService) {
    addIcons({ personCircleOutline, briefcaseOutline });
  }

  async ngOnInit() {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.profile = await this.profileService.getProfileById(idParam);
    }
  }
}
