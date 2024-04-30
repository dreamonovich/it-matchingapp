from django.urls import path

from user.views import GetNextProfileView, RegisterView, LoginView, ProfileRetrieveUpdateView

app_name = "user"

urlpatterns = [
    path("next/", GetNextProfileView.as_view()),
    path("auth/register/", RegisterView.as_view()),
    path("auth/login/", LoginView.as_view()),
    path("me/", ProfileRetrieveUpdateView.as_view()),
]
