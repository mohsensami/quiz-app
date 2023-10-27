import { useState } from 'react';
import './App.css';
import shuffle from './utils/shuffle';

function App() {
    const [amount, setAmount] = useState(10);
    const [category, setCategory] = useState(20);
    const [difficulty, setDifficulty] = useState('');
    const [type, setType] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [data, setData] = useState<any>([]);
    const [currentQuestion, setCurrentQuestion] = useState(1);
    const [showScore, setShowScore] = useState(false);
    const [score, setScore] = useState(0);
    const [answer, setAnswer] = useState('');
    const handleSubmit = (e: React.MouseEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log('handleSubmit');
        setIsLoading(true);
        fetch(`https://opentdb.com/api.php?amount=${amount}&category=${category}&difficulty=${difficulty}&type=${type}`)
            .then((response) => response.json())
            .then((data) => {
                const { response_code, results } = data;
                results.forEach((element: any) => {
                    element.options = shuffle([element.correct_answer, ...element.incorrect_answers]);
                });
                console.log(results);
                setData(results);
                setIsLoading(false);
            });
    };
    const handleNextClick = (correct_answer: any) => {
        console.log(correct_answer);
        console.log(answer);
        if (correct_answer === answer) {
            setScore((prev) => prev + 1);
        }
        setCurrentQuestion((prev) => prev + 1);
    };
    const handlePreviousClick = () => {
        setCurrentQuestion((prev) => prev - 1);
    };
    const handleShowResult = () => {
        setData([]);
    };

    return (
        <div className="App">
            <div>
                {data?.length ? (
                    <div>
                        {currentQuestion} <br />
                        {amount} <br />
                        {score}
                        <h2 dangerouslySetInnerHTML={{ __html: data[currentQuestion - 1].question }}></h2>
                        {data[currentQuestion - 1].options.map((item: any) => (
                            <label key={item} htmlFor={item}>
                                {item}
                                <input
                                    onChange={(e) => setAnswer(e.target.value)}
                                    value={item}
                                    id={item}
                                    type="checkbox"
                                />
                            </label>
                        ))}
                        <div>
                            {/* {currentQuestion > 0 && <button onClick={handlePreviousClick}>Previous</button>} */}

                            {currentQuestion < amount && (
                                <button onClick={() => handleNextClick(data[currentQuestion - 1].correct_answer)}>
                                    Next
                                </button>
                            )}
                            {<button onClick={handleShowResult}>Show Result</button>}
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
