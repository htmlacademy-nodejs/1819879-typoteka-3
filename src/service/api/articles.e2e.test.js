'use strict';

const express = require(`express`);
const request = require(`supertest`);
const articles = require(`./articles`);
const ArticlesService = require(`./../data-service/articles`);
const CommentsService = require(`../data-service/comments`);
const {HttpCode} = require(`../../../constants`);

const mockData = [
  {
    "id": `46838caf-7832-4a72-b747-8e07b6c52d8a`,
    "title": `Ёлки. История деревьев`,
    "announce": `Освоить вёрстку несложно. Возьмите книгу новую книгу и закрепите все упражнения на практике. Процессор заслуживает особого внимания. Он обязательно понравится геймерам со стажем. Альбом стал настоящим открытием года. Мощные гитарные рифы и скоростные соло-партии не дадут заскучать. Моментальное подтверждение`,
    "fullText": `Бороться с прокрастинацией несложно. Просто действуйте. Маленькими шагами. Альбом стал настоящим открытием года. Мощные гитарные рифы и скоростные соло-партии не дадут заскучать. Из под его пера вышло 8 платиновых альбомов. Моментальное подтверждение Игры и программирование разные вещи. Не стоит идти в программисты, если вам нравятся только игры. Достичь успеха помогут ежедневные повторения. Отсутствие сборов за бронирование и использование кредитной карты! Рок-музыка всегда ассоциировалась с протестами. Так ли это на самом деле? Как начать действовать? Для начала просто соберитесь. Процессор заслуживает особого внимания. Он обязательно понравится геймерам со стажем. Рок-музыка всегда ассоциировалась с протестами. Так ли это на самом деле? Вы можете бронировать жилье по предложению «Выгодное начало года» Ёлки — это не просто красивое дерево. Это прочная древесина.`,
    "createdDate": `2022-01-09T18:05:40.440Z`,
    "category": [
      `Разное`,
      `Железо`,
      `Кино`,
      `Без рамки`,
      `Полиграфия`,
    ],
    "comments": [
      {
        "id": `210cd2cb-decc-4d31-acf6-b2ba356e17ee`,
        "text": `Мне не нравится ваш стиль. Ощущение, что вы меня поучаете.`,
      },
      {
        "id": `716a8eaa-0bf3-410d-b7f0-5f93aeea47d2`,
        "text": `Мне кажется или я уже читал это где-то?`,
      },
      {
        "id": `027d9a6c-9929-4f18-82a2-bd9b3b193009`,
        "text": `Это где ж такие красоты?`,
      },
      {
        "id": `05ad3614-9f9a-4df5-831e-642d162c5c01`,
        "text": `Планируете записать видосик на эту тему?`,
      },
      {
        "id": `8fff6eef-6762-427d-9b84-309ffaf870da`,
        "text": `Хочу такую же футболку :-)`,
      },
      {
        "id": `866e5d56-737a-4968-8e9a-0e08543cb242`,
        "text": `Совсем немного...`,
      },
      {
        "id": `005ece83-2af1-4167-b76a-7aac2e28ec84`,
        "text": `Давно не пользуюсь стационарными компьютерами. Ноутбуки победили.`,
      },
    ],
  },
  {
    "id": `a4441193-6be6-4746-a6d0-c3e79a1fddeb`,
    "title": `Учим HTML и CSS`,
    "announce": `Простые ежедневные упражнения помогут достичь успеха. Из под его пера вышло 8 платиновых альбомов.`,
    "fullText": `Золотое сечение — соотношение двух величин, гармоническая пропорция.`,
    "createdDate": `2022-01-30T18:05:40.440Z`,
    "category": [],
    "comments": [
      {
        "id": `2e35a35d-e2a5-4078-aed5-41fedd087bea`,
        "text": `Планируете записать видосик на эту тему?`,
      },
      {
        "id": `94000895-8f07-40a2-881e-9fd58acf1b4f`,
        "text": `Мне не нравится ваш стиль. Ощущение, что вы меня поучаете.`,
      },
    ],
  },
  {
    "id": `433536fb-5c79-47cc-96d4-b286b9a11f1c`,
    "title": `Ремонт ПК`,
    "announce": `Этот смартфон — настоящая находка. Большой и яркий экран, мощнейший процессор — всё это в небольшом гаджете. Первая большая ёлка была установлена только в 1938 году. Простые ежедневные упражнения помогут достичь успеха. Простые ежедневные упражнения помогут достичь успеха. Это один из лучших рок-музыкантов.`,
    "fullText": `Программировать не настолько сложно, как об этом говорят. Регистрация не обязательна Это один из лучших рок-музыкантов.`,
    "createdDate": `2022-01-03T18:05:40.440Z`,
    "category": [
      `Железо`,
      `Инвестиции`,
      `Раковорение`,
      `За жизнь`,
      `Деревья`,
      `Программирование`,
      `Разное`,
      `Музыка`,
    ],
    "comments": [
      {
        "id": `c532d579-16a7-462e-b2e3-3a0905b2749e`,
        "text": `Согласен с автором!`,
      },
      {
        "id": `3eff0fb3-b7dd-4157-8c4b-f0abe1db9479`,
        "text": `Хочу такую же футболку :-)`,
      },
      {
        "id": `6d2395d5-c5e2-433e-b077-b48e4d26a102`,
        "text": `Это где ж такие красоты?`,
      },
      {
        "id": `ea2d8780-367f-449a-aa06-7e3a09efaa98`,
        "text": `Мне не нравится ваш стиль. Ощущение, что вы меня поучаете.`,
      },
    ],
  },
  {
    "id": `b3b195bb-498f-4aeb-8c4b-3cb11eb367e1`,
    "title": `Борьба с прокрастинацией`,
    "announce": `Первая большая ёлка была установлена только в 1938 году.`,
    "fullText": `Это один из лучших рок-музыкантов. Скидки по предложению «Выгодное начало года» начинаются от 15% Ёлки — это не просто красивое дерево. Это прочная древесина. Золотое сечение — соотношение двух величин, гармоническая пропорция. Собрать камни бесконечности легко, если вы прирожденный герой. Вы можете достичь всего. Стоит только немного постараться и запастись книгами. Вы можете бронировать жилье по предложению «Выгодное начало года» Этот смартфон — настоящая находка. Большой и яркий экран, мощнейший процессор — всё это в небольшом гаджете. Достичь успеха помогут ежедневные повторения. Бороться с прокрастинацией несложно. Просто действуйте. Маленькими шагами.`,
    "createdDate": `2021-11-30T18:05:40.440Z`,
    "category": [
      `За жизнь`,
      `Путешествия`,
      `IT`,
      `Раковорение`,
      `Кино`,
      `Железо`,
    ],
    "comments": [
      {
        "id": `eb849f0a-4c34-4722-a1fc-f15889213edc`,
        "text": `Планируете записать видосик на эту тему?`,
      },
      {
        "id": `5c4dde32-aba5-46f2-822c-1cdfd836c513`,
        "text": `Давно не пользуюсь стационарными компьютерами. Ноутбуки победили.`,
      },
      {
        "id": `122771eb-83de-4bbc-a4cf-a362355849d9`,
        "text": `Хочу такую же футболку :-)`,
      },
      {
        "id": `5c0e036b-4ff6-4b80-8621-b67cace5d745`,
        "text": `Совсем немного...`,
      },
      {
        "id": `b674d0f5-fcad-4dd9-a241-8e296bfd14ac`,
        "text": `Согласен с автором!`,
      },
    ],
  },
  {
    "id": `ba60d768-ffa9-4805-9fd3-597e6b8de6c3`,
    "title": `Самый лучший музыкальный альбом этого года`,
    "announce": `Альбом стал настоящим открытием года. Мощные гитарные рифы и скоростные соло-партии не дадут заскучать. Вы можете бронировать жилье по предложению «Выгодное начало года» Процессор заслуживает особого внимания. Он обязательно понравится геймерам со стажем. Рок-музыка всегда ассоциировалась с протестами. Так ли это на самом деле?`,
    "fullText": `Помните, небольшое количество ежедневных упражнений лучше, чем один раз, но много. Регистрация не обязательна Первая большая ёлка была установлена только в 1938 году. Простые ежедневные упражнения помогут достичь успеха. Программировать не настолько сложно, как об этом говорят. Золотое сечение — соотношение двух величин, гармоническая пропорция. Из под его пера вышло 8 платиновых альбомов. Это один из лучших рок-музыкантов. Золотое сечение — соотношение двух величин, гармоническая пропорция. Вы можете бронировать жилье по предложению «Выгодное начало года» Альбом стал настоящим открытием года. Мощные гитарные рифы и скоростные соло-партии не дадут заскучать. Альбом стал настоящим открытием года. Мощные гитарные рифы и скоростные соло-партии не дадут заскучать. Достичь успеха помогут ежедневные повторения. Освоить вёрстку несложно. Возьмите книгу новую книгу и закрепите все упражнения на практике. Этот смартфон — настоящая находка. Большой и яркий экран, мощнейший процессор — всё это в небольшом гаджете.`,
    "createdDate": `2021-11-28T18:05:40.440Z`,
    "category": [
      `Музыка`,
      `Инвестиции`,
      `Железо`,
      `За жизнь`,
    ],
    "comments": [
      {
        "id": `64fe63d1-0e16-49a8-acc2-6bdbaaf0bb1f`,
        "text": `Это где ж такие красоты?`,
      },
      {
        "id": `5ea67784-5734-4373-91bf-db952855d108`,
        "text": `Совсем немного...`,
      },
    ],
  },
  {
    "id": `ac03d94d-1af6-4c7a-8927-6d481793613f`,
    "title": `Лучшие рок-музыканты 20-века`,
    "announce": `Скидки по предложению «Выгодное начало года» начинаются от 15%`,
    "fullText": `Он написал больше 30 хитов. Помните, небольшое количество ежедневных упражнений лучше, чем один раз, но много. Достичь успеха помогут ежедневные повторения. Освоить вёрстку несложно. Возьмите книгу новую книгу и закрепите все упражнения на практике. Как начать действовать? Для начала просто соберитесь.`,
    "createdDate": `2022-01-23T18:05:40.440Z`,
    "category": [
      `Путешествия`,
      `Полиграфия`,
      `Деревья`,
      `Разное`,
      `Раковорение`,
      `Программирование`,
      `IT`,
      `Кулинария`,
    ],
    "comments": [
      {
        "id": `10f70447-ace2-403b-a7f8-eefa4e53d1c7`,
        "text": `Плюсую, но слишком много буквы!`,
      },
    ],
  },
  {
    "id": `3f099d1c-bc1b-4f3c-9ef8-0ca2c8e37dd4`,
    "title": `Обзор новейшего смартфона`,
    "announce": `Это один из лучших рок-музыкантов. Золотое сечение — соотношение двух величин, гармоническая пропорция.`,
    "fullText": ``,
    "createdDate": `2022-01-06T18:05:40.440Z`,
    "category": [
      `Путешествия`,
      `Инвестиции`,
      `Без рамки`,
      `Программирование`,
      `IT`,
    ],
    "comments": [
      {
        "id": `2a2c635a-3bb9-4223-bc60-2d87e7347073`,
        "text": `Плюсую, но слишком много буквы!`,
      },
      {
        "id": `cb5d2293-b67d-4e85-a21e-6e0faf8afa66`,
        "text": `Планируете записать видосик на эту тему?`,
      },
      {
        "id": `8a7ce55e-e798-4527-8a97-0ef8115b7870`,
        "text": `Мне не нравится ваш стиль. Ощущение, что вы меня поучаете.`,
      },
    ],
  },
];

