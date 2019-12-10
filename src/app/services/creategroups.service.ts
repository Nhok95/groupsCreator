import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class CreategroupsService {

  /*groupObject = {groupName: "Grupo", groupSize: 2, members: [1,2,4,5,6,7,8,9,11,12]};*/
  groupName: string = undefined;
  groupSize: number = undefined;
  members: string[] = [];

  result = new Map();

  constructor() { }

  setNombre(name: string) {
    //this.groupObject.groupName = name;
    this.groupName = name;
  }

  setTamanyo(size: number) {
    //this.groupObject.groupSize = size;
    this.groupSize = size;
  }

  setMembers(members: any[]) {
    for(let m of members) {
      //this.groupObject.members.push(m.nombre);
      this.members.push(m.nombre);
    }
  }

  shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  generate():Map<string, string[]> {
    let groupsNumber = Math.floor(this.members.length /this.groupSize);

    var groupID = [];

    for (let i = 0; i < this.members.length; i++) {
        groupID.push(i % groupsNumber);
    }

    groupID = this.shuffle(groupID);
    
    for (let i = 0; i < groupsNumber; i++) {
        this.result.set(this.groupName + "_" + i, []);

    }

    for (let j = 0; j < groupID.length; j++) {
        var groupmembers = this.result.get(this.groupName+ "_"+ groupID[j]);
        groupmembers.push(this.members[j]);
        this.result.set(this.groupName+ "_"+ groupID[j], groupmembers);

    }

    return this.result;
  }

  /*generate():Map<string, string[]> {
    let groupsNumber = Math.floor(this.groupObject.members.length /this.groupObject.groupSize);

    var groupID = [];

    for (let i = 0; i < this.groupObject.members.length; i++) {
        groupID.push(i % groupsNumber);
    }

    groupID = this.shuffle(groupID);
    
    for (let i = 0; i < groupsNumber; i++) {
        this.result.set(this.groupObject.groupName + "_" + i, []);

    }

    for (let j = 0; j < groupID.length; j++) {
        var groupmembers = this.result.get(this.groupObject.groupName+ "_"+ groupID[j]);
        groupmembers.push(this.groupObject.members[j]);
        this.result.set(this.groupObject.groupName+ "_"+ groupID[j], groupmembers);

    }

    return this.result;
  }*/
  
}
