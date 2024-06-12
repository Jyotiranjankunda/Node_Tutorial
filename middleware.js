/*
Middleware

Imagine you're at a restaurant, and you've placed an order to your favorite dish. Now, before that dish reaches your table, it goes through several stages in the kitchen. Each stage involves different tasks, like chopping vegetables, cooking and adding spices. Middleware is like these stages in the kitchen - it's something that happens in between your request and the final response in a web application.

Now's lets apply this idea to a web application, like the "Node Hotel" system.

(i) Request phase : You (the client) make a request to the node hotel system. It could be asking for the menu, submitting a reservation or anything else.

(ii) Middleware phase: Middleware is like the behind-the-scenes process in the kitchen. It's a series of functions that your request goes through before it reaches the final destination.

(iii) Final response phase: After passing through the middleware, your request gets processed, and the system sends back a response. It could be the menu you requested for confirmation of your reservation.
*/

/*
const logRequest = (req, res, next) => {
  console.log(`[${new Date().toLocaleString()}] Request made to : ${req.originalUrl}`);
  next(); 
};
*/

/*
In this example, logRequest is our middleware. It logs the time and the required URL for every incoming request. The app.use(logRequest) line tells express to use this middleware for all routes.

So, when you access any route (like / or /menu), the middleware runs first, logs the request, and then the route-specific code executes.

In summary, middleware is like a series of tasks that happen behing the scenes in a web application. It's a way to add extra functionality to your applications's request-response cycle, such as logging, authentication checks, or modifying request data, before it reaches its final destination.

=> Why do we use next() function in the middleware function?
- In express.js, the next() function is a callback that signals to express that the current middleware function has completed its processing and that it's time to move on to the next middleware function or route handler in the chain.
*/

// Client request ------> All middleware has access to req, res and next {next() --> next() --> next() --> next()} -------> response