/*
Imagine you are the manager of the "node hotel" application, and you want to ensure that only authorized staff members can access certain features. This is where authentication comes in.

1. Verifying identity (authenication) :
- Scenario: When a staff member, let's say a chef, wants to log in to the node hotel system, they need to prove that they are indeed the chef they claim to be. 

- In node.js, authentication involves checking the chef's credentials, like a username and password, to make sure they match what's on record. It's like asking the chef to enter a secret code (password) and confirming that it's correct.

2. Access control (Authorization) :
- Scenario: Once the chef has proven their identity, you, as the manager, want to control what they can and cannot do. For instance, chefs should be able to update the menu items, but may be not manage staff salaries.

- In node.js, after authenticating the chef, you'll use authorization to decide what parts of the system they have access to. It's like giving the chef a key card (authorization) that lets them into the kitchen but not into the manager's office.
*/

/*
Implementation in node.js:
1. Authentication middleware:
- In your node.js application, you might use middleware like passport to handle the authenication process.
- Passport helps verify the identity of the chef based on their provided credentials.

2. User roles and permissions:
- You'll define roles for staff members (e.g, chef, waiter, manager).
- Authorization middleware will check the role of the authenicated user and grant access accordingly.

3. Secure endpoints:
- You'll protect certain routes(like updating menu items) with authenication checks.
- Only authenticated and authorized users (like chefs) will be allowed to access these routes.

In hotel context:
- Authentication: When chef John logs in, the system checs if the provided username and password match what's on record for chef john.

- Authorization: Once authenticated, chef john is authorized to modify menu items but many not have permissions to change other critical settings.

In simple terms, authetication in nodejs for your hotel application ensures that each staff member is who they say they are, and authorization determines whay they're allowed to do.

It's like having a secure system where only the right people get access to the right areas of your hotel management application.

In general, authentication is applied before authorization in the security process. The reason for this order is straightforward: before you can determine what someone is allowed to do, you need to know who they are.
*/

// Authentication is implemented as a middleware function using passport.js

/*
Passport.js

- Passport.js is a popular authentication middleware for Node.js. 

- Authentication is the process of verifying the identity of a user, typically through a username and password, before granting access to certain resources or features on a website or application.

- Think of Passport.js as a helpful tool that makes it easier for developers to handle user authentication in their Node.js applications. 

- It simplifies the process of authenticating users by providing a set of pre-built strategies for different authentication methods, such as username and password, social media logins (like Facebook or Google), and more.

- Here's a breakdown of some key concepts in Passport.js:
(i) Middleware: In the context of web development, middleware is software that sits between the application and the server. Passport.js acts as middleware, intercepting requests and adding authentication-related functionality to them.

(ii) Strategy: Passport.js uses the concept of strategies for handling different authentication methods. A strategy is a way of authenticating users. Passport.js comes with various built-in strategies, and you can also create custom strategies to support specific authentication providers.

(iii) Serialize and Deserialize: Passport.js provides methods for serializing and deserializing user data. Serialization is the process of converting user data into a format that can be stored, usually as a unique identifier. 
Deserialization is the reverse process of converting that unique identifier back into user data. These processes are essential for managing user sessions.

To use passport.js in a node application, you need to install the passport package along with the authentication strategies you intend to use.

The passport LocalStrategy is a part of the passport.js authentication middleware for node.js. It's specially designed for handling username and password-based authentication.

The passport local strategy, by default, expects to extract the username and password from the request body. It is a common practice for username and password-based authentication systems to send the credentials as part of the request body, especially in login forms.
*/