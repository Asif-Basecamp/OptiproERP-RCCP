import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BOMComponent } from './bom.component';

describe('BOMComponent', () => {
  let component: BOMComponent;
  let fixture: ComponentFixture<BOMComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BOMComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BOMComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
