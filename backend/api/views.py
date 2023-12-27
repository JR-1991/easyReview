from drf_spectacular.utils import extend_schema, extend_schema_view
from rest_framework.decorators import api_view
from rest_framework.generics import (
    RetrieveUpdateDestroyAPIView,
    ListCreateAPIView,
    RetrieveUpdateAPIView,
    ListAPIView,
)

from reviews.models import Review, Field, Reviewer, File
from .handlers.serializers import (
    FileSerializer,
    ReviewSerializer,
    FieldSerializer,
    ReviewerSerializer,
)

from . import handlers

from .handlers.fetch import (
    DATASET_FETCH_PARAMS,
)


# ! Fetching views
@extend_schema(
    operation_id="fetchDatasetFromDOI",
    parameters=DATASET_FETCH_PARAMS,
    responses={200: ReviewSerializer},
    description="Fetches a dataset from a Dataverse installation and adds it to the database. This function will also check whether the given dataset is already present in the database and thus returns the entry. If not, a new one will be created and returned from this endpoint.",
)
@api_view(["POST"])
def fetchDatasetFromDOI(request):
    return handlers.fetch.fetch_dataset(request)


# ! Review views
@extend_schema_view(
    get=extend_schema(
        operation_id="getReviewByID",
        description="Returns a review for a given review ID.",
    ),
    put=extend_schema(
        operation_id="updateReview",
        description="Updates a review for a given review ID.",
    ),
    patch=extend_schema(
        operation_id="partialUpdateReview",
        description="Partially updates a review for a given review ID.",
    ),
    delete=extend_schema(
        operation_id="deleteReview",
        description="Deletes a review from the database.",
    ),
)
class ReviewDetails(RetrieveUpdateDestroyAPIView):
    serializer_class = ReviewSerializer
    queryset = Review.objects.all()


@extend_schema_view(
    get=extend_schema(
        operation_id="getReviews",
        description="Returns all reviews",
    ),
)
class ReviewListCreate(ListAPIView):
    serializer_class = ReviewSerializer
    queryset = Review.objects.all()


@extend_schema(
    operation_id="getReviewsByDatasetDOI",
    responses={200: ReviewSerializer},
    description="Returns all reviews for a given dataset DOI.",
)
@api_view(["GET"])
def getReviewsByDatasetDOI(request, doi):
    return handlers.review.review_by_doi(request, doi)


@extend_schema(
    operation_id="getReviewsByReviewer",
    responses={200: ReviewSerializer(many=True)},
    description="Returns all reviews for a given reviewer ID.",
)
@api_view(["GET"])
def getReviewByReviewer(request, reviewerid):
    return handlers.review.review_by_reviewer(request, reviewerid)


@extend_schema(
    operation_id="getFieldCount",
    description="Returns the number of fields for a given review ID.",
)
@api_view(["GET"])
def getFieldCount(request, id):
    return handlers.review.get_field_count(request, id)


# ! Field views


@extend_schema_view(
    get=extend_schema(
        operation_id="getFieldByID",
        description="Returns a field for a given field ID.",
    ),
    put=extend_schema(
        operation_id="updateField",
        description="Updates a field for a given field ID.",
    ),
    patch=extend_schema(
        operation_id="partialUpdateField",
        description="Updates a field for a given field ID.",
    ),
)
class FieldDetails(RetrieveUpdateAPIView):
    serializer_class = FieldSerializer
    queryset = Field.objects.all()


# ! Reviewers views
@extend_schema_view(
    get=extend_schema(
        operation_id="getReviewerById",
        description="Returns a reviewer for a given reviewer ID.",
    ),
    put=extend_schema(
        operation_id="updateReviewer",
        description="Updates a reviewer for a given reviewer ID.",
    ),
    patch=extend_schema(
        operation_id="partialUpdateReviewer",
        description="Partially updates a reviewer for a given reviewer ID.",
    ),
    delete=extend_schema(
        operation_id="deleteReviewer",
        description="Deletes a reviewer from the database.",
    ),
)
class ReviewerDetails(RetrieveUpdateDestroyAPIView):
    serializer_class = ReviewerSerializer
    queryset = Reviewer.objects.all()


@extend_schema_view(
    get=extend_schema(
        operation_id="getReviewers",
        description="Returns all reviewers",
    ),
    post=extend_schema(
        operation_id="addReviewer",
        description="Adds a new reviewer to the database.",
    ),
)
class ReviewerListCreate(ListCreateAPIView):
    serializer_class = ReviewerSerializer
    queryset = Reviewer.objects.all()


# ! File views
@extend_schema_view(
    get=extend_schema(
        operation_id="getFileById",
        description="Returns a file for a given file ID.",
    ),
    put=extend_schema(
        operation_id="updateFile",
        description="Updates a file for a given file ID.",
    ),
    patch=extend_schema(
        operation_id="partialUpdateFile",
        description="Updates a file for a given file ID.",
    ),
    delete=extend_schema(
        operation_id="deleteReviewer",
        description="Deletes a reviewer from the database.",
    ),
)
class FileDetails(RetrieveUpdateAPIView):
    serializer_class = FileSerializer
    queryset = File.objects.all()


@extend_schema(
    operation_id="getFilesByReviewId",
    responses={200: FileSerializer(many=True)},
    description="Returns all files for a given review ID.",
)
@api_view(["GET"])
def getFilesByReviewId(request, id):
    return handlers.files.files_by_review_id(request, id)