const app = express();
app.use(express.json());

articles(app, new ArticlesService(mockData), new CommentsService());

const createAPI = () => {
  const cloneData = JSON.parse(JSON.stringify(mockData));
  const cloneApp = express();
  cloneApp.use(express.json());
  articles(cloneApp, new ArticlesService(cloneData), new CommentsService());
  return cloneApp;
};

describe(`API returns a list of all articles`, () => {
  const appArticle = createAPI();

  let resArticles;

  beforeAll(async () => {
    resArticles = await request(appArticle).get(`/articles`);
  });

  test(`Status code 200`, () => expect(resArticles.statusCode).toBe(HttpCode.OK));

  test(`Returns 7 elements of articles`, () => expect(resArticles.body.length).toBe(7));

  test(`First article's id is equal "46838caf-7832-4a72-b747-8e07b6c52d8a"`,
      () => expect(resArticles.body[0].id).toBe(`46838caf-7832-4a72-b747-8e07b6c52d8a`));
});

describe(`API returns a article's is equals id "a4441193-6be6-4746-a6d0-c3e79a1fddeb"`, () => {
  const appArticleById = createAPI();

  let response;

  beforeAll(async () => {
    response = await request(appArticleById).get(`/articles/a4441193-6be6-4746-a6d0-c3e79a1fddeb`);
  });

  test(`Status code 200`, () => expect(response.statusCode).toBe(HttpCode.OK));
  test(`Article's title is "Учим HTML и CSS"`, () => expect(response.body.title).toBe(`Учим HTML и CSS`));
});

