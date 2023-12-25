from rest_framework import status
from rest_framework.response import Response
from reviews.models import File

from .serializers import FileSerializer


def all_files(request):
    files = File.objects.all()
    serializer = FileSerializer(files, many=True)
    return Response(serializer.data)


def file_by_id(request, id):
    files = File.objects.get(pk=id)
    serializer = FileSerializer(files)
    return Response(serializer.data)


def files_by_review_id(request, id):
    files = File.objects.get(review=id)
    serializer = FileSerializer(files, many=True)
    return Response(serializer.data)


def add_file(request):
    serializer = FileSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    else:
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
