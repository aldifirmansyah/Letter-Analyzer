# Letter-Analyzer

## Description
This project was created using D3 javascript library.

The feature of this project is analyze words by displaying the characters contained in the words along with its amount of occurrences as a simple bar chart.

### Example:
Input:
```
"hello world!"
```

Output:
```
[{character: " ", count: 1},
{character: "!", count: 1},
{character: "d", count: 1},
{character: "e", count: 1},
{character: "h", count: 1},
{character: "l", count: 3},
{character: "o", count: 2},
{character: "r", count: 1},
{character: "w", count: 1}]
```

If some words has been analyzed and we analyze another words, it will shows the characters which are different with the previous words, and the characters which are same with the previos words.

### Example:
First Input:
```
"hello world!"
```

First Output:
```
[{character: " ", count: 1},
{character: "!", count: 1},
{character: "d", count: 1},
{character: "e", count: 1},
{character: "h", count: 1},
{character: "l", count: 3},
{character: "o", count: 2},
{character: "r", count: 1},
{character: "w", count: 1}]
```
               
Second Input:
```
"hello aldi"
```

Second Output: 
```
[{character: " ", count: 1},
{character: "a", count: 1},
{character: "d", count: 1},
{character: "e", count: 1},
{character: "h", count: 1},
{character: "i", count: 1},
{character: "l", count: 3},
{character: "o", count: 1}]
```

**Notes**: On the second output, character [" ", "d", "e", "h", "l", "o"] will have different color in the bar chart because these characters were appeared in the previous output.

There is also a reset button to erase the current result.
