import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AdminRoutingModule} from './admin-routing.module';
import {AdminComponent} from './admin.component';
import {SharedModule} from '../../shared/shared.module';
import {CoreModule} from '../../core/core.module';
import {TextEditComponent} from './text-edit/text-edit.component';
import {
  MatButtonModule,
  MatCardModule,
  MatDividerModule,
  MatExpansionModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatTableModule
} from '@angular/material';
import {ReactiveFormsModule} from '@angular/forms';
import {MarkdownToHtmlModule} from 'markdown-to-html-pipe';
import {FlexLayoutModule} from '@angular/flex-layout';
import {CollectionsListComponent} from './collections-list/collections-list.component';
import {OrganisationsModule} from '../organisations/organisations.module';
import {CollectionsTableComponent} from './collections-table/collections-table.component';
import {CollectionsUpsertComponent} from './collections-upsert/collections-upsert.component';
import {SponsorsModule} from '../sponsors/sponsors.module';
import {AppRoutingModule} from "../../app-routing.module";
import {UpsertTagComponent} from './utilities/upsert-tag/upsert-tag.component';
import {DynamicFormsModule} from '../../shared/dynamic-forms/dynamic-forms.module';
import {ColorPickerModule} from 'ngx-color-picker';

@NgModule({
  declarations: [
    AdminComponent,
    TextEditComponent,
    CollectionsListComponent,
    CollectionsTableComponent,
    CollectionsUpsertComponent,
    UpsertTagComponent
  ],
  exports: [],
  providers: [],
  imports: [
    // Angular
    CommonModule,
    ReactiveFormsModule,
    FlexLayoutModule,

    // Custom
    AdminRoutingModule,
    SharedModule,
    CoreModule,
    OrganisationsModule,
    SponsorsModule,

    // Material
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatIconModule,
    MatExpansionModule,
    MatDividerModule,
    MatTableModule,
    MatButtonModule,

    // Other
    MarkdownToHtmlModule,
    AppRoutingModule,
    ColorPickerModule,
    DynamicFormsModule
  ]
})
export class AdminModule { }
