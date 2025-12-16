import { AsyncPipe } from '@angular/common';
import { Component, DestroyRef, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  FormBuilder,
  FormControl,
  ReactiveFormsModule,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { map, Observable, startWith } from 'rxjs';
import { DataService } from '../shared/data.service';
import { DebugInfo } from '../shared/debug-info';
import { FormControlsOf, User } from '../shared/models';
import { OldFormError } from './old-form-error';
import { OldReactionPicker } from './old-reaction-picker';

export const nonNullableRequired = (validators: ValidatorFn[] = []) =>
  new FormControl('', {
    nonNullable: true,
    validators: [Validators.required, ...validators],
  });

@Component({
  selector: 'app-old-form',
  imports: [ReactiveFormsModule, DebugInfo, OldFormError, OldReactionPicker, AsyncPipe],
  templateUrl: './oldForm.html',
})
export class OldForm {
  private formBuilder = inject(FormBuilder);
  private destroyRef = inject(DestroyRef);
  private dataService = inject(DataService);

  protected readonly user = signal<User>({
    firstName: 'pippo',
    lastName: 'pippi',
    email: 'pippo@email',
    notifyByEmail: false,
    reaction: '',
  });

  protected readonly signupForm = this.formBuilder.group<FormControlsOf<User>>({
    firstName: nonNullableRequired([Validators.minLength(5)]),
    lastName: nonNullableRequired([Validators.minLength(5)]),
    email: nonNullableRequired([Validators.email]),
    notifyByEmail: new FormControl(false, { nonNullable: true }),
    reaction: nonNullableRequired(),
  });

  protected readonly signupFormValue: Observable<User> = this.signupForm.valueChanges.pipe(
    startWith(this.user),
    map(() => this.signupForm.getRawValue())
  );

  protected submitting = signal(false);

  constructor() {
    this.signupForm.controls.notifyByEmail.valueChanges
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((v) => {
        const email = this.signupForm.controls.email;
        if (v) {
          email.setValidators(Validators.required);
        } else {
          email.removeValidators(Validators.required);
        }
        email.updateValueAndValidity();
      });
    this.signupForm.controls.firstName.valueChanges
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((v) => {
        const reaction = this.signupForm.controls.reaction;
        if (v === 'pippo') {
          reaction.disable();
        } else {
          reaction.enable();
        }
      });
    this.signupForm.setValue(this.user());
  }

  async onSubmit(e: Event) {
    e.preventDefault();
    this.submitting.set(true)
    try {
      await this.dataService.submitData(this.user());
    } catch (error) {
      this.signupForm.controls.firstName.setErrors({ serverError: (error as Error).message });
      this.signupForm.controls.lastName.setErrors({ serverError: (error as Error).message });
      this.signupForm.controls.email.setErrors({ serverError: (error as Error).message });
    } finally {
      this.submitting.set(false);
    }
  }
}
