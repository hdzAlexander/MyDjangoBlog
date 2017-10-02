from django.shortcuts import render
from django.http import HttpResponse
from django.views.generic import ListView
from .models import Article, Category, getObject, User
import json
from random import Random


''' http '''
def get_article_list(request):
    article = Article.objects.all()
    if request.GET.get('category') != None:
        article = Article.objects.filter(category=Category.objects.get(name=request.GET.get('category')))
    limit_size = request.GET.get('limitSize')
    limit_size = article.count() if limit_size == None else int(limit_size)
    page_count = article.count() / limit_size if article.count() % limit_size == 0 else int(article.count() / limit_size) + 1
    page = request.GET.get('page')
    if page == None:
        article_list = getObject(article)[0:limit_size]
    else:
        article_list = getObject(article)[(int(page) - 1) * limit_size:int(page) * limit_size]
    return HttpResponse(json.dumps({
        'code': 200,
        'data': {
            'page': 1 if page == None else page,
            'page_count': page_count,
            'article_list': article_list,
            'limit_size': limit_size,
            'category': request.GET.get('category')
        }
    }))


def get_article_detail(request, article_id):
    article = Article.objects.get(pk=article_id)
    dic_data = getObject(article)
    dic_data['category'] = article.category.name
    json_data = json.dumps({
        'code': 200,
        'data': dic_data
    })
    return HttpResponse(json_data)

def change_article_detail(request, article_id):
    if (request.method == "POST"):
        article = Article.objects.get(pk=article_id)
        data = json.loads(request.body)
        article.text = data['text']
        article.text_format = data['text_format']
        article.title = data['title']
        article.save()
        dic_data = getObject(article)
        dic_data['category'] = article.category.name
        return HttpResponse(json.dumps({
            'code': 200,
            'data': {
                "article_detail": dic_data
            }
        }))
    else:
        return HttpResponse(json.dumps({
            "code": 400,
            "data": 'reqeust error'
        }))

def get_category_list(request):
    category = Category.objects.all()
    arr_category = getObject(category)
    for index, cat in enumerate(category):
        article_list = cat.article_set.all()
        arr_category[index]['article_list'] = getObject(article_list)
    return HttpResponse(json.dumps({
        "code": 200,
        "data": {
            "category_list":arr_category
        }
    }))

def create_article(request):
    if request.method == "POST":
        data = json.loads(request.body)
        filter_category = Category.objects.filter(name=data['category'])
        if filter_category.count() == 0:
            category = create_category(data['category'])
        else:
            category = filter_category[0]
        article = Article(title=data['title'], text=data['text'], text_format=data['text_format'], category=category)
        article.save()
        return HttpResponse(json.dumps({
            "code":200,
            "data":{
                "article_detail": getObject(article)
            }
        }))
    else:
        return HttpResponse(json.dumps({
            "code": 204,
            "data": "发送请求出错"
        }))



def change_category(request):
    if request.method == "POST":
        data = json.loads(request.body)
        category = Category.objects.get(name=data['old_name'])
        category.name = data['new_name']
        category.describe = data['describe']
        category.save()
        return HttpResponse(json.dumps({
            'code':200,
            'data': {
                'category': getObject(category)
            }
        }))
    else:
        return HttpResponse(json.dumps({
            'code':204,
            "data":"发送请求出错"
        }))


def get_category_detail(request, category_name):
    category = Category.objects.get(name=category_name)
    return HttpResponse(json.dumps({
        'code':200,
        'data': {
            'category': category
        }
    }))

def create_new_category(request):
    if request.method == "POST":
        data = json.loads(request.body)
        category = Category(name=data['name'], describe=data['describe'])
        category.save()
        return HttpResponse(json.dumps({
            'code':200,
            'data': {
                'category': getObject(category)
            }
        }))
    else:
        return HttpResponse(json.dumps({
            'code':204,
            "data":"发送请求出错"
        }))


def check_username_effective(request):
    data = json.loads(request.body)
    username = data['username']
    if User.objects.filter(username=username).count() == 0:
        response = HttpResponse(json.dumps({
            'code':200,
            "data":'用户名可用'
        }))
    else:
        response = HttpResponse(json.dumps({
            'code': 202,
            'data': '用户名已存在'
        }))
    return get_http_response('POST', request, response)

def register(request):
    if request.method == "GET":
        return render(request, 'blog/user/register.html')
    elif request.method == "POST":
        data = json.loads(request.body)
        user = User(username=data['username'], nickname=data['nickname'], password=data['password'], assign=get_effective_assign(User))
        user.save()
        return HttpResponse(json.dumps({
            'code':200,
            'data': {
                'user': getObject(user)
            }
        }))
    else:
        return HttpResponse(json.dumps({
            'code': 204,
            "data": "发送请求出错"
        }))


def add_browser_count(request):
    if (request.method == "POST"):
        data = json.loads(request.body)
        article = Article.objects.get(pk=data['article_id'])
        article.browse_count = str(int(article.browse_count) + 1)
        article.save()
        return HttpResponse(json.dumps({
            'code': 200,
            'data': {
                "browse_count": article.browse_count
            }
        }))

def add_like_count(request):
    if (request.method == "POST"):
        data = json.loads(request.body)
        article = Article.objects.get(pk=data['article_id'])
        article.likes_count = str(int(article.likes_count) + 1)
        article.save()
        return HttpResponse(json.dumps({
            'code': 200,
            'data': {
                "likes_count": article.likes_count
            }
        }))


''' render template '''

def nullView(request):
    return HttpResponse("首页默认显示为空，请登录后操作。")


def index(request):
    category_list = Category.objects.all()
    page = request.GET.get('page')

    return render(request, 'blog/index.html', {
        'category_list':category_list,
        'page': page
    })


def article_detail(request, article_id):
    article = Article.objects.get(pk=article_id)
    return render(request, 'blog/article/article_detail.html', {
        'article_detail': article
    })

def article_edit(request, article_id):
    article = Article.objects.get(pk=article_id)
    return render(request, 'blog/article/article_edit.html', {
        'article_detail': article
    })


def article_index(request):
    article = Article.objects.all()
    page = request.GET.get('page')
    return render(request, 'blog/article/article_index.html', {
        "article_list": article,
        'page': page
    })


def category_index(request):
    category = Category.objects.all()

    return render(request, 'blog/category/category_index.html', {
        "category_list": category
    })


def article_with_category(request, category_name):
    category = Category.objects.get(name=category_name)
    return render(request, 'blog/article/article_with_category.html', {
        "category_name": category_name,
        "category_describe": getObject(category)["describe"]
    })

def article_new(request):
    return render(request, 'blog/article/article_new.html')


def to_sign_in(request):
    return render(request, 'blog/user/signin.html')


''' function '''
def get_http_response(method, request, response):
    if (request.method != method):
        return HttpResponse(json.dumps({
            'code': 204,
            "data": "发送请求出错"
        }))
    else:
        return response



def create_category(category_name):
    category = Category(name=category_name)
    category.save()
    return category

def random_str(randomlength=20):
    str = ''
    chars = 'AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz0123456789'
    length = len(chars) - 1
    random = Random()
    for i in range(randomlength):
        str += chars[random.randint(0, length)]
    return str



def get_effective_assign(judge_model):
    while (1):
        assign = random_str()
        if judge_model.objects.filter(assign=assign).count() == 0:
            return assign