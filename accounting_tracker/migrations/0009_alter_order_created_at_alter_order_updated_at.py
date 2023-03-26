# Generated by Django 4.1.7 on 2023-03-14 14:32

from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ('accounting_tracker', '0008_order_created_at_order_updated_at'),
    ]

    operations = [
        migrations.AlterField(
            model_name='order',
            name='created_at',
            field=models.DateField(default=django.utils.timezone.now, editable=False),
        ),
        migrations.AlterField(
            model_name='order',
            name='updated_at',
            field=models.DateField(default=django.utils.timezone.now),
        ),
    ]
