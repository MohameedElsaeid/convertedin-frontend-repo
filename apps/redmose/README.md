# ![redmose](https://app-stg.converted.in/images/favicon-16x16.png) Welcome to Redmose Project

For runnig this project locally please note that the project has a project that connects under the hood to the `stg` environment
So firstly open [https://app-stg.converted.in](https://app-stg.converted.in/) & login, then open browser dev tools to get cookie as per below

Application -> Cookies -> https://app-stg.converted.in -> convertedin_session

Then copy the token content of `convertedin_session` to the current cookie in your local browser tab then refresh & all api calls will work

### - Figma: [Redmose UX](https://www.figma.com/files/project/100021455)

### - Project commands:

#### Serve

```
npm run redmose:serve
```

#### Build stage

```
npm run redmose:build:staging
```

#### Build production

```
npm run redmose:build:prod
```

#### Build analyze

```
npm run redmose:build:analyze
```

#### Analyze build

```
npm run redmose:analyze
```

### - Implemented features:

- Advanced campaign
- Flow builder (Automation flow)
- Dashboard layout
