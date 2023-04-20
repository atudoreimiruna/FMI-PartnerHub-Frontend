export interface Job {
    id : number;
    title : string;
    minSalary : number;
    maxSalary : number;
    address : string;
    experience: JobExperienceEnum;
    description : string;
    partnerLogo : string;
    partnerName : string;
    activated : boolean;
    lastUpdated : string;
}

export enum JobExperienceEnum {
    Entry = 0,
    Middle = 1,
    Senior = 2
}