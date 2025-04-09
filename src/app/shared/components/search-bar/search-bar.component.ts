import {Component, inject, input, output} from '@angular/core';
import {MatFormField, MatInput, MatLabel, MatSuffix} from "@angular/material/input";
import {MatIcon} from "@angular/material/icon";
import {MatIconButton} from "@angular/material/button";
import {FormBuilder, FormsModule, ReactiveFormsModule} from "@angular/forms";

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
  private readonly fb = inject(FormBuilder).nonNullable;

  protected readonly form = this.fb.group({
    searchField: this.fb.control('')
  });

  protected readonly searchField = this.form.controls.searchField;

  readonly $label = input.required<string>({alias: 'label'});

  protected readonly search = output<string>();

  protected onSearchClick() {
    const query = this.searchField.value;
    this.search.emit(query);
  }
}
