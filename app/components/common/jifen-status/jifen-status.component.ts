import { Component, Input } from '@angular/core';

@Component({
  selector: 'jifen-status',
  templateUrl: 'jifen-status.component.html',
  styleUrls: ['jifen-status.component.scss']
})

export class JifenStatusComponent {
  @Input() jifen: number;
  @Input() pos: string;

  curStatus;
 
  statusList = [
    {name: '财神再现', jifen: 1000000},
    {name: '富可敌国', jifen: 500000},
    {name: '富甲一方', jifen: 250000},
    {name: '挥金如土', jifen: 100000},
    {name: '腰缠万贯', jifen: 30000},
    {name: '一掷千金', jifen: 15000},
    {name: '穿金戴银', jifen: 3000},
    {name: '衣食无忧', jifen: 1000},
    {name: '无名之辈', jifen: 0},
  ];

  onMouseover(status) {
    this.curStatus = status;
  }

  onMouseleave() {
    this.curStatus = null;
  }
}