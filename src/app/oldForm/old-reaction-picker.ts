import {
  Component,
  effect,
  forwardRef,
  Host,
  Input,
  model,
  OnInit,
  Optional,
  signal,
  SkipSelf
} from '@angular/core';
import {
  ControlContainer,
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
  Validators
} from '@angular/forms';
import { ReactionPickerTemplate } from '../shared/reaction-picker-template';

type OnChangeCb = (value: string | null) => void;

@Component({
  selector: 'old-reaction-picker',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => OldReactionPicker),
    },
  ],
  imports: [ReactionPickerTemplate],
  template: `
    <reaction-picker-template
      [disabled]="disabled()"
      [required]="required()"
      [value]="value()"
      (valueChange)="value.set($event)"
    />
  `,
})
export class OldReactionPicker implements ControlValueAccessor, OnInit {
  @Input({ required: true }) formControlName!: string;
  private onChange: OnChangeCb = () => {};
  private onTouched: () => void = () => {};

  registerOnChange(onChange: OnChangeCb): void {
    this.onChange = onChange;
  }
  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }
  setDisabledState(isDisabled: boolean): void {
    this.disabled.set(isDisabled);
  }
  writeValue(newVal: string): void {
    this.value.set(newVal);
  }
  readonly value = model<string | null>(null);
  readonly disabled = signal(false);
  readonly required = signal(false);

  constructor(
    @Optional()
    @Host()
    @SkipSelf()
    private controlContainer: ControlContainer
  ) {
    effect(() => {
      const v = this.value();
      if (!v) return;
      setTimeout(() => {
        this.onChange(v);
        this.onTouched();
      }, 0);
    });
  }

  ngOnInit(): void {
    if (!!this.controlContainer && this.controlContainer.control) {
      const control = this.controlContainer.control.get(this.formControlName);
      this.required.set(control?.hasValidator(Validators.required) || false);
    }
  }
}
