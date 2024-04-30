from django.contrib.auth.models import AbstractUser
from django.core.validators import RegexValidator
from django.db import models

class Profile(AbstractUser):
    login = models.CharField(
        max_length=30,
        unique=True,
        validators=(
            RegexValidator(
                regex=r"^[a-zA-Z0-9-]+$",
                message="Not valid login.",
            ),
        ),
    )
    password = models.CharField(
        max_length=100,
        validators=[
                RegexValidator(
                regex=r"^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}$",
                message="Password must contain at least one Latin character in lowercase, one Latin character in uppercase, and one digit, and one special. And have len more than 6.",
            ),
        ],
    )
    telegram_username = models.CharField(
        max_length=30,
        unique=True,
        validators=[
            RegexValidator(
                regex=r'^@[\w]+$',
                message='Username must start with "@" and contain only letters, digits, or underscores.',
            ),
        ]
    )
    bio = models.TextField(
        max_length=500,
        null=True,
    )
    role = models.CharField(max_length=30, null=True)
    stack = models.CharField(max_length=50, null=True)
    age = models.PositiveSmallIntegerField(null=True, blank=True)
    image = models.ImageField(upload_to="images/", null=True)