import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicalFitComponent } from './medical-fit.component';

describe('MedicalFitComponent', () => {
  let component: MedicalFitComponent;
  let fixture: ComponentFixture<MedicalFitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MedicalFitComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MedicalFitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
