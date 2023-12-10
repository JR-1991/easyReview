from rest_framework import serializers
from reviews.models import Review, Reviewer, Metadatablock, Field, Compound


class FieldSerializer(serializers.ModelSerializer):
    class Meta:
        model = Field
        fields = "__all__"
        ordering = ["name", "description"]


class CompoundSerializer(serializers.ModelSerializer):
    primitives = FieldSerializer(read_only=True, many=True)

    class Meta:
        model = Compound
        fields = "__all__"
        ordering = ["name", "description", "primitives"]


class MetadatablockSerializer(serializers.ModelSerializer):
    primitives = FieldSerializer(read_only=True, many=True)
    compounds = CompoundSerializer(read_only=True, many=True)

    class Meta:
        model = Metadatablock
        fields = "__all__"
        ordering = ["name", "description", "primitives", "compounds"]


class ReviewSerializer(serializers.ModelSerializer):
    metadatablocks = MetadatablockSerializer(read_only=True, many=True)

    class Meta:
        model = Review
        fields = "__all__"
        ordering = ["reviewer", "doi", "site_url", "revision", "accepted", "date"]


class ReviewerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Reviewer
        fields = "__all__"
        ordering = ["first_name", "last_name" "email"]
