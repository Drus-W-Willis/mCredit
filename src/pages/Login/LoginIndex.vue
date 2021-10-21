<template>
  <q-page
    class="window-height window-width row justify-center items-center"
    style="background: linear-gradient(#4aa7eb, #27506d);"
  >
    <div class="column q-pa-lg">
      <div class="row">
        <q-card square class="shadow-24 login-form">
          <q-card-section>
            <q-form class="q-px-sm q-pt-xl">
              <q-input
                class="q-pb-lg"
                ref="emailRef"
                dense
                clearable
                v-model="form.email.value"
                type="email"
                :error="!form.email.valid && form.email.touched"
                label="Email"
                filled
                bg-color="blue-1"
                @blur="form.email.blur()"
              >
                <template v-slot:prepend>
                  <q-icon size="18px" name="email"/>
                </template>
              </q-input>
              <q-input
                ref="passwordRef"
                dense
                clearable
                v-model="form.password.value"
                type="password"
                :error="!form.password.valid && form.password.touched"
                label="Пароль"
                filled
                bg-color="blue-1"
                @blur="form.password.blur()"
              >
                <template v-slot:prepend>
                  <q-icon size="18px" name="lock"/>
                </template>
              </q-input>
            </q-form>
          </q-card-section>

          <q-card-actions class="q-px-lg">
            <q-btn
              unelevated
              size="md"
              color="secondary"
              @click="submit(data)"
              :disabled="!form.valid"
              class="full-width text-white" label="Login"/>
          </q-card-actions>
          <q-card-section
            class="text-center q-pa-sm">
            <p class="text-grey-6 q-link">Забыли пароль?</p>
          </q-card-section>
        </q-card>
      </div>
    </div>

  </q-page>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import { useForm } from 'src/hooks/login/form';

  export default defineComponent({
    name: 'LoginIndex',

    setup() {
      const required = (val: string | undefined) => !!val
      const isEmail = (val: string | undefined) => {
        const emailPattern = /^(?=[a-zA-Z0-9@._%+-]{6,254}$)[a-zA-Z0-9._%+-]{1,64}@(?:[a-zA-Z0-9-]{1,63}\.){1,8}[a-zA-Z]{2,63}$/;
        return val ? (emailPattern.test(val)) : false;
      };

      const form = useForm({
        email: {
          value: '',
          validators: {required, isEmail}
        },
        password: {
          value: '',
          validators: {required}
        },
        valid: false
      })

      const submit = () => {
        console.log('email', form.email?.value, 'password', form.password?.value)
      };
      return { required, isEmail, submit, form};
    }
  });
</script>
<style lang="scss">
  .q-field--filled.q-field--highlighted .q-field__control:before {
    background-color: rgba(0, 0, 0, 0.04);
  }

  .q-field--filled {
    & .q-field__control {
      & .q-field__prepend, i {
        color: inherit;
      }

      &:hover:before {
        opacity: 0.4;
      }
    }
  }
  .q-card {
    width: 85vw;
    @media screen and (min-width: 600px) {
      width: 400px;
      height: 350px;
    }
  }
  .q-link {
    cursor: pointer;
    transition: all 300ms;
    &:hover {
      color: #285473 !important;
    }
  }
</style>
