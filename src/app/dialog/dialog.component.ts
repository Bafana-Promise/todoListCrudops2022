import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Data } from '@angular/router';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {
  todoForm: FormGroup | any;
  todoEditForm: FormGroup | any;

  status: any = [
    "Done",
    "Pending",
    "Not Done"
  ];

  header: string = '';
  btnString: string = '';
  res: any = {};

  constructor(private formBuilder: FormBuilder, @Inject(MAT_DIALOG_DATA) private data: Data) {
    this.createAddForm()
    // this.createEditForm()
  }
  ngOnInit(): void {
    if(this.data){
      this.header = this.data['title']
      this.btnString = this.data['btn']
      console.log('Data :', this.data['data'])
      this.todoForm.patchValue(this.data['data'])
    }

  }

  createAddForm() {
    this.todoForm = this.formBuilder.group({
      title: [''],
      task: [''],
      status: [''],
    });
    return this.todoForm;
  }

  // createEditForm() {
  //   this.todoEditForm = this.formBuilder.group({
  //     title: [''],
  //     task: [''],
  //     status: [''],
  //     _id: [this.data['data']._id]
  //   });
  //   return this.todoForm;
  // }

}
