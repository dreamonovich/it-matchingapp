from rest_framework import serializers

from match.models import Like, Dislike


class LikeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Like
        fields = (
            'user1',
            'user2',
        )

class DislikeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Dislike
        fields = (
            'user1',
            'user2',
        )