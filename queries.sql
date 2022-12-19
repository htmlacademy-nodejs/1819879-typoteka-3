-- Получить список всех категорий
select c.id, c.name
from categories c

-- Получить список категорий, для которых создана минимум одна публикация
select c.id, c.name
from categories c
       join article_categories ac on ac.category_id = c.id
group by c.id

-- Получить список категорий с количеством публикаций
select c.id, c.name, count(ac.article_id)
from categories c
       left join article_categories ac on ac.category_id = c.id
group by c.id

-- Получить список публикаций, сначала свежие публикации
select articles.*,
       users.first_name,
       users.last_name,
       users.email,
       count(comments.id)                         as comments_count,
       string_agg(distinct categories.name, ', ') as category_list
from articles
       join users on users.id = articles.user_id
       left join comments on comments.article_id = articles.id
       left join article_categories on article_categories.article_id = articles.id
       left join categories on categories.id = article_categories.category_id
group by articles.id, users.id
order by articles.create_at desc

-- Получить полную информацию определённой публикации
select articles.*,
       users.first_name,
       users.last_name,
       users.email,
       count(comments.id)                         as comments_count,
       string_agg(distinct categories.name, ', ') as category_list
from articles
       join users on users.id = articles.user_id
       left join comments on comments.article_id = articles.id
       left join article_categories on article_categories.article_id = articles.id
       left join categories on categories.id = article_categories.category_id
where articles.id = 1
group by articles.id, users.id

-- Получить список из 5 свежих комментариев
select comments.id,
       comments.article_id,
       users.first_name,
       users.last_name,
       comments.text
from comments
       join users on users.id = comments.user_id
order by comments.create_at desc limit 5

-- Получить список комментариев для определённой публикации
select comments.id,
       comments.article_id,
       users.first_name,
       users.last_name,
       comments.text
from comments
       join users on users.id = comments.user_id
where comments.article_id = 3
order by comments.create_at desc

-- Обновить заголовок определённой публикации
update articles
set title = 'Как я встретил Новый год'
where articles.id = 1
