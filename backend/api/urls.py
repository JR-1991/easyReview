from django.urls import path
from drf_spectacular.views import (
    SpectacularAPIView,
    SpectacularSwaggerView,
)

from . import views

urlpatterns = [
    path("schema/", SpectacularAPIView.as_view(), name="schema"),
    path(
        "",
        SpectacularSwaggerView.as_view(url_name="schema"),
        name="swagger-ui",
    ),
    path("dataset/fetch/", views.fetchDatasetFromDOI),
    path("review/list/", views.getReviews),
    path("review/<str:id>/", views.deleteReview),
    path("review/<str:id>/", views.updateReview),
    path("review/<str:id>/stats/", views.getFieldCount),
    path("review/<str:id>/", views.getReviewByID),
    path("review/<str:id>/files/", views.getFilesByReviewId),
    path("review/doi/<str:doi>/", views.getReviewsByDatasetDOI),
    path("review/reviewer/<str:reviewerid>/", views.getReviewByReviewer),
    path("review/", views.addReview),
    path("reviewers/list/", views.getReviewers),
    path("reviewers/<str:id>/", views.getReviewerById),
    path("reviewers/", views.addReviewer),
    path("files/list/", views.getFiles),
    path("files/<str:id>/", views.getFileById),
    path("files/", views.addFile),
    path("field/<str:id>/", views.getFieldByID),
    path("field/<str:id>/", views.updateField),
]
