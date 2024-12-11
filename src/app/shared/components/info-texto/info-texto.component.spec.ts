import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoTextoComponent } from './info-texto.component';

describe('InfoTextoComponent', () => {
  let component: InfoTextoComponent;
  let fixture: ComponentFixture<InfoTextoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InfoTextoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InfoTextoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
