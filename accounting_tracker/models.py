from django.db import models
from django.utils import timezone
import uuid
# Create your models here.

class Contact(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=30, null=False, blank=False)
    phone = models.CharField(max_length=30, null=True, blank=True)
    email = models.CharField(max_length=50, null=True, blank=True)

    def __str__(self):
        return f'{self.name} + {self.phone}'

class Company(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=30)
    address = models.CharField(max_length=30, null=True, blank=True)
    zip_code = models.CharField(max_length=10, null=True, blank=True)
    phone = models.CharField(max_length=30, null=True, blank=True)
    email = models.CharField(max_length=50, null=True, blank=True)
    contacts = models.ManyToManyField('Contact', related_name='contacts', null=True, blank=True)
    tax_id = models.CharField(max_length=30, null=True, blank=True)
    note = models.CharField(max_length=1000, null=True, blank=True)

    def __str__(self):
        return self.name


class PaymentType(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    type = models.CharField(max_length=30)

    def __str__(self):
        return self.type

class Order(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    content = models.CharField(max_length=100, null=False, blank=False)
    company = models.ForeignKey('Company', on_delete=models.PROTECT, null=False, blank=False)
    untaxed_total = models.DecimalField(max_digits=10, decimal_places=0, null=False, blank=False)
    taxed_total = models.DecimalField(max_digits=10, decimal_places=0, null=False, blank=False)
    payment_type = models.ForeignKey('PaymentType', on_delete=models.PROTECT, null=True, blank=True)
    payment_amount = models.DecimalField(max_digits=10, decimal_places=0, default=0, blank=False)
    payment_received_date = models.DateField(null=True, blank=True)
    bank_account = models.CharField(max_length=10, null=True, blank=True)
    invoice_number = models.CharField(max_length=20, null=True, blank=True, unique=True)
    order_date = models.DateField(null=True, blank=True)
    # status = models.ForeignKey('Status', on_delete=models.PROTECT, null=False, blank=False)
    note = models.CharField(max_length=1000, null=True, blank=True)
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f'{self.company} + {self.content} + {self.timestamp}'

# class Status(models.Model):
#     id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
#     status = models.CharField(max_length=5)

#     def __str__(self):
#         return self.status