import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { DialogService } from '../../../../services/dialog.service';
import { TakeoverService } from '../../services/takeover.service';

@Component({
  selector: 'best-ratio',
  templateUrl: 'best-ratio.component.html',
  styleUrls: ['best-ratio.component.scss']
})

export class BestRatioComponent {
  @Input() data: any;
  @Input() form: FormGroup;

  fc;
  again;
  pattern;

  canCheck;
  subscription;

  constructor(
    private dialogService: DialogService,
    private takeoverService: TakeoverService,
  ) {
    this.subscription = takeoverService.canCheck.subscribe(val => {
      this.canCheck = val;
    });
  }

  ngOnInit() {
    this.pattern = new RegExp(this.data.pattern);
    this.fc = this.form.get(this.data.key);
  }

  check() {
    this.takeoverService.hasError = this.again !== this.fc.value;
  }

  getBest() {
    if (!this.data.bValue) {
      return this.dialogService.openSnack('此区暂无收货信息，无法为您提供最佳比例');
    }

    this.form.patchValue({
      [this.data.key]: this.data.bValue
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}