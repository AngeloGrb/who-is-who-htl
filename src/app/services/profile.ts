import { Injectable } from '@angular/core';
import {
  Firestore,
  collection,
  doc,
  getDoc,
  addDoc,
  onSnapshot,
  query
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  constructor(private firestore: Firestore) {}

  public getProfiles(): Observable<any[]> {
    return new Observable((observer) => {
      const profilesRef = collection(this.firestore, 'profiles');
      const q = query(profilesRef);

      const unsubscribe = onSnapshot(q, (snapshot) => {
        const profiles = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        observer.next(profiles);
      }, (error) => {
        observer.error(error);
      });

      return () => unsubscribe();
    });
  }

  public async addProfile(name: string, role: string, extraInfo: string = '') {
    const profilesRef = collection(this.firestore, 'profiles');
    return addDoc(profilesRef, { name, role, extraInfo });
  }

  public async getProfileById(id: string) {
    const profileRef = doc(this.firestore, `profiles/${id}`);
    const docSnap = await getDoc(profileRef);
    return docSnap.exists() ? { id: docSnap.id, ...docSnap.data() } : undefined;
  }
}
