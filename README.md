# FlashcardAp $$p^2$$
A very basic flashcard application using node.js for practice functional programming with Javascript

To run it just install node.js, install the dependencies using on the project folder
````
  npm install --legacy-peer-deps
````
And run
```
  npm start
```

The interface is something like tha following
![image](https://user-images.githubusercontent.com/34524864/170114565-f9e576d3-9ec5-46b8-af14-d18f99418c27.png)


# Features

* You can add as many cards as you want
* The newer cards will be shown first
* You can edit a card clicking over the question or the answer
* There is a simpler ranking system for the card:
  *if you click the bad button, the rank will be set as 0
  * if you click the good button, the rank will be the previous value plus one
  * if you click the great button, the rank will be the previous one plus two
* By now, you cannot save the cards you've created
