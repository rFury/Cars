import { Component, OnInit } from '@angular/core';
import { Car } from '../Model/Car.model';
import { FormsModule } from '@angular/forms';
import { FamilyGroup } from '../Model/FamilyGroup.model';
import { CarServiceService } from '../Services/car-service.service';
import { response } from 'express';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../Services/auth-service.service';
import { Image } from '../Model/Image.model';

@Component({
  selector: 'app-add-car',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
  ],
  templateUrl: './add-car.component.html',
  styleUrl: './add-car.component.css'
})
export class AddCarComponent implements OnInit {
  
  newCar: Car = { carID: 0, carModel: '', carBrand: '', price: 0, familyGroup: { id: 0, group_Name: '', dateOfCreation: new Date()  } ,images:[],imageStr:'',imagePath:''};
  uploadedImage!: File;
  imagePath: any;


  FGs !: FamilyGroup[];

  FG_ID !: number;
  

  constructor(private carService: CarServiceService, private router: Router){
  }

  ngOnInit(): void {
    this.carService.getAllFGs().subscribe(
      (response)=>{
        console.table(response);
        this.FGs = response;
      },
      (error)=>{
        confirm(error);
      }
    );
  }


  addCar(){
    let x = this.FGs.find(familyGroup => familyGroup.id == this.FG_ID)
    if( x != undefined ){
      this.newCar.familyGroup = x;
    }
    this.carService.AddCar(this.newCar).subscribe(
      (response)=>{
        console.log(response);
        this.carService.uploadImageFS(this.uploadedImage,
          this.uploadedImage.name,response.carID)
          .subscribe((response: any) => {
            console.log(response);
          },(error)=>{
            console.log(error);
          }
          );
        this.router.navigate(['/']);
      },
      (error)=>{
        console.log(error);
      }
    )
  }
  onImageUpload(event: any) {
    this.uploadedImage = event.target.files[0];
    var reader = new FileReader();
    reader.readAsDataURL(this.uploadedImage);
    reader.onload = (_event) => { this.imagePath = reader.result; }
    }
    

}
