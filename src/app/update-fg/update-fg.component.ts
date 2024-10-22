import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FamilyGroup } from '../Model/FamilyGroup.model';
import { FormsModule } from '@angular/forms';
import { CommonModule, DatePipe } from '@angular/common';

@Component({
  selector: 'app-update-fg',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule
  ],
  templateUrl: './update-fg.component.html',
  styleUrl: './update-fg.component.css'
})
export class UpdateFGComponent {

  constructor(){
  }

  @Input()
  ajout!:boolean;
  @Input()
  FamilyGroupUpdated : FamilyGroup = new FamilyGroup('', new Date());
  @Output()
  FgUpdated = new EventEmitter<FamilyGroup>();

  saveFG(){
    this.FgUpdated.emit(this.FamilyGroupUpdated);
    }
    

}
