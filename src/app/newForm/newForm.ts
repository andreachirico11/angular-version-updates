import { Component, inject, signal } from '@angular/core';
import {
  apply,
  disabled,
  email as emailValidator,
  Field,
  form,
  minLength,
  required,
  schema,
  Schema,
  submit,
} from '@angular/forms/signals';
import { DataService } from '../shared/data.service';
import { DebugInfo } from '../shared/debug-info';
import { User } from '../shared/models';
import { FormError } from './form-error';
import { ReactionPicker } from './reaction-picker';

export const requiredTextMinLength: Schema<string> = schema((path) => {
  required(path, { message: 'Field is required' });
  minLength(path, 5, { message: 'Field must be more than 5 char' });
});

@Component({
  selector: 'app-new-form',
  imports: [Field, DebugInfo, FormError, ReactionPicker],
  templateUrl: './newForm.html',
})
export class NewForm {
  private dataService = inject(DataService);

  protected readonly user = signal<User>({
    firstName: 'pippo',
    lastName: 'pippi',
    email: 'pippo@email',
    notifyByEmail: false,
    reaction: '',
  });

  protected readonly signupForm = form(
    this.user,
    ({ firstName, lastName, email, notifyByEmail, reaction }) => {
      apply(firstName, requiredTextMinLength);
      apply(lastName, requiredTextMinLength);
      required(email, {
        message: 'Field required',
        when: ({ valueOf }) => valueOf(notifyByEmail),
      });
      emailValidator(email, {
        message: 'Invalid email',
      });
      disabled(reaction, ({ valueOf }) => valueOf(firstName) === 'pippo');
       required(reaction);
    }
  );

  onSubmit(e: Event) {
    e.preventDefault();
    submit(this.signupForm, async (form) => {
      try {
        await this.dataService.submitData(form().value())
        form().reset();
        return null;
      } catch (error) {
        return [
          { kind: 'server', field: form.firstName, message: (error as Error).message },
          { kind: 'server', field: form.lastName, message: (error as Error).message },
          { kind: 'server', field: form.email, message: (error as Error).message },
        ];
      }
    });
  }
}
