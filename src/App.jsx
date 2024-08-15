import React, { useState } from 'react';
import Draggable from 'react-draggable';
import { ResizableBox } from 'react-resizable';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';
import { Modal, Button } from 'react-bootstrap';
import Xarrow from 'react-xarrows';
import 'react-resizable/css/styles.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
    const [cards, setCards] = useState([]);
    const [arrows, setArrows] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedCard, setSelectedCard] = useState(null);

    const handleAddCard = () => {
        const newCard = {
            id: `card-${cards.length + 1}`,
            text: 'This is some dummy text for the card. It should display only half initially.',
        };
        setCards([...cards, newCard]);
    };

    const handleShowMore = (id) => {
        const card = cards.find(c => c.id === id);
        setSelectedCard(card);
        setShowModal(true);
    };

    const handleCloseModal = () => setShowModal(false);

    const handleConnectCards = (sourceId, targetId) => {
        setArrows([...arrows, { start: sourceId, end: targetId }]);
    };

    return (
        <div style={styles.appContainer}>
            <Button variant="primary" onClick={handleAddCard} style={styles.addButton}>Add Card</Button>
            <Button 
                variant="secondary" 
                onClick={() => handleConnectCards(cards[0]?.id, cards[1]?.id)} 
                style={styles.addButton}
                disabled={cards.length < 2}
            >
                Connect First Two Cards
            </Button>
            <div style={styles.canvasContainer}>
                <TransformWrapper>
                    <TransformComponent>
                        <div style={styles.canvas}>
                            {cards.map(card => (
                                <Draggable key={card.id} bounds="parent">
                                    <ResizableBox 
                                        width={200} 
                                        height={100} 
                                        minConstraints={[150, 100]} 
                                        maxConstraints={[400, 300]}
                                        style={styles.cardContainer}
                                    >
                                        <div id={card.id} style={styles.card}>
                                            <p style={styles.cardText}>{card.text.slice(0, 20)}...</p>
                                            <Button variant="info" size="sm" onClick={() => handleShowMore(card.id)} style={styles.showMoreButton}>Show More</Button>
                                        </div>
                                    </ResizableBox>
                                </Draggable>
                            ))}
                            {arrows.map((arrow, index) => (
                                <Xarrow 
                                    key={index} 
                                    start={arrow.start} 
                                    end={arrow.end} 
                                    color="black" 
                                    strokeWidth={2}
                                    showHead={true}
                                />
                            ))}
                        </div>
                    </TransformComponent>
                </TransformWrapper>
            </div>
            {selectedCard && (
                <Modal show={showModal} onHide={handleCloseModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>Card Details</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>{selectedCard.text}</Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleCloseModal}>Close</Button>
                    </Modal.Footer>
                </Modal>
            )}
        </div>
    );
};

const styles = {
    appContainer: {
        padding: '20px',
        fontFamily: 'Arial, sans-serif',
    },
    addButton: {
        marginRight: '10px',
        marginBottom: '20px',
    },
    canvasContainer: {
        width: '100%',
        height: '80vh',
        border: '1px solid gray',
        overflow: 'auto',
        position: 'relative',
        borderRadius: '8px',
        boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.2)',
    },
    canvas: {
        width: '2000px',
        height: '2000px',
        position: 'relative',
    },
    cardContainer: {
        marginBottom: '10px',
    },
    card: {
        padding: '10px',
        border: '1px solid black',
        backgroundColor: '#f9f9f9',
        borderRadius: '8px',
        boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
        cursor: 'pointer',
    },
    cardText: {
        margin: '0 0 10px 0',
    },
    showMoreButton: {
        backgroundColor: '#007bff',
        color: 'white',
        border: 'none',
        padding: '5px 10px',
        borderRadius: '4px',
        fontSize: '12px',
    },
};

export default App;
