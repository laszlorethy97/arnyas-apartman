import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MagyarComponent } from './magyar.component';

describe('MagyarComponent', () => {
  let component: MagyarComponent;
  let fixture: ComponentFixture<MagyarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MagyarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MagyarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
