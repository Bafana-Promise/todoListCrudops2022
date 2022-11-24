import { Component, OnInit, AfterViewInit, Optional, ViewChild, Inject } from '@angular/core';
import { ApiService } from '../services/api.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DialogComponent } from '../dialog/dialog.component';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;
  @ViewChild(MatSort) sort: MatSort | undefined;
  // displayedColumns: string[] = ['id', 'name', 'progress', 'fruit', 'title', 'task', 'data', 'date'];
  // dataSource: MatTableDataSource<any> | any;

  displayedColumns: string[] = ['title', 'task', 'status', 'date', 'action'];
  dataSource = new MatTableDataSource([]);

  todoData: any = [];

  constructor(private api: ApiService, private dialog: MatDialog, @Optional() @Inject(MAT_DIALOG_DATA) public data: any, private snackbar: MatSnackBar,) { }

  ngOnInit(): void {
    this.getTodos()
  }

  getTodos() {
    this.api.getAllTodos('todos/getTodos').subscribe((res) => {
      this.todoData = res
      this.dataSource = res
      console.log('Result from backend :', this.todoData);
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  openDialog(action: string, dataSrc?: any, btn?: string) {
    let dataTitle = {
      title: action,
      data: dataSrc,
      btn: btn
    }
    this.dialog.open(DialogComponent, {
      width: '460px',
      disableClose: true,
      data: dataTitle
    }).afterClosed().subscribe(data => {
      if (data) {
        this.api.addTodos('todos/addTodos', data).subscribe((response) => {
          this.snackbar.open(response['msg'], 'Dismiss', {
            duration: 3000,
            panelClass: ['greenBackground', 'whiteColor'],
          });
          this.getTodos();
        }, err => {
          console.log(err || 'no resp')
        })
      };

    });
  }

  edit(action: string, dataSrc: any, btn: string) {
    console.log('dataSrc :', dataSrc)
    let dataTitle = {
      title: action,
      data: dataSrc,
      btn: btn
    }
    this.dialog.open(DialogComponent, {
      width: '460px',
      disableClose: true,
      data: dataTitle
    }).afterClosed().subscribe(res => {
      console.log("after close :", res)
      if (res) {
        this.api.editTodos('todos/editTodo' + `/${dataSrc['_id']}`, res).subscribe((response) => {
          console.log('response :', response)
          this.snackbar.open(response['msg'], 'Dismiss', {
            duration: 3000,
            panelClass: ['greenBackground', 'whiteColor'],
          });
          this.getTodos();
        }, err => {
          console.log(err || 'no resp')
        })
      };

    });
  }

  deleteTodo(deleteRow: any) {
    console.log('deleteRow :',deleteRow._id)
    this.api.deleteTodos('todos/deleteTodo/' + deleteRow._id).subscribe((res) =>{
      this.snackbar.open(res['msg'], 'Dismiss', {
        duration: 3000,
        panelClass: ['greenBackground', 'whiteColor'],
      });
      this.getTodos();
    }, err => {
      console.log(err || 'no resp')
    })
  }

}
