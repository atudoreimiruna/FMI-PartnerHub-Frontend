export interface StudentJob {
    id : number;
    title : string;
    type: TypeJobEnum;
    partnerName: string;
    salary: string;
    minExperience: number;
    maxExperience: number;
    address : string;
}

export enum TypeJobEnum {
    FullTime = 0,
    PartTime = 1,
    Internship = 2
}