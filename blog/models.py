from django.db import models
from django.db.models.query import QuerySet
from django.core.serializers import serialize
from django.utils.timezone import now
import time
import datetime
import json

class Article(models.Model):
    title = models.CharField('标题', max_length=50)
    text = models.TextField('正文')
    text_format = models.TextField('html格式', default='')
    publish_time = models.DateTimeField('发布时间', auto_now_add=True)
    last_modify_time = models.DateTimeField('修改时间', auto_now=True)
    abstract = models.CharField('文章摘要', max_length=50, blank=True, null=True)
    likes_count = models.PositiveIntegerField('点赞数', default=0)
    browse_count = models.PositiveIntegerField('浏览数', default=0)
    top = models.BooleanField('置顶', default=False)

    category = models.ForeignKey('Category', verbose_name='分类')

    def __str__(self):
        return self.title

    class Meta:
        ordering = ['-publish_time']


class Category(models.Model):
    name = models.CharField('分类名', max_length=20, unique=True)
    describe = models.CharField('分类描述', max_length=100, default='null')
    created_time = models.DateTimeField('创建时间', auto_now_add=True)
    last_modify_time = models.DateTimeField('修改时间', auto_now=True)

    def __str__(self):
        return self.name


class User(models.Model):
    username = models.CharField('用户名',max_length=20, unique=True)
    password = models.CharField('密码', max_length=20)
    created_time = models.DateTimeField('创建时间', auto_now_add=True)
    nickname = models.CharField('昵称', max_length=20)
    assign = models.CharField(unique=True, max_length=30)
    sign = models.CharField('签名' ,max_length=100, default="")


    def __str__(self):
        return self.username




def getObject(obj):
    if isinstance(obj, QuerySet):
        fields = []
        for data in obj:
            json_data = serialize('json', [data])[1:-1]
            dic_data = json.loads(json_data)['fields']
            dic_data['id'] = data.id
            fields.append(dic_data)
        return fields
    if isinstance(obj, models.Model):
        json_data = serialize('json', [obj])[1:-1]
        dic_data = json.loads(json_data)['fields']
        dic_data['id'] = obj.id
        return dic_data

