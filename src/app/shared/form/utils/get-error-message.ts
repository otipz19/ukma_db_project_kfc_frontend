import {ValidationErrors} from "@angular/forms";

export function getErrorMessage(errors: ValidationErrors | null): string {
  if(!errors) {
    return '';
  }
  const [errorName, errorData] = Object.entries(errors)[0];
  if (errorName in ERROR_TO_MESSAGE) {
    const message = ERROR_TO_MESSAGE[errorName];
    return typeof message === 'function' ? message(errorData) : message;
  }
  return "Помилка";
}

const ERROR_TO_MESSAGE: Record<string, string | ((error: any) => string)> = {
  required: "Це обов'язкове поле",
  passwordsAreNotEqual: "Паролі мають співпадати",
  pattern: "Неправильний формат",
  maxlength: ({requiredLength}: any) => `Максимальна довжина ${requiredLength} символів`,
  minlength: ({requiredLength}: any) => `Мінімальна довжина ${requiredLength} символів`,
} as const;
