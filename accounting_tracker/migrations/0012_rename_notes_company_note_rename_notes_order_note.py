# Generated by Django 4.1.7 on 2023-03-17 13:22

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('accounting_tracker', '0011_remove_order_created_at_remove_order_updated_at'),
    ]

    operations = [
        migrations.RenameField(
            model_name='company',
            old_name='note',
            new_name='note',
        ),
        migrations.RenameField(
            model_name='order',
            old_name='note',
            new_name='note',
        ),
    ]
