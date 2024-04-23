import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProduccionformComponent } from './produccionform.component';

describe('ProduccionformComponent', () => {
  let component: ProduccionformComponent;
  let fixture: ComponentFixture<ProduccionformComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProduccionformComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProduccionformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
