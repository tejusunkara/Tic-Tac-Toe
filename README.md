# Project 2: Tic Tac Toe


## Milestone 1: A simple live 2-player tic tac toe app

## Requirements
1. `npm install`
2. `pip install -r requirements.txt`

### Setup
1. Run `echo "DANGEROUSLY_DISABLE_HOST_CHECK=true" > .env.development.local` in the project directory

### Clone this repo as your own
1. On https://github.com/new, create a new repository
2. In your terminal, in your home directory, clone the repo:`git clone https://github.com/NJIT-CS490-SP21/project2-vs597/tree/milestone1`
3. `cd` into the repository that is created where you should see all the files now.
4. Connect this cloned repo to your new personal repo made in Step 1: `git remote set-url origin https://www.github.com/{your-username}/{your-repo-name}`
5. Run `git push origin main` to push the local repo to remote. You should now see this same code in your personal repo.

### Run Application
1. Run command in terminal, in your project directory: `python app.py`
2. Run command in another terminal, `cd` into the project directory, and run `npm run start`
3. Preview web page in browser '/'

### Create Database on Heroku and connect code
1. Login and fill creds: `heroku login -i`
2. Create a new Heroku app: `heroku create`
3. Create a new remote DB on your Heroku app: `heroku addons:create heroku-postgresql:hobby-dev` (If that doesn't work, add a `-a {your-app-name}`
4. See the config vars set by Heroku for you: `heroku config`. Copy paste the value for DATABASE_URL
5. Set the value of `DATABASE_URL` as an environment variable by entering this in the terminal: `export DATABASE_URL='copy-paste-value-in-here'` or create a `.env` file in your current directory and set `DATABASE_URL`

### Known Problems and Technical Issues

#### Known Problems:
1. Leaderboard only updates once `Show Leaderboard` button is clicked.

I would revise my Leaderboard component and prompt for an update outside of the `showLeaderboard` function.

2. Additional features I would implement:

If there was more time, I would implement a mechanism to show a history of moves. I would do so using an array to keep track of the moves made. If user wanted to go back a move, they could do so.


#### Technical Issues:
1. Database queries were not returning properly

I solved this issue by using `db.session.query` to query instead of `models.Player.query`. I would able to find resources and documentation online for this notation fairly easy, which helped me grasp why one query worked over the other.

2. Printing usernames next to thier respective ranks

I fixed this issue with the help of a classmate in Slack. They were kind enough to send a sample of printing usernames and ranks in the `<table>` tag in the return statement. 
