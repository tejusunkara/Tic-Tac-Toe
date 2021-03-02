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

### Known Problems and Technical Issues

#### Known Problems:
1. Application does not check if the entered username is unique and/or if it has already been entered.

..I would address this by going over my socket.io emits and retracing my code. I believe my clients are not communicating with my server and I would like to make 
...sure that this is not th issue. Once I resolved this, I would like to add a feature which will bring the user to a different login screen. I would do so by first checking if 
...the user's username is in my in my list of users in the `onClick` event of the login button. If it is, I would emit an event and send data similar to my other login emit.
...Then I will use `useEffect()` to re-render.

2. `Player Again` button can't be clicked by both players to play again. Player X must click `Play Again` and perform their first click in order to properly play a game.

...I would solve this issue going through my logic for the `onClick` event of the `Play Again` button. Once this is solved, I would like to look into how I can implement a `Logout` button.


#### Technical Issues:
1. In `Board.js`, `playerO` is undefined on Player X's client, but not on other clients

...I fixed this issue by passing `playerO` and `playerX` in each `board` emit. I understood that if I passed it through each emit, it would re-render to `playerX` being Player X's username.
...I confirmed this worked by writing a series of `console.log` statements. Application was also printing `playerO` correctly on its side.

2. I did not experience any other issues.
