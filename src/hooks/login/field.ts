import { Field } from 'src/interfaces/login';
import { ref, reactive, watch } from 'vue'

const not = (val: boolean) => !val

export function useField(field: Field | undefined) {
  const valid = ref(true)
  const value = ref(field?.value)
  const errors = reactive({})
  const touched = ref(false)

  const assign = (val: string | undefined) => {
    valid.value = true
    Object.keys(field?.validators ?? {}).map(name => {
      const isValid = field?.validators ? field?.validators[name](val) : false
      Object.assign(errors, {[name]: not(isValid)})
      if (not(isValid)) {
        valid.value = false
      }
    })
  }

  watch(value, assign)
  assign(field?.value)

  return {valid, value, errors, touched, blur: () => touched.value = true}
}
