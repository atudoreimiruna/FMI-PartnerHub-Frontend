import { Student } from "./student";

export interface StudentTable {
    studentName: string;
    jobTitle: string;
    jobStatus: number;
    studentDetails: Student;
}
