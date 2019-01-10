import { Component, OnInit } from '@angular/core';

import { DialogService } from '../../services/dialog.service';

@Component({
  selector: 'app-snackbar',
  templateUrl: 'snackbar.component.html',
  styleUrls: ['snackbar.component.scss']
})

export class SnackbarComponent implements OnInit {
  showBar: boolean;
  shouldLeave: boolean = false;
  timeout = 3000;
  timer1;
  timer2;
  text: string;
  theme: string;
  manual: boolean;
  options: any;

  constructor(private dialogService: DialogService) { 
    dialogService.snackOptions.subscribe(val => {
      if ('text' in val) {
        const { text, manual, theme, timeout } = val;
        this.manual = manual;
        this.text = text;
        this.theme = theme;
        this.timeout = timeout;
      }
    });
  }

  ngOnInit() {

    this.dialogService.showSnackbar.subscribe(val => {
      this.showBar = val;
     
      if (this.showBar && !this.manual) {
        clearTimeout(this.timer1);
        this.timer1 = setTimeout(() => {
          this.startLeave();
        }, this.timeout);
      }
    });

    
  }

  startLeave() {
    clearTimeout(this.timer2);
    this.dialogService.showSnackbar.next(false);
    this.shouldLeave = true;
    this.timer2 = setTimeout(() => this.shouldLeave = false, 1000);
  }

  onDismiss() {
    this.startLeave();
  }
}