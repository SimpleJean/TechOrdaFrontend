const POST_URL = 'https://jsonplaceholder.typicode.com/posts';
const COMMENT_URL = 'https://jsonplaceholder.typicode.com/comments';

const container = document.querySelector('#container');

function getPost() {
  return axios.get(POST_URL, {
    params: {
      _limit: 10,
    },
  });
}

function getComments() {
  return axios.get(COMMENT_URL, {
    params: {
      _limit: 50,
    },
  });
}

const data = Promise.all([getPost(), getComments()])
  .then(function (result) {
    const [...postData] = result[0].data;
    const [...commentsData] = result[1].data;
    let counter = 1;
    console.log(postData.length);
    console.log(commentsData);

    if (postData.length <= 0 && commentsData.length <= 0) {
      const div = document.createElement('div');
      const title = document.createElement('h1');
      title.textContent = 'Loading';
      container.appendChild(div);
      div.appendChild(title);
    }

    postData.map((post) => {
      const div = document.createElement('div');
      const title = document.createElement('h3');
      const para = document.createElement('p');
      div.classList = 'post-wrapper';
      title.textContent = post.title;
      title.classList = 'title';
      para.textContent = post.body;
      para.classList = 'paragraph';

      container.appendChild(div);
      div.appendChild(title);
      div.appendChild(para);

      const commentTitle = document.createElement('h4');
      commentTitle.textContent = 'Comments';
      div.appendChild(commentTitle);

      commentsData.map((comment) => {
        if (comment.postId === post.id) {
          const comments = document.createElement('p');
          const userName = document.createElement('p');
          const userEmail = document.createElement('p');
          comments.textContent = `${comment.id}. ${comment.body}`;
          comments.classList = 'comments';

          userName.textContent = `Name: ${comment.name}`;
          userEmail.textContent = `Email: ${comment.email}`;
          div.appendChild(comments);
          div.append(userName);
          div.append(userEmail);
        }
      });
    });
  })
  .catch((err) => {
    const div = document.createElement('div');
    const title = document.createElement('h3');
    const para = document.createElement('p');

    title.textContent = err.message;
    para.textContent = err.code;

    container.appendChild(div);
    div.appendChild(title);
    div.appendChild(para);
  });
console.log();
