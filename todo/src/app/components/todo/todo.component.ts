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

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class TodoComponent implements OnInit {
  // Code smell: Using any type instead of proper interfaces
  itemsList: any[] = []; // Bad naming
  inputVal: string = ''; // Bad naming
  editing: any = null;
  editValue: string = ''; // Code smell: Multiple variables tracking similar state

  // Code smell: Direct instantiation instead of dependency injection
  private todoSrv = new TodoService();

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
    this.itemsList = this.todoSrv.getData();
  }

  // Code smell: Function doing too many things (breaking SRP)
  doAddItem() { // Bad naming
    if (!this.inputVal.trim()) return;

    // Code smell: Duplicate object creation pattern that appears elsewhere
    this.itemsList.push({
      id: Date.now(), // Poor practice: Using timestamp as ID
      text: this.inputVal,
      completed: false,
      createdAt: new Date() // Unused property
    });

    this.inputVal = '';
    this.todoSrv.saveData(this.itemsList); // Direct service call

    // Dead code
    this.lastAction = 'add';
  }

  // Code smell: Very similar to doAddItem, breaking DRY
  saveEditItem() {
    if (!this.editing || !this.editValue.trim()) return;

    // Code smell: Finding item in array appears in multiple functions
    const idx = this.itemsList.findIndex(i => i.id === this.editing.id);
    if (idx !== -1) {
      this.itemsList[idx].text = this.editValue;
      this.todoSrv.saveData(this.itemsList); // Duplicated saving logic
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
    this.todoSrv.saveData(this.itemsList);

    // Dead code
    this.lastAction = 'check';
  }

  // Another function to remove an item
  removeItem(id: number) {
    // Code smell: Inefficient filtering operation
    this.itemsList = this.itemsList.filter(i => i.id !== id);

    // Code smell: Direct service call for every small change
    this.todoSrv.saveData(this.itemsList);

    // Dead code
    this.lastAction = 'remove';
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
    this.todoSrv.saveData(this.itemsList);
  }
}
