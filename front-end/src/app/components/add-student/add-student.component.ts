import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/internal/Subscription';
import { Student } from 'src/app/models/student.model';
import { StudentService } from 'src/app/services/student.service';
import {FormControl} from '@angular/forms';
import { Location } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { toISOFormat } from 'src/app/helpers/func';

@Component({
  selector: 'app-add-student',
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.css']
})
export class AddStudentComponent implements OnInit {

  student: Student = new Student();
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
    }

    onClickCancel(): void {
      this._location.back();
    }

    setDateForm(newDate: Date): void {
      this.date = newDate;
      this.serializedDate = new FormControl(newDate.toISOString());
    }

    onClickCreate(): void {
      this.isLoading = false;

      if (this.student) {
        this.student.id = Math.random();
        this.student.dataHoraCadastro = toISOFormat(new Date());
        this.studentService.create(this.student)
        .subscribe({
          next: (data) => {
            this._snackBar.open("Student has been created successfully !", "Ok");
          },
          error: (e) => {
            this.error = e;
            this._snackBar.open("Error creating student !", "Ok");
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

    onChangeFormDate(event: MatDatepickerInputEvent<Date>): void {
      if (this.student && event.value) {
        this.student = {
          ...this.student,
          nascimento: event.value.toLocaleDateString("en-US")
        }
      }
    }
}
