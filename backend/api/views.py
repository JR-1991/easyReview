from drf_spectacular.utils import extend_schema
from rest_framework.decorators import api_view

from . import handlers

from .handlers.fetch import (
    DATASET_FETCH_PARAMS,
)


# ! Fetching views
@extend_schema(parameters=DATASET_FETCH_PARAMS)
@api_view(["POST"])
def fetchDatasetFromDOI(request):
    return handlers.fetch.fetch_dataset(request)


# ! Review views
@api_view(["GET"])
def getReviewsByDatasetDOI(request, doi):
    return handlers.review.review_by_doi(request, doi)


@api_view(["GET"])
def getReviewByReviewer(request, reviewerid):
    return handlers.review.review_by_reviewer(request, reviewerid)


@api_view(["GET"])
def getReviewByID(request, id):
    return handlers.review.review_by_id(request, id)


@api_view(["GET"])
def getReviews(request):
    return handlers.review.all_reviews(request)


@api_view(["POST"])
def addReview(request):
    return handlers.review.add_review(request)


@api_view(["DELETE"])
def deleteReview(request, id):
    return handlers.review.delete_review(request, id)


@api_view(["GET"])
def getFieldCount(request, id):
    return handlers.review.get_field_count(request, id)


# ! Field views
@api_view(["GET"])
def getFieldByID(request, id):
    return handlers.field.field_by_id(request, id)


@api_view(["PUT"])
def updateField(request, id):
    return handlers.field.update_field(request, id)


# ! Reviewers views
@api_view(["GET"])
def getReviewers(request):
    return handlers.reviewer.all_reviewers(request)


@api_view(["GET"])
def getReviewerById(request, id):
    return handlers.reviewer.reviewer_by_id(request, id)


@api_view(["POST"])
def addReviewer(request):
    return handlers.reviewer.add_reviewer(request)
