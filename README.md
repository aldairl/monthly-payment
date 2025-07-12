# Monthly payments

This is a project to recolect payments monthly, it allows to know incomne, expenses and balance by month.

## Technologies

- Firebase functions
- MongoDB
- NodeJs Typescript

## setup environment

install dependencies

```bash
npm install
```

### run app in development mode

FIRTS if you want it, run watch mode

```bash
cd functions
```

```bash
npm run build:watch
```

#### THEN run server in another shell

```bash
cd functions
```

```bash
npm run serve
```

## deploy with firebase

1. config env vars
2. create a build
3. firebase login (if not legged before)
4. firebase deploy