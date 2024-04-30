# Generated by Django 5.0.4 on 2024-04-25 22:14

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('user', '0003_matchrequest'),
    ]

    operations = [
        migrations.CreateModel(
            name='MatchReject',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('user1', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='match_reject_as_user1', to=settings.AUTH_USER_MODEL)),
                ('user2', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='match_reject_as_user2', to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]