describe(`API creates an article if data is valid`, () => {
  const newArticle = {
    "title": `Шляпа заголовок`,
    "announce": `Шляпка`,
    "fullText": `Полная шляпа`,
    "category": [
      `Шляпная категория`,
    ],
  };

  const appCreateArticle = createAPI();

  let response;

  beforeAll(async () => {
    response = await request(appCreateArticle).post(`/articles`).send(newArticle);
  });

  test(`Status code 201`, () => expect(response.statusCode).toBe(HttpCode.CREATED));
  test(`Returns created article'`, () => expect(response.body).toEqual(expect.objectContaining(newArticle)));
  test(`Count articles is changed'`, () => request(appCreateArticle)
    .get(`/articles`).expect((res) => expect(res.body.length).toBe(8)));
});

describe(`API refuses create an article if data is invalid`, () => {
  const newArticle = {
    "title": `Шляпа заголовок`,
    "announce": `Шляпка`,
    "fullText": `Полная шляпа`,
    "category": [
      `Шляпная категория`,
    ],
  };

  const appCreateInvalidArticle = createAPI();

  test(`Without any required property response code is 400`, () => {
    Object.keys(newArticle).forEach(async (keyArticle) => {
      const badArticle = {...newArticle};
      delete badArticle[keyArticle];
      const response = await request(appCreateInvalidArticle).post(`/articles`).send(badArticle);
      expect(response.statusCode).toBe(HttpCode.BAD_REQUEST);
    });
  });
});

