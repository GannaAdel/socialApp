export interface user{
     email:string ;
     password:string

}
export interface userToken{
     token: null| string
     isError:boolean
    
}
// type Gender = "male" | "female";
export interface userRegister extends user{
     name:string,
     rePassword:string,
     dateOfBirth:string,
     gender:'male'|'female'|''

}
export interface ChangePass{
     password:string,
     newPassword:string
}
