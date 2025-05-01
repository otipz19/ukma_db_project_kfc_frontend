import {ToggleableFilterModel} from "./toggleable-filter-model";

export abstract class RangeFilterModel<TFilterDto, TPartialFilterDto extends Partial<TFilterDto>> extends ToggleableFilterModel<TFilterDto> {
    private range?: TPartialFilterDto = undefined;

    getRange(): TPartialFilterDto {
        return {...this.range} as TPartialFilterDto;
    }

    setRange(range: TPartialFilterDto) {
        this.range = {...range};
    }

    protected doHasFilter(): boolean {
        return this.range != undefined && this.hasAnyRangeField(this.range);
    }

    protected hasAnyRangeField(range: TPartialFilterDto): boolean {
        for (const key in range) {
            if (range[key] != undefined) {
                return true;
            }
        }
        return false;
    }

    getFilterDtoPart(): Partial<TFilterDto> {
        return this.getRange();
    }

    cleanFilter(): void {
        this.range = undefined;
    }
}
