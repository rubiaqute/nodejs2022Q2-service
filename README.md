# Home Library Service

Для работы:
1. Склонируйте репозиторий на локальный компьютер
2. Выполните npm i
3. Откройте на своем ПК docker desktop
4. Выполните команду docker compose up. По данной команде будут созданы 2 образа, 2 контейнера  и 2 volume
5. Для сканирование на уязвимости используйте скрипт npm run docker:scan
6. ДО запуска тестов пожалуйста ПРОГОНИТЕ МИГРАЦИИ с командой typeorm:migration
6. Для запуска тестов, убедитесь, что и сервер, и докер запущены. Выполните npm run test


## Prerequisites

- Git - [Download & Install Git](https://git-scm.com/downloads).
- Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager.

## Downloading

```
git clone {repository URL}
```

## Installing NPM modules

```
npm install
```

## Running application

```
npm start
```

After starting the app on port (4000 as default) you can open
in your browser OpenAPI documentation by typing http://localhost:4000/doc/.
For more information about OpenAPI/Swagger please visit https://swagger.io/.

## Testing

After application running open new terminal and enter:

To run all tests without authorization

```
npm run test
```

To run only one of all test suites

```
npm run test -- <path to suite>
```

To run all test with authorization

```
npm run test:auth
```

To run only specific test suite with authorization

```
npm run test:auth -- <path to suite>
```

### Auto-fix and format

```
npm run lint
```

```
npm run format
```

### Debugging in VSCode

Press <kbd>F5</kbd> to debug.

For more information, visit: https://code.visualstudio.com/docs/editor/debugging
