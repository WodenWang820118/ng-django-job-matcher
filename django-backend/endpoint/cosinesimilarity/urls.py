# myapp/urls.py

from django.urls import path
from .views import cosine_similarity_view

urlpatterns = [
    path('cosinesimilarity/', cosine_similarity_view, name='cosine_similarity'),
]
