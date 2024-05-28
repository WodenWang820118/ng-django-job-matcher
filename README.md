# ng-django-job-matcher

## Overview

The project aims to match the given resume and a list of job descriptions or company information by the cosine similarity. The goal is to use it with traditional Chinese and English together.

## Storage

- sessionStorage: it is for portfolio-building processes
- indexeddb: it is for better data management

## Nx Workspace

Please run the following command to install the required dependencies:

```bash
npm install
```

## Backend

Please install `poetry` for the backend development.

cd to the `django-backend` folder and run the following commands to activate the virtual environment:

```bash
poetry shell
```

You can install the dependencies by running the following command:

```bash
poetry install
```

Keep the virtual environment to run other Python commands.

### Run the Django server

```bash
npm run dev-back
```

The default port for the Django backend is 8000. To test the backend, use the following data with `http://localhost:8000/api/cosinesimilarity/`:

```json
{
  "resume": "Experienced software developer with expertise in Python and Django.",
  "company_texts": [
    {
      "id": "1",
      "text": "We are looking for an experienced software developer with expertise in Python and Django."
    },
    {
      "id": "2",
      "text": "We are looking for a software developer with expertise in Python and Django."
    },
    {
      "id": "3",
      "text": "We are looking for a software developer with expertise in Python."
    }
  ]
}
```

### Create an endpoint

After adding an endpoint app, the following documents are generated:

- endpoint
  - asgi.py
  - settings.py
  - urls.py
  - wsgi.py

After managing the endpoint app, in the `endpoint` folder, run the following command to create a migration:

```bash
python manage.py makemigrations <appname>
```

Then, run the following command to apply the migration:

```bash
python manage.py migrate
```

Please refer to the [official documentation](https://docs.djangoproject.com/en/5.0/topics/migrations/) for details.

## Frontend

For the Angular front-end:

```bash
npm run dev-front
```

For the Django back-end:

```bash
npm run dev-back
```

The default port for the Angular frontend is 4200.

## TODOs

- Online
  - Deploy the backend with render.com's product
  - Deploy the frontend with Netlify
- Frontend
  - Portfolio resume edit functionality
- Design
  - UI/UX
