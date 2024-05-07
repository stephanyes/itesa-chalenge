# Itesa challenge
Itesa challenge

## Techs

- Next.js
- Firebase
- Typescript
- Docker
- Vercel


## Getting Started

```bash
  npm install
```

- Run the development server:

```bash
  npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Set Up Firebase `.env` variables
```md
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
NEXT_PUBLIC_API_URL=public_api
```

- Create `env` file and paste these variables with your own information.

## Authentication

- In `src/firebase` directory, exists the directory `auth` containing the logic for `signin` and `signup`.

There is a `Dockerfile` and `docker-compose.yml` if you need a container ready to go to run this app. 

## Live Demo

Open [https://itesa-chalenge-ezug.vercel.app/](https://itesa-chalenge-ezug.vercel.app/) with your browser to see the result.

This app, developed with Next.js, integrates a Flask backend hosted on Google Cloud Platform and a Firebase database. Next.js facilitates dynamic frontend interactions, while Flask manages backend processes. Firebase ensures secure data storage and management. This architecture enables efficient communication between frontend and backend components, resulting in a responsive and reliable user experience.






