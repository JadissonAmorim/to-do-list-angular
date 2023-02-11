import { Component, DoCheck, OnInit } from '@angular/core';
import { TaskList } from '../../model/task-list';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements DoCheck {

  public TaskList: Array<TaskList> = JSON.parse(localStorage.getItem("list")|| '[]');

  constructor() { }

  ngDoCheck(): void {
    this.setLocalStore();
  }


  public deleteItemTaskList(event: number){
    this.TaskList.splice(event, 1);
  }

  public deleteAllTaskList(){
    const confirm = window.confirm("Você deseja realmente deletar tudo?");

    if (confirm){
    this.TaskList = [];
    }
  }

  public addTaskList(event: string){
    this.TaskList.push({task: event, checked: false})
  }

  public validationInput(event: string, index: number){
    console.log(event);
    if (!event){
      const confirm = window.confirm("Task encontra-se vazia, deseja deletar?")
      if(confirm){
        this.deleteItemTaskList(index);
      }
    }
  }

  public setLocalStore(){
    if(this.TaskList){
      this.TaskList.sort((first, last) => Number(first.checked) - Number(last.checked));
      localStorage.setItem("list", JSON.stringify(this.TaskList));
      }
  }

}
