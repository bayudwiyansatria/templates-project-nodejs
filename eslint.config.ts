import js from '@eslint/js'
import globals from 'globals'
import tseslint from 'typescript-eslint'
import prettierRecommended from 'eslint-plugin-prettier/recommended'

/**
 * ESLint flat configuration.
 *
 * Replaces the former `.eslintrc.json` / `.eslintignore` pair, which ESLint 10
 * no longer reads. Flat config cannot be expressed in JSON — plugins, parsers,
 * and shared bases are live objects rather than resolvable names — so ESLint 10
 * only accepts `eslint.config.{js,mjs,cjs,ts,mts,cts}`. TypeScript is used here
 * to match `rollup.config.ts`; loading it requires the `jiti` devDependency,
 * which ESLint declares as an optional peer.
 *
 * Rule selection carries over from `.eslintrc.json`, with two renames forced by
 * `@typescript-eslint` v8: `@typescript-eslint/semi` was removed outright (it
 * was already disabled, so it is simply gone), and
 * `@typescript-eslint/no-empty-interface` became
 * `@typescript-eslint/no-empty-object-type`, kept disabled as before.
 *
 * @author Bayu Dwiyan Satria
 * @version 1.0.0
 * @since 1.0.0
 */
export default tseslint.config(
  /**
   * Ignored paths — the former `.eslintignore`.
   */
  {
    ignores: [
      'node_modules/',
      'dist/',
      'lib/',
      'coverage/',
      'eslint.config.ts',
      'rollup.config.ts',
      '**/*.test.ts',
      '**/*.spec.ts'
    ]
  },

  /**
   * Shared bases — the former `extends` block.
   */
  js.configs.recommended,
  ...tseslint.configs.recommended,
  prettierRecommended,

  /**
   * Project sources.
   */
  {
    files: ['**/*.ts', '**/*.tsx'],
    languageOptions: {
      ecmaVersion: 2020,
      sourceType: 'module',
      parserOptions: {
        project: './tsconfig.json'
      },
      globals: {
        ...globals.es2020,
        ...globals.commonjs,
        ...globals.node
      }
    },
    rules: {
      eqeqeq: 'off',
      curly: 'error',
      'multiline-comment-style': 'warn',
      'no-case-declarations': 'off',
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/no-empty-object-type': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      /*
       * Kept stricter than the sibling repositories, which switch this off
       * entirely. An unused import in a library is dead weight that ships in the
       * bundle; `^_` is the escape hatch for a parameter that exists only to
       * hold a position in a signature.
       */
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_'
        }
      ],
      /*
       * Formatting is Prettier's job, run through `npm run format`. Reporting it
       * as a lint error too means every reformat shows up twice.
       */
      'prettier/prettier': 'off'
    }
  },

  /**
   * The leaf-layer boundary.
   *
   * `types/`, `constants/`, `exceptions/`, and `utils/` describe things the
   * library exchanges, not things it does. Dependency arrows point *into* them
   * and never back out, which is what lets any of the four be read, tested, or
   * lifted into another package without dragging the domain along.
   *
   * This is a lint rule rather than a note in a comment because the whole value
   * of the boundary is that it holds under later edits — a convention survives
   * only as long as everyone remembers it, and the import that breaks it looks
   * exactly like every other import at the point it is written.
   */
  {
    files: ['src/types/**/*.ts', 'src/constants/**/*.ts', 'src/exceptions/**/*.ts', 'src/utils/**/*.ts'],
    rules: {
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            {
              group: ['@/core', '@/core/*', '@/index'],
              message:
                'A leaf layer must not import from the domain layer. Move the shared piece down into types/, constants/, exceptions/, or utils/, or take it as an argument.'
            }
          ]
        }
      ]
    }
  }
)
