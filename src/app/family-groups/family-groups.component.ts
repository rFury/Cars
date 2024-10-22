import { Component, OnInit } from '@angular/core';
import { CarServiceService } from '../Services/car-service.service';
import { Router } from '@angular/router';
import { FamilyGroup } from '../Model/FamilyGroup.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UpdateFGComponent } from '../update-fg/update-fg.component';
import { AuthService } from '../Services/auth-service.service';

@Component({
  selector: 'app-family-groups',
  standalone: true,
  imports: [    
    FormsModule,
    CommonModule,
    UpdateFGComponent
  ],
  templateUrl: './family-groups.component.html',
  styleUrls: ['./family-groups.component.css']
})
export class FamilyGroupsComponent implements OnInit {

  ajout: boolean = true;
  FamilyGroupUpdated : FamilyGroup = new FamilyGroup('', new Date());
  FGs!: FamilyGroup[];
  Admin!: Boolean;
  Name!: string;
  connected!: Boolean;

  constructor(private carService: CarServiceService, private router: Router, private authService: AuthService) {}

  ngOnInit(): void {
    this.loadFGS();
    this.authService.loadToken();
    this.authService.decodeJWT();
    this.Admin = this.authService.isAdmin();
    console.log(this.Admin);
    this.Name = this.authService.loggedUser;
    this.connected = this.authService.isloggedIn;
  }

  loadFGS() {
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

  FgUpdated(FGx: FamilyGroup) {
    this.carService.AddFG(FGx).subscribe(
      (response) => {
        console.log(response);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  updateFG(FG: FamilyGroup) {
    console.log(FG);
    this.FamilyGroupUpdated = FG;
    this.ajout = false;
  }
}