# js-testing-workshop


#### Intro

1. Went to our Meetup Workshop presentation led by Phil Palmieri.  He presented a simple sketch of a project to learn testing using Jest in the Nodejs environment.

a. Hit the OpenCage API to retrieve the latitude and longitude of a location.
b. Turn the retrived data around and hit the DarkSky API to find the weather at that same location.

2. During the presentation we managed to get part way through the testing to develop the first API call (mainly a result of me being slow).
3. We were challenged to move the concept and development forward.

#### Thought Process

Prior to further research and development, my thoughts are:

1. The OpenCage API response can contain zero or more entries.  How do we handle/process the result?

a. Zero responses - is it an error result or an empty array?  Is there a difference in handling either way?
b. One response is straight forward.
c. Multiple responses - the response from OpenCage is dependent on the level of specificity (think Springfield vs. Springfield, MO USA).  But it can also return muliple values for a fairly well defined location (e.g. Winter Garden, FL USA return 3 responses).  How do we test and structure the response we are going to pass the the DarkSky API?

2. The DarkSky API requires latitude and longitude which we cull from the OpenCage response.  Need to make sure we form the API call correctly.
3. Is there a response from DarkSky and how do we handle it?  What do we mean when we say we want the weather at a location - Current or forecast, for how long of a period, etc.