# Olympic Success & Wealth of Nations

Interactive bubble chart of relationship between Olympic success and GDP of nations. A reimagination of Gapminder's Wealth & Health of Nations.

# Background
Data visualization on the relationship of GDP and Olympic success through an interactive bubble chart with the below dimensions:
* x-axis: GDP/capita
* y-axis: total number of olympic medals
* size of bubbles: population
* color: continent
* the circles on the chart will adjust accordingly by year

# Functionality & MVP
* See country data visualized by GDP, olympic medals, population, continent.
* Drag a bar to change the chart over time (1900-current).
* Be able to click play for time to elapse automatically.
* On hover of nation bubble, show specific GDP and medal count (maybe other olympic data).
* Production README

# Wireframes
![wireframe](./wireframe.png)

# Architecture and Technologies
* HTML, CSS, JS, D3
* Data: Gapminder, wikipedia

# Implementation Timeline
* Monday: Get all data
* Tuesday: Learn D3
* Wednesday: Start plotting data
* Thursday: Clean up plotted data for entire timeline
* Friday: Start implementing chart change over time
* Saturday: Have auto-play of time change
* Sunday: Detailed sidebar info on hover

# Bonus features
* On hover show a greyed out path for the country over the entire timeline of the chart
* Have a sidebar of checkboxes to filter the chart by categories (country, continent, sporting event, etc.)
* Have a filter to change the x-axis to show another relationship
