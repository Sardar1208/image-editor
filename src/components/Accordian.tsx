import { PropsWithChildren, ReactElement, useState } from 'react';
import { AiOutlineCaretDown, AiOutlineCaretUp } from "react-icons/ai";

interface AccordianProps extends PropsWithChildren<{}> {
    title: string,
    icon: ReactElement,
}

const Accordion = ({ title, icon, children }: AccordianProps) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleAccordion = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div style={styles.accordion}>
            <div style={styles.accordionHeader} onClick={toggleAccordion}>
                <div style={styles.title}>
                    {icon}
                    <h3>{title}</h3>
                </div>
                {isOpen ? <AiOutlineCaretUp /> : <AiOutlineCaretDown />}
            </div>
            {isOpen && <div style={styles.accordionContent}>{children}</div>}
        </div>
    );
};

const styles = {
    accordion: {
        margin: '8px 0',
    },
    accordionHeader: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        cursor: 'pointer',
    },
    accordionContent: {
        padding: '10px',
        backgroundColor: '#fff',
    },
    title: {
        display: 'flex',
        alignItems: 'center',
        gap: "10px",
    }
};

export default Accordion;
