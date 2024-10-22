import { Component, OnInit } from '@angular/core';
import { Car } from '../Model/Car.model';
import { FormsModule } from '@angular/forms';
import { FamilyGroup } from '../Model/FamilyGroup.model';
import { CarServiceService } from '../Services/car-service.service';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { Image } from '../Model/Image.model';

@Component({
  selector: 'app-update-car',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './update-car.component.html',
  styleUrl: './update-car.component.css',
})
export class UpdateCarComponent implements OnInit {
  newCar!: Car;

  FGs!: FamilyGroup[];

  FG_ID!: number;

  myImage!: string;
  uploadedImage!: File;
  isImageUpdated: Boolean = false;

  constructor(
    private carService: CarServiceService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    this.carService.getCarById(id).subscribe(
      (response) => {
        console.table(response);
        this.newCar = response;
      },
      (error) => {
        confirm(error);
      }
    );

    this.carService.getAllFGs().subscribe(
      (response) => {
        console.table(response);
        this.FGs = response;
      },
      (error) => {
        confirm(error);
      }
    );
  }

  UpdateCar() {
    let x = this.FGs.find((familyGroup) => familyGroup.id == this.FG_ID);
    if (x != undefined) {
      this.newCar.familyGroup = x;
    }
    this.carService.UpdateCar(this.newCar).subscribe(
      (response) => {
        console.log(response);
        this.router.navigate(['/']);
      },
      (error) => {
        console.log(error);
      }
    );
  }
  onImageUpload(event: any) {
    if (event.target.files && event.target.files.length) {
      this.uploadedImage = event.target.files[0];
      this.isImageUpdated = true;
      const reader = new FileReader();
      reader.readAsDataURL(this.uploadedImage);
      reader.onload = () => {
        this.myImage = reader.result as string;
      };
    }
  }
  onAddImageCar() {
    this.carService
      .uploadImageCar(
        this.uploadedImage,
        this.uploadedImage.name,
        this.newCar.carID
      )
      .subscribe((img: Image) => {
        this.newCar.images.push(img);
      });
  }
  supprimerImage(img: Image) {
    let conf = confirm('Etes-vous sûr ?');
    if (conf)
      this.carService.supprimerImage(img.idImage).subscribe(() => {
        const index = this.newCar.images.indexOf(img, 0);
        if (index > -1) {
          this.newCar.images.splice(index, 1);
        }
      });
  }
}
