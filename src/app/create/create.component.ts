import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Task, UserAuthService } from '../services/user-auth.service';


@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss'],
})
export class CreateComponent implements OnInit {
  taskForm: FormGroup;
  editTaskForm: FormGroup;
  flag: boolean = false;
  tasks: Task[] = [];
  delTaskCount:number=0;
  cntTaskCount:number=0;
  constructor(private formBuilder: FormBuilder, public userAuthService: UserAuthService) {}

  ngOnInit(): void {
    this.taskForm = this.formBuilder.group({
      title: ['', Validators.required],
      priority: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      description: ['', Validators.required],
      dueDate: [''],
      important: [false],
    });

    this.editTaskForm = this.formBuilder.group({
      editTitle: ['', Validators.required],
      editPriority: ['', Validators.required],
      editDescription: ['', Validators.required],
      editDueDate: [''],
      editImportant: [false],
    });

    this.userAuthService.commonTasksSubject.subscribe((tasks: Task[]) => {
      this.tasks = tasks.filter((task) => !task.deleted);
    });
  }

  onSubmit(): void {
    this.flag = true;
    if (this.taskForm.invalid) {
      return;
    }

    const newTask: Task = {
      id: this.generateRandomId(),
      title: this.taskForm.value.title,
      priority: this.taskForm.value.priority,
      description: this.taskForm.value.description,
      important: this.taskForm.value.important,
      dueDate: this.taskForm.value.dueDate ? new Date(this.taskForm.value.dueDate) : undefined,
      deleted: false,
    };
    this.cntTaskCount++;
    this.userAuthService.commonTasksSubject.next([...this.tasks, newTask]);
    this.taskForm.reset();
   
  }

  generateRandomId(): number {
    return Math.floor(Math.random() * 1000000);
  }

  editTask(task: Task): void {
    this.flag = true;
    task.editing = !task.editing;
    if (task.editing) {
      this.editTaskForm.patchValue({
        editTitle: task.title,
        editPriority: task.priority,
        editDescription: task.description,
        editDueDate: task.dueDate ? task.dueDate.toISOString().substring(0, 10) : null,
        editImportant: task.important,
      });
    }
  }

  onEditSubmit(task: Task): void {
    this.flag = true;
    if (this.editTaskForm.invalid) {
      return;
    }
    task.title = this.editTaskForm.value.editTitle;
    task.priority = this.editTaskForm.value.editPriority;
    task.description = this.editTaskForm.value.editDescription;
    task.dueDate = this.editTaskForm.value.editDueDate ? new Date(this.editTaskForm.value.editDueDate) : undefined;
    task.important = this.editTaskForm.value.editImportant;

    task.editing = false;
    localStorage.setItem('tasks', JSON.stringify(this.tasks));
    this.editTaskForm.reset();
  }

  deleteTask(taskId: number, task: Task): void {
    // task.status = 'deleted';
    this.cntTaskCount--;
    if(this.cntTaskCount==0){

      this.flag = false;
    }
    task.deleted = true;
    const deletedTask = this.tasks.find(task => task.id === taskId);
    const restTasks = this.tasks.filter(task => task.id !== taskId);
    deletedTask.deleted = true;
    this.userAuthService.commonTasksSubject.next( [deletedTask, ...restTasks]);
  }
}
