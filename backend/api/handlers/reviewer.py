from rest_framework import status
from rest_framework.response import Response
from reviews.models import Reviewer

from .serializers import ReviewerSerializer


def all_reviewers(request):
    reviewer = Reviewer.objects.all()
    serializer = ReviewerSerializer(reviewer, many=True)
    return Response(serializer.data)


def reviewer_by_id(request, id):
    reviewer = Reviewer.objects.get(pk=id)
    serializer = ReviewerSerializer(reviewer)
    return Response(serializer.data)


def add_reviewer(request):
    serializer = ReviewerSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    else:
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
