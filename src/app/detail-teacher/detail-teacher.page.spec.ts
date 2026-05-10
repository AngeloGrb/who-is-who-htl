import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DetailTeacherPage } from './detail-teacher.page';

describe('DetailTeacherPage', () => {
  let component: DetailTeacherPage;
  let fixture: ComponentFixture<DetailTeacherPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailTeacherPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
