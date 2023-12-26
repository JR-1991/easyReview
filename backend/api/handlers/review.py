from django.core.exceptions import FieldDoesNotExist
from rest_framework import status
from rest_framework.response import Response
from reviews.models import Review

from .serializers import ReviewSerializer


def review_by_doi(request, doi):
    reviews = Review.objects.filter(doi=doi)
    serializer = ReviewSerializer(reviews, many=True)
    return Response(serializer.data)


def review_by_reviewer(request, reviewerid):
    reviews = Review.objects.filter(reviewer=reviewerid)
    serializer = ReviewSerializer(reviews, many=True)
    return Response(serializer.data)


def add_review(request):
    serializer = ReviewSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    else:
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


def all_reviews(request):
    reviews = Review.objects.all()
    serializer = ReviewSerializer(reviews, many=True)
    return Response(serializer.data)


def review_by_id(request, id):
    review = Review.objects.get(pk=id)
    serializer = ReviewSerializer(review, many=False)
    return Response(serializer.data)


def delete_review(request, id):
    try:
        Review.objects.get(pk=id).delete()
    except Exception as e:
        return Response(
            {
                "message": f"Could not delete - Review of UUID '{id}' does not exist or is not a valid UUID"
            },
            status=status.HTTP_400_BAD_REQUEST,
        )

    return Response(
        {"message": f"Review '{id}' has successfully been deleted"},
        status=status.HTTP_200_OK,
    )


def get_field_count(request, review_id):
    # Get total field count
    primitive_fields = list(
        Review.objects.filter(pk=review_id).values_list(
            "metadatablocks__primitives__accepted",
            flat=True,
        )
    )

    compound_fields = list(
        Review.objects.filter(pk=review_id).values_list(
            "metadatablocks__compounds__primitives__accepted",
            flat=True,
        )
    )

    field_count = len(primitive_fields) + len(compound_fields) - 1
    accepted_fields = len(
        list(filter(lambda x: x is True, primitive_fields + compound_fields))
    )

    return Response(
        {
            "field_count": field_count,
            "accpected_count": accepted_fields,
        },
        status=status.HTTP_200_OK,
    )


def update_review(request, id):
    review = Review.objects.filter(pk=id)

    try:
        review.update(**request.data)
    except FieldDoesNotExist as e:
        return Response(
            {
                "message": f"Review update failed - {str(e)}",
            },
            status=status.HTTP_400_BAD_REQUEST,
        )

    return Response(
        {
            "message": "Review updated successfully",
        },
        status=status.HTTP_200_OK,
    )
