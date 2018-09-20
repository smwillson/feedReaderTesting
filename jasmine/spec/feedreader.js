/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
     * a related set of tests. This suite is all about the RSS
     * feeds definitions, the allFeeds variable in our application.
     */
    describe('RSS Feeds', function() {

            /* This is our first test - it tests to make sure that the
             * allFeeds variable has been defined and that it is not
             * empty. Experiment with this before you get started on
             * the rest of this project. What happens when you change
             * allFeeds in app.js to be an empty array and refresh the
             * page?
             */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /*  This test loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
        it('the urls are present and not empty', function() {


            for (let allFeedsIndx = 0; allFeedsIndx < allFeeds.length; allFeedsIndx++) {

                expect(allFeeds[allFeedsIndx].hasOwnProperty("url")).toBe(true); //checks if the allFeeds array has the url property defined
                expect(allFeeds[allFeedsIndx].url).not.toBe(null); //checks for null values
                expect(allFeeds[allFeedsIndx].url).not.toBe(''); //checks for empty values

            }

        });

        /* This testt loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
        it('the names are present and not empty', function() {

            for (let allFeedsIndx = 0; allFeedsIndx < allFeeds.length; allFeedsIndx++) {

                expect(allFeeds[allFeedsIndx].hasOwnProperty("name")).toBe(true); //checks if the allFeeds array has the name property defined
                expect(allFeeds[allFeedsIndx].name).not.toBe(null); //checks for null values
                expect(allFeeds[allFeedsIndx].name).not.toBe(''); //checks for empty values

            }

        });
    });




    /* This test ensures that the menu element is
     * hidden by default.
     */
    describe('The menu', function() {


        it('menu element is hidden by default', function() {

            var bodyElementClassNamePresent = $(document.querySelector('body')).hasClass("menu-hidden");
            expect(bodyElementClassNamePresent).toBe(true); // checks for the css class that drives menu visibility

        });
        /* This test  ensures that the menu changes
         * visibility when the menu icon is clicked.
         */
        it('hamburger menu is displayed when clicked and hidden when clicked again', function() {

            //when the menu icon is first clicked
            $('.menu-icon-link').click();
            var menuDisplyed = $(document.querySelector('body')).hasClass("menu-hidden");

            expect(menuDisplyed).not.toBe(true); // checks for the css class that drives menu visibility


            //when the menu icon is clicked again
            $('.menu-icon-link').click();
            menuDisplyed = $(document.querySelector('body')).hasClass("menu-hidden"); // checks for the css class that drives menu visibility

            expect(menuDisplyed).toBe(true);
        });




    });


    /* This test  ensures when the loadFeed
     * function is called and completes its work, there is at least
     * a single .entry element within the .feed container.
     *
     */
    describe('Initial Entries', function() {
        beforeEach(function(done) {
            loadFeed(0, function() {
                done();
            });

        });

        it('there at least one entry in the feed container after loadFunction completes', function(done) {
            expect($('.feed .entry').length).toBeGreaterThan(0);
            done();
        });



    });

    /* This test  ensures when a new feed is loaded
     * by the loadFeed function that the content actually changes.
     *
     */

    describe('New Feed Selection', function() {

        var originalFeed, newFeed;
        beforeEach(function(done) {
            loadFeed(0, function() {
                // store old feed
                originalFeed = $('.feed').html();
                // fetch newer feed
                loadFeed(1, done);

            });
        });
        newFeed = $('.feed').html();
        it('old feed does not match new feed', function() {
            expect(newFeed).not.toBe(originalFeed);
        });

    });


    //alternate test dom for feed changes
    /*This test looks at the div element that holds the links/text that are displayed to the user in the DOM.
    We will do a regex match to extract the <h2></h2> tag from the string retuned by our querySelector and hold the results in an array.
    This will be done before and after the feed changes and the final results arrays are compared.
    Sources used for regex match : https://stackoverflow.com/questions/2622903/regex-how-to-get-contents-from-tag-inner-use-javascript
    */

    describe('Feed Entry changes are reflected in the DOM', function() {
        var errorMessage = "Null Exception. DOM element is not accessible.";
        var originalFeed, newFeed;
        var i = 0,
            match, originalResultArray = [],
            newResultArray = [],
            regex = /<h2>(.*?)<\/h2>/ig;

        beforeEach(function(done) {
            loadFeed(0, function() {
                originalFeed = document.querySelector('.feed').innerHTML;
                if (originalFeed === null || originalFeed === '') {
                    throw errorMessage;
                }
                try {
                    while (match = regex.exec(originalFeed)) {
                        originalResultArray[i] = match[1];
                        i++;
                    }
                } catch (e) {
                    console.error(e);
                }

                loadFeed(1, done);


            });

        });
        i = 0;
        it('DOM changes when new feed is loaded', function(done) {
            newFeed = document.querySelector('.feed').innerHTML;
            if (newFeed === null || newFeed === '') {
                throw errorMessage;
            }
            try {
                while (match = regex.exec(newFeed)) {
                    newResultArray[i] = match[1];
                    i++;
                }
            } catch (e) {
                console.error(e);
            }
            for (let arrayLength = 0; arrayLength < originalResultArray.length; arrayLength++) {
                expect(originalResultArray[arrayLength]).not.toBe(newResultArray[arrayLength]);
            }
            done();
        });
  });


}());
