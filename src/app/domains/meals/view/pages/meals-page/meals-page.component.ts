import {Component, inject, OnInit, Signal} from '@angular/core';
import {MealsStore} from "../../../data-access/store/meals.store";
import {SearchBarComponent} from "../../../../../shared/components/search-bar/search-bar.component";
import {MatButton} from "@angular/material/button";
import {MealsListComponent} from "../../components/meals-list/meals-list.component";
import {Meal} from "../../../../../api/model/meal";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-meals-page',
  imports: [
    MatButton,
    SearchBarComponent,
    MealsListComponent
  ],
  templateUrl: './meals-page.component.html',
  styleUrl: './meals-page.component.scss'
})
export class MealsPageComponent implements OnInit {
  private readonly store = inject(MealsStore);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);

  protected readonly $meals: Signal<Meal[]> = this.store.$viewList;

  ngOnInit() {
    this.store.loadAll();
  }

  onCreate() {
    this.router.navigate(['create'], {relativeTo: this.route});
  }

  onSearch(query: string) {
    this.store.filters.search.setFilter(query);
    this.store.forceSignalReload();
  }
}
