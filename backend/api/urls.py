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
    path("reviews/list/", views.getReviews),
    path("reviews/delete/<str:reviewid>/", views.deleteReview),
    path("reviews/stats/<str:reviewid>/", views.getFieldCount),
    path("reviews/<str:reviewid>/", views.getReviewByID),
    path("reviews/<str:reviewid>/files/", views.getFilesByReviewId),
    path("reviews/doi/<str:doi>/", views.getReviewsByDatasetDOI),
    path("reviews/reviewer/<str:reviewerid>/", views.getReviewByReviewer),
    path("reviews/add/", views.addReview),
    path("reviewers/list/", views.getReviewers),
    path("reviewers/<str:id>/", views.getReviewerById),
    path("reviewers/add/", views.addReviewer),
    path("files/list/", views.getFiles),
    path("files/<str:id>/", views.getFileById),
    path("files/add/", views.addFile),
    path("field/<str:id>/", views.getFieldByID),
    path("field/update/<str:id>/", views.updateField),
]
