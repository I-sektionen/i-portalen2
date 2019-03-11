import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, of } from 'rxjs/index';
import { OrganisationService } from '../../organisations/shared/organisation.service';
import { UserService } from '../../users/shared/user.service';
import { HeroService } from '../../home/hero/shared/hero.service';

@Component({
  selector: 'app-collections-list',
  templateUrl: './collections-list.component.html',
  styleUrls: ['./collections-list.component.scss']
})
export class CollectionsListComponent implements OnInit {

  collections = [
    {path: 'users'},
    {path: 'organisations'},
    {path: 'hero'}
  ];

  collection: string;
  dataSource: Observable<any[]>;
  displayedColumns: string[];
  itemToEdit: any;

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private organisationService: OrganisationService,
    private heroService: HeroService
  ) { }

  ngOnInit() {
    this.collection = this.route.snapshot.params.collection;
    switch (this.collection) {
      case 'users': {
        this.dataSource = this.userService.listUsers();
        this.displayedColumns = ['liuId', 'name', 'role'];
        break;
      }
      case 'organisations': {
        this.dataSource = this.organisationService.listOrganisations();
        this.displayedColumns = ['name', 'editItem', 'deleteItem'];
        break;
      }
      case 'hero': {
        this.dataSource = this.heroService.listHeros();
        this.displayedColumns = ['name', 'editItem', 'deleteItem'];
        break;
      }
      default: {
        this.dataSource = of(this.collections);
        this.displayedColumns = ['path', 'editCollection', 'add'];
      }
    }
  }

}
