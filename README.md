# Right-click Open URL

Sometimes URLs are not linked.

This means you have to copy and paste them.

This extension adds a context menu item to open a URL that has been selected.

I'd like to add support to open a URL that is right-clicked on *without* having to select it first, but I haven't figured out how to do this yet.

The WebExtensions API doesn't have a way to connect a context menu opening to the coordinates of the originating right-click, which means you can't walk the interaction back.

I'll probably have to do something terrible, like:

* run a content script in all web pages
* which detects right-clicks
* if the text under the click is a url
* sends a message with the url to the background script
* and if that message is received at same timeframe of a context menu opening event
* then use that url

Will need to experiment with event times to see if it is possible.

Also need to file an issue to request some way to do this, like maybe an xpath for click target?
