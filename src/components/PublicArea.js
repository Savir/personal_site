import React, {useState, useEffect} from "react";
import "../styles/AreaStyles.css"; // Ensure CSS is updated for animations
import "../styles/PublicArea.css";
import {bioParagraphs, words} from "./bio";
import {gLogEvent} from "../utils/analytics";


const PublicArea = () => {
    const [displayText, setDisplayText] = useState("");
    const [currentWordIndex, setCurrentWordIndex] = useState(0);
    const [completedWords, setCompletedWords] = useState([]);
    const [showFinalMessage, setShowFinalMessage] = useState(false);
    const [expanded, setExpanded] = useState(false);

    const typingSpeed = 100;  // Typing speed per letter
    const eraseSpeed = 50;    // Speed of erasing
    const pauseBetweenWords = 800; // Pause after typing a word

    useEffect(() => {
        if (currentWordIndex < words.length) {
            let word = words[currentWordIndex];
            let currentIndex = 0;

            const typeWord = () => {
                if (currentIndex < word.length) {
                    setDisplayText(word.slice(0, currentIndex + 1));
                    currentIndex++;
                    setTimeout(typeWord, typingSpeed);
                } else {
                    setTimeout(() => eraseWord(), pauseBetweenWords);
                }
            };

            const eraseWord = () => {
                if (currentIndex > 0) {
                    setDisplayText(word.slice(0, currentIndex - 1));
                    currentIndex--;
                    setTimeout(eraseWord, eraseSpeed);
                } else {
                    setCompletedWords((prev) => [...new Set([...prev, word])]); // Ensure no duplicates
                    setCurrentWordIndex((prev) => prev + 1);
                }
            };

            typeWord();
        } else {
            setTimeout(() => setShowFinalMessage(true), 1000);
        }
    }, [currentWordIndex]);


    return (
        <div className="area-container">
            <h2 className="area-heading">🌍 Public Area</h2>

            <div className={`bio-section-wrapper ${expanded ? "expanded" : "collapsed"}`}>
                <div className="bio-section">
                    {bioParagraphs.map((content, idx) => (
                        <p key={idx}>{content}</p>
                    ))}
                </div>
            </div>

            <button className="primary-button" onClick={() => {
                setExpanded(!expanded);
                gLogEvent(expanded ? 'show_less_clicked' : 'read_more_clicked')
            }}>
                {expanded ? "Show less" : "Read more"}
            </button>

            <div className="typing-container">
                {currentWordIndex < words.length ? (
                    <p className="big-word">
                        {displayText}
                        <span className="cursor">|</span>
                    </p>
                ) : null}
            </div>

            {/* Completed words appearing smaller at the top */}
            <div className="completed-words">
                {completedWords.map((word, index) => (
                    <span key={index} className="small-word">{word}</span>
                ))}
            </div>

            {/* Final message after all words are typed */}
            {showFinalMessage && <p className="final-message">And that's me 👍</p>}


        </div>
    );
};

export default PublicArea;
