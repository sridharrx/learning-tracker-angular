import { bootstrapApplication } from '@angular/platform-browser';
import { LearningTrackerComponent } from './app/learning-tracker/learning-tracker.component';

bootstrapApplication(LearningTrackerComponent).catch((err) =>
  console.error(err)
);
