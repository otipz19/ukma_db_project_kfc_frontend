export type SelectOptionModel<TValue> = {
  value: TValue,
  label: string
};

export type SelectOptionValuesMap<TSelectOptions extends string> = Record<string, TSelectOptions>;

export type SelectOptionLabelsMap<TSelectOptions extends string> = Record<TSelectOptions, any>;

export function optionsToSelectOptionModelList<TSelectOption extends string>(
  valuesMap: SelectOptionValuesMap<TSelectOption>,
  labelsMap: SelectOptionLabelsMap<TSelectOption>)
  : Array<SelectOptionModel<TSelectOption>> {
  const result: Array<SelectOptionModel<TSelectOption>> = [];

  for (const entry of Object.entries(valuesMap)) {
    const value = entry[1];
    const label = labelsMap[value];
    result.push({value, label});
  }

  return result;
}
