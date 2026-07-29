import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{js,jsx}'],
    extends: [
      js.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      globals: globals.browser,
      parserOptions: { ecmaFeatures: { jsx: true } },
    },
    rules: {
      // Este projeto não usa o React Compiler. As regras abaixo pertencem ao
      // preset de "compiler readiness" e sinalizam como erro padrões que aqui
      // são intencionais e seguros: Math.random() dentro de useMemo para gerar
      // animações decorativas (ondas, notas, roleta) e setState em useEffect
      // para restaurar sessão salva / disparar efeitos pontuais.
      'react-hooks/purity': 'off',
      'react-hooks/set-state-in-effect': 'off',
    },
  },
  {
    files: ['context/**/*.jsx'],
    rules: {
      // AuthContext exporta o Context junto do Provider no mesmo arquivo —
      // impacta apenas a granularidade do Fast Refresh em dev, não é um bug.
      'react-refresh/only-export-components': 'off',
    },
  },
])
