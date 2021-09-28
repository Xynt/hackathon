import {AbstractControl, ValidationErrors, Validator, ValidatorFn} from "@angular/forms";
import {Directive, Input} from "@angular/core";

@Directive({
  selector: '[appExists]',
})
export class ExistsDirective implements Validator {
  @Input('values') values: string[] = [];

  validate(control: AbstractControl): ValidationErrors | null {
    return existsValidator(this.values);
  }
}

export function existsValidator(values: string[]): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (values.includes(control.value)) {
      return null;
    } else {
      return {notExists: control.value};
    }
  };
}
