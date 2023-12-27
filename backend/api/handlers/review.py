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
