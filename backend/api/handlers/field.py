from django.core.exceptions import FieldDoesNotExist
from rest_framework import status
from rest_framework.response import Response
from reviews.models import Field

from .serializers import FieldSerializer


def field_by_id(request, id):
    field = Field.objects.get(pk=id)
    serializer = FieldSerializer(field, many=False)
    return Response(serializer.data)


def update_field(request, id):
    field = Field.objects.filter(pk=id)

    try:
        field.update(**request.data)
    except FieldDoesNotExist as e:
        return Response(
            {
                "message": f"Field update failed - {str(e)}",
            },
            status=status.HTTP_400_BAD_REQUEST,
        )

    return Response(
        {
            "message": "Field updated successfully",
        },
        status=status.HTTP_200_OK,
    )
