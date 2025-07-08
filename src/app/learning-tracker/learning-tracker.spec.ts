import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LearningTracker } from './learning-tracker.component';

describe('LearningTracker', () => {
  let component: LearningTracker;
  let fixture: ComponentFixture<LearningTracker>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LearningTracker]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LearningTracker);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
