import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileSpinboxComponent } from './profile-spinbox.component';

describe('ProfileSpinboxComponent', () => {
  let component: ProfileSpinboxComponent;
  let fixture: ComponentFixture<ProfileSpinboxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfileSpinboxComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfileSpinboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
