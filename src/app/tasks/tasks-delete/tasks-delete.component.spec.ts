import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TasksDeleteComponent } from './tasks-delete.component';

describe('TasksDeleteComponent', () => {
  let component: TasksDeleteComponent;
  let fixture: ComponentFixture<TasksDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TasksDeleteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TasksDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
