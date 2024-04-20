const commentFormHandler = async (event) => {
  event.preventDefault();

  const comment = document.querySelector('#comment').value;
  const blog_id = document.querySelector('#blog_id').value;

  if (comment && blog_id) {
    const response = await fetch('/api/comments', {
      method: 'POST',
      body: JSON.stringify({
        comment,
        blog_id
      }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.reload();
    } else {
      alert(response.statusText);
    }
  }
};
document
  .querySelector('.comment-form')
  .addEventListener('submit', commentFormHandler);