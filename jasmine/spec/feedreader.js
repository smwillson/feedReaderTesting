/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

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


        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
        it('the urls are present and not empty',function(){

          for( let allFeedsIndx = 0; allFeedsIndx < allFeeds.length ; allFeedsIndx++){

            expect(allFeeds[allFeedsIndx].hasOwnProperty("url")).toBe(true); //checks if the allFeeds array has the url property defined
            expect(allFeeds[allFeedsIndx].url).not.toBe(null); //checks for null values
            expect(allFeeds[allFeedsIndx].url).not.toBe(''); //checks for empty values

          }

        });

        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
         it('the names are present and not empty',function(){
           for( let allFeedsIndx = 0; allFeedsIndx < allFeeds.length ; allFeedsIndx++){

             expect(allFeeds[allFeedsIndx].hasOwnProperty("name")).toBe(true); //checks if the allFeeds array has the name property defined
             expect(allFeeds[allFeedsIndx].name).not.toBe(null); //checks for null values
             expect(allFeeds[allFeedsIndx].name).not.toBe(''); //checks for empty values

           }
         });
    });

  describe('The menu', function() {
    /* TODO: Write a new test suite named "The menu" */

        /* TODO: Write a test that ensures the menu element is
         * hidden by default. You'll have to analyze the HTML and
         * the CSS to determine how we're performing the
         * hiding/showing of the menu element.
         */
  it('menu element is hidden by default',function(){

      var bodyElementClassName = document.querySelector('body').className;
      expect(bodyElementClassName).toBe("menu-hidden");


  });
         /* TODO: Write a test that ensures the menu changes
          * visibility when the menu icon is clicked. This test
          * should have two expectations: does the menu display when
          * clicked and does it hide when clicked again.
          */
          it('hamburger menu is displayed when clicked and hidden when clicked again',function(){

            //when the menu icon is first clicked
            $('.menu-icon-link').click();
            var bodyElementClassName = document.querySelector('body').className;
            expect(bodyElementClassName).not.toBe("menu-hidden");

            //when the menu icon is clicked again
              $('.menu-icon-link').click();
              var bodyElementClassName = document.querySelector('body').className;
              expect(bodyElementClassName).toBe("menu-hidden");
          });




});
    /* TODO: Write a new test suite named "Initial Entries" */
describe('Initial Entries', function(){

var feed1, feed2;

beforeEach(function(done){
  loadFeed(0, function(){

    done();


  });

});

  it('there at least one entry in the feed container after loadFunction completes', function(done){


  expect( $('.feed').length).toBeGreaterThan(0);
done();
  });



});
        /* TODO: Write a test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Remember, loadFeed() is asynchronous so this test will require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */

    /* TODO: Write a new test suite named "New Feed Selection" */
    describe('New Feed Selection', function(){

   var originalFeed, newFeed;
      beforeEach(function(done) {
            loadFeed(0, function() {
                // store old feed
                originalFeed = $('.feed').html();
                // fetch newer feed
                loadFeed(1, done);

            });
        });
        newFeed =  $('.feed').html();
        it('old feed does not match new feed', function() {
            expect(newFeed).not.toBe(originalFeed);
        });

  });
        /* TODO: Write a test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * Remember, loadFeed() is asynchronous.
         */
}());
