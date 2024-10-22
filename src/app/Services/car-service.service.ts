import { Injectable } from '@angular/core';
import { Car } from '../Model/Car.model';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FamilyGroup } from '../Model/FamilyGroup.model';
import { Image } from '../Model/Image.model';
import { AuthService } from './auth-service.service';

@Injectable({
  providedIn: 'root',
})
export class CarServiceService {
  Url = 'http://127.0.0.1:8080/Cars/api';

  constructor(private http: HttpClient, private authService: AuthService) {}

  private createAuthorizationHeader(): HttpHeaders {
    this.authService.loadToken();
    let jwt = this.authService.getToken();
    jwt = 'Bearer ' + jwt;
    return new HttpHeaders({ Authorization: jwt });
  }

  getAllCars(): Observable<Car[]> {
    let httpHeaders = this.createAuthorizationHeader();
    return this.http.get<Car[]>(this.Url, { headers: httpHeaders });
  }

  getCarById(id: number): Observable<Car> {
    let httpHeaders = this.createAuthorizationHeader();
    return this.http.get<Car>(`${this.Url}/${id}`, { headers: httpHeaders });
  }

  getCarsByFG(id: number): Observable<Car[]> {
    let httpHeaders = this.createAuthorizationHeader();
    return this.http.get<Car[]>(`${this.Url}/FamilyGroup/${id}`, {
      headers: httpHeaders,
    });
  }

  getAllFGs(): Observable<FamilyGroup[]> {
    let httpHeaders = this.createAuthorizationHeader();
    return this.http.get<FamilyGroup[]>(this.Url + '/FamilyGroups', {
      headers: httpHeaders,
    });
  }

  deleteCar(id: number): Observable<any> {
    let httpHeaders = this.createAuthorizationHeader();
    return this.http.delete(`${this.Url}/${id}`, { headers: httpHeaders });
  }

  UpdateCar(Carx: Car): Observable<any> {
    let httpHeaders = this.createAuthorizationHeader();
    return this.http.put(this.Url, Carx, { headers: httpHeaders });
  }

  AddCar(Carx: Car): Observable<any> {
    let httpHeaders = this.createAuthorizationHeader();
    return this.http.post<any>(this.Url, Carx, { headers: httpHeaders });
  }

  AddFG(FGx: FamilyGroup): Observable<any> {
    let httpHeaders = this.createAuthorizationHeader();
    return this.http.post<any>(this.Url + '/FamilyGroups', FGx, {
      headers: httpHeaders,
    });
  }

  //Image Service

  uploadImage(file: File, filename: string): Observable<Image> {
    let httpHeaders = this.createAuthorizationHeader();
    const imageFormData = new FormData();
    imageFormData.append('image', file, filename);
    const url = `${this.Url + '/image/upload'}`;
    return this.http.post<Image>(url, imageFormData, { headers: httpHeaders });
  }

  loadImage(id: number): Observable<Image> {
    let httpHeaders = this.createAuthorizationHeader();
    const url = `${this.Url + '/image/get/info'}/${id}`;
    return this.http.get<Image>(url, { headers: httpHeaders });
  }

  uploadImageCar(
    file: File,
    filename: string,
    idCar?: number
  ): Observable<any> {
    let httpHeaders = this.createAuthorizationHeader();
    const imageFormData = new FormData();
    imageFormData.append('image', file, filename);
    const url = `${this.Url + '/image/uploadImageCar'}/${idCar}`;
    return this.http.post(url, imageFormData, { headers: httpHeaders });
  }
  supprimerImage(id: number) {
    let httpHeaders = this.createAuthorizationHeader();
    const url = `${this.Url}/image/delete/${id}`;
    return this.http.delete(url, { headers: httpHeaders });
  }

  uploadImageFS(file: File, filename: string, idCar?: number): Observable<any> {
    if (idCar == null) {
        throw new Error('Car ID must be provided.');
    }

    let httpHeaders = this.createAuthorizationHeader();
    const imageFormData = new FormData();
    imageFormData.append('image', file, filename);

    const url = `${this.Url + '/image/uploadFS'}/${idCar}`;
    return this.http.post(url, imageFormData, { headers: httpHeaders });
}

}
