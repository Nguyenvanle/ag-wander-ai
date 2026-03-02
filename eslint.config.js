import js from '@eslint/js'
import typescript from '@typescript-eslint/eslint-plugin'
import typescriptParser from '@typescript-eslint/parser'
import checkFile from 'eslint-plugin-check-file'
import prettier from 'eslint-plugin-prettier'
import simpleImportSort from 'eslint-plugin-simple-import-sort'
import globals from 'globals'

export default [
  // Ignore routeTree.gen.ts for Prettier
  {
    ignores: ['**/routeTree.gen.ts']
  },
  js.configs.recommended,
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    languageOptions: {
      parser: typescriptParser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true
        }
      },
      globals: {
        ...globals.browser,
        ...globals.node,
        React: true
      }
    },
    plugins: {
      '@typescript-eslint': typescript,
      'check-file': checkFile,
      'simple-import-sort': simpleImportSort,
      prettier: prettier
    },
    rules: {
      'prettier/prettier': [
        'warn',
        {
          arrowParens: 'always',
          semi: false,
          trailingComma: 'none',
          tabWidth: 2,
          endOfLine: 'auto',
          useTabs: false,
          singleQuote: true,
          printWidth: 120,
          jsxSingleQuote: true
        }
      ],

      'import/order': 'off',
      'import/named': 'off',
      '@typescript-eslint/no-require-imports': 'off',
      'import/no-unresolved': 'off',
      'simple-import-sort/exports': 'off',
      'simple-import-sort/imports': [
        'warn',
        {
          groups: [
            ['^react', '^react-dom'],
            ['^@tanstack'],
            ['^@?\\w'],
            ['^~/constants'],
            ['^~/services'],
            ['^~/stores'],
            ['^~/types'],
            ['^~/utils'],
            ['^~/libs'],
            ['^~/providers'],
            ['^~/hooks'],
            ['^~/components'],
            ['^~/styles'],
            ['^~/pages'],
            ['^~/queries'],
            ['^[./]']
          ]
        }
      ],

      'no-redeclare': 'off',
      'prefer-const': 'warn',
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': 'warn',
      '@typescript-eslint/no-explicit-any': 'off',
      'no-console': ['warn', { allow: ['info', 'warn', 'error'] }],

      'check-file/filename-naming-convention': [
        'error',
        {
          '**/src/*.{jsx,tsx,js,ts}': 'KEBAB_CASE'
        }
      ],
      'check-file/folder-naming-convention': [
        'error',
        {
          'src/**/': 'KEBAB_CASE'
        }
      ]
    },
    settings: {
      'import/resolver': {
        typescript: true,
        node: true
      }
    },
    ignores: ['node_modules/', 'dist/', 'build/', '.next/', 'coverage/']
  },
  {
    files: ['src/**/*.{ts,tsx}'],
    rules: {
      '@typescript-eslint/no-require-imports': 'warn'
    }
  },
  {
    files: ['src/routes/_*.tsx'],
    rules: {
      'check-file/filename-naming-convention': 'off'
    }
  },
  {
    files: ['**/{services,controllers,models,types,providers,hooks,libs,utils,constants,queries,stores,modules}/**'],
    rules: {
      'check-file/filename-naming-convention': [
        'error',
        {
          '**/hooks/**/*.ts': 'use**.hook',
          '**/providers/*.tsx': '**.provider',
          '**/services/*.ts': '**.service',
          '**/controllers/*.ts': '**.controller',
          '**/models/*.ts': '**.model',
          '**/types/*.ts': '**.d',
          '**/libs/*.ts': '**.lib',
          '**/utils/*.ts': '**.util',
          '**/constants/*.ts': '**.const',
          '**/queries/*.ts': '**.query',
          '**/stores/*.ts': '**.store',
          '**/modules/*.ts': '**.module'
        }
      ]
    }
  },
  {
    files: ['src/**/index.{ts,tsx}'],
    rules: {
      'check-file/filename-naming-convention': 'off'
    }
  },
  {
    files: ['src/**/@types/**'],
    rules: {
      'check-file/folder-naming-convention': 'off'
    }
  }
]
