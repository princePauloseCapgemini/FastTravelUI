
type Address = {
    country:string
    state: string;
    city : string;
    district: string;
    pincode:string
  }
    export default interface User  {
      id: number;
      firstName : string;
      lastName:string;
      gender:string;
      userType:string;
      email: string;
      password: string;
      mobileNumber:string;
      age: number;
      lisenceNumber: string;
      vehicleNum:string
      address: Address
    }