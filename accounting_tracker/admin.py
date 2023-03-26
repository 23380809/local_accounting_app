from django.contrib import admin
from .models import Contact, Company, PaymentType, Order

admin.site.register(Contact)
admin.site.register(Company)
admin.site.register(PaymentType)
admin.site.register(Order)