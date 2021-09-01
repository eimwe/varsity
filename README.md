# Back to school

To commemorate the Knowledge Day I decided to share my solution to the test task I was given a few weeks ago by the gamedev studio for the position of Frontend developer. TLDR: I failed it :) If you want to know more, come along with me on this journey and find out what I did wrong. Let's start with the technology stack I used for this project.

## Technology stack

I utilized webpack to bundle HTML template, preprocess styles with LESS and PostCSS, and added an interactive behavior to the page via vanilla JavaScript.

## Test environment

- Google Chrome 92.0.4515.159
- Firefox 91.0.2

## Objectives

According to the functional spec, I was supposed to complete the following list of objectives using only vanilla JS when it applies:

- [x] Layout the main game window, toolbar at the bottom, and modal window (which is hidden by default);
- [x] Code the modal window (show/hide on click) and populate the containing table with data taken from `data.js` file;
- [x] Data parsed into the table must have indications of user's 'friends', if there are any in `data.js` file;
- [x] Animate playable character's movement across first 10 checkpoints on the play field;
- [x] Code the user gallery in the toolbar (i.e. make slides move back and forth depending on the button clicked).


## Challenges

I've never worked on the layouts for gamedev before, so the first thing for me stuck with was the design layout itself. Originally, it was made in Photoshop and sent to me as `.psd` files.

Firstly, I was agonizing about extracting the layers, because in no way I could render all the small details, such as border gradients for buttons and intricate pattern on the backgrounds of some elements. So, I made a decision to import things in big chunks. That's how my image folder got all these `.png`'s of the whole map as a game field, each button, etc.

Secondly, I couldn't figure out the compatible solution for character's movement. I knew there must be a bunch of css animation rules, but I also needed to figure out how to trigger and stop them at the right point. Looking back at this problem, I think it would be much better to hide radio buttons behind each checkpoint on the map. Thus, it would be much easier to get the current position of the character, at least for backend folks. Instead, I came up with the idea of a breakable animation cycle which starts on click, continues within a certain amount of time and pauses right at the desirable checkpoint. Then it could be run again from the last point to the next one and so on. JS portion of this solution wasn't that hard, but beating a path was a real nightmare. I chose the road less traveled for `@keyframes` and wrote transition values for both x and y axes percent by percent until I finally reached 100. The end result was a working solution just like I imagined. But maintaining this cumbersome css file isn't comfartable to say the least.

JavaScript related features were fun to code. I used nested `for` loops to iterate through arrays of objects and retrive the data. By the time I was done with it I realized there must be a better solution to this, but I was eager to meet the deadline and decided to close the book on this one. It became clear later that it was a bad idea.

## Feedback session

Wait a minute. If all objectives are completed (according to the checked boxes above in the 'Objectives' section), how come I've failed the test? Yes, it did work on my machine as I expected it to. Probably, it did as well on the reviewer's machine. But there were findings in the code itself that prevent me from getting the job.

### Things I did right

It's easier for me to begin with pros because there's only one of them: the code I wrote managed to find user's 'friends' from the `data.js` file and parse them into the table with corresponding styling that made them stand out among regular entries.

### Things I did wrong

The reviewer came back to me with the following remarks:

1. Code format is inconsistent;
2. There are instances of `transition: all...` in the compiled CSS styles;
3. Choppy animation due to the absolute positioning;
4. Table entries aren't sorted; table head is scrollable; IDs are parsed right into the table instead of being a representation of prize places;
5. It's more effective to use `.find()` and `.some()` methods instead of nested `for` loops to iterate through arrays;
6. Playable character's movement has a worse solution;
7. One event listener for all clicks, if-else statement overuse.

## Lessons learned

That's an impressive list of issues. The reviewer's total score for me was 2 out 5. The remarks concerning the scrollable table head and unsorted entries weren't specified in specs, but it's a weak excuse for not thinking ahead and offering these features in the first place. This project gave me food for thought and quite a great checklist for improving my JS skills. I added the project to this repo 'as is' and didn't fix anything from the bug list. If someone is willing to fork it or come up with better solutions - be my guest!

## Attributions

Thanks to [Zebomba Games](https://zebomba.games/) team that has made the original design layout and review my solution for the test task.

## Conributing

If you get interested in this project, I'd be glad to see your contributions. Pull requests are welcome!

## Project builds

**/dist**

> unminimized development build

**/src**

> source files

## Usage instructions

1. Clone the repository
2. Run `npm i` to install dependencies
3. Run one of the following commands:

### Production Build

```
npm run build
```

### Development Build

```
npm run build-dev
```

### Development Server

```
npm start
```

## Copyright

2021, Zebomba Games