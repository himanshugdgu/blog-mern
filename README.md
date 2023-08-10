User Model:

Fields:

username: A unique username for each user.
email: The email address of the user.
password: The hashed password of the user for authentication.
dateOfRegistration: The date when the user registered on the website.
profilePicture: An optional field to store the URL or file path of the user's profile picture.
Associations:

One-to-Many: One user can have many posts and comments.
Post Model:

Fields:

title: The title of the blog post.
content: The content or body of the blog post.
dateOfCreation: The date when the post was created.
author: A reference to the user who authored the post (using their user ID).
category: An optional field to assign the post to a specific category.
tags: An optional field to include tags associated with the post.
Associations:

Many-to-One: Many posts can belong to one user (author).
One-to-Many: One post can have many comments, likes, and dislikes.
Comment Model:

Fields:

content: The content of the comment.
dateOfCreation: The date when the comment was created.
author: A reference to the user who authored the comment (using their user ID).
post: A reference to the post to which the comment belongs (using the post's ID).
Associations:

Many-to-One: Many comments can belong to one user (author).
Many-to-One: Many comments can belong to one post.
Likes Model:

Fields:

user: A reference to the user who liked the post (using their user ID).
post: A reference to the post that was liked (using the post's ID).
dateOfLiking: The date when the post was liked.
Associations:

Many-to-One: Many likes can belong to one user.
Many-to-One: Many likes can belong to one post.
Dislike Model:

Fields:

user: A reference to the user who disliked the post (using their user ID).
post: A reference to the post that was disliked (using the post's ID).
dateOfDisliking: The date when the post was disliked.
Associations:

Many-to-One: Many dislikes can belong to one user.
Many-to-One: Many dislikes can belong to one post.
