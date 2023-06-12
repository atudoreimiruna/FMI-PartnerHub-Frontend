import { Job } from "./job";
import { Partner } from "./partner";

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
    partners: Partner[]
}