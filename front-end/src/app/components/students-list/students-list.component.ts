import { Component, OnInit } from '@angular/core';
import { Student } from 'src/app/models/student.model';
import {MatDialog} from '@angular/material/dialog';

import {StudentService} from '../../services/student.service'
import { ConfirmDeleteStudentComponent } from '../confirm-delete-student/confirm-delete-student.component';

@Component({
  selector: 'app-students-list',
  templateUrl: './students-list.component.html',
  styleUrls: ['./students-list.component.css']
})
export class StudentsListComponent implements OnInit {
  displayedColumns: string[] = ['id', 'dataHoraCadastro', 'matricula', 'nascimento', 'nome', 'actions'];

  dataSource: Student[] = [];
  error: any = null;
  isLoading: boolean = false;

  constructor(private studentService : StudentService, public dialog: MatDialog) {
    this.getStudents();
  }

  getStudents(): void {
    this.isLoading = true;

    this.studentService.getAll()
      .subscribe({
        next: (data) => {
          this.dataSource = data;
        },
        error: (e) => this.error = e,
      }).add(() => {
        this.isLoading = false;
      });
  }

  openDialog(student: Student): void {
    const dialogRef = this.dialog.open(ConfirmDeleteStudentComponent, {
      width: '30rem',
      data: student
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getStudents();
    });
  }

  ngOnInit(): void {
  }
}
