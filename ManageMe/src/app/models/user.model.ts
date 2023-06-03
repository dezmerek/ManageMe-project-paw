export interface User {
    login: string;
    password: string;
    firstName: string;
    lastName: string;
    role: 'admin' | 'devops' | 'developer';
}
