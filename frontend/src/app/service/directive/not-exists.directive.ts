import {Directive, Input} from '@angular/core';
import {AbstractControl, ValidationErrors, Validator, ValidatorFn} from "@angular/forms";

@Directive({
  selector: '[appNotExists]'
})
export class NotExistsDirective implements Validator {
  @Input('values') values: string[] = [];

  validate(control: AbstractControl): ValidationErrors | null {
    return notExistsValidator(this.values);
  }
}

export function notExistsValidator(values: string[]): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (values.includes(control.value)) {
      return {exists: control.value};
    } else {
      return null;
    }
  };
}
