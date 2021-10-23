# Plotly_module

##Overview

     In this assignment we have taken advantage of the Plotly tools to create an html page
that is interactive with the user. Using D3 and javascript we were able to create a page that
reveals the information inside json file with graphs that break down the data into a more digestable
format.

     From the json file we extracted the OTU ID numbers that had the greatest numbers to be
able to see the top 10 bacteria cultures that populate inside the patient's belly button. In order
to properly deliver the presentation of this data, we first organized the ID's corresponding sample values
in a descending order, grabbed the 10 values we needed, and then reversed the order. This would
ultimately allow the ID with the higest value to be at the top of the horizontal bar graph.

     In the bubble chart, we simply organized all of the data instead of the top 10 values
to display the disparity between the different IDs. We use a bubble chart because it allows us
to visually understand the difference between the numbers in the cultures.

     Lastly, we have our gauge which is a fun graph to display in a meter like format to show
where patients fall under in terms of whether the frequency in which they wash their belly button is
adequate or not. Specifically for the patient with the ID 940, we see that their wash frequency is 2,
which falls under the red zone. With these colors ranging from red to yellow to green, we understand
that this patient may want to wash their belly button a little more frequently since they are in the
red zone.