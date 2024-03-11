
const generateGrid = (words) => {
  const grid = [];
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'; // Letters to fill the grid with
  
  // Initialize the grid with random letters
  for (let i = 0; i < 15; i++) {
    const row = [];
    for (let j = 0; j < 15; j++) {
      row.push(alphabet[Math.floor(Math.random() * alphabet.length)]);
    }
    grid.push(row);
  }

  // Place words in the grid
  words.forEach((word) => {
    const direction = Math.random() > 0.5 ? 'horizontal' : 'vertical';
    const startRow = Math.floor(Math.random() * (15 - word.length + 1));
    const startCol = Math.floor(Math.random() * (15 - word.length + 1));

    if (direction === 'horizontal') {
      for (let i = 0; i < word.length; i++) {
        grid[startRow][startCol + i] = word[i].toUpperCase();
      }
    } else {
      for (let i = 0; i < word.length; i++) {
        grid[startRow + i][startCol] = word[i].toUpperCase();
      }
    }
  });

  return grid;
};

const generateRandomIndexes = (max, count) => {
  const indexes = new Set();
  while (indexes.size < count) {
    indexes.add(Math.floor(Math.random() * max));
  }
  return Array.from(indexes);
};


export const createCrossword = async (req, res) => {
  try {
    const theme = req.query.theme || 'baseball';
    const response = await fetch(`https://api.datamuse.com/words?rel_trg=${theme}`);
    let data = await response.json();
      
          const randomIndexes = generateRandomIndexes(data.length, 10); // Get 10 random indexes
          const randomWords = randomIndexes.map(index => data[index]);
      console.log(randomWords);

        const grid = generateGrid(randomWords.map(item => item.word));
    console.log(grid);

    res.render('index', { data: randomWords, grid });
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).send('Error fetching data');
  }
};