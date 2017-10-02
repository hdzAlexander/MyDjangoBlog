# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Article',
            fields=[
                ('id', models.AutoField(serialize=False, primary_key=True, verbose_name='ID', auto_created=True)),
                ('title', models.CharField(verbose_name='标题', max_length=50)),
                ('text', models.TextField(verbose_name='正文')),
                ('text_format', models.TextField(verbose_name='html格式', default='')),
                ('publish_time', models.DateTimeField(auto_now_add=True, verbose_name='发布时间')),
                ('last_modify_time', models.DateTimeField(auto_now=True, verbose_name='修改时间')),
                ('abstract', models.CharField(blank=True, null=True, max_length=50, verbose_name='文章摘要')),
                ('likes_count', models.PositiveIntegerField(verbose_name='点赞数', default=0)),
                ('browse_count', models.PositiveIntegerField(verbose_name='浏览数', default=0)),
                ('top', models.BooleanField(default=False, verbose_name='置顶')),
            ],
            options={
                'ordering': ['-publish_time'],
            },
        ),
        migrations.CreateModel(
            name='Category',
            fields=[
                ('id', models.AutoField(serialize=False, primary_key=True, verbose_name='ID', auto_created=True)),
                ('name', models.CharField(verbose_name='分类名', unique=True, max_length=20)),
                ('describe', models.CharField(verbose_name='分类描述', default='null', max_length=100)),
                ('created_time', models.DateTimeField(auto_now_add=True, verbose_name='创建时间')),
                ('last_modify_time', models.DateTimeField(auto_now=True, verbose_name='修改时间')),
            ],
        ),
        migrations.CreateModel(
            name='User',
            fields=[
                ('id', models.AutoField(serialize=False, primary_key=True, verbose_name='ID', auto_created=True)),
                ('username', models.CharField(verbose_name='用户名', unique=True, max_length=20)),
                ('password', models.CharField(verbose_name='密码', max_length=20)),
                ('created_time', models.DateTimeField(auto_now_add=True, verbose_name='创建时间')),
                ('nickname', models.CharField(verbose_name='昵称', max_length=20)),
                ('assign', models.CharField(unique=True, max_length=30)),
                ('sign', models.CharField(verbose_name='签名', default='', max_length=100)),
            ],
        ),
        migrations.AddField(
            model_name='article',
            name='category',
            field=models.ForeignKey(to='blog.Category', verbose_name='分类'),
        ),
    ]
