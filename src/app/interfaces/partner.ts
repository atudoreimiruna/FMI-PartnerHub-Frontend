import { Job } from "./job";

export interface Partner {
    id : number;
    name : string;
    description : string;
    address : string;
    contact : string;
    mainImageUrl : string;
    logoImageUrl: string;
    jobs: Job[];
}