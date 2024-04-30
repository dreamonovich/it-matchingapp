from django.db.models import Q

from .models import Like, Match


def check_and_create_match(user1_id, user2_id):
    user1_likes_user2 = Like.objects.filter(user1_id=user1_id, user2_id=user2_id)
    user2_likes_user1 = Like.objects.filter(user1_id=user2_id, user2_id=user1_id)

    if user1_likes_user2.exists() and user2_likes_user1.exists():
        user1_likes_user2.delete()
        user2_likes_user1.delete()

        Match.objects.create(user1_id=user1_id, user2_id=user2_id)

def get_matched_users_ids(user1):
    user1_matches = Match.objects.filter(Q(user1_id=user1.id) | Q(user2_id=user1.id))

    matched_users_ids = []
    for match in user1_matches:
        if match.user1_id == user1.id:
            matched_users_ids.append(match.user2_id)
        else:
            matched_users_ids.append(match.user1_id)

    return matched_users_ids