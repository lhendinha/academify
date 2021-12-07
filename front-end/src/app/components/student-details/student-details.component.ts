import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/internal/Subscription';
import { Student } from 'src/app/models/student.model';
import { StudentService } from 'src/app/services/student.service';
import {FormControl} from '@angular/forms';
import { Location } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';

@Component({
  selector: 'app-student-details',
  templateUrl: './student-details.component.html',
  styleUrls: ['./student-details.component.css'],
})
export class StudentDetailsComponent implements OnInit {

  student?: Student = undefined;
  private routeSub: Subscription = new Subscription();
  isLoading: boolean = false;
  error: any = null;

  date = new Date();
  serializedDate = new FormControl(null);


  constructor(private route: ActivatedRoute,
    private studentService : StudentService,
    private _location: Location,
    private _snackBar: MatSnackBar
    ) { }

  ngOnInit(): void {
    this.routeSub = this.route.params.subscribe(params => {
      this.getStudentById(params['id']);
    });
  }

  ngOnDestroy() {
    this.routeSub.unsubscribe();
  }

  getStudentById(id: number): void {
    this.isLoading = true;

    this.studentService.getById(id)
      .subscribe({
        next: (data) => {
          this.student = data;

          const newDate = new Date(data.nascimento ?? new Date());

          this.setDateForm(newDate);
        },
        error: (e) => {
          this.error = e;
          this._snackBar.open("Error getting student !", "Ok");
        },
      }).add(() => {
        this.isLoading = false;
      });
  }

  onClickCancel(): void {
    this._location.back();
  }

  setDateForm(newDate: Date): void {
    this.date = newDate;
    this.serializedDate = new FormControl(newDate.toISOString());
  }

  onClickUpdate(): void {
    this.isLoading = false;

    if (this.student) {
      this.studentService.update(this.student)
      .subscribe({
        next: (data) => {
          this._snackBar.open("Student has been updated successfully !", "Ok");
        },
        error: (e) => {
          this.error = e;
          this._snackBar.open("Error updating student !", "Ok");
        },
      }).add(() => {
        if (this.error == null) {
          this.onClickCancel();
        } else {
          this.isLoading = true;
        }
      });
    }
  }

  onChangeForm(type: keyof Student, event: Event): void {
    const input = event.target as HTMLInputElement;

    if (this.student) {
      this.student = {
        ...this.student,
        [type]: input.value
      }
    }
  }

  onChangeFormDate(event: MatDatepickerInputEvent<Date>): void {
    if (this.student && event.value) {
      this.student = {
        ...this.student,
        nascimento: event.value.toLocaleDateString("en-US")
      }
    }
  }
}
