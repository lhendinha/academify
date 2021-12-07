import { Component, OnInit } from '@angular/core';
import { StudentService } from 'src/app/services/student.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {

  isLoading: boolean = false;
  error: any = null;
  totalStudents: number = 0;

  constructor(private studentService : StudentService) {
    this.getTotalStudents();
  }

  getTotalStudents(): void {
    this.isLoading = true;

    this.studentService.getTotal()
      .subscribe({
        next: (data) => {
          this.totalStudents = data;
        },
        error: (e) => this.error = e,
      }).add(() => {
        this.isLoading = false;
      });
  }

  ngOnInit(): void {
  }

}
