import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PhysicianComponent } from './physician/physician.component';
import { DepartmentComponent } from './department/department.component';
import { MajorDiagnosisComponent } from './major-diagnosis/major-diagnosis.component';
import { SurgicalDurationComponent } from './surgical-duration/surgical-duration.component';
import { PhysicianCapacityComponent } from './physician-capacity/physician-capacity.component';
import { PriorityComponent } from './priority/priority.component';
// import { NewRequestComponent } from './new-request/new-request.component';
// import { RequestListComponent } from './request-list/request-list.component';

const routes: Routes = [
  { path: 'department', component: DepartmentComponent, pathMatch: 'full' },
  { path: 'department/:id', component: PhysicianComponent, pathMatch: 'full' },
  { path: 'majordiagnosis/:id', component: MajorDiagnosisComponent, pathMatch: 'full' },
  { path: 'surgicalduration/:id', component: SurgicalDurationComponent, pathMatch: 'full' },
  { path: 'capacity/:id', component: PhysicianCapacityComponent, pathMatch: 'full' },
  { path: 'priority/:id', component: PriorityComponent, pathMatch: 'full' },
  // { path: 'new-request', component: NewRequestComponent },
  // { path: 'requestlist', component: RequestListComponent },
  { path: '', redirectTo: '/department', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
