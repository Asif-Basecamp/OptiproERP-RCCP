import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BOMGridViewComponent } from './bom-grid-view.component';

describe('BOMGridViewComponent', () => {
  let component: BOMGridViewComponent;
  let fixture: ComponentFixture<BOMGridViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BOMGridViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BOMGridViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
