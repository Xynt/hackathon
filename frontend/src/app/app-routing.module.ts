import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {SkillsComponent} from "./skills/skills.component";
import {PersonsComponent} from "./persons/persons.component";
import {ConfigComponent} from "./config/config.component";
import {ResultComponent} from "./result/result.component";

const routes: Routes = [
  { path: 'skills', component: SkillsComponent },
  { path: 'persons', component: PersonsComponent },
  { path: 'config', component: ConfigComponent },
  { path: 'result', component: ResultComponent },
  { path: '', redirectTo: '/skills', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
