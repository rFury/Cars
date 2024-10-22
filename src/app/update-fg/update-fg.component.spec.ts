import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateFGComponent } from './update-fg.component';

describe('UpdateFGComponent', () => {
  let component: UpdateFGComponent;
  let fixture: ComponentFixture<UpdateFGComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateFGComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UpdateFGComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
