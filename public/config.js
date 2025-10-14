export const config = {
  header: {
    styleDir: '/header.css',
    css() {
      const linkElement = document.createElement('link');
      linkElement.href = this.styleDir;
      linkElement.rel = 'stylesheet';

      return linkElement;
    },

    innerHTML: `<h1>Comentaries Blog</h1>
      <nav>
        <ul>
          <li><a href="/">Home</a></li>
          <li><a href="/login">Login</a></li>
          <li><a href="/register">Register</a></li>
        </ul>
      </nav>`,

    hElement() {
      const headerEl = document.createElement('header');

      headerEl.innerHTML = this.innerHTML;
      return headerEl;
    }
  }
}

export default (body = document.body, head = document.head) => {
  console.log('testing');
  body.prepend(config.header.hElement());
  head.prepend(config.header.css());
}