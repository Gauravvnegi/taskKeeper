
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

export interface Task {
  id: number;
  priority: string;
  description: string;
  important: boolean;
  editing?: boolean;
  // status?: 'active' | 'inactive' | 'deleted';
  title: string;
  dueDate?:Date;
  deleted?:true | false;
}
@Injectable({
  providedIn: 'root'
})
export class UserAuthService {

  commonTasksSubject = new BehaviorSubject<Task[]>([]);

  private loginUrl = 'https://dummyjson.com/auth/login';
  isLogged = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient) {}

  isUserLogged(){
    return this.isLogged.value; 
  }
  
  login(username: string, password: string): Observable<Object> {
    const body = {
      username: username,
      password: password,
    };
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(this.loginUrl, body, { headers: headers });
  }
  filterTasksByPriority(searchTerm: string): Task[] {
    const tasks = this.commonTasksSubject.getValue();
    return tasks.filter(task => task.priority.toLowerCase().includes(searchTerm.toLowerCase()));
  }
}
