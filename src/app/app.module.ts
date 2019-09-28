import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { StoreModule } from '@ngrx/store';


import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AppRoutingModule } from './app-routing.module';
import { HeaderComponent } from './components/header/header.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { ListCrudComponent } from './components/list-crud/list-crud.component';
// import { reducers, initialState } from './reducers';
import { CounterComponent } from './counter/counter.component';
import { ListerComponent } from './lister/lister.component';
// import { listReducers, initialState } from './lister/lister';
import { EffectsModule } from '@ngrx/effects';
import { EffectsClass } from './effects';
import { ServiceClass, PhysicianService, MajorDiagnosisService, IndicationService, SurgicalDurationService, DayService, CapacityService, PriorityService } from './service-calls';
// import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { PhysicianComponent } from './physician/physician.component';
import { DepartmentComponent } from './department/department.component';
import { MajorDiagnosisComponent } from './major-diagnosis/major-diagnosis.component';
import { DepartmentEffects } from './department/department.effects';
import { appStateReducer, initialState as initialAppState, metaReducers } from './app.state';
import { PhysicianEffects } from './physician/physician.effects';
import {
  StoreRouterConnectingModule,
  RouterStateSerializer,
} from '@ngrx/router-store';
import { CustomRouterStateSerializer } from './shared/utils';
import { MajorDiagnosisEffects } from './major-diagnosis/major-diagnosis.effects';
import { SurgicalDurationComponent } from './surgical-duration/surgical-duration.component';
import { SurgicalDurationEffects } from './surgical-duration/surgical-duration.effects';
import { PhysicianCapacityComponent } from './physician-capacity/physician-capacity.component';
import { PhysicianCapacityEffects } from './physician-capacity/physician-capacity.effects';
import { PriorityComponent } from './priority/priority.component';
import { PriorityEffects } from './priority/priority.effects';


@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    HeaderComponent,
    SidebarComponent,
    ListCrudComponent,
    CounterComponent,
    ListerComponent,
    PhysicianComponent,
    DepartmentComponent,
    MajorDiagnosisComponent,
    SurgicalDurationComponent,
    PhysicianCapacityComponent,
    PriorityComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    // StoreModule.forRoot(reducers, {initialState})
    StoreModule.forRoot(appStateReducer, {initialState: initialAppState, metaReducers }),
    StoreRouterConnectingModule,
    EffectsModule.forRoot(
      [
        DepartmentEffects,
        PhysicianEffects,
        MajorDiagnosisEffects,
        SurgicalDurationEffects,
        PhysicianCapacityEffects,
        PriorityEffects
      ]),
    // EffectsModule.forRoot([PhysicianEffects]),
    // HttpModule
    HttpClientModule
  ],
  providers: [
    ServiceClass,
    PhysicianService,
    MajorDiagnosisService,
    IndicationService,
    SurgicalDurationService,
    DayService,
    CapacityService,
    PriorityService,
    {
      provide: RouterStateSerializer,
      useClass: CustomRouterStateSerializer
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
