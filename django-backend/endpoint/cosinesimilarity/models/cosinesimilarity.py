# myapp/models/blogpost.py

from django.db import models

class CosineSimilarity(models.Model):
    resume = models.TextField()
    content = models.TextField()

    class Meta:
        app_label = 'cosinesimilarity'

    def __str__(self):
        return self.title
