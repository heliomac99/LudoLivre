/**
 * plugins/index.ts
 *
 * Incluído automaticamente no `main.ts`
 */
// Plugins
import pinia from '../stores';
import router from '../router';
// vee-validate
import { defineRule } from 'vee-validate';
import * as veeRules from '@vee-validate/rules';
// Toast
import Toast from 'vue-toastification';
import 'vue-toastification/dist/index.css';
// Bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap';
import 'bootstrap-icons/font/bootstrap-icons.css';
import '@/assets/styles/variables.scss';
import '@/validations/yupLocale';
import '@vueform/multiselect/themes/default.css';
export function registerPlugins(app) {
    // Registrar regras do vee-validate
    Object.entries(veeRules).forEach(([name, rule]) => {
        if (typeof rule === 'function') {
            defineRule(name, rule);
        }
    });
    app
        .use(router)
        .use(pinia)
        .use(Toast);
}
