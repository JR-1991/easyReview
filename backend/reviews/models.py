import uuid
from django.db import models
from django.utils import timezone


class Reviewer(models.Model):
    username = models.CharField(max_length=100)
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    email = models.EmailField()
    affiliation = models.CharField(max_length=100, blank=True)

    def __str__(self):
        return f"{self.first_name}-{self.last_name}"


class Review(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    reviewer = models.ForeignKey(
        Reviewer,
        on_delete=models.DO_NOTHING,
        related_name="reviews",
        blank=True,
        null=True,
    )
    doi = models.CharField(max_length=100, blank=True)
    site_url = models.URLField(null=True, blank=True)
    revision = models.PositiveSmallIntegerField()
    accepted = models.BooleanField(default=False)
    date = models.DateTimeField(default=timezone.now)

    def __str__(self) -> str:
        return self.doi


class Metadatablock(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    review = models.ForeignKey(
        Review, on_delete=models.CASCADE, related_name="metadatablocks"
    )
    name = models.CharField(max_length=100)
    description = models.TextField(blank=True)

    def __str__(self) -> str:
        return f"{self.review} - Block: {self.name}"


class Field(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    metadatablock = models.ForeignKey(
        Metadatablock,
        on_delete=models.CASCADE,
        null=True,
        blank=True,
        related_name="primitives",
    )

    compound = models.ForeignKey(
        "Compound",
        on_delete=models.CASCADE,
        null=True,
        blank=True,
        related_name="primitives",
    )

    name = models.CharField(max_length=100)
    description = models.TextField(blank=True)
    accepted = models.BooleanField(default=None, null=True)
    chat = models.JSONField(default=dict, blank=True)
    value = models.TextField()
    history = models.JSONField(default=dict, blank=True)
    field_type = models.CharField(default="primitive", max_length=100, editable=False)

    def __str__(self) -> str:
        if self.metadatablock:
            return f"{self.metadatablock} - Primitive: {self.name}"
        else:
            return f"{self.compound}- Primitive: {self.name}"


class Compound(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    metadatablock = models.ForeignKey(
        Metadatablock, on_delete=models.CASCADE, related_name="compounds"
    )

    name = models.CharField(max_length=100)
    description = models.TextField(blank=True)
    accepted = models.BooleanField(default=False)
    chat = models.JSONField(default=dict, blank=True)
    field_type = models.CharField(default="compound", max_length=100, editable=False)

    def __str__(self) -> str:
        return f"{self.metadatablock} - Compound: {self.name}"
