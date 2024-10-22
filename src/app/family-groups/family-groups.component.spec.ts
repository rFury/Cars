import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FamilyGroupsComponent } from './family-groups.component';

describe('FamilyGroupsComponent', () => {
  let component: FamilyGroupsComponent;
  let fixture: ComponentFixture<FamilyGroupsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FamilyGroupsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FamilyGroupsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
