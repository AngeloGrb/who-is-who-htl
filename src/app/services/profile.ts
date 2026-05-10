import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  public profiles = [
    { id: 1, name: 'Max Mustermann', role: 'Schüler - 4. Klasse', extraInfo: 'Spielt gerne Fußball.' },
    { id: 2, name: 'Martina Hiesinger', role: 'Lehrkraft', extraInfo: 'Raum 104, Sprechstunde Freitag 3. Stunde.' },
    { id: 3, name: 'Anna Schmidt', role: 'Schüler - 3. Klasse', extraInfo: 'Klassensprecherin.' }
  ];

  constructor() { }

  public addProfile(name: string, role: string, extraInfo: string = '') {
    const newId = this.profiles.length > 0 ? Math.max(...this.profiles.map(p => p.id)) + 1 : 1;
    this.profiles.push({ id: newId, name, role, extraInfo });
  }

  public getProfileById(id: number) {
    return this.profiles.find(p => p.id === id);
  }
}
