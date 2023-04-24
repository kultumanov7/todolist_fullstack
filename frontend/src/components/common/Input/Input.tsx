import './Input.scss';

interface IInputProps {
    type: string;
    placeholder?: string;
    onChange?: (e: any) => void;
    className?: string;
    value?: string;
}

export const Input: React.FC<IInputProps> = (props) => {
    const { type, placeholder, onChange, className, value } = props;
    return (
        <input value={value} type={type} placeholder={placeholder} onChange={onChange} className={`input ${className}`}/>
    );
};