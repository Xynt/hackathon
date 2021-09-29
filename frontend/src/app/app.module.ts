import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HttpClientModule} from "@angular/common/http";
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {SkillsComponent} from './skills/skills.component';
import {PersonsComponent} from './persons/persons.component';
import {ConfigComponent} from './config/config.component';
import {ResultComponent} from './result/result.component';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatTableModule} from "@angular/material/table";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {ExistsDirective} from './service/directive/exists.directive';
import {NotExistsDirective} from './service/directive/not-exists.directive';
import {PageNavigatorButtonsComponent} from './page-navigator-buttons/page-navigator-buttons.component';
import {MatToolbarModule} from "@angular/material/toolbar";
import {TableInputEntryComponent} from './table-input-entry/table-input-entry.component';

@NgModule({
  declarations: [
    AppComponent,
    SkillsComponent,
    PersonsComponent,
    ConfigComponent,
    ResultComponent,
    ExistsDirective,
    NotExistsDirective,
    PageNavigatorButtonsComponent,
    TableInputEntryComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    MatToolbarModule,
    FormsModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
