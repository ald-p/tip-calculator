# tip-calculator
A tool to help you calculate tip much faster. This app is one of the first projects I completed in my journey of becoming a developer. I hoped to bridge the three main web development technologies (HTML, CSS, JavaScript) and explored how they interact to create a useful product.

## Features
After entering a subtotal, the user is able to choose three default tip percentages: 18%, 20%, 25%. This is based on the most common tip percentages used in restaurants, bars, etc. Each percentage will calculate the corresponding tip amount and total amount. 

If the user wants to use other tip percentages or amounts, the custom tip button can be clicked. When the button is clicked, they have an option to input a tip percentage or a tip amount. After inputting the value, clicking calculate button will show the tip and total amounts based on the input values.

## Technologies and Concepts Explored
* #### CSS Transitions 
  * Smooth fade-in/out transition for the "Custom Tip" section by transitioning the ```opacity``` and the translate function in the ```transform``` property.
  * Smooth hover effect by using the scale function in the transform property and using the ```:hover``` selector to change background and text colors.

* #### JavaScript
  * DOM Manipulation & Events
    * Adding/removing classes to toggle between CSS styles when buttons are clicked
    * Rendering new tip and total amounts
    * Error message when inputs are blank
  * Using a number formatter to format rendered amounts in USD currency.
  * Using the spread operator to allow multiple function arguments.

* #### Other misc technologies
  * Git Workflow - using git to commit, push, create and merge branches
  * Chrome DevTools - using DOM breakpoints and the browser debugger to debug Javascript code  and using styles to debug CSS.