from django.urls import path

from match.views import LikeView, DislikeView, MatchView

app_name = "match"

urlpatterns = [
    path("like/", LikeView.as_view()),
    path("dislike/", DislikeView.as_view()),
    path("", MatchView.as_view()),
]
