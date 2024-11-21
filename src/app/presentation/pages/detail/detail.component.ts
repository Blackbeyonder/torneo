import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent {
  category: string="";
  id: string="";
  constructor(private route: ActivatedRoute){}

  ngOnInit(): void {
    // Obtener el parámetro 'category' directamente usando snapshot
    this.category = this.route.snapshot.paramMap.get('category') || 'defaultCategory';
    this.id = this.route.snapshot.paramMap.get('id') || 'defaultId';
    console.log('recibida:', this.category, this.id);
  }

  redirectTo(Where:string){
    
  }

}
