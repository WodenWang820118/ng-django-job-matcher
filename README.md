# ng-django-job-matcher

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

The default port for the Django backend is 8000.

### Create an endpoint

After adding an endpoint app, the following documents are generated:

- endpoint
  - asgi.py
  - settings.py
  - urls.py
  - wsgi.py

I created another folder called `myapp` to store the endpoint app. The folder structure is as follows:

- myapp
  - migrations
  - templates
  - apps.py
  - models.py
  - urls.py
  - views.py

After managing the endpoint app, run the following command to create a migration:

```bash
python manage.py makemigrations myapp
```

Then, run the following command to apply the migration:

```bash
python manage.py migrate
```

From the browser, you can access the endpoint by visiting the following URL:

```bash
http://localhost:8000/api/blogposts/
```

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

- Local functionality (Expect to finalize it at the end of May 2024)
  - Use IndexedDB to cache the uploaded data and query the data later
  - Design shared schema between the frontend and the backend
  - Use Django to process data from the frontend
  - Calculate cosine similarity (Engish) and return the data to the frontend for further operations
- Online
  - Deploy the backend with render.com's product
  - Deploy the frontend with Netlify
