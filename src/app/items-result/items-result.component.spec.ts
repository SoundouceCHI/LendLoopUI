import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemsResultComponent } from './items-result.component';

describe('ItemsResultComponent', () => {
  let component: ItemsResultComponent;
  let fixture: ComponentFixture<ItemsResultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ItemsResultComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ItemsResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
