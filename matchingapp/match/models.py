from django.db import models
from user.models import Profile


class Match(models.Model):
    user1 = models.ForeignKey(Profile, related_name='matches_as_user1', on_delete=models.CASCADE)
    user2 = models.ForeignKey(Profile, related_name='matches_as_user2', on_delete=models.CASCADE)

class Like(models.Model):
    user1 = models.ForeignKey(Profile, related_name='match_request_as_user1', on_delete=models.CASCADE)
    user2 = models.ForeignKey(Profile, related_name='match_request_as_user2', on_delete=models.CASCADE)

class Dislike(models.Model):
    user1 = models.ForeignKey(Profile, related_name='match_reject_as_user1', on_delete=models.CASCADE)
    user2 = models.ForeignKey(Profile, related_name='match_reject_as_user2', on_delete=models.CASCADE)
