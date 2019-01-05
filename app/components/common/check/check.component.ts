import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-check',
  templateUrl: 'check.component.html',
  styleUrls: ['check.component.scss']
})

export class CheckComponent {
  
  @Input() canCheck;
  @Input() valid;
  @Input() errMsg1: string;
  @Input() errMsg2: string;
  @Input() errMsg3: string;

}