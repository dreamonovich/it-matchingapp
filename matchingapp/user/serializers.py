from collections import OrderedDict

from rest_framework import serializers

from user.models import Profile


class CreateProfileSerializer(serializers.ModelSerializer):
    def create(self, validated_data):
        # TODO: Бесполезное поле, но так проще
        validated_data["username"] = validated_data["login"]
        return super().create(validated_data)

    class Meta:
        model = Profile
        fields = (
            'login',
            'password',
            'telegram_username',
            'bio',
            'role',
            'stack',
            'age',
            'image',
        )


class RetrieveProfileSerializer(serializers.ModelSerializer):
    def to_representation(self, instance):
        result = super().to_representation(instance)
        return OrderedDict(
            [(key, result[key]) for key in result if result[key] is not None]
        )

    class Meta:
        model = Profile
        fields = (
            'id',
            'login',
            'telegram_username',
            'bio',
            'role',
            'stack',
            'age',
            'image',
        )


class UpdateMyProfileSerializer(CreateProfileSerializer):
    class Meta:
        model = Profile
        fields = (
            "telegram_username",
            'bio',
            'role',
            'stack',
            'age',
            'image'

        )
