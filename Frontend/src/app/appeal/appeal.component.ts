import { Component, OnInit, signal } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router'; // Import Router

type Employee = {
  id: number;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  department: string;
  position: string;
  salary: number;
  hireDate: string; // Alternatively, you could use Date if you convert it.
  status: 'ACTIVE' | 'INACTIVE'; // Assuming these are the only two statuses.
};

@Component({
  selector: 'app-appeal',
  templateUrl: './appeal.component.html',
  imports: [ReactiveFormsModule, CommonModule],
  styleUrls: ['./appeal.component.css'],
})
export class AppealComponent implements OnInit {
  appealForm: FormGroup;
  appeals: any[] = []; // Stores fetched appeals

  userName = signal<string | null>(null);

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {
    const empJson = localStorage.getItem('employee');
    if (empJson) {
      try {
        const emp: Employee = JSON.parse(empJson);
        this.userName.set(`${emp?.firstName} ${emp.lastName}`);
      } catch (error) {
        console.error('Error parsing employee data:', error);
      }
    } else {
      console.log('No employee data found in localStorage.');
    }
    // Inject Router
    this.appealForm = this.fb.group({
      name: [this.userName(), Validators.required],
      description: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.fetchAppeals(); // Load appeals when the component initializes

    // let employee: Employee =
    //   (JSON.parse(emp)) ?? null;
    // if (employee !== null) {
    //   this.userName.set(`${employee?.firstName} ${employee.lastName}`);
    // }
  }

  logout(): void {
    // Navigate to the login page
    localStorage.removeItem('employee');
    this.router.navigate(['/employee-login']);
  }

  submitAppeal() {
    if (this.appealForm.valid) {
      const appealData = {
        name: this.appealForm.value.name,
        description: this.appealForm.value.description,
      };

      const userString = localStorage.getItem('employee');
      const employee = userString ? JSON.parse(userString) : null;
      const employeeId = employee?.id;

      this.http
        .post(
          `http://localhost:8080/api/appeals/submit?employeeId=${employeeId}`,
          appealData
        )
        .subscribe(
          (response) => {
            console.log('Appeal Submitted:', response); // ✅ Log response
            alert('Appeal submitted successfully!');
            this.appealForm.reset();
            this.fetchAppeals(); // ✅ Refresh the list of appeals
          },
          (error) => {
            console.error('Error submitting appeal', error);
          }
        );
    }
  }

  fetchAppeals() {
    const userString = localStorage.getItem('employee');
    const employee = userString ? JSON.parse(userString) : null;
    const employeeId = employee?.id;

    if (employeeId) {
      this.http
        .get<any[]>(`http://localhost:8080/api/appeals/employee/${employeeId}`)
        .subscribe(
          (data) => {
            this.appeals = data;
            console.log('Fetched Appeals for current employee:', this.appeals);
          },
          (error) => console.error('Error fetching employee appeals:', error)
        );
    }
  }
}
