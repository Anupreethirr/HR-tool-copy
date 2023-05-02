import {Component,OnInit,ViewEncapsulation} from '@angular/core';
import {TreeNode} from 'primeng/api';
import {MessageService} from 'primeng/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
    providers: [MessageService],
    styleUrls: ['./app.component.scss']
})
export class AppComponent { 
   
}
