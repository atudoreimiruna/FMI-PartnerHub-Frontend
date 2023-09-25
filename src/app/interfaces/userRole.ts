export interface UserRole {
    email: string;
    role: RolesEnum;
}

export enum RolesEnum {
    SuperAdmin = 0,
    Admin = 1,
    User = 2
}