describe(`API success changed an article`, () => {
  const newArticle = {
    "title": `Шляпа заголовок`,
    "announce": `Шляпка`,
    "fullText": `Полная шляпа`,
    "category": [
      `Шляпная категория`,
    ],
  };

  const appChangeArticle = createAPI();

  let response;

  beforeAll(async () => {
    response = await request(appChangeArticle).put(`/articles/a4441193-6be6-4746-a6d0-c3e79a1fddeb`).send(newArticle);
  });

  test(`API request 200`, () => expect(response.statusCode).toBe(HttpCode.OK));
  test(`Return changed article`, () => expect(response.body).toEqual(expect.objectContaining(newArticle)));
  test(`Article is really changed`, async () => {
    const responseGet = await request(appChangeArticle).get(`/articles/a4441193-6be6-4746-a6d0-c3e79a1fddeb`);
    expect(responseGet.body.title).toBe(`Шляпа заголовок`);
  });
  test(`API return status code 404 with non-existent article when changed article`, async () => {
    const validArticle = {
      "title": `Шляпа заголовок`,
      "announce": `Шляпка`,
      "fullText": `Полная шляпа`,
      "category": [
        `Шляпная категория`,
      ],
    };

    const resNonArticle = await request(appChangeArticle).put(`/articles/non-existent`).send(validArticle);
    expect(resNonArticle.statusCode).toBe(HttpCode.NOT_FOUND);
  });
  test(`API return status code 400 with invalid data change article`, async () => {
    const invalidArticle = {
      "title": `Шляпа заголовок`,
      "announce": `Шляпка`,
      "fullText": `Полная шляпа`,
    };

    const resInvalidData = await request(appChangeArticle).put(`/articles/a4441193-6be6-4746-a6d0-c3e79a1fddeb`).send(invalidArticle);
    expect(resInvalidData.statusCode).toBe(HttpCode.BAD_REQUEST);
  });
});

