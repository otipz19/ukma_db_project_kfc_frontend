import {ValidationErrors} from "@angular/forms";

export function getValidationErrorMessage(errors: ValidationErrors | null): string {
  if(!errors) {
    return '';
  }
  const [errorName, errorData] = Object.entries(errors)[0];
  if (errorName in ERROR_TO_MESSAGE) {
    const message = ERROR_TO_MESSAGE[errorName as ValidationErrorKey];
    return typeof message === 'function' ? message(errorData) : message;
  }
  return "Помилка";
}

export type CustomValidationErrorKey =
  'passwordsAreNotEqual'
  | 'invalidEmailFormat'
  | 'invalidPhoneFormat'
  | 'phoneExists'
  | 'emailExists'
  | 'usernameExists';

type DefaultValidationErrorKey = 'required' | 'pattern' | 'maxlength' | 'minlength';

type ValidationErrorKey = DefaultValidationErrorKey | CustomValidationErrorKey;

export const CUSTOM_VALIDATION_ERROR_KEY: Record<CustomValidationErrorKey, CustomValidationErrorKey> = {
  invalidEmailFormat: 'invalidEmailFormat',
  passwordsAreNotEqual: 'passwordsAreNotEqual',
  invalidPhoneFormat: 'invalidPhoneFormat',
  phoneExists: 'phoneExists',
  emailExists: 'emailExists',
  usernameExists: 'usernameExists'
};

const ERROR_TO_MESSAGE: Record<ValidationErrorKey, string | ((error: any) => string)> = {
  required: "Це обов'язкове поле",
  pattern: "Неправильний формат",
  maxlength: ({requiredLength}: any) => `Максимальна довжина ${requiredLength} символів`,
  minlength: ({requiredLength}: any) => `Мінімальна довжина ${requiredLength} символів`,
  passwordsAreNotEqual: "Паролі мають співпадати",
  invalidEmailFormat: 'Неправильний формат пошти',
  invalidPhoneFormat: 'Неправильний формат номеру телефону',
  phoneExists: 'Номер телефону вже використовується',
  emailExists: 'Пошта вже використовується',
  usernameExists: "Ім'я користувача зайняте"
} as const;
