import { Component, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormControl } from '@angular/forms';

interface LearningEntry {
  date: string;
  items: string[];
}

@Component({
  selector: 'learning-root', // <-- updated selector to match index.html
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './learning-tracker.html',
  styleUrls: ['./learning-tracker.css'] // <-- Add this line
})
export class LearningTrackerComponent {
  private storageKey = 'learningEntries';

  // Reactive form controls for date and entry text
  selectedDate = new FormControl(new Date().toISOString().substring(0, 10));
  entryText = new FormControl('');

  // Signal-based storage of entries
  private _entries = signal<LearningEntry[]>(this.loadEntries());

  // All entries across all dates
  allEntries = computed(() => this._entries());

  // Entries filtered by selected date
  entriesByDate = computed(() =>
    this._entries().find((e) => e.date === this.selectedDate.value)?.items || []
  );

  // Add entry to the selected date
  addEntry() {
    const date = this.selectedDate.value;
    const text = this.entryText.value?.trim();
    if (!text || !date) return;

    const existing = this._entries().find((e) => e.date === date);
    if (existing) {
      existing.items.push(text);
    } else {
      this._entries.update((prev) => [...prev, { date, items: [text] }]);
    }

    this.entryText.setValue('');
    this.saveEntries();
  }

  // Load entries from localStorage
  private loadEntries(): LearningEntry[] {
    try {
      const data = localStorage.getItem(this.storageKey);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  }

  // Save entries to localStorage
  private saveEntries() {
    localStorage.setItem(this.storageKey, JSON.stringify(this._entries()));
  }
}
