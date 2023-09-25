export interface StudentJobView {
    studentId : number;
    jobId : string;
    jobStatus: StudentJobStatusEnum;
    jobRating: StudentJobRatingEnum;
}

export enum StudentJobStatusEnum {
    Favorite = 1,
    Application = 2
}

export enum StudentJobRatingEnum {
    NotInterested = 1,
    SlightlyNotInterested = 2,
    Neutral = 3,
    SomewhatInterested = 4,
    VeryInterested = 5
}