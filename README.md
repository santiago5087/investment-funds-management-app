# InvestmentFundsManagementApp

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 21.2.1.

## Features

- 📊 Browse and explore investment funds
- 💰 Subscribe to funds with real-time balance tracking
- 📧 **Email confirmations with Resend** - Automated email notifications for subscriptions
- 📱 **SMS notifications with Twilio** - Send SMS confirmations to users
- 📈 Transaction history and portfolio management
- 🎨 Modern UI with Material Design 3
- 🔔 Toast notifications with beautiful design

## Environment Setup

### Email Notifications (Resend)

This app uses [Resend](https://resend.com) to send confirmation emails. See [RESEND_SETUP.md](RESEND_SETUP.md) for detailed configuration instructions.

**Quick Setup:**
1. Get a free API key from [resend.com](https://resend.com)
2. Copy `.env.example` to `.env` and add your key
3. For Vercel deployment, add `RESEND_API_KEY` to environment variables

### SMS Notifications (Twilio)

This app uses [Twilio](https://www.twilio.com) to send confirmation SMS. See [TWILIO_SETUP.md](TWILIO_SETUP.md) for detailed configuration instructions.

**Quick Setup:**
1. Get a free account with $15 USD credit at [twilio.com/try-twilio](https://www.twilio.com/try-twilio)
2. Get your Account SID, Auth Token, and Phone Number from the Dashboard
3. Copy `.env.example` to `.env` and add your credentials
4. For Vercel deployment, add `TWILIO_ACCOUNT_SID`, `TWILIO_AUTH_TOKEN`, and `TWILIO_PHONE_NUMBER` to environment variables

## 🚀 Deployment

### Deploy to Vercel

This project is ready to be deployed on Vercel with zero configuration. See [VERCEL_DEPLOYMENT.md](VERCEL_DEPLOYMENT.md) for detailed deployment instructions.

**Quick Deploy:**
1. Push your code to GitHub
2. Import project in [Vercel Dashboard](https://vercel.com/new)
3. Add `RESEND_API_KEY` environment variable
4. Deploy! 🎉

Your app will be live with:
- ✅ Angular frontend optimized and served via CDN
- ✅ API endpoints at `/api/*`
- ✅ Email notifications working
- ✅ Automatic HTTPS
- ✅ Global edge network

## Development server

To run the application locally, you need to start both the API server and the Angular app:

**1. Start the API server (Terminal 1):**
```bash
npm run api
```
This will start the JSON Server with email support at `http://localhost:3000`

**2. Start the Angular app (Terminal 2):**
```bash
npm start
# or
ng serve
```
Once the server is running, open your browser and navigate to `http://localhost:4200/`

The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Vitest](https://vitest.dev/) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
