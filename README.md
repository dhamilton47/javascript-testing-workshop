# js-testing-workshop


### __Intro__
In January 2020, Project Codex: Orlando Junior Developers Meetup group held __Workshop: What, Why, and How on Writing Tests in JavaScript for NodeJS__. Phil Palmieri led the presentation.

He presented a simple sketch of a project we would pursue to learn testing using Jest in the Node.js environment.

<ol>
  <li type="a">
    Hit the OpenCage API to retrieve the latitude and longitude of a location.
  </li>
  <li type="a">
    Turn the retrieved data around and hit the DarkSky API to find the weather at that same location.
  </li>
</ol>

As we had not finished the project by the end of the workshop, Phil challenged us to move the concept and development forward.

### __Thoughts on Proceeding__

_The OpenCage API_

A 200 HTTP response code from the OpenCage API can contain zero or more entries.  How do we handle/process the result?

<ol>
  <li type="a">
    Zero responses - an empty array.  Is there a difference in handling either way?
  </li>
  <li type="a">
    One response is straight forward.
  </li>
  <li type="a">
    Multiple responses - the response from OpenCage is dependent on the level of specificity (think Springfield vs. Springfield, MO USA).  But it can also return multiple values for a fairly well defined location (e.g. Winter Garden, FL USA return 3 responses).  How do we test and structure the response we are going to pass the the DarkSky API?
  </li>
</ol>

_The OpenCage API_

<li>
  The DarkSky API requires latitude and longitude which we cull from the OpenCage response.  Need to make sure we form the API call correctly.
</li>
<li>
  Is there a response from DarkSky and how do we handle it?  What do we mean when we say we want the weather at a location - Current or forecast, for how long of a period, etc.
</li>


<hr/>
