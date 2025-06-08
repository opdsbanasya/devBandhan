# Dev Tinder
Dev Tinder is inspired by Tinder, but Tinder is a dating app, and Dev Tinder is a platform there developers can match their profiles with other developers to make new friends, find mentors, or even get hired or whatever you want.

## Technologies used
- **Database**: MongoDB
- **Backend**: Node.js with Express
- **Frontend**: React.js

## API Lists
**authRouter**:
- POST /signup
- POST /login 
- POST /logout
- POST /forgot-password

**profileRouter**:
- GET /profile/view
- PATCH /profile/edit
- PATCH /profile/password
- DELETE /profile/delete

**userRequestRouter**:
- POST /request/send/ignored/:userId
- POST /request/send/intrested/:userId
- POST /request/review/rejected/:requestId
- POST /request/review/accepted/:requestId

**userRouter**:
- GET /user/feed
- GET /user/connections
- GET /user/requests