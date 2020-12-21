# News Listing Demo Application

[A live demo of this application can be launched from here](https://gifted-meitner-01130b.netlify.app/).

This web applications displays news articles in a structured list so site users can easily view and consume news content. This application pulls the latest articles into a visually engaging layout.

The latest news articles are provided through a mock API.

Each news article is shown in an Article Card which displays a thumbnail image of the article including a title and short description. The card also shows the subject, author and date of the article.

The entire card is a link to the actual article. When the user hovers over the card:
* The image animates with a subtle zoom effect.
* The background colour of the text panel transitions to a light grey.

When the user clicks on the article card, the user will be taken to the article page.

Users can also filter articles by topic which are automatically displayed at the top of the page.

When the user hovers over a filter tag:
* The text changes to a lighter shade.
* The overline animates and grows from left to right.

When the user clicks on a filter tag:
* The tag enters into a `selected` state where:
    * The text changes colour to white.
    * The overline changes colour to white.
* The URL query params updates with the preselected filter tags.
* The articles will update and only display the filtered News Articles.

When the user clicks on `Reset` or `All Categories`:
* All selected filters return to the `unselected` state.
* The URL query params are reset.

## Assumptions
* The user can select multiple filters at a time.
* Filters will behave like checkboxes or toggle switches.
* If filters exceed the width of the page, they will wrap to the next line.
* For mobile view, a line is displayed underneath each active filter.


## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn serve
```

### Compiles and minifies for production
```
yarn build
```

### Run your unit tests
```
yarn test:unit
```

### Lints and fixes files
```
yarn lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
