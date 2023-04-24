import './Button.scss';

interface IButtonProps {
    text: string;
    onClick?: () => void;
    className: string;
}

export const Button: React.FC<IButtonProps> = (props) => {
    const { text, onClick, className } = props;
    return (
        <button className={`btn__${className}`} onClick={onClick}>{text}</button>
    );
};