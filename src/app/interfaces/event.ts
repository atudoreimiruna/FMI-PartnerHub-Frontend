import { Partner } from "./partner";

export interface Event {
    id : number;
    title : string;
    description : string;
    type : string;
    location : string;
    date : Date;
    time : string;
    lastUpdated : string;
    createdAt : string;
    partnerName: string;
    partner: Partner;
}