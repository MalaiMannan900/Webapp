export class LoginMaster {
    code: any;
    id: any;
    success: any;
    message: any;
    otp: any;
    empid: string;
    password: string;
   
    constructor(empid: string, password: string) {
        this.empid = empid;
        this.password = password;
       

    }

}
