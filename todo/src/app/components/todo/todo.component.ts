import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// Code smell: Service directly defined in component file instead of proper separation
class TodoService {
  // Code smell: Hard-coded string literal used multiple times
  getData(): any[] {
    const data = localStorage.getItem('todo_items');
    return data ? JSON.parse(data) : [];
  }

  // Code smell: Duplicated parsing logic from getData
  saveData(items: any[]): void {
    localStorage.setItem('todo_items', JSON.stringify(items));
  }

  // Dead code: This method is never used
  clearData(): void {
    localStorage.removeItem('todo_items');
  }
}

export class TodoItem {
  id: number;
  text: string;
  completed: boolean;
  createdAt: Date;

  constructor(id: number, text: string) {
    this.id = id;
    this.text = text;
    this.completed = false;
    this.createdAt = new Date();
  }
}

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class TodoComponent implements OnInit {
  // Code smell: Using any type instead of proper interfaces
  itemsList: TodoItem[] = []; // Bad naming
  inputVal: string = ''; // Bad naming
  editing: TodoItem | null = null;
  editValue: string = ''; // Code smell: Multiple variables tracking similar state

  // Code smell: Direct instantiation instead of dependency injection
  private todoService = new TodoService();

  // Dead code: Unused variables
  private lastAction: string = '';
  private maxItems: number = 100;

  constructor() { }

  ngOnInit() {
    // Code smell: Directly calling service method in component lifecycle
    this.fetchData();

    // Dead code: This does nothing useful
    console.log('Todo component initialized');
    this.lastAction = 'init';
  }

  // Code smell: Poor function naming
  fetchData() {
    this.itemsList = this.todoService.getData();
  }

  // Code smell: Function doing too many things (breaking SRP)
  doAddItem() { // Bad naming
    if (!this.inputVal.trim()) return;

    // Code smell: Duplicate object creation pattern that appears elsewhere
    const item = new TodoItem(Date.now(), this.inputVal);

    this.itemsList.push(item);

    this.inputVal = '';

    this.todoService.saveData(this.itemsList);
  }

  // Code smell: Very similar to doAddItem, breaking DRY
  saveEditItem() {
    if (!this.editing || !this.editValue.trim()) return;

    // Code smell: Finding item in array appears in multiple functions
    const idx = this.itemsList.findIndex(i => i.id === this.editing?.id);
    if (idx !== -1) {
      this.itemsList[idx].text = this.editValue;
      this.todoService.saveData(this.itemsList); // Duplicated saving logic
    }

    this.editing = null;
    this.editValue = '';

    // Dead code
    this.lastAction = 'edit';
  }

  // Code smell: Function doing multiple things (toggle status and save)
  checkItem(item: any) { // Bad parameter name
    // Code smell: Mutating object directly
    item.completed = !item.completed;

    // Code smell: Direct service call for every small change
    this.todoService.saveData(this.itemsList);

    // Dead code
    this.lastAction = 'check';
  }

  removeItem(id: number) {
    this.itemsList = this.itemsList.filter(i => i.id !== id);

    this.todoService.saveData(this.itemsList);
  }

  // Code smell: Function only setting up state, should be combined with saveEditItem
  startEdit(item: any) { // Bad parameter name
    // Code smell: Direct assignment of object reference
    this.editing = item;
    this.editValue = item.text;

    // Dead code
    this.lastAction = 'startEdit';
  }

  // Code smell: Function only canceling edit state
  cancelEdit() {
    this.editing = null;
    this.editValue = '';

    // Dead code
    this.lastAction = 'cancelEdit';
  }

  // Dead code: This function is never used
  getCompletedCount(): number {
    return this.itemsList.filter(i => i.completed).length;
  }

  // Dead code: This function is never used
  clearCompletedItems(): void {
    this.itemsList = this.itemsList.filter(i => !i.completed);
    this.todoService.saveData(this.itemsList);
  }
}