describe(`API correctly deletes an article`, () => {
  const appDeleteArticle = createAPI();

  let response;

  beforeAll(async () => {
    response = await request(appDeleteArticle).delete(`/articles/a4441193-6be6-4746-a6d0-c3e79a1fddeb`);
  });

  test(`Response 200`, () => expect(response.statusCode).toBe(HttpCode.OK));
  test(`Returns deleted article`, () => expect(response.body.id).toBe(`a4441193-6be6-4746-a6d0-c3e79a1fddeb`));
  test(`After deleted is 6 articles`, async () => {
    const postDeletedArticle = await request(appDeleteArticle).get(`/articles`);
    expect(postDeletedArticle.body.length).toBe(6);
  });
  test(`API refused non-existent article`, async () => {
    const responseInvalidDeleted = await request(appDeleteArticle).delete(`/articles/non-existent`);
    expect(responseInvalidDeleted.statusCode).toBe(HttpCode.NOT_FOUND);
  });
});

describe(`API article's comments returned data by article id`, () => {
  const appComments = createAPI();

  let response;

  beforeAll(async () => {
    response = await request(appComments).get(`/articles/a4441193-6be6-4746-a6d0-c3e79a1fddeb/comments`);
  });

  test(`API returned 200 when get comments`, () => expect(response.statusCode).toBe(HttpCode.OK));
  test(`API returned count 2 comments`, () => expect(response.body.length).toBe(2));
});

describe(`API delete article's comments returned 404 by invalid ids`, () => {
  const appInvalidComments = createAPI();

  let resDeletedComment;

  beforeAll(async () => {
    resDeletedComment = await request(appInvalidComments).delete(`/articles/a4441193-6be6-4746-a6d0-c3e79a1fddeb/comments/2e35a35d-e2a5-4078-aed5-41fedd087bea`);
  });

  test(`API delete returned 200`, () => expect(resDeletedComment.statusCode).toBe(HttpCode.OK));
  test(`API delete returned deleted comment`, () => expect(resDeletedComment.body.text).toBe(`Планируете записать видосик на эту тему?`));
});

describe(`API delete article's comments returned 404 by invalid ids`, () => {
  const appCommentsInvalidIds = createAPI();

  let resInvalidArticleId;
  let resInvalidCommentId;

  beforeAll(async () => {
    resInvalidArticleId = await request(appCommentsInvalidIds).delete(`/articles/non-existent/comments`);
    resInvalidCommentId = await request(appCommentsInvalidIds).delete(`/articles/a4441193-6be6-4746-a6d0-c3e79a1fddeb/comments/non-existent`);
  });

  test(`API returned 404 by invalid article Id`, () => expect(resInvalidArticleId.statusCode).toBe(HttpCode.NOT_FOUND));
  test(`API returned 404 by invalid comment Id`, () => expect(resInvalidCommentId.statusCode).toBe(HttpCode.NOT_FOUND));
});
