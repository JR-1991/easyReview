import datetime
from .serializers import ReviewSerializer

from drf_spectacular.utils import OpenApiParameter
from easyDataverse import Dataset
from rest_framework import status
from rest_framework.response import Response

from reviews.models import Review, Metadatablock, Compound, Field

DATASET_FETCH_PARAMS = [
    OpenApiParameter(
        name="site_url", description="URL to the dataset", required=True, type=str
    ),
    OpenApiParameter(
        name="doi", description="DOI of the dataset", required=True, type=str
    ),
    OpenApiParameter(
        name="api_token",
        description="API Token to access hidden datasets.",
        type=str,
    ),
]


def fetch_dataset(request):
    """Fetches a dataset from a Dataverse installation and adds it to the database.

    This function will also check whether the given dataset is already present
    in the database and thus returns the entry. If not, a new one will be created
    and returned from this endpoint.
    """

    # Extract relevant information from the request
    site_url = request.query_params.get("site_url")
    doi = request.query_params.get("doi")
    api_token = request.query_params.get("api_token")

    print(request.query_params)

    if site_url is None or doi is None:
        # Check whether the request contains the necessary information
        return Response(
            {"message": f"Missing either 'site_url' or 'doi' to fetch the dataset."},
            status=status.HTTP_400_BAD_REQUEST,
        )

    # First, check if this dataset is already present in the database
    if Review.objects.filter(doi=doi).exists() is True:
        return Response(
            {
                "message": f"The dataset '{doi}' is already present in the database.",
                "review_id": Review.objects.get(doi=doi).id,
            },
            status=status.HTTP_200_OK,
        )

    # Use EasyReview to retrieve the dataset
    dataset = Dataset.from_dataverse_doi(
        dataverse_url=site_url, doi=doi, api_token=api_token, download_files=False
    )

    # Create review object
    review = _create_and_save(
        model=Review,
        doi=doi,
        site_url=site_url,
        revision=1,
        date=datetime.datetime.now(),
    )

    for block_name, block in dataset.metadatablocks.items():
        metadatablock = _create_and_save(
            model=Metadatablock,
            review=review,
            name=block_name,
        )

        _process_metadatablock(block, metadatablock)

    return Response(
        {
            "review_id": Review.objects.get(doi=doi).id,
            "message": f"Successfully added the dataset '{Review.objects.get(doi=doi).id}' to the database.",
        },
        status=status.HTTP_200_OK,
    )


def _create_and_save(model, **kwargs):
    """Creates a model object and saves it to the database"""

    obj = model(**kwargs)
    obj.save()

    return obj


def _process_metadatablock(block, foreign_key):
    """Processes a metadatablock and adds it to the database"""

    for field_name, value in block:
        if field_name.startswith("_"):
            continue

        # Get the field info to populate descriptions
        field_info = block.__fields__[field_name].field_info

        if not field_info.extra["typeClass"] == "compound":
            _create_and_save(
                model=Field,
                metadatablock=foreign_key,
                **_process_primitive(field_name, value, field_info, None),
            )

            continue

        if not isinstance(value, list):
            value = [value]

        for entry in value:
            compound = _create_and_save(
                model=Compound,
                metadatablock=foreign_key,
                name=field_name,
            )

            _process_compound(entry, compound)


def _process_compound(compound, foreign_key):
    """Processes a compound field and adds it to the database"""

    for field_name, value in compound:
        if field_name.startswith("_") or value is None:
            continue

        # Get the field info to populate descriptions
        field_info = compound.__fields__[field_name].field_info

        _create_and_save(
            model=Field,
            compound=foreign_key,
            **_process_primitive(field_name, value, field_info, foreign_key),
        )


def _process_primitive(name, value, field_info, parent):
    """Processes a primitive field and adds it to the database"""

    if isinstance(value, list):
        value = ", ".join(value)

    return {
        "name": name,
        "description": field_info.description,
        "value": value,
        "history": {f"Original": value},
    }
