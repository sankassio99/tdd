/* tslint:disable:no-unused-variable */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TodoComponent } from './todo.component';

describe('TodoComponent', () => {
  let component: TodoComponent;
  let fixture: ComponentFixture<TodoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TodoComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(TodoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  beforeEach(() => {
    localStorage.clear(); // Clear localStorage before each test
    fixture = TestBed.createComponent(TodoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should add item when click on add button', () => {
    // Arrange
    const title = 'New Todo Item';

    const addButton = fixture.nativeElement.querySelector('[test-id="add-button"]');

    const input = fixture.nativeElement.querySelector('input[type="text"]');

    // Act
    input.value = title;
    input.dispatchEvent(new Event('input'));

    addButton.click();

    // Assert
    expect(component.itemsList.length).toBe(1);
    expect(component.itemsList[0].text).toBe(title);
  })
});
