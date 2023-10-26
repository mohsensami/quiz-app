import { useState } from 'react';
import './App.css';

function App() {
    const [amount, setAmount] = useState(10);
    const [category, setCategory] = useState(20);
    const [difficulty, setDifficulty] = useState('');
    const [type, setType] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [data, setData] = useState<any>([]);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [showScore, setShowScore] = useState(false);
    const [score, setScore] = useState(0);
    const handleSubmit = (e: React.MouseEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log('handleSubmit');
        setIsLoading(true);
        fetch(`https://opentdb.com/api.php?amount=${amount}&category=${category}&difficulty=${difficulty}&type=${type}`)
            .then((response) => response.json())
            .then((data) => {
                setData(data);
                console.log(data);
                setIsLoading(false);
            });
    };
    const handleClick = () => {
        setCurrentQuestion((prev) => prev + 1);
    };
    return (
        <div className="App">
            <div>
                {data?.results?.length ? (
                    <div>
                        <h2>{data?.results[currentQuestion].question}</h2>
                        <label htmlFor={data?.results[currentQuestion].correct_answer}>
                            {data?.results[currentQuestion].correct_answer}
                            <input id={data?.results[currentQuestion].correct_answer} type="checkbox" />
                        </label>
                        {data?.results[currentQuestion].incorrect_answers.map((item: any) => (
                            <label key={item} htmlFor={item}>
                                {item}
                                <input id={item} type="checkbox" />
                            </label>
                        ))}
                        <div>
                            <button onClick={handleClick}>Next</button>
                        </div>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="nums">Number of Questions:</label>
                            <input
                                onChange={(e: any) => setAmount(e.target.value)}
                                value={amount}
                                type="number"
                                min={1}
                                max={50}
                            />
                        </div>
                        <div>
                            <label htmlFor="trivia_category">Select Category: </label>
                            <select
                                defaultValue={category}
                                onChange={(e: any) => setCategory(e.target.value)}
                                name="trivia_category"
                                className="form-control"
                            >
                                <option value="any">Any Category</option>
                                <option value="9">General Knowledge</option>
                                <option value="10">Entertainment: Books</option>
                                <option value="11">Entertainment: Film</option>
                                <option value="12">Entertainment: Music</option>
                                <option value="13">Entertainment: Musicals &amp; Theatres</option>
                                <option value="14">Entertainment: Television</option>
                                <option value="15">Entertainment: Video Games</option>
                                <option value="16">Entertainment: Board Games</option>
                                <option value="17">Science &amp; Nature</option>
                                <option value="18">Science: Computers</option>
                                <option value="19">Science: Mathematics</option>
                                <option value="20">Mythology</option>
                                <option value="21">Sports</option>
                                <option value="22">Geography</option>
                                <option value="23">History</option>
                                <option value="24">Politics</option>
                                <option value="25">Art</option>
                                <option value="26">Celebrities</option>
                                <option value="27">Animals</option>
                                <option value="28">Vehicles</option>
                                <option value="29">Entertainment: Comics</option>
                                <option value="30">Science: Gadgets</option>
                                <option value="31">Entertainment: Japanese Anime &amp; Manga</option>
                                <option value="32">Entertainment: Cartoon &amp; Animations</option>{' '}
                            </select>
                        </div>
                        <div>
                            <label htmlFor="trivia_difficulty">Select Difficulty: </label>
                            <select
                                onChange={(e: any) => setDifficulty(e.target.value)}
                                defaultValue={difficulty}
                                name="trivia_difficulty"
                                className="form-control"
                            >
                                <option value="any">Any Difficulty</option>
                                <option value="easy">Easy</option>
                                <option value="medium">Medium</option>
                                <option value="hard">Hard</option>
                            </select>
                        </div>
                        <div>
                            <label htmlFor="trivia_type">Select Type: </label>
                            <select
                                onChange={(e: any) => setType(e.target.value)}
                                defaultValue={type}
                                name="trivia_type"
                                className="form-control"
                            >
                                &gt;
                                <option value="any">Any Type</option>
                                <option value="multiple">Multiple Choice</option>
                                <option value="boolean">True / False</option>
                            </select>
                        </div>
                        <div>
                            <button>Submit</button>
                        </div>
                    </form>
                )}

                {isLoading && <h1>Loading ...</h1>}
                {/* {JSON.stringify(data)} */}
            </div>
        </div>
    );
}

export default App;
