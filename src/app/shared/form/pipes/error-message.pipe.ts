import {Pipe, PipeTransform} from "@angular/core";
import {ValidationErrors} from "@angular/forms";
import {getErrorMessage} from "../utils/get-error-message";

@Pipe({
  name: 'errorMessage',
  standalone: true
})
export class ErrorMessagePipe implements PipeTransform {
    transform(value: ValidationErrors | null): string {
        return getErrorMessage(value);
    }
}
