from drf_spectacular.utils import extend_schema
from rest_framework.decorators import api_view
from .handlers.serializers import ReviewSerializer, FieldSerializer, ReviewerSerializer

from . import handlers

from .handlers.fetch import (
    DATASET_FETCH_PARAMS,
)


# ! Fetching views
@extend_schema(
    operation_id="fetchDatasetFromDOI",
    parameters=DATASET_FETCH_PARAMS,
)
@api_view(["POST"])
def fetchDatasetFromDOI(request):
    return handlers.fetch.fetch_dataset(request)


# ! Review views
@extend_schema(
    operation_id="getReviewsByDatasetDOI",
    responses={200: ReviewSerializer},
)
@api_view(["GET"])
def getReviewsByDatasetDOI(request, doi):
    return handlers.review.review_by_doi(request, doi)


@extend_schema(
    operation_id="getReviewsByReviewer",
    responses={200: ReviewSerializer(many=True)},
)
@api_view(["GET"])
def getReviewByReviewer(request, reviewerid):
    return handlers.review.review_by_reviewer(request, reviewerid)


@extend_schema(
    operation_id="getReviewByID",
    responses={200: ReviewSerializer},
)
@api_view(["GET"])
def getReviewByID(request, id: str):
    return handlers.review.review_by_id(request, id)


@extend_schema(
    operation_id="getReviews",
    responses={200: ReviewSerializer(many=True)},
)
@api_view(["GET"])
def getReviews(request):
    return handlers.review.all_reviews(request)


@extend_schema(
    operation_id="addReview",
    request=ReviewSerializer,
)
@api_view(["POST"])
def addReview(request):
    return handlers.review.add_review(request)


@extend_schema(
    operation_id="deleteReview",
)
@api_view(["DELETE"])
def deleteReview(request, id):
    return handlers.review.delete_review(request, id)


@extend_schema(
    operation_id="getFieldCount",
)
@api_view(["GET"])
def getFieldCount(request, id):
    return handlers.review.get_field_count(request, id)


# ! Field views
@extend_schema(
    operation_id="getFieldByID",
    responses={200: FieldSerializer},
)
@api_view(["GET"])
def getFieldByID(request, id):
    return handlers.field.field_by_id(request, id)


@extend_schema(
    operation_id="updateField",
    request=FieldSerializer,
)
@api_view(["PUT"])
def updateField(request, id):
    return handlers.field.update_field(request, id)


# ! Reviewers views
@extend_schema(
    operation_id="getReviewers",
    responses={200: ReviewerSerializer(many=True)},
)
@api_view(["GET"])
def getReviewers(request):
    return handlers.reviewer.all_reviewers(request)


@extend_schema(
    operation_id="getReviewerById",
    responses={200: ReviewerSerializer},
)
@api_view(["GET"])
def getReviewerById(request, id):
    return handlers.reviewer.reviewer_by_id(request, id)


@extend_schema(
    operation_id="addReviewer",
    request=ReviewerSerializer,
)
@api_view(["POST"])
def addReviewer(request):
    return handlers.reviewer.add_reviewer(request)
