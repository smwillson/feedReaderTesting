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
        var errorMessage = "allFeeds array is not defined or null."
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


        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
        it('the urls are present and not empty', function() {

            if (allFeeds === [] || allFeeds === null) {
                throw errorMessage;
            }
            try {
                for (let allFeedsIndx = 0; allFeedsIndx < allFeeds.length; allFeedsIndx++) {

                    expect(allFeeds[allFeedsIndx].hasOwnProperty("url")).toBe(true); //checks if the allFeeds array has the url property defined
                    expect(allFeeds[allFeedsIndx].url).not.toBe(null); //checks for null values
                    expect(allFeeds[allFeedsIndx].url).not.toBe(''); //checks for empty values

                }
            } catch (e) {
                console.error(e);
            }
        });

        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
        it('the names are present and not empty', function() {
            if (allFeeds === [] || allFeeds === null) {
                throw errorMessage;
            }
            try {
                for (let allFeedsIndx = 0; allFeedsIndx < allFeeds.length; allFeedsIndx++) {

                    expect(allFeeds[allFeedsIndx].hasOwnProperty("name")).toBe(true); //checks if the allFeeds array has the name property defined
                    expect(allFeeds[allFeedsIndx].name).not.toBe(null); //checks for null values
                    expect(allFeeds[allFeedsIndx].name).not.toBe(''); //checks for empty values

                }
            } catch (e) {
                console.error(e);
            }
        });
    });


    /* TODO: Write a new test suite named "The menu" */

    /* TODO: Write a test that ensures the menu element is
     * hidden by default. You'll have to analyze the HTML and
     * the CSS to determine how we're performing the
     * hiding/showing of the menu element.
     */
    describe('The menu', function() {
        var errorMessage = "Null Exception. DOM element is not accessible.";

        it('menu element is hidden by default', function() {

            var bodyElementClassName = document.querySelector('body').className;
            if (bodyElementClassName === null || bodyElementClassName === '') {
                throw errorMessage;
            }
            try {
                expect(bodyElementClassName).toBe("menu-hidden"); // checks for the css class that drives menu visibility
            } catch (e) {
                console.error(e);
            }

        });
        /* TODO: Write a test that ensures the menu changes
         * visibility when the menu icon is clicked. This test
         * should have two expectations: does the menu display when
         * clicked and does it hide when clicked again.
         */
        it('hamburger menu is displayed when clicked and hidden when clicked again', function() {

            //when the menu icon is first clicked
            $('.menu-icon-link').click();
            var bodyElementClassName = document.querySelector('body').className;
            if (bodyElementClassName === null) {
                throw errorMessage;
            }
            try {
                expect(bodyElementClassName).not.toBe("menu-hidden");// checks for the css class that drives menu visibility
            } catch (e) {
                console.error(e);
            }

            //when the menu icon is clicked again
            $('.menu-icon-link').click();
            var bodyElementClassName = document.querySelector('body').className;// checks for the css class that drives menu visibility
            if (bodyElementClassName === null) {
                throw errorMessage;
            }
            try {
                expect(bodyElementClassName).toBe("menu-hidden");
            } catch (e) {
                console.error(e);
            }


        });




    });
    /* TODO: Write a new test suite named "Initial Entries" */

    /* TODO: Write a test that ensures when the loadFeed
     * function is called and completes its work, there is at least
     * a single .entry element within the .feed container.
     * Remember, loadFeed() is asynchronous so this test will require
     * the use of Jasmine's beforeEach and asynchronous done() function.
     */
    describe('Initial Entries', function() {

        var feed1, feed2;

        beforeEach(function(done) {
            loadFeed(0, function() {
                done();
            });

        });

        it('there at least one entry in the feed container after loadFunction completes', function(done) {
            expect($('.feed').length).toBeGreaterThan(0);
            done();
        });



    });

    /* TODO: Write a new test suite named "New Feed Selection" */

    /* TODO: Write a test that ensures when a new feed is loaded
     * by the loadFeed function that the content actually changes.
     * Remember, loadFeed() is asynchronous.
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
    /*This test looks at the div element that holds the links/text that is displayed to the user in the DOM.
    We will do a regex match to extract the <h2></h2> tag from the string retuned by our querySelector and hold the results in an array.
    This will be done before and after the feed changes and the final results are compared.
    */

    describe('Feed Entries changes are reflected in the DOM', function() {
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
