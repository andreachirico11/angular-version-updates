import { FormControl } from "@angular/forms";

export type User = {
  firstName: string;
  lastName: string;
  email: string;
  notifyByEmail: boolean;
  reaction: string ;
};

export type FormControlsOf<T> = {
  [K in keyof T]: FormControl<T[K]>;
};
