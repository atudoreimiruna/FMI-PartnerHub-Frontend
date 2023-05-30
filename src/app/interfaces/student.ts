import { Job } from "./job";

export interface Student {
    id : number;
    name : string;
    description : string;
    personalEmail : string;
    email : string;
    phone : string;
    degree : string;
    skill : string;
    fileNames: string[];
    jobs: Job[]
}