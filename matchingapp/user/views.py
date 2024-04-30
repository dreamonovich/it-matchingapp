from django.contrib.auth.hashers import make_password
from django.http import JsonResponse


from django.db.models import Q


from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.authtoken.models import Token
from rest_framework import status
from rest_framework.generics import CreateAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from match.models import Like, Dislike
from match.utils import get_matched_users_ids
from user.models import Profile
from user.serializers import CreateProfileSerializer, RetrieveProfileSerializer, UpdateMyProfileSerializer


class RegisterView(CreateAPIView):
    serializer_class = CreateProfileSerializer

    def perform_create(self, serializer):
        password = serializer.validated_data["password"]
        serializer.validated_data["password"] = make_password(password)
        serializer.save()

    def create(self, request, *args, **kwargs):
        res = super().create(request, *args, **kwargs)
        res_ser = RetrieveProfileSerializer(Profile.objects.get(login=res.data.get('login')))
        return Response({'profile': res_ser.data}, status=status.HTTP_201_CREATED)


class LoginView(ObtainAuthToken):

    def post(self, request, *args, **kwargs):
        req_data = request.data.copy()
        req_data['username'] = req_data.pop('login', None)[0]
        print(req_data)
        serializer = self.serializer_class(data=req_data,
                                           context={'request': request})
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        token, created = Token.objects.get_or_create(user=user)
        return Response({
            'token': token.key,
            'user_id': user.pk,
        })


class ProfileRetrieveUpdateView(APIView):
    permission_classes = (IsAuthenticated,)

    def get(self, request):
        return Response(RetrieveProfileSerializer(request.user).data)

    def patch(self, request):
        serializer = UpdateMyProfileSerializer(
            request.user, data=request.data, partial=True
        )
        serializer.is_valid(raise_exception=True)
        serializer.save()

        res_ser = RetrieveProfileSerializer(request.user)

        return Response(res_ser.data)


class GetNextProfileView(APIView):
    permission_classes = (IsAuthenticated,)

    def post(self, request):
        user1 = request.user
        index = int(request.data.get('index'))

        liked_by_user_ids = Like.objects.filter(user1=user1).values_list('user2_id', flat=True)
        disliked_by_user_ids = Dislike.objects.filter(user1=user1).values_list('user2_id',
                                                                               flat=True)  # Пользователь дизлайкнул
        disliked_user_ids = Dislike.objects.filter(user2=user1).values_list('user1_id',
                                                                            flat=True)  # Дизлайкнувшие пользователя
        matched_users_ids = get_matched_users_ids(user1)

        profiles = Profile.objects.exclude(
            Q(pk=user1.id) | Q(pk__in=liked_by_user_ids)
            | Q(pk__in=disliked_by_user_ids) | Q(pk__in=disliked_user_ids)
            | Q(pk__in=matched_users_ids)
        )

        return JsonResponse(RetrieveProfileSerializer(profiles[index]).data)
