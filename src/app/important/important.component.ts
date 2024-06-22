import { Component, OnInit } from '@angular/core';
import { Task, UserAuthService } from '../services/user-auth.service';

@Component({
  selector: 'app-important',
  templateUrl: './important.component.html',
  styleUrls: ['./important.component.scss']
})
export class ImportantComponent implements OnInit {
  importantTasks: Task[] = [];

  constructor(private userAuthService: UserAuthService) { }

  ngOnInit(): void {
    this.userAuthService.commonTasksSubject.subscribe(tasks => {
      console.log("received tasks");
     
      const data = tasks.filter(task => task.important === true && task.deleted===false );
      this.importantTasks = data;
      // debugger;
       console.log(data)
      // localStorage.setItem('importantTasks', JSON.stringify(this.importantTasks));
    });
  }
}
