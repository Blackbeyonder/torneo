import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Utils } from 'src/app/utils/Utils';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  constructor(private router: Router) { }

  goToPage(Where: string): void {
    if(Where=="login"){

      Utils.redirectTo(this.router, '/'+Where); // Redirige a "/new-page"
    }else{

      Utils.redirectTo(this.router, '/'+Where); // Redirige a "/new-page"

    }
  }

  
}
