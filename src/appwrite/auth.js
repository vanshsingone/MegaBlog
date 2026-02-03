 import conf from "../conf/conf";

 import { Client, Account, ID } from "appwrite";

 export class AuthService {
    client  = new Client();
    account;
    
    constructor(){
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);
        this.account = new Account(this.client);

    }

    async createAccount({email,password,name}){
        try {
            const UserAccount = await this.account.create({
        userId: ID.unique(),
        email: email,
        password: password,
        name: name,
    });
            if(UserAccount){
                //call another method
                return this.login({email,password});
            }
            else{
                return UserAccount;
            }
        } catch (error) {
            throw error;
        }
    }

    async login({email,password}){
        try {
           return  await this.account.createEmailPasswordSession({
            email: email,
            password: password
})
        } catch (error) {
            throw error;
        }
    }

    async getCurrentUser() {
    try {
        // You MUST return the result of the account.get() call
        return await this.account.get();
    } catch (error) {
        // This catches the 401 "Unauthorized" error if no one is logged in
        console.log("Appwrite service :: getCurrentUser :: error", error);
    }

    // This only runs if the 'try' block fails
    return null;
}

    async logout(){
        try {
            await this.account.deleteSessions();
        } catch (error) {
            console.log("Appwrite service :: logout :: error", error);
        }
    }
    
 }

 const authService = new AuthService();

 export default authService;