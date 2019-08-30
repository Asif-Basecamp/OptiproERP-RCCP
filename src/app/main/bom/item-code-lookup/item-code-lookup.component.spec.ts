import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemCodeLookupComponent } from './item-code-lookup.component';

describe('ItemCodeLookupComponent', () => {
  let component: ItemCodeLookupComponent;
  let fixture: ComponentFixture<ItemCodeLookupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItemCodeLookupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemCodeLookupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
