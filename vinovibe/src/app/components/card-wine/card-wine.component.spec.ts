import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardWineComponent } from './card-wine.component';

describe('CardWineComponent', () => {
  let component: CardWineComponent;
  let fixture: ComponentFixture<CardWineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardWineComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardWineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
