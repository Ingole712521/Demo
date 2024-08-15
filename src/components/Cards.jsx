import , { useState } from 'react';
import { ResizableBox } from 'react-resizable';
import Draggable from 'react-draggable';

const Card = ({ id, text, onShowMore }) => {
    const [isDragging, setIsDragging] = useState(false);

    return (
        <Draggable
            bounds="parent"
            onStart={() => setIsDragging(true)}
            onStop={() => setIsDragging(false)}
        >
            <ResizableBox width={200} height={100} minConstraints={[150, 100]} maxConstraints={[400, 300]}>
                <div className="card" style={{ padding: 10, border: '1px solid black', backgroundColor: 'white' }}>
                    <p>{text.slice(0, 20)}...</p>
                    <button onClick={() => onShowMore(id)} style={{ fontSize: 12 }}>Show More</button>
                </div>
            </ResizableBox>
        </Draggable>
    );
};

export default Card;
