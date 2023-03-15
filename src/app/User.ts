export interface Roles {
    guest: boolean;
    client: boolean;
    menager: boolean;
    admin: boolean;
    banned: boolean;
  }
  
  export class User {
    email: string;
    role: Roles;
    uid: string;
  
    constructor(userData: any) {
      this.email = userData.email;
      this.uid = userData.uid;
      if (userData.roles != null) {
        this.role = userData.roles;
      } else
        this.role = {
          client: true,
          guest: true,
          menager: false,
          admin: false,
          banned: false,
        };
    }
  }