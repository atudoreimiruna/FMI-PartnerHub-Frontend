import { Job } from "./job";

export interface Partner {
    id : number;
    name : string;
    mainDescription : string;
    description : string;
    address : string;
    email : string;
    phone : string;
    social : string;
    mainImageUrl : string;
    logoImageUrl: string;
    profileImageUrl: string;
    jobs: Job[];
}