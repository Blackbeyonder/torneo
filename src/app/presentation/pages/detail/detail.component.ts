import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { ApiResponse } from 'src/app/models/apiResponse';
import { Torneo } from 'src/app/models/torneo';
import { DetailService } from 'src/app/services/detail.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent {
  category: string = "";
  id: number = 0;
  info: Torneo = new Torneo();
  participantes:string[]=[];

  constructor(private route: ActivatedRoute, private detailService: DetailService, private router1: Router) { }

  ngOnInit(): void {
    // Obtener el parámetro 'category' directamente usando snapshot
    this.category = this.route.snapshot.paramMap.get('category') || 'defaultCategory';
    this.id = Number(this.route.snapshot.paramMap.get('id')) || 0;
    if (this.category != "defaultCategory" && this.id != 0) {
      this.getInfo();

    }
  }

  async getInfo() {
    let newCategoty: string = ""
    if (this.category == "pelea") {
      newCategoty = "torneopelea";
    }

    if (this.category == "rts") {
      newCategoty = "torneorts";
    }

    try {
      let response: ApiResponse<Torneo> = await lastValueFrom(this.detailService.getDetail(newCategoty, this.id));
      
      if (response.message && response.message == "success") {
        this.info = response.data;
        this.participantes = this.info && this.info.participantes ? this.info.participantes.split(',').map(item => item.trim()):[];
        

      }

      if(response.error=="Torneo no encontrado"){
        this.router1.navigate(['/']);
      }

    } catch (error) {
      console.log(error);


    }


  }



}
