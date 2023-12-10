from django.contrib import admin

from .models import Review, Reviewer, Field, Metadatablock, Compound

# Register your models here.
admin.site.register(Review)
admin.site.register(Reviewer)
admin.site.register(Metadatablock)
admin.site.register(Field)
admin.site.register(Compound)