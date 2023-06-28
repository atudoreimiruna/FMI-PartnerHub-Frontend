import { StudentJobDetails } from "./studentJobDetails";
import { StudentJobView } from "./studentJobView";

export interface Job {
    id : number;
    title : string;
    minSalary : number;
    maxSalary : number;
    address : string;
    experience: JobExperienceEnum;
    type: TypeJobEnum;
    description : string;
    criteria: string;
    skills: string;
    partnerLogo : string;
    partnerName : string;
    activated : boolean;
    lastUpdated : string;
    createdAt : string;
    salary: string;
    minExperience: number;
    maxExperience: number;
    jobStudents: StudentJobDetails[]
}

export enum JobExperienceEnum {
    Entry = 0,
    Middle = 1,
    Senior = 2
}

export enum TypeJobEnum {
    FullTime = 0,
    PartTime = 1,
    Internship = 2
}