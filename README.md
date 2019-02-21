# adventure-land
A public repository of dubious adventure.land scripts

## Libraries and Dependencies Used By Adventure.land
- [Codemirror](https://codemirror.net/): Browser-based text editor
- [HowlerJS](https://howlerjs.com/): Audio library for the web
- [JQuery](https://jquery.com/): It's...JQuery
- [JQuery UI](https://jqueryui.com/): Draggable
- [Bowser](https://github.com/lancedikson/bowser): Browser detection library
- [js-cookie](https://github.com/js-cookie/js-cookie): JavaScript API for managing cookies
- [PixiJS](http://www.pixijs.com/): 2D WebGL engine
- [socket.io](https://socket.io/): Real-time, bi-directional events/communication


## Linting
Because I am neurotic, I like all of my code to be, if not correct, at least consistently formatted. And no one is more neurotic about code formatting than the folks over at [AirBnB](https://github.com/airbnb/javascript) (seriously). 

Linting is, of course, completely optional. If you want to mix tabs/spaces, camel-case with snake-case, curly braces on the same line but, sometimes, not...Adventure.land will hum along just fine. However, if you are like-minded, here are the steps to setup your environment for ESlint:

Option 1.) Install eslint by running `npm install eslint` in the workspace folder `adventure-land`
Option 2.) Install globally using `npm install -g eslint`.

If you are using VisualStudio Code, I also recommend installing the `ESLint` extension.
