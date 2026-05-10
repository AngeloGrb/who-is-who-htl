import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import {
  IonHeader, IonToolbar, IonTitle, IonContent,
  IonSearchbar, IonList, IonListHeader, IonItem,
  IonLabel, IonAvatar, IonFab, IonFabButton, IonIcon,
  IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonButton, ViewDidEnter
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { add, closeOutline } from 'ionicons/icons';
import { ProfileService } from '../services/profile';
import { AuthService } from '../services/auth';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  standalone: true,
  imports: [
    CommonModule, RouterModule,
    IonHeader, IonToolbar, IonTitle, IonContent,
    IonSearchbar, IonList, IonListHeader, IonItem,
    IonLabel, IonAvatar, IonFab, IonFabButton, IonIcon,
    IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonButton
  ],
})
export class HomePage implements ViewDidEnter {
  public filteredProfiles: any[] = [];
  public showLoginCard: boolean = true;
  private currentQuery: string = '';

  constructor(
    private profileService: ProfileService,
    public authService: AuthService,
    private router: Router
  ) {
    addIcons({ add, closeOutline });
  }

  ionViewDidEnter() {
    this.refreshList();
    if (this.authService.isLoggedIn) {
      this.showLoginCard = false;
    }
  }

  public handleInput(event: any) {
    this.currentQuery = event.target.value.toLowerCase();
    this.refreshList();
  }

  private refreshList() {
    const all = this.profileService.profiles;
    this.filteredProfiles = this.currentQuery
      ? all.filter(p => p.name.toLowerCase().includes(this.currentQuery) || p.role.toLowerCase().includes(this.currentQuery))
      : [...all];
  }

  public goToDetail(profile: any) {
    if (!this.authService.isLoggedIn) {
      this.router.navigate(['/login']);
      return;
    }

    if (profile.role.includes('Schüler')) {
      this.router.navigate(['/detail-student', profile.id]);
    } else {
      this.router.navigate(['/detail-teacher', profile.id]);
    }
  }

  public checkAction(targetRoute: string) {
    if (this.authService.isLoggedIn) {
      this.router.navigate([targetRoute]);
    } else {
      this.router.navigate(['/login']);
    }
  }
}
