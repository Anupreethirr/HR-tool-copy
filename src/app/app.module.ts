import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent }   from './app.component';
import {OrganizationChartModule} from 'primeng/organizationchart';
import {ToastModule} from 'primeng/toast';
import {PanelModule} from 'primeng/panel';
import { NavbarComponent } from './navbar/navbar.component';
import { ButtonModule } from 'primeng/button';
import { SidebarModule } from 'primeng/sidebar';
import { AppRoutingModule } from './app-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import {DropdownModule} from 'primeng/dropdown';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { DialogModule } from 'primeng/dialog';
import { TableModule } from 'primeng/table';
import { ProductListDemo } from './dashboard/productlistdemo';
import { TooltipModule } from 'primeng/tooltip';
import { AutoFocusModule } from 'primeng/autofocus';
import {ImageModule} from 'primeng/image';
import {ProgressSpinnerModule} from 'primeng/progressspinner';
import { ScrollToBottomDirective } from './dashboard/scroll-to-bottom.directive';
import { MultiSelectModule } from "primeng/multiselect";
@NgModule({
  imports: [
    
    BrowserModule,
    BrowserAnimationsModule,
    OrganizationChartModule,
    ToastModule,
    PanelModule,
    HttpClientModule,
    FormsModule,
    SidebarModule,
    ButtonModule,
    AppRoutingModule,
    DropdownModule,
    TableModule, 
    DialogModule,
    DynamicDialogModule,
    TooltipModule,
AutoFocusModule ,
ImageModule,
ProgressSpinnerModule,
MultiSelectModule,

      
  ],
  declarations: [ AppComponent, NavbarComponent, DashboardComponent,ProductListDemo,ScrollToBottomDirective ],
  bootstrap:    [ AppComponent ]
})

export class AppModule { }
