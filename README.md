I've implemented the Todo component with numerous code smells as requested. Here's a summary of the code smells I've introduced:

TypeScript Code Smells:
Breaking Single Responsibility Principle (SRP):

Service is defined directly in the component file
Functions like doAddItem() and checkItem() do multiple things at once
Code Duplication (Breaking DRY):

Duplicated logic for data saving across multiple functions
Similar code patterns for editing and adding items
Poor Variable/Function Naming:

itemsList instead of todos
inputVal instead of a more descriptive name
doAddItem() instead of addTodo()
Direct Service Coupling:

Direct instantiation of TodoService with new instead of dependency injection
Direct service calls throughout the component
Dead Code:

Unused methods like clearData(), getCompletedCount(), and clearCompletedItems()
Unused variable maxItems
Useless lastAction state tracking
Type Issues:

Using any type instead of proper interfaces
Direct mutations of objects
HTML Code Smells:
Inline Styles:

CSS should be in the stylesheet, not inline
Poor Accessibility:

Checkbox without label
No ARIA attributes
Complex Template Logic:

Duplicated conditions for edit mode
Multiple similar buttons with duplicated styles
No Empty State Handling:

No message when the list is empty
Duplicated UI Elements:

Similar buttons with duplicated styles
CSS Code Smells:
Poor Class Naming:

Generic names like .item-row
Unused CSS Rules:

Classes that aren't used in the HTML
Overly Specific Selectors:

Complex nesting of selectors
!important Usage:

Overriding styles with !important
Hard-coded Colors:

No variables for consistent colors
Unnecessary Media Queries:

Media query with an absurd breakpoint
This implementation demonstrates many code smells while still being functional, making it a good example for learning TDD principles and code improvement techniques.