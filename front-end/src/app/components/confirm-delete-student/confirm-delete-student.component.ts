import { Component, OnInit, Inject } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Student } from 'src/app/models/student.model';
import { StudentService } from 'src/app/services/student.service';
import { StudentsListComponent } from '../students-list/students-list.component';

@Component({
  selector: 'app-confirm-delete-student',
  templateUrl: './confirm-delete-student.component.html',
  styleUrls: ['./confirm-delete-student.component.css']
})
export class ConfirmDeleteStudentComponent implements OnInit {

  error: any = null;

  constructor(
    public dialogRef: MatDialogRef<StudentsListComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Student,
    private studentService : StudentService,
    private _snackBar: MatSnackBar
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {
  }

  dismissModal(): void {
    this.dialogRef.close();
  }

  onClickDelete(student: Student): void {
    this.studentService.delete(student)
      .subscribe({
        next: (data) => {
          this._snackBar.open("Student has been deleted successfully !", "Ok");
        },
        error: (e) => {
          this.error = e;
          this._snackBar.open("Error deleting student !", "Ok");
        },
      }).add(() => {
        this.dialogRef.close();
      });
  }
}
