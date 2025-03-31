// src/app/employee/employee.model.ts
export interface Employee {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  password: string;
  department: string;
  role: string;
  hireDate: string;
  status: string;
}

export type EmployeeResponse = {
  message: string;
};
