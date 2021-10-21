import { Field, Form } from 'src/interfaces/login';
import { computed, reactive } from 'vue';
import { useField } from 'src/hooks/login/field';

export function useForm(init: Form) {
  const form = reactive<Form>({});
  for (const [key, value] of Object.entries(init)) {
    if (typeof (value) !== 'boolean') Object.assign(form, { [key]: useField(value) });
  }

  const notValid = (k: string) => k !== 'valid';

  Object.assign(form, {
    valid: computed(() => {
      return Object.keys(form).filter(notValid).reduce<boolean>(function(acc, k) {
        acc = acc && (form[k] as Field).valid as boolean;
        return acc;
      }, true);
    })
  });

  return form;
}
