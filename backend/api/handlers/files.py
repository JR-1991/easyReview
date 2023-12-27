from rest_framework import status
from rest_framework.response import Response
from reviews.models import File

from .serializers import FileSerializer


def files_by_review_id(request, id):
    files = File.objects.get(review=id)

    if not isinstance(files, list):
        files = [files]

    serializer = FileSerializer(files, many=True)
    return Response(serializer.data)
