import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PredictionsWidgetComponent } from './predictions-widget.component';

describe('PredictionsWidgetComponent', () => {
  let component: PredictionsWidgetComponent;
  let fixture: ComponentFixture<PredictionsWidgetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PredictionsWidgetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PredictionsWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
