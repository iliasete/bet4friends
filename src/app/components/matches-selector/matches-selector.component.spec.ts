import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MatchesSelectorComponent } from './matches-selector.component';

describe('MatchesSelectorComponent', () => {
  let component: MatchesSelectorComponent;
  let fixture: ComponentFixture<MatchesSelectorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MatchesSelectorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MatchesSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
