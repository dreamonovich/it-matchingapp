from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from match.serializers import LikeSerializer, DislikeSerializer
from match.utils import check_and_create_match, get_matched_users_ids
from user.models import Profile
from user.serializers import RetrieveProfileSerializer


class LikeView(APIView):
    permissions_classes = (IsAuthenticated,)

    def post(self, request):
        user_id = request.user.id
        query_user_id = request.data.get('user_id')

        like_data = {'user1': user_id, 'user2': query_user_id}
        serializer = LikeSerializer(data=like_data)
        if serializer.is_valid():
            serializer.save()

            check_and_create_match(user_id, query_user_id)

            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class DislikeView(APIView):
    permissions_classes = (IsAuthenticated,)

    def post(self, request):
        user_id = request.user.id
        query_user_id = request.data.get('user_id')

        match_request_data = {'user1': user_id, 'user2': query_user_id}
        serializer = DislikeSerializer(data=match_request_data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class MatchView(APIView):
    permissions_classes = (IsAuthenticated,)

    def get(self, request):
        user = request.user

        matched_users_ids = get_matched_users_ids(user)
        matched_users = Profile.objects.filter(id__in=matched_users_ids)

        serializer = RetrieveProfileSerializer(matched_users, many=True)
        return Response(serializer.data)
