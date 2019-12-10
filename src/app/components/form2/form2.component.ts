import { Component, OnInit } from '@angular/core';
import { CreategroupsService } from 'src/app/services/creategroups.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-form2',
  templateUrl: './form2.component.html',
  styleUrls: ['./form2.component.css']
})
export class Form2Component implements OnInit {

  members: any[] = [];
  newMember: string = "";
  cols: any[]; 

  draggedMember:any;

  constructor(private router: Router, private creategroupsService: CreategroupsService) { }

  ngOnInit() {
    this.cols = [{field: 'nombre', header: 'Nombre'}];
  }

  addMember() {
    if (this.newMember == "" ) {
      alert("Error: Escribe un nombre valido");
    } else {
      this.members.push({nombre: this.newMember});
      this.newMember = "";
    }
    
  }

  removeMember(mem) {
    this.members.splice(this.members.indexOf(mem),1);
  }

  shuffleGroups() {

    this.creategroupsService.setMembers(this.members);
    this.router.navigateByUrl('shuffleScreen');

  }

  dragStart(event, dgmem) {
    this.draggedMember = dgmem;
  }

  drop(event) {
    if(this.draggedMember) {
        let draggedMemberIndex = this.findIndex(this.draggedMember);
        this.members = [...this.members, this.draggedMember];
        this.members = this.members.filter((val,i) => i!=draggedMemberIndex);
        this.draggedMember = null;
    }
  }

  findIndex(dgmem) {
    let index = -1;
    for(let i = 0; i < this.members.length; i++) {
        if(dgmem.vin === this.members[i].vin) {
            index = i;
            break;
        }
    }
    return index;
}

}
