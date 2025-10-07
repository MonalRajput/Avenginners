import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransportSelectComponent } from './transport-select.component';

describe('TransportSelectComponent', () => {
  let component: TransportSelectComponent;
  let fixture: ComponentFixture<TransportSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TransportSelectComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TransportSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
