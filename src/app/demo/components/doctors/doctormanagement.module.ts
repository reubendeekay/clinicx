import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DoctormanagementRoutingModule } from './doctormanagement-routing.module';
import { DoctormanagementComponent } from './doctormanagement.component';
import { StyleClassModule } from 'primeng/styleclass';
import { DividerModule } from 'primeng/divider';
import { ChartModule } from 'primeng/chart';
import { PanelModule } from 'primeng/panel';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';
import { ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { HttpClientModule } from '@angular/common/http';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { MessageModule } from 'primeng/message';
import { MessagesModule } from 'primeng/messages';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
@NgModule({
    imports: [
        CommonModule,
        DoctormanagementRoutingModule,
        DividerModule,
        StyleClassModule,
        ChartModule,
        PanelModule,
        ButtonModule,
        CardModule,
        TableModule,
        ReactiveFormsModule,
        InputTextModule,
        HttpClientModule,
        DialogModule,
        DropdownModule,
        MessagesModule,
        MessageModule,
        ConfirmDialogModule,
        ToastModule,
    ],
    declarations: [DoctormanagementComponent],
    providers: [MessageService, ConfirmationService],
})
export class DoctormanagementModule {}