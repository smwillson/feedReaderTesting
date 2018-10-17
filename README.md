# Feed Reader Testing

## How to download/clone the project?

In order to clone the project onto your computer via HTTPS URLs (recommended) do the following:

1. Open a new command prompt window

2. Type git clone https://github.com/smwillson/feedReaderTesting.git at the propmt

More information : https://help.github.com/articles/which-remote-url-should-i-use/

## How to run the application:
In order to run the application, simply click on the index.html file to launch.

## Functionality:
There are 3 test suites for this application:

1.  RSS Feeds. This tests for:
    * the array that drives the application is present and defined
    * the array has a property: name
    * the array has a property: url
2. The menu. This tests for:
    * the menu on the page is hidden when the page loads
    * the visibility of the menu toggles when a user clicks on the icon
3. Initial Entries. This tests for:
    * when the asynchronous function 'loadFeed' completes execution, the container that hold the entries is not empty
4.  New Feed Selection. This test for:
    * when the asynchronous function 'loadFeed' uses different arguments and completes execution, the change is reflected in the DOM.
5. Feed Entries changes are reflected in the DOM. This is alternate way to test #4.    
