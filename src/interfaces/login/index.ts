type PartialForm <T> = {
  [P in keyof T]?: T[P];
}

export type Form = PartialForm<AForm>;
export type Field = PartialForm<AField>;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
interface AForm extends Record<string, any> {
  email?: AField,
  password?: AField,
  valid?: boolean
}

interface Validator {
  [key: string]: (val: string | undefined) => boolean
}

interface AField {
  value?: string | undefined,
  validators?: Validator | undefined
  valid?: boolean
}
