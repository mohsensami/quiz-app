import { useState } from 'react';
import './App.css';
import shuffle from './utils/shuffle';
import Layout from './componets/Layout';
import FormBegin from './componets/FormBegin';

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
        <Layout>
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
                                {currentQuestion == amount && <button onClick={handleShowResult}>Show Result</button>}
                            </div>
                        </div>
                    ) : (
                        <FormBegin
                            handleSubmit={handleSubmit}
                            amount={amount}
                            setAmount={setAmount}
                            category={category}
                            setCategory={setCategory}
                            type={type}
                            setType={setType}
                            difficulty={difficulty}
                            setDifficulty={setDifficulty}
                        />
                    )}

                    {isLoading && <h1>Loading ...</h1>}
                    {/* {JSON.stringify(data)} */}
                </div>
            </div>
        </Layout>
    );
}

export default App;
