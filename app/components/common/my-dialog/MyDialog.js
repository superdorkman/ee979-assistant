import React from "react";
import { Container } from "./MyDialog.styled";

function SectionHeader(props) {
  const { darkTitle, hasBorder, callback, link, more, target, title } = props;
  const more_flag = more !== undefined;
  return (
    <Container>
      <div class="wrapper" [class.show]="show">
        <h2>
          <span class="title">新增出货</span>
          <span class="qufu">{{ filter.gameCn }}/{{ filter.areaName }}/{{ filter.serverName }}</span>
        </h2>
        <div class="form-wrap" [class.center]="!formItems">
          <app-loading *ngIf="!formItems"></app-loading>
          <form (ngSubmit)="onSubmit()" [formGroup]="form" *ngIf="formItems">
            <elastic-form [formItems]="formItems"></elastic-form>
            <div class="btn-group">
              <app-button width="120" height="40" text="保存" class="save"></app-button>
              <app-button width="120" height="40" theme="gray" (click)="dismiss()" text="取消"></app-button>
            </div>
          </form>
        </div>
      </div>
    </Container>
  );
}

export default SectionHeader;