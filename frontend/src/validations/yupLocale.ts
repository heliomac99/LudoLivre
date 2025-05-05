import { setLocale } from 'yup';
import ptBR from '@/locales/pt_BR.json'; // ajuste o caminho conforme seu projeto

// Substitui {field} por "campo" genérico e {length}, {min}, {max} por tokens do Yup
function adapt(msg: string, field = 'campo') {
  return msg
    .replace('{field}', field)
    .replace('0:{length}', '${min}') // Yup usa ${min}, ${max}, etc.
    .replace('1:{length}', '${max}')
    .replace('0:{min}', '${min}')
    .replace('1:{max}', '${max}')
    .replace('0:{size}', '${max}')
    .replace('0:{width}', '${width}')
    .replace('1:{height}', '${height}');
}

// Aplica as traduções globais do JSON
setLocale({
  mixed: {
    required: adapt(ptBR.messages.required),
    notOneOf: adapt(ptBR.messages.not_one_of),
    oneOf: adapt(ptBR.messages.one_of),
  },
  string: {
    min: adapt(ptBR.messages.min),
    max: adapt(ptBR.messages.max),
    email: adapt(ptBR.messages.email),
    url: adapt(ptBR.messages.url),
  },
  number: {
    min: adapt(ptBR.messages.min_value),
    max: adapt(ptBR.messages.max_value),
  },
});
