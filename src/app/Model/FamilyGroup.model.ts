import { Car } from './Car.model';

export class FamilyGroup {
  id?: number;
  group_Name: string;
  dateOfCreation: Date;

  constructor(
    groupName: string,
    dateOfCreation: Date,
    id?: number
  ) {
    this.group_Name = groupName;
    this.dateOfCreation = dateOfCreation;
    if (id) {
      this.id = id;
    }
  }

  toString(): string {
    return `FamilyGroup { id=${this.id}, groupName='${this.group_Name}', dateOfCreation='${this.dateOfCreation}' }`;
  }
}
