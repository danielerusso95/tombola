import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { IndexComponent } from './index/index.component';
import { TabelloneComponent } from './tabellone/tabellone.component';
import { PlayerSetGuard } from './utils/utils.guards';

const routes: Routes = [
  { path: '', component: IndexComponent },
  { path: 'tabellone', component: TabelloneComponent, canActivate:[PlayerSetGuard] },
];
@NgModule({
  imports: [CommonModule, RouterModule.forRoot(routes)],
  exports: [RouterModule],
  declarations: [],
})
export class RoutingModule {}
