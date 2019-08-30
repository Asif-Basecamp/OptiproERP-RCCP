import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WarehouseCodeLookupComponent } from './warehouse-code-lookup.component';

describe('WarehouseCodeLookupComponent', () => {
  let component: WarehouseCodeLookupComponent;
  let fixture: ComponentFixture<WarehouseCodeLookupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WarehouseCodeLookupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WarehouseCodeLookupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
