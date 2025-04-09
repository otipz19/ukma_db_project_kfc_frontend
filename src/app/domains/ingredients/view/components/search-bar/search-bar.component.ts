import {Component, inject} from '@angular/core';
import {MatFormField, MatInput, MatLabel, MatSuffix} from "@angular/material/input";
import {MatIcon} from "@angular/material/icon";
import {MatIconButton} from "@angular/material/button";
import {FormBuilder, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {IngredientsStore} from "../../../data-access/store/ingredients.store";

@Component({
  selector: 'app-search-bar',
  imports: [
    MatFormField,
    MatInput,
    MatIcon,
    MatIconButton,
    MatLabel,
    ReactiveFormsModule,
    FormsModule,
    MatSuffix
  ],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.scss'
})
export class SearchBarComponent {
  private readonly store = inject(IngredientsStore);

  private readonly fb = inject(FormBuilder).nonNullable;
  protected readonly form = this.fb.group({
    searchField: this.fb.control('')
  });
  protected readonly searchField = this.form.controls.searchField;

  protected onSearchClick() {
    const query = this.searchField.value;
    this.store.filters.titleFilter.setFilter(query);
    this.store.reloadOnFilter();
  }
}
