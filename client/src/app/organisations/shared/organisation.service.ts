import { Injectable } from '@angular/core';
import { DatabaseService } from '../../core/database/database.service';
import { Organisation } from './organisation.model';
import {
  DynamicForm,
  DynamicFormField,
  DropdownFormField,
  InputFormField,
  TextAreaFormField
} from '../../dynamic-forms/shared/dynamic-form.model';
import { DynamicFormService } from '../../dynamic-forms/shared/dynamic-form.service';

@Injectable({
  providedIn: 'root'
})
export class OrganisationService implements DynamicForm {

  private readonly path = 'organisations'; // collection path

  constructor(
    private databaseService: DatabaseService<Organisation>, // database service
    private dynamicFormService: DynamicFormService
  ) { }

  insertOrganisation(organisation: Organisation) {
    return this.databaseService.insert(this.path, organisation);
  }

  updateOrganisation(id, organisation: Organisation) {
    return this.databaseService.update(this.path, id, organisation);
  }

  getOrganisation(id) {
    return this.databaseService.get(this.path, id);
  }

  listOrganisations() {
    return this.databaseService.list(this.path);
  }

  deleteOrganisation(id) {
    return this.databaseService.delete(this.path, id);
  }

  async getDynamicFormFields(organisation?: Organisation): Promise<DynamicFormField<any>[]> {
    return this.dynamicFormService.getUsersSelectOptions().then(usersSelectOptions => {
      return [
        new InputFormField({
          order: 1,
          width: 50,
          label: 'Namn',
          key: 'name',
          value: organisation ? organisation.name : '',
        }),
        new DropdownFormField({
          order: 2,
          width: 50,
          label: 'Ledare',
          key: 'leader',
          value: organisation ? organisation.leader : '',
          selectOptions: usersSelectOptions,
        }),
        new TextAreaFormField({
          order: 3,
          label: 'Beskrivning',
          key: 'description',
          value: organisation ? organisation.description : '',
        }),
      ];
    });
  }
}
