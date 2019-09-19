import {Injectable} from "@angular/core";
import {Task} from "../model/task";

@Injectable()
export class TaskService {
	// private taskUrl = 'api/tasks';

	// constructor(private http: HttpClient) {}

	// get(): Promise<Task[]>{
    //     return Promise.resolve([
    //         {id: 1, text: "Task #1", start_date: "2017-04-15 00:00", duration: 3, progress: 0.6},
    //         {id: 2, text: "Task #2", start_date: "2017-04-18 00:00", duration: 3, progress: 0.4}
    //     ]);
    // }
	
	// insert(task: Task): Promise<Task> {
	// 	return this.http.post(this.taskUrl, task)
	// 		.toPromise()
	// 		.catch(HandleError);
	// }

	// update(task: Task): Promise<void> {
	// 	return this.http
	// 		.put(`${this.taskUrl}/${task.id}`, task)
	// 		.toPromise()
	// 		.catch(HandleError);
	// }

	// remove(id: number): Promise<void> {
	// 	return this.http.delete(`${this.taskUrl}/${id}`)
	// 		.toPromise()
	// 		.catch(HandleError);
	// }
    get(): Promise<Task[]>{
        return Promise.resolve([
            // {id: 1, text: "Project #1", start_date: "15:18 15-09-2019", description:"demo", duration:3, progress: 1, parent: "", open:true, type:'project'},
            {id: 1, text: "Project #1", start_date: "15:18 15-09-2019", description:"demo", duration:3, progress: 1, parent: "", open:true, type:'task'},
			// {id: 2, text: "Task #1-1", start_date: "09:18 15-09-2019", description:"demo", duration:3, progress: 0.45, parent: "1", open:true, type:'task' },
			// {id: 3, text: "Task #1-2", start_date: "10:54 16-09-2019", description:"demo", duration:3, progress: 0.45, parent: "1", open:true, type:'task'},
			// {id: 4, text:"Project #2", start_date:"17:29 17-09-2019", description:"demo", duration:2, progress:1, parent: "", open: true, type:'project'},
			{id: 4, text:"Project #2", start_date:"17:29 17-09-2019", description:"demo", duration:2, progress:1, parent: "", open: true, type:'task'},
        	// {id: 5, text:"Task #2-1", start_date:"15:29 17-09-2019", description:"demo", duration:8, progress:0.6, parent:"4", open: true, type:'task' },
			// {id: 6, text:"Task #2-2", start_date:"11:17 18-09-2019", description:"demo", duration:8, progress:0.6, parent:"4", open: true, type:'task'}
        ]);
    }
}