# mdn-contributor-board

An automation tool for the MDN Web Docs contributor project board. This workflow syncs issues to this project board for new contributors to help out, specifically the following labels:

- `help wanted`
- `good first issue`
- `accepting pr`
- `accepting prs`
- `PR welcome`

**Project Board**: https://github.com/orgs/mdn/projects/25/views/1

### Tracked Repositories (22)

**Documentation & Platform:**

- mdn/content, mdn/browser-compat-data
- mdn/fred, mdn/rari

**Examples:**

- mdn/interactive-examples, mdn/css-examples, mdn/html-examples
- mdn/js-examples, mdn/dom-examples, mdn/webaudio-examples
- mdn/webassembly-examples, mdn/pwa-examples
- mdn/webextensions-examples, mdn/web-components-examples
- mdn/houdini-examples

**Tutorials:**

- mdn/express-locallibrary-tutorial
- mdn/django-locallibrary-tutorial
- mdn/django-diy-blog, mdn/todo-vue
- mdn/beginner-html-site, mdn/beginner-html-site-styled

**Tools:**

- mdn/mdn-http-observatory

### Tracked Labels

- `help wanted`
- `good first issue`
- `accepting pr`
- `accepting prs`
- `PR welcome`

## Configuration

### Add More Repositories

Edit `sync-to-board.js`:

```javascript
const REPOS = [
  "fred",
  "content",
  "your-new-repo", // Add here
  // ...
];
```

### Add More Labels

Edit `sync-to-board.js`:

```javascript
const LABELS = [
  "help wanted",
  "good first issue",
  "your-custom-label", // Add here
];
```

### MDN Resources

- [Contributing to MDN](https://github.com/mdn/content/blob/main/CONTRIBUTING.md)
- [MDN Discord](https://discord.gg/mdn)
- [MDN Discussions](https://github.com/orgs/mdn/discussions)

## License

MIT License - Feel free to adapt for your own projects!

## Acknowledgments

Built for the MDN Web Docs community. ❤️
