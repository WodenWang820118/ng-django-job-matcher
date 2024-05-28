# myapp/serializers.py

from rest_framework import serializers
from .models import CosineSimilarity

class CosineSimilaritySerializer(serializers.ModelSerializer):
    class Meta:
        model = CosineSimilarity
        fields = '__all__'
