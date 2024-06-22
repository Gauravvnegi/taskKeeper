import { Component, OnInit } from '@angular/core';
import { Task, UserAuthService } from '../services/user-auth.service';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.scss']
})
export class DeleteComponent implements OnInit {

  deletedTasks: Task[] = [];

  constructor(private userAuthService: UserAuthService) { }

  ngOnInit(): void {
    this.userAuthService.commonTasksSubject.subscribe(deletedTasks => {
      this.deletedTasks = deletedTasks.filter(task => task.deleted === true);
    });
  }
  
  restoreTask(restoreTask: Task): void {
    const currentTasks = this.userAuthService.commonTasksSubject.value;
    restoreTask.deleted = false;
    const restTasks = currentTasks.filter(task => task.id !== restoreTask.id);
    this.userAuthService.commonTasksSubject.next( [restoreTask, ...restTasks]);
  }
  // deletePermanently(task: Task): void {
  //   task.status = 'deleted';
  //   task.deleted =true;
  //   console.log(task)
    
  // }
  deletePermanently(task: Task): void {
    const currentTasks = this.userAuthService.commonTasksSubject.value;
    const filteredTasks = currentTasks.filter(t => t.id !== task.id);
    this.userAuthService.commonTasksSubject.next(filteredTasks);
  }
}
  

