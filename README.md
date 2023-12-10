# EasyReview

> [!IMPORTANT]
> EasyReview is currently under development and changes to the API and the database schema are likely to happen.

## Build and run the project

In order to EasyReview, you first need to create a `.env` file in the root directory of the project. The file should contain the following variables:

```bash
# PostgreSQL
POSTGRES_HOST=postgres
POSTGRES_DB=app_db
POSTGRES_USER=app_db_user
POSTGRES_PASSWORD=supersecretpassword
POSTGRES_PORT=5432

# Redis
REDIS_HOST=redis
REDIS_PORT=6379
REDIS_PASSWORD=supersecretpassword
BROKER_URL=redis://:supersecretpassword@redis:6379/0
REDIS_CHANNEL_URL=redis://:supersecretpassword@redis:6379/1
CELERY_URL=redis://:supersecretpassword@redis:6379/0

```

Then, you can build and run the project using the following command:

```bash
docker compose up -d --build
```

> [!TIP]
> If you do not want to run EasyReview in daemon mode, you can remove the `-d` flag.

## Adding datasets for review

Datasets can be added either via the external tools URL schema or via the EasyReviews REST-API. The following sections describe both options.

### Via external tools URL schema

The following URL schema can be used to add datasets to EasyReview:

```bash
http://myhost:3000/?<str:siteUrl>&<str:apiToken>&<str:datasetPid>
```

Parameters:

- `siteUrl`: The URL of the Dataverse instance where the dataset is hosted.
- `apiToken`: The API token of the Dataverse instance where the dataset is hosted.
- `datasetPid`: The DOI of the dataset.

### Via REST-API

The following URL schema can be used to add datasets to EasyReview:

```bash
curl --json '{
        "site_url": "https://mydataverse.com",
        "doi": "doi:10.XXXXX/XXXX-XXXX"
        }' \
    http://myhost:8000/api/dataset/fetch/
```