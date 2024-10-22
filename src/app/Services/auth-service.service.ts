import { HttpClient ,HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { User } from '../Model/User.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private helper = new JwtHelperService();

  apiURL: string = 'http://127.0.0.1:8081/Api';
  token!: string;

  public loggedUser!: string;
  public isloggedIn: Boolean = false;
  public roles!: string[];

  constructor(private router: Router, private http: HttpClient) {}

  private createAuthorizationHeader(): HttpHeaders {
    this.loadToken();
    let jwt = this.getToken();
    jwt = "Bearer " + jwt;
    return new HttpHeaders({ "Authorization": jwt });
  }

  registerUser(user :User){
    return this.http.post<User>(this.apiURL+'/register', user);
  }
    

  login(user: User) {
    const params = {
      username: user.username,
      password: user.password,
    };
    return this.http.post<User>(this.apiURL + '/login', params, {
      observe: 'response',
    });
  }

  saveToken(jwt: string) {
    localStorage.setItem('jwt', jwt);
    this.token = jwt;
    this.isloggedIn = true;
    this.decodeJWT();
  }

  getToken(): string {
    return this.token;
  }

  decodeJWT() {
    if (this.token == undefined) return;
    const decodedToken = this.helper.decodeToken(this.token);
    this.roles = decodedToken.roles;
    this.loggedUser = decodedToken.sub;
    this.isloggedIn = true;
  }

  isAdmin(): Boolean {
    if (!this.roles)
      //this.roles== undefiened
      return false;
    return this.roles.indexOf('ADMIN') > -1;
  }

  logout() {
    this.loggedUser = undefined!;
    this.roles = undefined!;
    this.token = undefined!;
    this.isloggedIn = false;
    localStorage.removeItem('jwt');
    this.router.navigate(['/Login']);
  }

  setLoggedUserFromLocalStorage(login: string) {
    this.loggedUser = login;
    this.isloggedIn = true;
  }

  loadToken() {
    if (typeof window !== 'undefined') {
      this.token = localStorage.getItem('jwt')!;
    }
  }

  isTokenExpired(): Boolean {
    return this.helper.isTokenExpired(this.token);
  }

  /*getUserRoles(username: string) {
    this.users.forEach((curUser) => {
      if (curUser.username == username) {
        this.roles = curUser.roles;
      }
    });
  }*/
    public regitredUser : User = new User();
    setRegistredUser(user : User){
    this.regitredUser=user;
    }
    getRegistredUser(){
    return this.regitredUser;
    }
    validateEmail(code : string){
      return this.http.get<User>(this.apiURL+'/verifyEmail/'+code);
      }
}
