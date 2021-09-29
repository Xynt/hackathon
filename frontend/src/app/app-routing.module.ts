import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {SkillsComponent} from "./skills/skills.component";
import {PersonsComponent} from "./persons/persons.component";
import {ConfigComponent} from "./config/config.component";
import {ResultComponent} from "./result/result.component";

const routes: Routes = [
  { path: 'skills', component: SkillsComponent, data: {animation: 'skills'} },
  { path: 'persons', component: PersonsComponent, data: {animation: 'persons'} },
  { path: 'config', component: ConfigComponent, data: {animation: 'config'} },
  { path: 'result', component: ResultComponent, data: {animation: 'result'} },
  { path: '', redirectTo: '/skills', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
