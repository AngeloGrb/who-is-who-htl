import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import {
  IonHeader, IonToolbar, IonTitle, IonContent,
  IonCard, IonCardContent, IonButton, IonSearchbar,
  IonList, IonListHeader, IonLabel, IonItem,
  IonAvatar, IonFab, IonFabButton, IonFabList, IonIcon, IonButtons
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { add, person, briefcase, logOutOutline } from 'ionicons/icons';
import { ProfileService } from '../services/profile';
import { AuthService } from '../services/auth';
import { Observable, BehaviorSubject, combineLatest, map } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  standalone: true,
  imports: [
    CommonModule, RouterModule,
    IonHeader, IonToolbar, IonTitle, IonContent,
    IonCard, IonCardContent, IonButton, IonSearchbar,
    IonList, IonListHeader, IonLabel, IonItem,
    IonAvatar, IonFab, IonFabButton, IonFabList, IonIcon, IonButtons
  ]
})
export class HomePage implements OnInit {
  public filteredProfiles$!: Observable<any[]>;
  private searchTerm$ = new BehaviorSubject<string>('');

  constructor(
    private profileService: ProfileService,
    public authService: AuthService,
    public router: Router
  ) {
    addIcons({ add, person, briefcase, logOutOutline });
  }

  ngOnInit() {
    this.filteredProfiles$ = combineLatest([
      this.profileService.getProfiles(),
      this.searchTerm$
    ]).pipe(
      map(([profiles, term]) => {
        const search = term.toLowerCase();
        return profiles.filter(p =>
          !search ||
          p.name?.toLowerCase().includes(search) ||
          p.role?.toLowerCase().includes(search)
        );
      })
    );
  }

  public handleInput(event: any) {
    this.searchTerm$.next(event.target.value || '');
  }

  public async logout() {
    await this.authService.logout();
    this.router.navigate(['/login']);
  }

  public goToDetail(profile: any) {
    if (profile?.role) {
      const target = profile.role.includes('Schüler') ? 'detail-student' : 'detail-teacher';
      this.router.navigate([target, profile.id]);
    }
  }
}
